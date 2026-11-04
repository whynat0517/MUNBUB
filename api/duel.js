/* Private invite-code 1v1 quiz. Neither player's records overwrite the other's. */
import { randomBytes, randomInt } from 'node:crypto';
import { list, put } from '@vercel/blob';
import { configured, noCache, sameOrigin, session, readPrivate, answerCorrect } from '../lib/mb-server.js';
import answers from '../hard_answer_hashes.json' with { type: 'json' };

const PREFIX='duels/';
const MAX_QUESTIONS=10;
const MS_PER_QUESTION=25000;
const ROOM_LIFETIME=45*60*1000;
const CHARS='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const codeOK=s=>typeof s==='string'&&/^[A-HJ-NP-Z2-9]{8}$/.test(s);
const codeNew=()=>Array.from(randomBytes(8),v=>CHARS[v%CHARS.length]).join('');
const roomPath=c=>PREFIX+c+'/room.json';
const guestPath=c=>PREFIX+c+'/guest.json';
const stepPath=(c,id,index)=>PREFIX+c+'/steps/'+id+'/'+index+'.json';
const hasExpired=room=>!room||!Number.isFinite(room.expiresAt)||room.expiresAt<Date.now();

function pickQuestions(){
 const sp=Object.keys(answers).filter(k=>/^s[0-9]+$/.test(k));
 const id=Object.keys(answers).filter(k=>/^i[0-9]+$/.test(k));
 const sample=(arr,n)=>{const a=[...arr];for(let i=0;i<n;i++){const j=i+randomInt(a.length-i);[a[i],a[j]]=[a[j],a[i]]}return a.slice(0,n)};
 const both=[...sample(sp,5),...sample(id,5)];
 for(let i=both.length-1;i>0;i--){const j=randomInt(i+1);[both[i],both[j]]=[both[j],both[i]]}
 return both;
}
async function state(c,room,guest,me){
 const members=[{id:room.hostId,name:room.hostName},...(guest?[{id:guest.id,name:guest.name}]:[])];
 const isMember=members.some(x=>x.id===me.id);
 if(!isMember)return null;
 const records=await Promise.all(members.map(async member=>{
  const paths=await list({prefix:PREFIX+c+'/steps/'+member.id+'/',limit:20});
  const sorted=paths.blobs.filter(b=>/^([0-9]+)\.json$/.test(b.pathname.split('/').at(-1)))
    .sort((a,b)=>Number(a.pathname.split('/').at(-1).split('.')[0])-Number(b.pathname.split('/').at(-1).split('.')[0]));
  const entries=(await Promise.all(sorted.slice(0,MAX_QUESTIONS).map(async b=>{
   try{return await readPrivate(b.pathname)}catch{return null}
  }))).filter(x=>x && Number.isInteger(x.index)&&Number.isInteger(x.points));
  const unique=new Map();
  for(const item of entries)if(!unique.has(item.index))unique.set(item.index,item);
  const ordered=[...unique.values()].sort((a,b)=>a.index-b.index);
  return {
   id:member.id,name:member.name,
   answered:ordered.length,
   correct:ordered.reduce((n,x)=>n+(x.correct?1:0),0),
   score:ordered.reduce((n,x)=>n+x.points,0),
   finished:ordered.length===MAX_QUESTIONS,
   lastAt:ordered.at(-1)?.at||null,
   answers:member.id===me.id?ordered.map(x=>({index:x.index,correct:x.correct,points:x.points})):undefined
  };
 }));
 return {code:c,hostName:room.hostName,guestName:guest?.name||null,
  me:me.id,role:room.hostId===me.id?'host':'guest',
  ready:!!guest,startsAt:guest?guest.joinedAt+6000:null,expiresAt:room.expiresAt,
  questionIds:room.questionIds,
  players:records,finished:!!guest&&records.every(x=>x.finished)};
}
async function sendError(res,code,text){return res.status(code).json({error:text})}
export default async function handler(req,res){
 noCache(res);
 if(!configured())return sendError(res,503,'대결 서버가 준비되지 않았어.');
 const me=session(req);
 if(!me)return sendError(res,401,'1대1 대결은 온라인 로그인 후 이용할 수 있어.');
 if(req.method==='GET'){
  const code=String(req.query?.code||'').toUpperCase();
  if(!codeOK(code))return sendError(res,400,'8자리 방 코드를 입력해 줘.');
  try{
   const room=await readPrivate(roomPath(code));
   if(hasExpired(room))return sendError(res,404,'방이 없거나 유효 시간이 지났어.');
   const guest=await readPrivate(guestPath(code));
   const data=await state(code,room,guest,me);
   if(!data)return sendError(res,403,'이 방에 참여한 계정이 아니야.');
   return res.status(200).json(data);
  }catch(e){console.error('Duel status',e.message);return sendError(res,503,'대결 정보를 불러오지 못했어.')}
 }
 if(req.method!=='POST')return sendError(res,405,'지원하지 않는 요청이야.');
 if(!sameOrigin(req))return sendError(res,403,'잘못된 요청 출처야.');
 const body=req.body&&typeof req.body==='object'?req.body:{};
 try{
  if(body.action==='create'){
   const code=codeNew(),now=Date.now();
   await put(roomPath(code),JSON.stringify({
    code,hostId:me.id,hostName:me.name,questionIds:pickQuestions(),
    createdAt:now,expiresAt:now+ROOM_LIFETIME
   }),{access:'private',addRandomSuffix:false,contentType:'application/json'});
   return res.status(201).json({code,expiresAt:now+ROOM_LIFETIME});
  }
  const code=String(body.code||'').trim().toUpperCase();
  if(!codeOK(code))return sendError(res,400,'올바른 8자리 방 코드를 입력해 줘.');
  const room=await readPrivate(roomPath(code));
  if(hasExpired(room))return sendError(res,404,'방을 찾을 수 없거나 유효 시간이 지났어.');
  const guest=await readPrivate(guestPath(code));
  if(body.action==='join'){
   if(room.hostId===me.id)return sendError(res,400,'자기 자신과는 대결할 수 없어.');
   if(guest)return sendError(res,409,'이미 두 명이 참가한 방이야.');
   try{
    await put(guestPath(code),JSON.stringify({id:me.id,name:me.name,joinedAt:Date.now()}),
     {access:'private',addRandomSuffix:false,contentType:'application/json'});
   }catch(e){
    return sendError(res,409,'이미 다른 사람이 참가했거나 방 입장 중 오류가 발생했어.');
   }
   const joined=await readPrivate(guestPath(code));
   if(joined?.id!==me.id)return sendError(res,409,'다른 사람이 먼저 입장했어.');
   return res.status(200).json({code,joined:true});
  }
  if(body.action==='answer'){
   if(!guest)return sendError(res,409,'상대가 입장할 때까지 기다려 줘.');
   if(me.id!==room.hostId&&me.id!==guest.id)return sendError(res,403,'이 대결의 참가자가 아니야.');
   const index=Number(body.index);
   if(!Number.isInteger(index)||index<0||index>=MAX_QUESTIONS)return sendError(res,400,'문제 번호를 확인해 줘.');
   const qid=room.questionIds[index];
   if(!qid)return sendError(res,400,'문제 정보를 찾을 수 없어.');
   const start=guest.joinedAt+6000;
   if(Date.now()<start)return sendError(res,409,'대결 시작 신호를 기다려 줘.');
   const path=stepPath(code,me.id,index);
   if(await readPrivate(path))return sendError(res,409,'이미 제출한 문제야.');
   let began=start;
   if(index>0){
    const previous=await readPrivate(stepPath(code,me.id,index-1));
    if(!previous)return sendError(res,409,'이전 문제부터 풀어 줘.');
    began=previous.at;
   }
   const answer=String(body.answer??'');
   if(answer.length>100)return sendError(res,400,'답변이 너무 길어.');
   const correct=answerCorrect(qid,answer);
   if(correct===null)return sendError(res,400,'유효하지 않은 문제야.');
   const at=Date.now(),elapsed=Math.max(0,at-began);
   const points=correct?Math.max(0,Math.min(10,Math.round(10-10*Math.min(1,elapsed/MS_PER_QUESTION)))):0;
   const entry={index,qid,correct,points,at,elapsed};
   try{await put(path,JSON.stringify(entry),{access:'private',addRandomSuffix:false,contentType:'application/json'})}
   catch(e){return sendError(res,409,'이미 제출되었어. 상태를 새로고침해 줘.')}
   return res.status(200).json({accepted:true,index,correct,points,elapsed,finished:index===MAX_QUESTIONS-1});
  }
  return sendError(res,400,'알 수 없는 대결 요청이야.');
 }catch(e){console.error('Duel API',e.message);return sendError(res,503,'대결 서버에 문제가 발생했어. 다시 시도해 줘.')}
}

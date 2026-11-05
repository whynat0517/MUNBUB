/* Live, opt-in public duel listing. Private invite rooms never appear here. */
import { list } from '@vercel/blob';
import { configured, noCache, readPrivate } from '../lib/mb-server.js';
const ID=/^[A-HJ-NP-Z2-9]{8}$/;
const PREFIX='public-rooms/';
export default async function handler(req,res){
 noCache(res);
 if(req.method!=='GET')return res.status(405).json({error:'GET 전용 요청이야.'});
 if(!configured())return res.status(503).json({error:'공개방 서버를 이용할 수 없어.'});
 try{
  const blobList=await list({prefix:PREFIX,limit:100});
  const rows=await Promise.all(blobList.blobs.slice(0,90).map(async b=>{
   try{
    const r=await readPrivate(b.pathname,{fresh:true});
    if(!r||!ID.test(r.code)||!Number.isFinite(r.expiresAt)||r.expiresAt<Date.now())return null;
    const [guest,host]=await Promise.all([
     readPrivate('duels/'+r.code+'/guest.json',{fresh:true}),
     readPrivate('duels/'+r.code+'/presence/'+
      (await readPrivate('duels/'+r.code+'/room.json',{fresh:true}))?.hostId+'.json',{fresh:true})
    ]);
    if(host?.leftAt)return null;
    return {code:r.code,name:r.roomName||'공개 대결방',
     host:r.hostName||'플레이어',title:r.hostTitle||'국어 새내기',
     type:r.settings?.type||'mixed',form:r.settings?.form||'auto',
     count:r.settings?.count||10,seconds:r.settings?.seconds||25,
     players:guest?2:1,capacity:2,
     status:guest?'playing':'waiting',createdAt:r.createdAt||0};
   }catch{return null}
  }));
  return res.status(200).json({rooms:rows.filter(Boolean).sort((a,b)=>b.createdAt-a.createdAt).slice(0,80)});
 }catch(e){console.error('Public room listing',e?.message);return res.status(503).json({error:'공개방 목록을 불러오지 못했어.'})}
}

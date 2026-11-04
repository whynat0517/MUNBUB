import {configured,noCache,sameOrigin,session,setSession,clearSession,nickname,newId,randomKey,hash,readPrivate,writePrivate} from '../lib/mb-server.js';
export default async function handler(req,res){
 noCache(res);
 if(!configured())return res.status(503).json({error:'온라인 계정 저장소가 연결되지 않았어요.'});
 if(req.method==='GET'){const me=session(req);return res.status(200).json({loggedIn:!!me,name:me?.name||null,id:me?.id||null})}
 if(req.method!=='POST')return res.status(405).json({error:'지원하지 않는 요청이에요.'});
 if(!sameOrigin(req))return res.status(403).json({error:'잘못된 요청 출처예요.'});
 const data=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
 try{
  if(data.action==='register'){
   const name=nickname(data.name);
   if(!name)return res.status(400).json({error:'닉네임은 한글·영문·숫자·공백·밑줄 2~12자로 입력해 줘.'});
   const id=newId(),secret=randomKey(),code=id+'.'+secret;
   await writePrivate('profiles/'+id+'.json',{id,name,recoveryHash:hash(secret),created:Date.now()});
   setSession(res,id,name);
   return res.status(201).json({loggedIn:true,name,id,recoveryCode:code});
  }
  if(data.action==='login'){
   const code=String(data.code||'').trim();
   const parts=code.split('.');
   if(parts.length!==2||!/^[a-f0-9-]{36}$/.test(parts[0])||!/^[A-Za-z0-9_-]{30,50}$/.test(parts[1]))return res.status(401).json({error:'복구 코드를 확인해 줘.'});
   const user=await readPrivate('profiles/'+parts[0]+'.json');
   if(!user||hash(parts[1])!==user.recoveryHash)return res.status(401).json({error:'복구 코드를 확인해 줘.'});
   setSession(res,user.id,user.name);
   return res.status(200).json({loggedIn:true,name:user.name,id:user.id});
  }
  if(data.action==='logout'){clearSession(res);return res.status(200).json({loggedIn:false})}
  return res.status(400).json({error:'알 수 없는 계정 요청이에요.'});
 }catch(e){console.error('Account API:',e.message);return res.status(503).json({error:'계정 저장소에 연결하지 못했어.'})}
}

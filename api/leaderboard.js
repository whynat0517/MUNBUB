import {configured,noCache,topScores,session} from '../lib/mb-server.js';
export default async function handler(req,res){
 noCache(res);
 if(req.method!=='GET')return res.status(405).json({error:'GET만 지원해요.'});
 if(!configured())return res.status(503).json({error:'랭킹 저장소가 준비되지 않았어요.'});
 try{return res.status(200).json({scores:await topScores(),me:session(req)?.id||null,scope:'online',rule:'1인 최고 기록'})}
 catch(e){console.error('Leaderboard API:',e.message);return res.status(503).json({error:'랭킹을 불러오지 못했어.'})}
}

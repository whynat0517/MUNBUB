/* Explicit online ranked quiz challenge, separate from normal unlimited practice. */
(()=>{
 'use strict';
 if(window.__mbRankedChallenge2026)return;
 window.__mbRankedChallenge2026=true;
 const $=id=>document.getElementById(id);
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const MODES={infinite:{title:'∞ 무한모드 랭킹전',detail:'제한 없이 최고 정답 수 도전'},hardcore:{title:'⚔ 하드코어 랭킹전',detail:'첫 오답에서 종료 · 속도에 따라 1~10점'},timed60:{title:'⏱ 1분 타임어택 랭킹전',detail:'60초 동안 최다 정답 도전'}};
 const dialog=document.createElement('dialog');
 dialog.id='mb-ranked-dialog';dialog.setAttribute('aria-label','맛춘범 온라인 랭킹전');
 document.body.append(dialog);
 const style=document.createElement('style');style.id='mb-ranked-dialog-style';style.textContent=[
  '#mb-ranked-dialog{box-sizing:border-box;width:min(92vw,790px);max-height:90dvh;padding:0;border:5px double #ae8260;border-radius:18px;overflow:auto;background:#f7e7d3;color:#3c2727;box-shadow:0 18px 65px #130c13b3}',
  '#mb-ranked-dialog::backdrop{background:#1c1118bf}',
  '#mb-ranked-dialog .mb-ranked-head{padding:16px 21px;background:linear-gradient(120deg,#42262b,#663539);color:#ffdfb8;display:flex;align-items:center;justify-content:space-between;gap:10px}',
  '#mb-ranked-dialog h2{font-size:clamp(21px,3vw,31px);margin:0}',
  '#mb-ranked-dialog .mb-ranked-body{padding:clamp(13px,2.3vw,25px)}',
  '#mb-ranked-dialog button{font:inherit;cursor:pointer;touch-action:manipulation;font-weight:900;border-radius:12px;border:3px solid #956445;background:linear-gradient(#fff2d5,#e5bd93);padding:11px;color:#482c26;min-height:44px}',
  '#mb-ranked-dialog .mb-ranked-modes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:13px 0}',
  '#mb-ranked-dialog .mb-ranked-modes button{min-width:0;word-break:keep-all;padding:14px 9px;line-height:1.5}',
  '#mb-ranked-dialog .mb-ranked-modes button.selected{background:#50303a;color:#ffe2bc;border-color:#dcad7e}',
  '#mb-ranked-dialog .mb-ranked-modes small{display:block;font-size:12px;font-weight:700}',
  '#mb-ranked-dialog .mb-ranked-primary{background:linear-gradient(#fadd9f,#d99a61);font-weight:1000;font-size:clamp(16px,2vw,21px);width:100%;margin-top:11px}',
  '#mb-ranked-dialog .mb-ranked-question{padding:clamp(15px,3vw,29px);border:4px double #976d58;border-radius:18px;background:#fffaf0;min-height:82px;font-size:clamp(20px,2.5vw,29px);font-weight:900;text-align:center;line-height:1.6;margin:16px 0}',
  '#mb-ranked-dialog .mb-ranked-stat{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;padding:10px 14px;border:3px solid #b48a67;border-radius:12px;background:#fff4dc;font-weight:850}',
  '#mb-ranked-dialog .mb-ranked-choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}',
  '#mb-ranked-dialog .mb-ranked-choices button{padding:16px 11px;min-height:69px;background:#fff1d6;overflow-wrap:anywhere}',
  '#mb-ranked-dialog .mb-ranked-input{box-sizing:border-box;display:block;width:100%;padding:14px;border:3px solid #9a6950;border-radius:12px;font:inherit;font-size:19px;background:#fffdf7;color:#2f2225}',
  '#mb-ranked-dialog .mb-ranked-feedback{padding:17px;border:3px solid #a78461;border-radius:13px;background:#fff5e5;margin-top:10px;font-weight:850}',
  '#mb-ranked-dialog .mb-ranked-help{font-size:13px;line-height:1.7;color:#795749}',
  '#mb-ranked-dialog .mb-ranked-error{color:#a82b32;font-weight:900;min-height:1.3em}',
  '#mb-ranked-dialog #mb-ranked-close{width:auto;min-height:40px;padding:5px 12px}',
  '#view-setup #mb-ranked-entry{margin:12px 0;padding:14px 17px;background:linear-gradient(125deg,#503035,#7d4435);border:4px double #d7a276;border-radius:15px;color:#ffe6c4;box-shadow:0 4px 0 #291d21}',
  '#view-setup #mb-ranked-entry .mb-ranked-entry-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px;justify-content:space-between}',
  '#view-setup #mb-ranked-entry button{border:3px solid #e2b387;border-radius:11px;padding:11px 16px;background:#f1d3a7;color:#462c2a;font-weight:1000;font-size:clamp(15px,1.75vw,19px);cursor:pointer}',
  '#view-setup #mb-ranked-entry p{margin:5px 0;font-size:13px;color:#ffe2c6}',
  '@media(max-width:540px){#mb-ranked-dialog .mb-ranked-modes{grid-template-columns:1fr}#mb-ranked-dialog .mb-ranked-choices{grid-template-columns:1fr}#mb-ranked-dialog .mb-ranked-modes button{padding:8px}#mb-ranked-dialog .mb-ranked-question{padding:13px;min-height:70px}}'
 ].join('\n');document.head.append(style);
 let selected='infinite',run=null,active=false,busy=false,mode=null,qid=null,
     correct=0,answered=0,score=0,deadline=null,lastResult=null,tickId=null,generation=0;
 const now=()=>Date.now();
 const safeMode=x=>MODES[x]?x:'infinite';
 function frame(title,content){
  dialog.innerHTML='<div class="mb-ranked-head"><h2>'+esc(title)+'</h2><button id="mb-ranked-close" type="button" aria-label="랭킹전 닫기">✕</button></div>'+
   '<div class="mb-ranked-body">'+content+'</div>';
 }
 async function api(data){
  const r=await fetch('/api/ranked',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const json=await r.json().catch(()=>({}));
  if(!r.ok)throw Error(json.error||'랭킹 서버에 연결할 수 없어.');
  return json;
 }
 async function checkLogin(){
  try{const r=await fetch('/api/account',{credentials:'same-origin'}),j=await r.json();return !!j.loggedIn}catch{return false}
 }
 function showLobby(message=''){
  active=false;run=null;mode=null;deadline=null;lastResult=null;
  frame('🏆 랭킹전 도전', '<p class="mb-ranked-help">랭킹전은 일반 학습 기록과 별개야. 세 모드 모두 <strong>맞춤법 · 사자성어 · 응용문제</strong>를 섞어서 출제하고 정답은 서버에서 검증해.</p>'+
   '<div class="mb-ranked-modes">'+Object.entries(MODES).map(([key,opt])=>
    '<button type="button" data-rank-pick="'+key+'" class="'+(key===selected?'selected':'')+'">'+esc(opt.title)+
    '<small>'+esc(opt.detail)+'</small></button>').join('')+'</div>'+
   '<p class="mb-ranked-error" id="mb-ranked-error" role="status">'+esc(message)+'</p>'+
   '<button id="mb-ranked-begin" class="mb-ranked-primary" type="button">🏁 선택한 랭킹전 시작</button>');
  dialog.querySelectorAll('[data-rank-pick]').forEach(btn=>btn.addEventListener('click',()=>{
   selected=safeMode(btn.dataset.rankPick);
   dialog.querySelectorAll('[data-rank-pick]').forEach(b=>b.classList.toggle('selected',b.dataset.rankPick===selected));
  }));
  $('mb-ranked-begin')?.addEventListener('click',start);
 }
 function nicknameMode(){
  if(!dialog.open)dialog.showModal();
  showLobby();
  checkLogin().then(ok=>{
   if(dialog.open&&!ok&&!run)showLobby('🔒 온라인 랭킹전은 먼저 닉네임·비밀번호로 로그인해야 해.');
  });
 }
 const findQ=()=>typeof MAP!=='undefined'&&MAP.get(qid);
 const choices=(q)=>{
  if(q.type==='idiom'){
   const all=(BANK.idioms||[]).filter(x=>x.id!==q.id&&x.answer!==q.answer&&x.meaning!==q.meaning);
   const seed=[...q.id].reduce((a,c)=>a+c.charCodeAt(0),0);
   const items=[q.answer];
   for(let k=0;k<all.length&&items.length<4;k++){
    const candidate=all[(seed+17*k)%all.length]?.answer;
    if(candidate&&!items.includes(candidate))items.push(candidate);
   }
   return items.map((v,i)=>({v,key:(i*7+seed)%items.length})).sort((a,b)=>a.key-b.key).map(x=>x.v);
  }
  return Array.isArray(q.options)?q.options:[];
 };
 function timeLeft(){return deadline?Math.max(0,Math.ceil((deadline-now())/1000)):null}
 function stats(){
  return '<div class="mb-ranked-stat"><span>⚔ '+esc(MODES[mode]?.title||'랭킹전')+'</span>'+
   '<span>정답 '+correct+' / '+answered+'</span>'+
   (mode==='hardcore'?'<span>점수 '+score+'점</span>':'')+
   (deadline?'<span id="mb-ranked-time">⏱ '+timeLeft()+'초</span>':'')+'</div>';
 }
 function showQuestion(){
  if(!active||!run)return;
  const q=findQ();
  if(!q){showLobby('문제를 불러오지 못했어. 다시 시도해 줘.');return}
  const label=q.type==='idiom'?'사자성어 뜻':q.type==='application'?'응용문제':'프린트 맞춤법';
  const problem=q.type==='idiom'?(q.meaning||q.prompt):q.prompt;
  const options=choices(q);
  const written=q.format==='text'||(!options.length&&q.type!=='idiom');
  frame(MODES[mode].title,stats()+
   '<p class="mb-ranked-help">문제 '+(answered+1)+' · '+esc(label)+' · '+(written?'서술형':'객관식')+'</p>'+
   '<div class="mb-ranked-question">'+esc(problem)+'</div>'+
   (written?'<form id="mb-ranked-write"><input id="mb-ranked-typed" class="mb-ranked-input" maxlength="120" required autocomplete="off" spellcheck="false" placeholder="정답을 직접 입력해 줘"><button class="mb-ranked-primary" type="submit">제출</button></form>':
    '<div class="mb-ranked-choices">'+options.map(x=>'<button type="button" data-ranked-answer="'+esc(x)+'">'+esc(x)+'</button>').join('')+'</div>')+
   '<p class="mb-ranked-help" id="mb-ranked-message">서버에서 정답을 확인해. 랭킹전 점수는 계정별 최고 기록만 반영돼.</p>'+
   '<button id="mb-ranked-stop" type="button">도전 종료하고 기록 저장</button>');
  dialog.querySelectorAll('[data-ranked-answer]').forEach(btn=>btn.addEventListener('click',()=>submit(btn.dataset.rankedAnswer)));
  $('mb-ranked-write')?.addEventListener('submit',e=>{e.preventDefault();submit($('mb-ranked-typed')?.value||'')});
  $('mb-ranked-stop')?.addEventListener('click',finish);
 }
 async function start(){
  if(busy)return;
  busy=true;
  try{
   if(!await checkLogin())throw Error('닉네임·비밀번호로 로그인한 뒤 랭킹전에 참가해 줘.');
   const out=await api({action:'start',rankedChallenge:true,mode:selected});
   mode=selected;run=out.run;qid=out.qid;correct=0;answered=0;score=0;deadline=out.deadline||null;
   generation++;active=true;showQuestion();
  }catch(e){showLobby(e.message)}finally{busy=false}
 }
 async function submit(answer){
  if(!active||busy||!run)return;
  if(deadline&&timeLeft()===0){finish();return}
  busy=true;
  const id=qid;
  dialog.querySelectorAll('[data-ranked-answer],#mb-ranked-write button').forEach(b=>b.disabled=true);
  const msg=$('mb-ranked-message');if(msg)msg.textContent='답을 전송하고 있어…';
  try{
   const out=await api({action:'answer',run,qid:id,answer});
   if(out.ended){
    correct=out.correct||0;answered=out.answered||0;score=out.score||0;
    showEnd(out);return;
   }
   run=out.run;correct=out.correct;answered=out.answered;score=out.score||0;
   const q=findQ();
   lastResult={good:out.verifiedCorrect,answer:q?.answers?.join(' / ')||q?.answer||'',note:q?.note||'',points:out.points||0};
   showFeedback();
  }catch(e){const p=$('mb-ranked-message');if(p)p.textContent='⚠ '+e.message;
   dialog.querySelectorAll('[data-ranked-answer],#mb-ranked-write button').forEach(b=>b.disabled=false);
  }finally{busy=false}
 }
 function showFeedback(){
  const f=lastResult;
  frame(MODES[mode].title,stats()+'<section class="mb-ranked-feedback">'+
   '<h3>'+(f.good?'✅ 정답!':'❌ 오답!')+(mode==='hardcore'&&f.good?' +'+f.points+'점':'')+'</h3>'+
   '<p>정답: <strong>'+esc(f.answer)+'</strong></p>'+
   (f.note?'<p>'+esc(f.note)+'</p>':'')+
   '</section><button id="mb-ranked-next" class="mb-ranked-primary" type="button">다음 혼합문제 ▶</button>'+
   '<button id="mb-ranked-stop" type="button">도전 종료하고 기록 저장</button>');
  $('mb-ranked-next')?.addEventListener('click',next);
  $('mb-ranked-stop')?.addEventListener('click',finish);
 }
 async function next(){
  if(!active||busy)return;
  busy=true;
  try{
   const out=await api({action:'next',run});
   if(out.ended){showEnd(out);return}
   run=out.run;qid=out.qid;showQuestion();
  }catch(e){const btn=$('mb-ranked-next');if(btn)btn.textContent='재시도 · '+e.message}
  finally{busy=false}
 }
 async function finish(){
  if(busy||!run||!active)return;
  busy=true;
  try{
   const out=await api({action:'finish',run});
   showEnd(out);
  }catch(e){const p=$('mb-ranked-message');if(p)p.textContent=e.message}
  finally{busy=false}
 }
 function showEnd(out){
  active=false;run=null;deadline=null;
  if(Number.isFinite(out.correct))correct=out.correct;
  if(Number.isFinite(out.answered))answered=out.answered;
  if(Number.isFinite(out.score))score=out.score;
  frame('🏆 랭킹전 종료', '<div class="mb-ranked-feedback"><h3>'+esc(MODES[mode]?.title||'랭킹전')+'</h3>'+
   '<p>정답: <strong>'+correct+'문제</strong> / 도전: '+answered+'문제</p>'+
   (mode==='hardcore'?'<p>하드코어 점수: <strong>'+score+'점</strong></p>':'')+
   '<p>'+(out.recorded?'온라인 순위 기록 저장 완료 · 최고 '+(out.best??correct)+(mode==='hardcore'?'점':'문제'):'온라인 기록은 정답이 있을 때 등록돼.')+'</p></div>'+
   '<button id="mb-ranked-again" class="mb-ranked-primary" type="button">다른 랭킹전 도전하기</button>');
  $('mb-ranked-again')?.addEventListener('click',()=>showLobby());
 }
 function stopWithoutPause(){
  if(active&&run){
   const out={action:'finish',run};
   // Closing the dialog must not silently lose the confirmed rank record.
   try{navigator.sendBeacon?.('/api/ranked',new Blob([JSON.stringify(out)],{type:'application/json'}))}catch(_){}
   active=false;run=null;
  }
 }
 dialog.addEventListener('click',e=>{
  if(e.target.closest?.('#mb-ranked-close')){
   stopWithoutPause();dialog.close();
  }
 });
 dialog.addEventListener('cancel',()=>stopWithoutPause());
 window.addEventListener('pagehide',stopWithoutPause,{capture:true});
 tickId=window.setInterval(()=>{
  if(!active||!dialog.open||!deadline)return;
  const timer=$('mb-ranked-time');if(timer)timer.textContent='⏱ '+timeLeft()+'초';
  if(timeLeft()===0&&!busy)finish();
 },350);
 function inject(){
  const setup=$('view-setup');
  if(!setup||typeof BANK==='undefined'||!window.__mbAppRecords2026v1)return;
  const route=window.__mbSelectedMenu?.()||'';
  const activeRoute=route==='infinite'||(typeof section!=='undefined'&&section==='setup'&&
   document.querySelector('[data-route="infinite"].active'));
  let el=$('mb-ranked-entry');
  if(!el){
   el=document.createElement('section');el.id='mb-ranked-entry';
   el.innerHTML='<div class="mb-ranked-entry-row"><div><strong>🏆 온라인 랭킹전</strong>'+
    '<p>무한 · 하드코어 · 1분 타임어택 · 전부 혼합문제로 최고 기록을 세워 봐!</p></div>'+
    '<button id="mb-ranked-open" type="button">🏁 랭킹전하기</button></div>';
   el.querySelector('button').addEventListener('click',nicknameMode);
   setup.prepend(el);
  }
  el.hidden=!activeRoute;
 }
 const observer=new MutationObserver(()=>{if(!$('mb-ranked-entry'))inject()});
 const root=$('view-setup');
 if(root)observer.observe(root,{childList:true});
 document.addEventListener('click',e=>{
  if(e.target.closest?.('[data-route="infinite"]'))setTimeout(inject,90);
 },true);
 setTimeout(inject,150);
})();

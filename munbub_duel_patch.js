/* 맛춘범 온라인 1대1: 초대 코드, 동일한 10문제, 서버 채점 및 실시간 점수 확인. */
(()=>{
 'use strict';
 if(window.__mbDuelV1)return;
 window.__mbDuelV1=true;
 const $=id=>document.getElementById(id);
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dialog=document.createElement('dialog');
 dialog.id='mb-duel-dialog';
 dialog.setAttribute('aria-label','맛춘범 온라인 1대1 대결');
 document.body.append(dialog);
 const css=document.createElement('style');
 css.id='mb-duel-styles';
 css.textContent=[
  '#homeScreen .mb-online-actions>.mb-duel-home{grid-column:auto!important;min-height:0!important;width:100%!important;background-color:transparent!important;font-size:0!important}',
  '#homeScreen .mb-duel-home small{display:none!important}',
  '.sidebar-nav .mb-duel-nav,.mobile-drawer .mb-duel-nav{display:flex!important;flex-direction:column;align-items:center;justify-content:center;min-height:61px!important;padding:7px 5px!important;border:3px solid #b08566!important;border-radius:12px!important;background:linear-gradient(#ffedcd,#d4a784)!important;color:#42292a!important;box-shadow:inset 0 0 0 2px #fff6e5,0 3px 0 #39262a!important;font-weight:950!important;line-height:1.2!important;font-size:clamp(15px,1.35vw,19px)!important;cursor:pointer}',
  '.sidebar-nav .mb-duel-nav small,.mobile-drawer .mb-duel-nav small{font-size:11px!important;font-weight:750!important}',
  '.sidebar-nav .mb-duel-nav.active,.mobile-drawer .mb-duel-nav.active{filter:brightness(.77)!important;outline:3px solid #d6ad82;outline-offset:-3px}',
  '#mb-duel-dialog{box-sizing:border-box;width:min(93vw,760px);max-height:min(90dvh,850px);overflow:auto;border:5px double #ac7a53;border-radius:20px;padding:clamp(14px,2.3vw,25px);background:#f9e7d0;color:#422924;box-shadow:0 18px 65px #100b11a8}',
  '#mb-duel-dialog::backdrop{background:#1a0e16c9}',
  '#mb-duel-dialog h2{font-size:clamp(22px,3vw,32px);margin:4px 0 12px}',
  '#mb-duel-dialog h3{font-size:clamp(17px,2.1vw,22px);margin:13px 0}',
  '#mb-duel-dialog p{line-height:1.55;margin:9px 0}',
  '#mb-duel-dialog .mb-duel-panel{padding:clamp(12px,2vw,19px);border:3px solid #b98c69;border-radius:15px;background:#fff5e6;box-shadow:inset 0 0 0 2px #f8dcba}',
  '#mb-duel-dialog .mb-duel-actions{display:flex;flex-wrap:wrap;gap:9px;margin:15px 0 8px}',
  '#mb-duel-dialog button{min-height:43px;padding:9px 13px;border:2px solid #8e6047;border-radius:10px;background:#f1cca6;color:#3e2927;font-size:clamp(14px,1.5vw,17px);font-weight:850;cursor:pointer;touch-action:manipulation}',
  '#mb-duel-dialog button:hover{filter:brightness(1.065)}',
  '#mb-duel-dialog button:disabled{opacity:.48;cursor:default;filter:grayscale(.6)}',
  '#mb-duel-dialog button.mb-duel-primary{background:linear-gradient(#ffd992,#d99a62);border-color:#955c3e}',
  '#mb-duel-dialog button.mb-duel-close{float:right;padding:6px 10px;min-height:37px}',
  '#mb-duel-dialog .mb-duel-code{font-family:ui-monospace,monospace;font-size:clamp(22px,4vw,34px);font-weight:1000;letter-spacing:.14em;color:#693c2c}',
  '#mb-duel-dialog input{display:block;width:100%;max-width:285px;padding:13px;font-size:clamp(19px,2vw,24px);font-family:ui-monospace,monospace;font-weight:900;letter-spacing:.16em;text-transform:uppercase;border:3px solid #a77455;border-radius:11px;background:#fffcf5;color:#4b302d}',
  '#mb-duel-dialog .mb-duel-status{margin:9px 0;padding:10px;border:2px solid #b7946e;border-radius:12px;background:#ffeacb;font-weight:800}',
  '#mb-duel-dialog .mb-duel-scoreboard{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:10px 0}',
  '#mb-duel-dialog .mb-duel-score{padding:10px;border:3px solid #b38c71;border-radius:12px;background:#fffaf0;text-align:center;min-width:0}',
  '#mb-duel-dialog .mb-duel-score.me{border-color:#ad5e35;background:#fff1d9}',
  '#mb-duel-dialog .mb-duel-score strong{font-size:clamp(22px,3vw,35px);display:block;color:#763c2d}',
  '#mb-duel-dialog .mb-duel-option-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:12px 0}',
  '#mb-duel-dialog .mb-duel-option-list button{min-height:67px;text-align:center;background:#fff0d6;font-size:clamp(15px,1.7vw,21px);word-break:keep-all}',
  '#mb-duel-dialog .mb-duel-option-list button:active{transform:scale(.97)}',
  '#mb-duel-dialog .mb-duel-clock{font-size:clamp(16px,2.2vw,25px);font-weight:1000;color:#74452c}',
  '#mb-duel-dialog .mb-duel-clock.low{color:#ae2939}',
  '#mb-duel-dialog .mb-duel-start-box{text-align:center;padding:clamp(14px,3vw,26px);margin:12px auto;border:3px solid #b99166;border-radius:18px;background:linear-gradient(#fff7e6,#f3d7ab);max-width:410px}',
  '#mb-duel-dialog .mb-duel-start-label{font-size:clamp(19px,3vw,28px);font-weight:950;color:#684333;letter-spacing:.04em}',
  '#mb-duel-dialog .mb-duel-start-number{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:clamp(132px,24vw,214px);min-height:clamp(130px,23vw,204px);padding:5px 24px;border:5px double #ffdab1;border-radius:23px;background:linear-gradient(150deg,#432830,#27181e);box-shadow:0 9px 0 #a16f55,0 13px 22px #3a1c2055,inset 0 0 0 3px #6f4641;font-size:clamp(96px,17vw,154px);line-height:1.0;font-variant-numeric:tabular-nums;font-weight:1000;color:#fff0d6;text-shadow:4px 5px 0 #95513b;letter-spacing:-.06em;margin:14px auto 12px;isolation:isolate}',
  '#mb-duel-dialog .mb-duel-start-note{font-size:clamp(15px,2vw,18px);font-weight:800;color:#6e4b36}',
  '@media(max-width:460px){#mb-duel-dialog .mb-duel-start-number{min-width:145px;min-height:145px;padding:4px 18px;font-size:112px;margin:10px auto}}',
  '#mb-duel-dialog .mb-duel-review{padding:clamp(13px,2vw,19px);margin:13px 0;border:3px solid #b48c68;border-radius:15px;background:#fff0d7;text-align:center}',
  '#mb-duel-dialog .mb-duel-review .mb-duel-result{margin:6px 0 14px}',
  '#mb-duel-dialog .mb-duel-review-clock{font-size:clamp(25px,4.6vw,40px);font-weight:1000;color:#823e30;font-variant-numeric:tabular-nums;line-height:1.3}',
  '#mb-duel-dialog .mb-duel-review-status{font-size:clamp(13px,1.6vw,17px);font-weight:800;color:#6d4a3f;min-height:26px;margin:10px 0}',
  '#mb-duel-dialog #mb-duel-next-ready{display:inline-block;width:min(100%,360px);min-height:53px;background:linear-gradient(#ffdb9c,#d99b5e);font-size:clamp(15px,2vw,20px);font-weight:950}',
  '#mb-duel-dialog #mb-duel-next-ready:disabled{opacity:1;background:#e4d6bd;border-color:#8b7b66;color:#5d6258;filter:none}',
  '@media(prefers-reduced-motion:reduce){#mb-duel-dialog .mb-duel-start-number{animation:none}}',
  '#mb-duel-dialog .mb-duel-clock.mb-duel-rival-fast{color:#c52839!important;animation:mb-duel-urgency .57s ease-in-out infinite alternate;transform-origin:left center}',
  '@keyframes mb-duel-urgency{from{filter:brightness(1);transform:scale(1)}to{filter:brightness(1.3);transform:scale(1.045)}}',
  '#mb-duel-dialog .mb-rival-alert{margin:9px 0;padding:9px 11px;border:2px solid #ac5c60;border-radius:10px;background:#ffdedc;color:#9c2535;font-weight:900;min-height:26px}',
  '#mb-duel-dialog .mb-rival-alert[hidden]{display:none!important}',
  '#mb-duel-dialog .mb-duel-config{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:12px 0}',
  '#mb-duel-dialog .mb-duel-config label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:850;color:#52392b}',
  '#mb-duel-dialog .mb-duel-config select{width:100%;min-width:0;min-height:43px;padding:8px;border:2px solid #977457;border-radius:9px;background:#fff8e8;color:#422924;font:inherit;font-weight:800}',
  '@media(max-width:460px){#mb-duel-dialog .mb-duel-config{grid-template-columns:1fr 1fr}#mb-duel-dialog .mb-duel-config label:last-child{grid-column:1/-1}}',
  '@media(prefers-reduced-motion:reduce){#mb-duel-dialog .mb-duel-clock.mb-duel-rival-fast{animation:none}}',
  '#mb-duel-dialog .mb-duel-result{margin-top:12px;padding:13px;border-radius:13px;border:3px solid #896848;font-size:clamp(16px,2.1vw,22px);font-weight:950}',
  '#mb-duel-dialog .mb-duel-result.good{background:#dff7d6;color:#205c37;border-color:#438e56}',
  '#mb-duel-dialog .mb-duel-result.bad{background:#ffe1dc;color:#96313a;border-color:#ad4b4f}',
  '#mb-duel-dialog .mb-duel-note{color:#735444;font-size:13px}',
  '@media(max-width:600px){#mb-duel-dialog .mb-duel-option-list{grid-template-columns:1fr}#mb-duel-dialog .mb-duel-option-list button{min-height:55px}#mb-duel-dialog .mb-duel-scoreboard{gap:6px}}'
 ].join('\n');
 document.head.append(css);
 const homeRow=document.querySelector('#homeScreen .mb-online-actions');
 if(homeRow){
  const btn=document.createElement('button');
  btn.type='button';btn.className='mb-duel-home';
  btn.innerHTML='🎮 1대1 대결<small>친구와 같은 10문제로 승부!</small>';
  btn.setAttribute('aria-label','온라인 1대1 대결');
  homeRow.append(btn);
  btn.addEventListener('click',openLobby);
 }
 // 1대1 대결은 홈 캐릭터 아래 버튼에서만 진입한다.
 let roomCode=null,status=null,busy=false,lastViewKey='',phase='lobby',feedback=null,feedbackUntil=0,pollBusy=false,previousSelection=null,serverOffset=0;
 let signalBusy=false,signalLastAt=0,signalFailures=0,lastOpponentSignal=null;
 const currentRoomKey='mb_duel_last_room_v1';
 const statusEl=()=>dialog.querySelector('#mb-duel-info');
 function showError(message){const place=statusEl();if(place)place.textContent=message;else renderNotice(message)}
 function makeHeader(){return '<button class="mb-duel-close" type="button" id="mb-duel-close">✕ 닫기</button><h2>🎮 1대1 맞춤법 대결</h2>'}
 function putHTML(content){
  dialog.innerHTML=makeHeader()+content;
  dialog.querySelector('#mb-duel-close')?.addEventListener('click',()=>dialog.close());
 }
 function renderNotice(message){putHTML('<div class="mb-duel-panel"><p class="mb-duel-status" id="mb-duel-info">'+esc(message)+'</p><div class="mb-duel-actions"><button type="button" id="mb-duel-back">방 선택으로</button></div></div>');dialog.querySelector('#mb-duel-back')?.addEventListener('click',showLobby)}
 async function api(body,code){
  const url='/api/duel'+(code?'?code='+encodeURIComponent(code):'');
  const result=await fetch(url,{method:body?'POST':'GET',credentials:'same-origin',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});
  const json=await result.json().catch(()=>({}));
  if(!result.ok)throw Error(json.error||'대결 서버에 연결하지 못했어.');
  return json;
 }
 async function checkLogin(){
  try{const r=await fetch('/api/account',{credentials:'same-origin'});const j=await r.json();return !!j.loggedIn}catch{return false}
 }
 function showLobby(){
  roomCode=null;status=null;phase='lobby';feedback=null;lastViewKey='';signalLastAt=0;signalFailures=0;lastOpponentSignal=null;
  const last=localStorage.getItem(currentRoomKey)||'';
  putHTML('<div class="mb-duel-panel"><p>친구에게 <strong>8자리 방 코드</strong>를 알려 주고 같은 문제로 대결해 봐! 방장이 문제 수와 시간, 유형을 정할 수 있어.</p>'+
   '<form id="mb-duel-create-form"><div class="mb-duel-config">'+
   '<label>문제 수<select id="mb-duel-count"><option value="5">5문제</option><option value="10" selected>10문제</option><option value="15">15문제</option><option value="20">20문제</option></select></label>'+
   '<label>문제당 제한 시간<select id="mb-duel-seconds"><option value="10">10초</option><option value="15">15초</option><option value="25" selected>25초</option><option value="40">40초</option></select></label>'+
   '<label>문제 유형<select id="mb-duel-type"><option value="mixed" selected>맞춤법 + 사자성어</option><option value="spelling">맞춤법만</option><option value="idiom">사자성어만</option></select></label>'+
   '</div><button id="mb-duel-create" type="submit" class="mb-duel-primary">➕ 설정대로 대결방 만들기</button></form>'+
   '<hr><label for="mb-duel-input"><strong>초대받은 방 코드</strong></label><input id="mb-duel-input" maxlength="8" autocomplete="off" placeholder="예: ABCD2345" value="'+esc(last)+'"><div class="mb-duel-actions"><button id="mb-duel-join">↪ 방 코드로 참가</button>'+(last?'<button id="mb-duel-return">최근 방 다시 보기</button>':'')+'</div><p class="mb-duel-note">닉네임·비밀번호 로그인 후 참가할 수 있어. 1대1 점수는 하드코어 랭킹에 합산되지 않아.</p><p id="mb-duel-info" role="status" class="mb-duel-status">새 방을 만들거나 친구의 코드를 입력해 줘.</p></div>');
  dialog.querySelector('#mb-duel-create-form')?.addEventListener('submit',e=>{
   e.preventDefault();
   startAction('create',{count:Number($('mb-duel-count').value),seconds:Number($('mb-duel-seconds').value),type:$('mb-duel-type').value});
  });
  dialog.querySelector('#mb-duel-join')?.addEventListener('click',()=>startAction('join',dialog.querySelector('#mb-duel-input')?.value));
  dialog.querySelector('#mb-duel-return')?.addEventListener('click',()=>enterRoom(last));
 }
 async function openLobby(){
  if(dialog.open)return;
  previousSelection=window.__mbSelectedMenu?.()||'home';
  // 홈 버튼에서 여는 팝업은 왼쪽 모드 선택 상태를 바꾸지 않는다.
  dialog.showModal();
  showLobby();
  const logged=await checkLogin();
  if(!logged && dialog.open && phase==='lobby'){
   putHTML('<div class="mb-duel-panel"><p class="mb-duel-status">🔒 온라인 1대1은 로그인 후 이용할 수 있어.</p><p>홈 캐릭터 아래의 로그인 버튼에서 닉네임과 비밀번호로 로그인해 줘.</p><div class="mb-duel-actions"><button type="button" id="mb-duel-login">👤 로그인하기</button></div></div>');
   dialog.querySelector('#mb-duel-login')?.addEventListener('click',()=>{
    dialog.close();$('mb-account-open')?.click();
   });
  }
 }

 document.addEventListener('click',e=>{
  const target=e.target.closest?.('[data-route="duel"]');
  if(!target)return;
  e.preventDefault();e.stopImmediatePropagation();
  openLobby();
 },true);
 dialog.addEventListener('close',()=>{
  if(typeof window.__mbMarkRoute==='function')window.__mbMarkRoute(previousSelection||'home');
  previousSelection=null;
 });
 async function startAction(action,value){
  if(busy)return;
  busy=true;showError(action==='create'?'대결방 생성 중...':'친구 방에 참가하는 중...');
  try{
   const code=String(value||'').trim().toUpperCase();
   const result=await api(action==='create'?{action:'create',settings:value}:{action:'join',code});
   await enterRoom(result.code);
  }catch(e){showError(e.message)}finally{busy=false}
 }
 async function enterRoom(code){
  roomCode=String(code||'').trim().toUpperCase();
  if(!roomCode)return showLobby();
  phase='room';status=null;feedback=null;lastViewKey='';signalLastAt=0;signalFailures=0;lastOpponentSignal=null;
  try{localStorage.setItem(currentRoomKey,roomCode)}catch(_){}
  putHTML('<div class="mb-duel-panel"><p class="mb-duel-status" id="mb-duel-info">대결 정보를 불러오는 중...</p></div>');
  await updateRoom();
 }
 async function updateRoom(){
  if(!roomCode||pollBusy||!dialog.open)return;
  pollBusy=true;
  const started=Date.now(),code=roomCode;
  try{
   const next=await api(null,code);
   if(!dialog.open||roomCode!==next.code)return;
   // An earlier full response must never roll back a fresher signal.
   if(status?.code===code&&signalLastAt>started)return;
   if(Number.isFinite(next.serverNow))serverOffset=next.serverNow-Date.now();
   const firstSignal=!status?.signalTicket&&!!next.signalTicket;
   status=next;
   showGame();
   // Don't wait up to 1.4s for the old idle poll timer after room entry.
   if(firstSignal){
    clearTimeout(fastTimer);
    fastTimer=setTimeout(signalPoll,80);
   }
  }catch(e){showError(e.message)}finally{pollBusy=false}
 }
 // Fast path: a room-bound signed ticket reads only ONE opponent progress Blob
 // rather than reloading the room, guest and two players on every 0.4s poll.
 async function checkSignal(){
  if(signalBusy||!dialog.open||!roomCode||document.hidden||
     !status?.signalTicket||busy)return;
  const code=roomCode,credential=status.signalTicket;
  signalBusy=true;
  try{
   const start=Date.now();
   const res=await fetch('/api/duel?signal='+encodeURIComponent(credential),{
    credentials:'same-origin',cache:'no-store'
   });
   if(!res.ok)throw Error('대전 알림 연결 실패 '+res.status);
   const signal=await res.json();
   if(!dialog.open||roomCode!==code||status?.signalTicket!==credential)return;
   signalFailures=0;
   // Server clock sample is captured before response transmission.
   if(Number.isFinite(signal.serverNow))
    serverOffset=signal.serverNow-Math.round((start+Date.now())/2);
   if(!status.ready){
    if(signal.ready)await updateRoom();
    return;
   }
   const me=status.players.find(p=>p.id===status.me);
   const opponent=status.players.find(p=>p.id!==status.me);
   if(!me||!opponent||!Number.isInteger(signal.answered))return;
   if(signal.answered<opponent.answered)return; // Ignore stale Blob copies.
   const previousSignal=lastOpponentSignal;
   lastOpponentSignal=signal;
   const agreementChanged=signal.answers?.some(a=>{
    const prior=previousSignal?.answers?.find(x=>x.index===a.index);
    return (a.readyAt||null)!==(prior?.readyAt||null);
   });
   const changed=signal.answered!==opponent.answered||
    signal.score!==opponent.score||signal.lastAt!==opponent.lastAt||agreementChanged;
   if(!changed)return;
   signalLastAt=Date.now();
   opponent.answered=signal.answered;
   opponent.correct=signal.correct;
   opponent.score=signal.score;
   opponent.lastAt=signal.lastAt;
   status.opponentAnswered=opponent.answered>me.answered;
   status.opponentAnsweredAt=status.opponentAnswered
    ?signal.answers?.find(a=>a.index===me.answered)?.at||opponent.lastAt:null;
   status.turnReady=me.answered<count()&&me.answered<=opponent.answered;
   if(status.turnReady){
    if(me.answered===0)status.turnStartsAt=status.startsAt;
    else{
     const prev=me.answered-1;
     const ours=me.answers?.find(a=>a.index===prev)?.at||me.lastAt;
     const theirs=signal.answers?.find(a=>a.index===prev)?.at||opponent.lastAt;
     if(ours&&theirs){
      const ownAnswer=lastAnswer(me,prev)||{at:ours};
      const theirAnswer=signal.answers?.find(a=>a.index===prev)||{at:theirs};
      status.reviewReadyAt=Number(ownAnswer.readyAt)||null;
      status.opponentReviewReadyAt=Number(theirAnswer.readyAt)||null;
      status.turnStartsAt=newReview()
       ?reviewTurnAt(ownAnswer,theirAnswer):Math.max(ours,theirs)+1500;
     }else{await updateRoom();return}
    }
   }else status.turnStartsAt=null;
   status.finished=status.players.every(p=>p.answered>=count());
   showGame(); // Scoreboard-only update when phase/question is unchanged.
  }catch(e){
   signalFailures++;
   // Graceful fallback to the normal authenticated state endpoint.
   // Do not replace the question UI with a transient connection error.
   if(signalFailures===2)await updateRoom();
  }finally{signalBusy=false}
 }
 function opts(q,index){
  if(q.type==='spelling')return [...q.options||[]];
  if(q.type!=='idiom')return [];
  const rejected=new Set([q.answer]);
  const synonyms=[['일거양득','일석이조'],['막상막하','난형난제'],['갑론을박','설왕설래'],
  ['진퇴양난','진퇴유곡'],['고립무원','사고무친'],['분기탱천','비분강개'],
   ['안하무인','방약무인'],['대경실색','혼비백산'],
   ['명재경각','백척간두'],['전전긍긍','전전반측']];
  for(const group of synonyms)if(group.includes(q.answer))group.forEach(a=>rejected.add(a));
  const candidates=BANK.idioms.filter(x=>!rejected.has(x.answer)&&x.meaning!==q.meaning);
  const seed=[...roomCode].reduce((a,c)=>a+c.charCodeAt(0),0)+index*37;
  const choices=[q.answer];
  for(let offset=0;choices.length<4&&offset<candidates.length;offset++)choices.push(candidates[(seed+offset*11)%candidates.length].answer);
  return choices.map((x,i)=>({x,index:(i*7+seed)%4})).sort((a,b)=>a.index-b.index).map(x=>x.x);
 }
 const now=()=>Date.now()+serverOffset;
 const count=()=>status?.settings?.count||status?.questionIds?.length||10;
 const duration=()=>1000*(status?.settings?.seconds||25);
 const remaining=()=>{
  if(!status?.ready||!status.turnReady||!status.turnStartsAt)return 0;
  const time=now();
  const original=Math.max(0,time-status.turnStartsAt);
  const extra=status.opponentAnsweredAt?Math.max(0,time-status.opponentAnsweredAt):0;
  return Math.max(0,duration()-original-extra);
 };
 const newReview=()=>status?.reviewMode==='both-ready-or-5s';
 const lastAnswer=(p,index)=>p?.answers?.find(a=>a.index===index);
 function reviewTurnAt(ours,theirs){
  const last=Math.max(Number(ours?.at)||0,Number(theirs?.at)||0);
  const fallback=last+5000;
  const first=Number(ours?.readyAt)||0,second=Number(theirs?.readyAt)||0;
  return first&&second?Math.min(fallback,Math.max(first,second)):fallback;
 }
 function reviewInfo(){
  const me=status?.players?.find(p=>p.id===status.me);
  const opponent=status?.players?.find(p=>p.id!==status.me);
  if(!me||me.answered<1||me.answered>=count())return null;
  const index=me.answered-1;
  const own=lastAnswer(me,index);
  const theirs=lastOpponentSignal?.answers?.find(a=>a.index===index);
  const readyAt=Number(own?.readyAt||status.reviewReadyAt)||null;
  const opponentReadyAt=Number(theirs?.readyAt||status.opponentReviewReadyAt)||null;
  const otherAnswered=!!opponent&&opponent.answered>index;
  return {index,own,readyAt,opponentReadyAt,otherAnswered,
   readyCount:Number(!!readyAt)+Number(!!opponentReadyAt)};
 }
 function refreshReview(){
  if(phase!=='review'||!status)return;
  const info=reviewInfo();
  if(!info)return;
  const btn=dialog.querySelector('#mb-duel-next-ready');
  if(btn){
   const disabled=!!info.readyAt||busy;
   const label=info.readyAt?'✅ 바로 넘어가기 동의 완료':'⚡ 바로 다음 문제로 넘어가기 동의';
   if(btn.disabled!==disabled)btn.disabled=disabled;
   if(btn.textContent!==label)btn.textContent=label;
  }
  const clock=dialog.querySelector('#mb-duel-review-clock');
  if(clock){
   const caption=!info.otherAnswered?'⏳ 상대 답변 대기 중'
    :status.turnStartsAt&&now()<status.turnStartsAt
     ?'⏱ '+(Math.max(0,(status.turnStartsAt-now())/1000)).toFixed(1)+'초 후 자동 진행'
     :'⚔ 다음 문제 시작!';
   if(clock.textContent!==caption)clock.textContent=caption;
  }
  const statusText=dialog.querySelector('#mb-duel-review-status');
  if(statusText){
   const caption=info.readyCount+' / 2명 동의'
    +(info.otherAnswered?' · 둘 다 답변 완료':' · 상대방이 문제를 풀고 있어');
   if(statusText.textContent!==caption)statusText.textContent=caption;
  }
 }
 function updateOpponentSignal(){
  if(!dialog.open||phase!=='question'||!status)return;
  const flash=!!status.opponentAnswered;
  const clock=dialog.querySelector('#mb-duel-clock');
  clock?.classList.toggle('mb-duel-rival-fast',flash);
  const notice=dialog.querySelector('#mb-duel-rival-notice');
  if(notice){
   notice.hidden=!flash;
   if(flash&&notice.textContent!=='⚡ 상대가 먼저 답했어! 남은 시간이 2배 빠르게 줄어들어!')
    notice.textContent='⚡ 상대가 먼저 답했어! 남은 시간이 2배 빠르게 줄어들어!';
  }
 }
 function scoreboard(){
  return '<div class="mb-duel-scoreboard">'+(status?.players||[]).map(p=>
   '<div class="mb-duel-score'+(p.id===status.me?' me':'')+'" data-duel-player="'+esc(p.id)+'">'+esc(p.name)+(p.id===status.me?' (나)':'')+'<strong class="mb-duel-score-value">'+p.score+'점</strong><small class="mb-duel-progress">정답 '+p.correct+' · '+p.answered+'/'+count()+'</small></div>').join('')+'</div>';
 }
 function refreshScoreboard(){
  // Never replace the active question merely because the opponent scored.
  for(const p of status?.players||[]){
   const card=dialog.querySelector('[data-duel-player="'+p.id+'"]');
   if(!card)continue;
   const points=card.querySelector('.mb-duel-score-value');
   const progress=card.querySelector('.mb-duel-progress');
   if(points)points.textContent=p.score+'점';
   if(progress)progress.textContent='정답 '+p.correct+' · '+p.answered+'/'+count();
  }
  updateOpponentSignal();
  refreshReview();
 }
 function showGame(){
  if(!dialog.open||!roomCode||!status)return;
  const me=status.players.find(x=>x.id===status.me);
  const qidx=me?.answered||0;
  // A player must never see the next question while the other is answering.
  // Local feedback may show first, but the new round is server-gated.
  const other=status.players.find(x=>x.id!==status.me);
  const unlocked=!!status.turnReady&&!!other&&qidx<=other.answered;
  const showReview=newReview()&&qidx>0&&qidx<count()&&
   (!unlocked||!status.turnStartsAt||now()<status.turnStartsAt);
  const newPhase=!status.ready?'waiting'
   :status.finished?'results'
   :qidx>=count()?'finished'
   :showReview?'review'
   :!newReview()&&Date.now()<feedbackUntil?'feedback'
   :!unlocked?'opponent'
   :now()<status.turnStartsAt?'countdown':'question';
  const viewKey=newPhase+'|'+qidx;
  if(viewKey===lastViewKey){refreshScoreboard();return;}
  lastViewKey=viewKey;phase=newPhase;
  const options=status.settings||{count:count(),seconds:25,type:'mixed'};
  const typeLabel={mixed:'맞춤법+사자성어',spelling:'맞춤법만',idiom:'사자성어만'};
  let html='<div class="mb-duel-panel"><p>친구 초대 코드 <strong class="mb-duel-code" id="mb-duel-code">'+esc(roomCode)+'</strong> <button id="mb-duel-copy" type="button">복사</button></p>'+
   '<p class="mb-duel-note">⚙ '+count()+'문제 · 문제당 '+options.seconds+'초 · '+esc(typeLabel[options.type]||'혼합')+'</p>';
  html+=scoreboard();
  if(newPhase==='waiting')html+='<p class="mb-duel-status" id="mb-duel-info">⏳ 아직 상대방이 입장하지 않았어. 둘 다 들어와야 시작돼!</p>';
  if(newPhase==='opponent')html+='<p class="mb-duel-status" id="mb-duel-info">⏳ 상대가 현재 문제를 제출할 때까지 대기 중이야. 둘 다 풀어야 다음 문제로 넘어가!</p><p class="mb-duel-note">상대방 진행 상황은 위 점수판에서 확인해 줘.</p>';
  if(newPhase==='countdown')html+='<section class="mb-duel-start-box" aria-label="대결 시작 카운트다운"><div class="mb-duel-start-label">⚔ 대결 시작까지</div>'+
   '<div id="mb-duel-countdown" class="mb-duel-start-number" role="timer">'+Math.max(0,Math.ceil((status.turnStartsAt-now())/1000))+'</div>'+
   '<div class="mb-duel-start-note">같은 문제를 동시에 시작해!</div></section>';
  if(newPhase==='question'){
   const q=MAP.get(status.questionIds[qidx]);
   if(!q){html+='<p id="mb-duel-info">문제를 불러오지 못했어.</p>'}
   else{
    const title=q.type==='idiom'?'📖 다음 뜻에 해당하는 사자성어를 골라 줘.':'✏️ 빈칸에 들어갈 맞는 표현을 골라 줘.';
    const question=q.type==='idiom'?q.meaning:q.prompt;
    html+='<p><strong>문제 '+(qidx+1)+' / '+count()+'</strong> · '+(q.type==='idiom'?'사자성어':'프린트 맞춤법')+'</p><p id="mb-duel-clock" class="mb-duel-clock">⏱ '+(duration()/1000).toFixed(1)+'초</p>'+
    '<p id="mb-duel-rival-notice" role="status" aria-live="polite" class="mb-rival-alert" hidden></p>'+
    '<h3>'+esc(title)+'</h3><p style="font-size:clamp(17px,2.1vw,23px);font-weight:900">'+esc(question)+'</p><div class="mb-duel-option-list">'+opts(q,qidx).map(value=>'<button type="button" data-duel-answer="'+esc(value)+'">'+esc(value)+'</button>').join('')+'</div><p class="mb-duel-note">빠르게 맞힐수록 최대 10점. 상대가 먼저 제출하면 남은 시간은 2배 속도로 감소!</p>';
   }
  }
  if(newPhase==='review'){
   const info=reviewInfo();
   const good=info?.own?.correct??feedback?.correct;
   const points=info?.own?.points??feedback?.points??0;
   html+='<section class="mb-duel-review" aria-label="문제 풀이 후 대기">'+
    '<p class="mb-duel-result '+(good?'good':'bad')+'">'+(good?'✔ 정답! +'+points+'점':'✖ 오답! 0점')+'</p>'+
    '<div id="mb-duel-review-clock" class="mb-duel-review-clock" role="timer"></div>'+
    '<p id="mb-duel-review-status" class="mb-duel-review-status" aria-live="polite"></p>'+
    '<button type="button" id="mb-duel-next-ready">⚡ 바로 다음 문제로 넘어가기 동의</button>'+
    '<p class="mb-duel-note">기본은 둘 다 답을 고른 뒤 5초 후 자동 진행! 둘 다 동의하면 바로 넘어가.</p></section>';
  }
  if(newPhase==='feedback'){const good=feedback?.correct;html+='<p class="mb-duel-result '+(good?'good':'bad')+'">'+(good?'✔ 정답! +'+feedback.points+'점':'✖ 아쉬워! 0점')+'</p><p>다음 문제로 넘어가는 중...</p>'}
  if(newPhase==='finished')html+='<p class="mb-duel-status">✅ '+count()+'문제를 모두 풀었어! 상대가 마칠 때까지 기다리고 있어.</p>';
  if(newPhase==='results'){
   const players=[...status.players].sort((a,b)=>b.score-a.score||b.correct-a.correct);
   const draw=players[0].score===players[1].score&&players[0].correct===players[1].correct;
   const win=players[0]?.id===status.me;
   html+='<h3>🏆 대결 종료!</h3><p class="mb-duel-result '+(win&&!draw?'good':'bad')+'">'+(draw?'🤝 무승부!':win?'🎉 승리!':'⚔ 다음에는 승리해 보자!')+'</p><p>최종 결과: '+esc(players[0].name)+' '+players[0].score+'점 / '+esc(players[1].name)+' '+players[1].score+'점</p>';
  }
  html+='<div class="mb-duel-actions"><button id="mb-duel-new" type="button">새 대결 / 코드 입력</button></div><p id="mb-duel-info" class="mb-duel-note" role="status">대결은 서버에서 채점돼. 동일한 문제를 각자 풀어!</p></div>';
  putHTML(html);
  updateOpponentSignal();
  refreshReview();
  dialog.querySelector('#mb-duel-next-ready')?.addEventListener('click',sendReady);
  dialog.querySelector('#mb-duel-copy')?.addEventListener('click',async()=>{
   try{await navigator.clipboard.writeText(roomCode);showError('방 코드가 복사됐어.')}catch(_){showError('복사가 제한됐어. 위 코드를 직접 알려 줘.')}
  });
  dialog.querySelector('#mb-duel-new')?.addEventListener('click',showLobby);
  dialog.querySelectorAll('[data-duel-answer]').forEach(btn=>btn.addEventListener('click',()=>sendAnswer(btn.dataset.duelAnswer)));
 }
 async function sendReady(){
  if(busy||!newReview()||phase!=='review'||!status?.answerTicket)return;
  const info=reviewInfo();
  if(!info||info.readyAt||!info.own)return;
  const room=roomCode,round=info.index;
  busy=true;
  const button=dialog.querySelector('#mb-duel-next-ready');
  if(button)button.disabled=true;
  try{
   const out=await api({action:'ready',code:room,index:round,
    answerTicket:status.answerTicket});
   if(!dialog.open||roomCode!==room)return;
   const me=status.players.find(p=>p.id===status.me);
   const mine=lastAnswer(me,round);
   if(!mine)return;
   mine.readyAt=out.readyAt;
   status.reviewReadyAt=out.readyAt;
   const other=lastOpponentSignal?.answers?.find(a=>a.index===round);
   const opponent=status.players.find(p=>p.id!==status.me);
   const otherAnswer=other||((opponent?.answered||0)>round
    ?{at:opponent.lastAt,readyAt:status.opponentReviewReadyAt}:null);
   if(otherAnswer&&me.answered<=opponent.answered){
    status.turnReady=true;
    status.turnStartsAt=reviewTurnAt(mine,otherAnswer);
   }
   showGame();
  }catch(e){
   const label=dialog.querySelector('#mb-duel-review-status');
   if(label)label.textContent='동의 전송 실패: '+e.message;
  }finally{
   busy=false;
   refreshReview();
  }
 }
 async function sendAnswer(answer){
  if(busy||!roomCode||!status?.ready||!status.turnReady)return;
  const me=status.players.find(x=>x.id===status.me);
  const opponent=status.players.find(x=>x.id!==status.me);
  if(!me||!opponent||me.answered>opponent.answered||
     me.answered>=count()||now()<status.turnStartsAt)return;
  busy=true;
  dialog.querySelectorAll('[data-duel-answer]').forEach(b=>b.disabled=true);
  try{
   const out=await api({action:'answer',code:roomCode,index:me.answered,answer,
    answerTicket:status.answerTicket||undefined});
   feedback=out;feedbackUntil=Date.now()+1050;lastViewKey='';
   // Use the server response for the local score immediately, no extra round-trip.
   me.answered=out.index+1;
   me.score+=out.points;
   if(out.correct)me.correct++;
   me.lastAt=out.at||Date.now();
   status.reviewReadyAt=null;
   status.opponentReviewReadyAt=null;
   if(!Array.isArray(me.answers))me.answers=[];
   if(!me.answers.some(x=>x.index===out.index))
    me.answers.push({index:out.index,at:me.lastAt,correct:out.correct,points:out.points});
   // If the opponent already chose, both clients can open the next turn
   // immediately without waiting for the next full multi-Blob refresh.
   const opponentNow=status.players.find(x=>x.id!==status.me);
   if(opponentNow&&me.answered<=opponentNow.answered&&me.answered<count()){
    const index=me.answered-1;
    const theirs=lastOpponentSignal?.answers?.find(x=>x.index===index)?.at||
     opponentNow.lastAt;
    if(theirs){
     status.turnReady=true;
     const theirAnswer=lastOpponentSignal?.answers?.find(x=>x.index===index)||
      {at:theirs};
     status.opponentReviewReadyAt=Number(theirAnswer.readyAt)||null;
     status.turnStartsAt=newReview()
      ?reviewTurnAt(lastAnswer(me,index),theirAnswer)
      :Math.max(me.lastAt,theirs)+1500;
    }else{
     status.turnReady=false;status.turnStartsAt=null;
    }
   }else{
    status.turnReady=false;
    status.turnStartsAt=null;
   }
   status.opponentAnswered=!!opponentNow&&opponentNow.answered>me.answered;
   status.opponentAnsweredAt=status.opponentAnswered?opponentNow.lastAt:null;
   status.finished=status.players.every(p=>p.answered>=count());
   showGame();
  }catch(e){lastViewKey='';showError('답변 처리 실패: '+e.message);await updateRoom()}finally{busy=false}
 }
 function tick(){
  if(!dialog.open||!roomCode||!status||document.hidden)return;
  if(phase==='countdown'){
   const left=Math.max(0,Math.ceil((status.turnStartsAt-now())/1000));
   const el=dialog.querySelector('#mb-duel-countdown');
   if(el&&el.textContent!==String(left))el.textContent=String(left);
   if(left<=0){lastViewKey='';showGame()}
  }else if(phase==='question'){
   const ms=remaining(),el=dialog.querySelector('#mb-duel-clock');
   if(el){el.textContent='⏱ '+(ms/1000).toFixed(1)+'초';el.classList.toggle('low',ms<7000);el.classList.toggle('mb-duel-rival-fast',!!status.opponentAnswered)}
   updateOpponentSignal();
   if(ms<=0&&!busy)sendAnswer('');
  }else if(phase==='review'){
   refreshReview();
   if(status.turnReady&&status.turnStartsAt&&now()>=status.turnStartsAt){
    lastViewKey='';feedback=null;showGame();
   }
  }else if(phase==='feedback'&&Date.now()>=feedbackUntil){lastViewKey='';feedback=null;showGame()}
 }
 // Fast opponent signals are deliberately small and serial (no overlapping
 // requests); full room state is reconciled much less often.
 function signalDelay(){
  if(!dialog.open||!roomCode||document.hidden)return 1400;
  if(signalFailures>3)return 2600;
  if(phase==='question'||phase==='opponent'||phase==='review')return 350;
  if(phase==='countdown'||phase==='feedback')return 500;
  if(phase==='waiting')return 580;
  if(phase==='finished')return 650;
  return 2200;
 }
 function fullDelay(){
  if(!dialog.open||!roomCode||document.hidden)return 4000;
  if(status?.signalTicket&&signalFailures<2)
   return phase==='results'?14000:6500;
  return phase==='waiting'?1000:1300;
 }
 async function backgroundPoll(){
  if(dialog.open&&roomCode&&!document.hidden&&!busy)await updateRoom();
  fullTimer=setTimeout(backgroundPoll,fullDelay());
 }
 async function signalPoll(){
  if(dialog.open&&roomCode&&!document.hidden&&!busy)await checkSignal();
  fastTimer=setTimeout(signalPoll,signalDelay());
 }
 let fullTimer=setTimeout(backgroundPoll,900);
 let fastTimer=setTimeout(signalPoll,520);
 window.addEventListener('pagehide',()=>{
  clearTimeout(fullTimer);clearTimeout(fastTimer);
 },{once:true});
 setInterval(tick,210);
})();

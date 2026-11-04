/* Online server-graded nickname accounts and shared leaderboard. */
(()=>{
 'use strict';
 if(window.__mbOnlineV1)return;
 window.__mbOnlineV1=true;
 const $=id=>document.getElementById(id);
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let me=null,run=null,chain=Promise.resolve(),failed='',active=false,lastQ=null,statusText='';
 const style=document.createElement('style');style.id='mb-online-css';style.textContent="\n#mb-online-modal{box-sizing:border-box;width:min(93vw,680px);max-height:84vh;overflow:auto;padding:20px;border:4px double #976a54;border-radius:18px;background:#fff0d9;color:#412b28;box-shadow:0 16px 55px #160e1a99}\n#mb-online-modal::backdrop{background:#130d18bf}\n#mb-online-modal h2{margin:0 0 12px;font-size:clamp(21px,3vw,28px)}\n#mb-online-modal label{display:block;font-weight:800;margin-top:12px}\n#mb-online-modal input,#mb-online-modal textarea{box-sizing:border-box;display:block;width:100%;max-width:100%;padding:10px;border:2px solid #b78f73;border-radius:10px;background:#fffaf2;color:#3d2825;margin-top:6px;font:inherit}\n#mb-online-modal button{display:inline-block;margin:8px 6px 5px 0;min-height:44px;padding:10px 14px;border:2px solid #8f6550;border-radius:10px;background:#f4d1b0;color:#402825;font-weight:850;cursor:pointer}\n#mb-online-modal .mb-tip{font-size:13px;color:#765348;line-height:1.55}\n#mb-online-modal table{width:100%;border-collapse:collapse;font-size:clamp(12px,1.2vw,15px)}\n#mb-online-modal th,#mb-online-modal td{padding:8px 5px;text-align:left;border-bottom:1px solid #dab79a}\n#mb-online-status{margin:12px 0;padding:11px;border:3px solid #bd9c75;border-radius:12px;background:#ffecd2;color:#512d29;font-size:14px;font-weight:850}\n";
 document.head.append(style);
 const modal=document.createElement('dialog');modal.id='mb-online-modal';document.body.append(modal);
 async function api(url,data){
  const res=await fetch(url,{method:data?'POST':'GET',headers:data?{'Content-Type':'application/json'}:{},credentials:'same-origin',body:data?JSON.stringify(data):undefined});
  const out=await res.json().catch(()=>({}));
  if(!res.ok)throw Error(out.error||'서버에 연결할 수 없어.');return out;
 }
 function open(body){
  modal.innerHTML='<button id="mb-online-close" style="float:right" type="button">✕ 닫기</button>'+body;
  $('mb-online-close')?.addEventListener('click',()=>modal.close());
  if(!modal.open)modal.showModal();
 }
 function refreshButtons(){
  if($('mb-account-open'))$('mb-account-open').textContent='👤 '+(me?.name||'온라인 로그인');
  if($('mb-rank-open'))$('mb-rank-open').textContent='🌐 온라인 랭킹';
 }
 api('/api/account').then(x=>{me=x.loggedIn?x:null;refreshButtons()}).catch(()=>refreshButtons());
 function account(){
  if(me){
   open('<h2>👤 온라인 계정</h2><p><strong>'+esc(me.name)+'</strong> 님 로그인 중</p><p class="mb-tip">복구 코드는 본인만 보관해 줘. 다른 기기에서 로그인할 때 필요해.</p><button id="mb-online-logout">로그아웃</button>');
   $('mb-online-logout')?.addEventListener('click',async()=>{try{await api('/api/account',{action:'logout'});me=null;refreshButtons();modal.close()}catch(e){alert(e.message)}});
   return;
  }
  open('<h2>👤 닉네임 계정</h2><p class="mb-tip">이메일이나 비밀번호는 받지 않아. 다른 기기에서 로그인하려면 발급받은 복구 코드를 안전하게 보관해야 해.</p><label>새 닉네임<input id="mb-new-name" maxlength="12" placeholder="2~12자"></label><button id="mb-create-account">새 계정 만들기</button><hr><label>기존 계정 복구 코드<input id="mb-recovery-code" autocomplete="off" spellcheck="false" placeholder="복구 코드 입력"></label><button id="mb-login-account">코드로 로그인</button><p id="mb-account-error" role="status"></p>');
  const msg=$('mb-account-error');
  $('mb-create-account')?.addEventListener('click',async()=>{
   msg.textContent='계정 생성 중...';
   try{
    const x=await api('/api/account',{action:'register',name:$('mb-new-name').value});
    me=x;refreshButtons();
    try{localStorage.setItem('mb_local_player_v1',JSON.stringify({name:x.name}))}catch(_){}
    open('<h2>✅ 온라인 계정 생성</h2><p>복구 코드는 한 번만 표시돼. 다른 사람에게 공유하지 말고 직접 보관해 줘.</p><textarea id="mb-new-code" rows="3" readonly>'+esc(x.recoveryCode)+'</textarea><p class="mb-tip">분실하면 다른 기기에서 이 계정으로 로그인할 수 없어.</p><button id="mb-copy-code">코드 복사</button><button id="mb-accept-account">확인</button>');
    $('mb-copy-code')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(x.recoveryCode)}catch(_){$('mb-new-code')?.select()}});
    $('mb-accept-account')?.addEventListener('click',()=>modal.close());
   }catch(e){msg.textContent=e.message}
  });
  $('mb-login-account')?.addEventListener('click',async()=>{
   msg.textContent='로그인 중...';
   try{
    const x=await api('/api/account',{action:'login',code:$('mb-recovery-code').value});
    me=x;refreshButtons();
    try{localStorage.setItem('mb_local_player_v1',JSON.stringify({name:x.name}))}catch(_){}
    modal.close();
   }catch(e){msg.textContent=e.message}
  });
 }
 function leaderboard(){
  open('<h2>🏆 온라인 하드 랭킹</h2><p class="mb-tip">서버에서 정답과 답변 시간을 다시 계산하며 계정별 최고 점수만 표시해.</p><div id="mb-online-list">랭킹을 불러오는 중...</div>');
  api('/api/leaderboard').then(x=>{
   const el=$('mb-online-list');if(!el)return;
   const list=Array.isArray(x.scores)?x.scores:[];
   el.innerHTML=list.length?'<table><tr><th>#</th><th>닉네임</th><th>점수</th><th>정답</th></tr>'+list.slice(0,30).map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+esc(r.name)+'</td><td>'+Math.max(0,Number(r.score)||0)+'</td><td>'+Math.max(0,Number(r.correct)||0)+'</td></tr>').join('')+'</table>':'<p>아직 온라인 기록이 없어. 첫 하드모드 기록을 남겨 봐!</p>';
  }).catch(e=>{if($('mb-online-list'))$('mb-online-list').textContent=e.message});
 }
 document.addEventListener('click',event=>{
  const b=event.target.closest?.('#mb-account-open,#mb-rank-open,#mb-hard-leaderboard');
  if(!b)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(b.id==='mb-account-open')account();else leaderboard();
 },true);
 function status(text){
  statusText=text;
  const view=$('view-result'),panel=view?.querySelector('.panel');
  if(!panel)return;
  let p=$('mb-online-status');
  if(!p){p=document.createElement('p');p.id='mb-online-status';panel.append(p)}
  p.textContent=text;
 }
 function submit(action,fields={}){
  chain=chain.then(async()=>{
   if(failed)return;
   const out=await api('/api/score',{action,...fields,...(action==='start'?{}:{run})});
   if(out.run)run=out.run;
   if(out.ended)status('🌐 온라인 랭킹 등록 완료! 서버 점수 '+out.score+'점 / '+out.answers+'문제');
  }).catch(e=>{failed=e.message;status('오프라인 기록은 유지돼. 온라인 기록: '+e.message)});
 }
 const start=window.startSession,render=window.renderQuestion,judge=window.judge,finish=window.finishSession;
 if(![start,render,judge,finish].every(x=>typeof x==='function'))return;
 window.startSession=function(...args){
  const prior=store.active;const output=start.apply(this,args);const a=store.active;
  if(a&&a!==prior&&a.cfg?.hard){
   run=null;failed='';active=true;lastQ=current()?.id;chain=Promise.resolve();
   statusText='🌐 온라인 검증 진행 중...';
   submit('start',{qid:lastQ});
  }
  return output;
 };
 window.renderQuestion=function(...args){
  const output=render.apply(this,args);
  const q=active&&store.active?.cfg?.hard?current():null;
  if(q&&q.id!==lastQ){lastQ=q.id;submit('next',{qid:q.id})}
  return output;
 };
 window.judge=function(answer){
  const a=store.active,q=active&&a?.cfg?.hard&&!a.lastFeedback?current():null;
  const output=judge.apply(this,arguments);
  if(q){
   submit('answer',{qid:q.id,answer:String(answer??''),form:q.form});
   if(a.lastFeedback&&!a.lastFeedback.good)active=false;
  }
  return output;
 };
 window.finishSession=function(...args){
  const a=store.active;const output=finish.apply(this,args);
  if(a?.cfg?.hard){active=false;status(statusText||'🌐 온라인 검증 중...')}
  return output;
 };
})();

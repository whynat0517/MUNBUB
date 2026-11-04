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
  modal.classList.toggle('mb-ranking-modal',body.includes('mb-ranking-board'));
  modal.innerHTML='<button id="mb-online-close" style="float:right" type="button">✕ 닫기</button>'+body;
  $('mb-online-close')?.addEventListener('click',()=>modal.close());
  if(!modal.open)modal.showModal();
 }
 function refreshButtons(){
  const btn=$('mb-account-open');
  const logged=!!me?.name;
  if(btn){
   btn.classList.toggle('mb-account-logged',logged);
   btn.dataset.accountName=logged?me.name:'';
   btn.setAttribute('aria-label',logged?me.name+' 계정 열기':'온라인 로그인');
   btn.replaceChildren();
   if(logged){
    const span=document.createElement('span');
    span.className='mb-account-name';
    span.textContent=me.name;
    btn.append(span);
    const fit=()=>{
     if(!btn.isConnected)return;
     const width=Math.max(70,btn.clientWidth*.72);
     const cv=document.createElement('canvas'),ctx=cv.getContext('2d');
     let px=Math.min(28,Math.max(13,btn.clientWidth*.16));
     if(ctx){
      for(;px>10;px--){
       ctx.font='900 '+px+'px sans-serif';
       if(ctx.measureText(me.name).width<=width)break;
      }
     }
     if(btn.clientWidth<166 && Array.from(me.name).length>=8){
      // Compact mobiles: use two readable lines rather than tiny 10px text.
      span.style.setProperty('white-space','normal','important');
      span.style.setProperty('overflow-wrap','anywhere','important');
      span.style.setProperty('line-height','1.08','important');
      span.style.setProperty('font-size',Math.round(Math.max(12,btn.clientWidth*.097))+'px','important');
      span.style.setProperty('max-height','2.3em','important');
     }else{
      span.style.setProperty('white-space','nowrap','important');
      span.style.setProperty('font-size',Math.round(px)+'px','important');
     }
    };
    requestAnimationFrame(fit);
    btn.__mbResizeObserver?.disconnect();
    if(typeof ResizeObserver!=='undefined'){
     btn.__mbResizeObserver=new ResizeObserver(fit);
     btn.__mbResizeObserver.observe(btn);
    }
   }else{
    btn.textContent='👤 온라인 로그인';
    btn.__mbResizeObserver?.disconnect();
   }
  }
  if($('mb-rank-open'))$('mb-rank-open').textContent='🌐 온라인 랭킹';
 }
 api('/api/account').then(x=>{me=x.loggedIn?x:null;refreshButtons()}).catch(()=>refreshButtons());
 function account(){
  if(me){
   if(me.needsPassword){
    open('<h2>🔐 기존 계정 전환</h2><p>이 계정은 복구 코드 방식으로 만들어졌어. 이제 닉네임과 비밀번호로 로그인할 수 있게 변경해 줘.</p><form id="mb-account-upgrade"><label>사용할 닉네임<input id="mb-upgrade-name" maxlength="12" autocomplete="username" value="'+esc(me.name)+'" required></label><label>새 비밀번호 (8자 이상)<input id="mb-upgrade-pass" type="password" minlength="8" maxlength="72" autocomplete="new-password" required></label><button type="submit">🔐 비밀번호 계정으로 전환</button></form><p id="mb-upgrade-message" role="status"></p><button id="mb-online-logout" type="button">로그아웃</button>');
    $('mb-account-upgrade')?.addEventListener('submit',async ev=>{
     ev.preventDefault();
     const msg=$('mb-upgrade-message');
     msg.textContent='계정 전환 중...';
     try{
      me=await api('/api/account',{action:'upgrade',name:$('mb-upgrade-name').value,password:$('mb-upgrade-pass').value});
      refreshButtons();modal.close();
     }catch(e){msg.textContent=e.message}
    });
   }else{
    open('<h2>👤 온라인 계정</h2><p><strong>'+esc(me.name)+'</strong> 님, 닉네임과 비밀번호로 로그인 중이야.</p><p class="mb-tip">비밀번호를 다른 사람에게 알려 주지 마. 재설정 기능은 아직 준비되지 않았어.</p><button id="mb-online-logout">로그아웃</button>');
   }
   $('mb-online-logout')?.addEventListener('click',async()=>{try{await api('/api/account',{action:'logout'});me=null;refreshButtons();modal.close()}catch(e){alert(e.message)}});
   return;
  }
  open('<h2>👤 맛춘범 로그인</h2><p class="mb-tip">닉네임과 비밀번호로 로그인해. 닉네임은 다른 사람과 중복할 수 없어.</p><form id="mb-login-form"><label>닉네임<input id="mb-login-name" maxlength="12" autocomplete="username" required></label><label>비밀번호<input id="mb-login-password" type="password" autocomplete="current-password" maxlength="72" required></label><button type="submit">🔓 로그인</button></form><hr><h3>새 계정 만들기</h3><form id="mb-register-form"><label>새 닉네임 (2~12자)<input id="mb-new-name" maxlength="12" minlength="2" autocomplete="off" required></label><label>비밀번호 (8자 이상)<input id="mb-new-password" type="password" minlength="8" maxlength="72" autocomplete="new-password" required></label><label>비밀번호 확인<input id="mb-new-password-check" type="password" minlength="8" maxlength="72" autocomplete="new-password" required></label><button type="submit">➕ 계정 만들기</button></form><details><summary style="cursor:pointer;margin-top:10px;font-weight:800">이전 복구 코드 계정으로 로그인</summary><p class="mb-tip">예전에 만든 계정은 기존 복구 코드로 들어간 뒤 새 비밀번호를 설정할 수 있어.</p><form id="mb-legacy-form"><input id="mb-legacy-code" autocomplete="off" spellcheck="false" placeholder="예전 복구 코드" required><button type="submit">기존 계정 열기</button></form></details><p id="mb-account-error" role="status" aria-live="polite"></p>');
  const msg=$('mb-account-error');
  function savePlayer(x){
   me=x;refreshButtons();
   try{localStorage.setItem('mb_local_player_v1',JSON.stringify({name:x.name}))}catch(_){}
   modal.close();
  }
  $('mb-login-form')?.addEventListener('submit',async e=>{
   e.preventDefault();msg.textContent='로그인 중...';
   try{savePlayer(await api('/api/account',{action:'login',name:$('mb-login-name').value,password:$('mb-login-password').value}))}
   catch(err){msg.textContent=err.message}
  });
  $('mb-register-form')?.addEventListener('submit',async e=>{
   e.preventDefault();
   if($('mb-new-password').value!==$('mb-new-password-check').value){msg.textContent='비밀번호 확인이 일치하지 않아.';return}
   msg.textContent='닉네임 중복 확인 및 계정 생성 중...';
   try{savePlayer(await api('/api/account',{action:'register',name:$('mb-new-name').value,password:$('mb-new-password').value}))}
   catch(err){msg.textContent=err.message}
  });
  $('mb-legacy-form')?.addEventListener('submit',async e=>{
   e.preventDefault();msg.textContent='기존 계정 확인 중...';
   try{
    const legacy=await api('/api/account',{action:'recovery',code:$('mb-legacy-code').value});
    me=legacy;refreshButtons();account();
   }catch(err){msg.textContent=err.message}
  });
 }
 function leaderboard(){
  open('<h2 class="mb-ranking-heading">🏆 온라인 하드 랭킹</h2><p class="mb-tip">서버에서 정답과 답변 시간을 계산하며 계정별 최고 점수만 표시해.</p><div class="mb-ranking-board"><div id="mb-online-list" class="mb-ranking-rows" role="status">랭킹을 불러오는 중...</div></div>');
  api('/api/leaderboard').then(x=>{
   const el=$('mb-online-list');if(!el)return;
   const list=Array.isArray(x.scores)?x.scores:[];
   el.innerHTML=list.length?list.slice(0,30).map((r,i)=>'<div class="mb-board-row"><span>'+(i+1)+'</span><span>'+esc(r.name)+'</span><span>'+Math.max(0,Number(r.score)||0)+'</span></div>').join(''):'<p class="mb-board-empty">아직 온라인 기록이 없어. 첫 하드모드 기록을 남겨 봐!</p>';
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

/* 맛춘범 홈 배치 & 모든 화면의 단일 모드 네비게이션 */
(()=>{
 'use strict';
 if(window.__mbNavLayout2026)return;
 window.__mbNavLayout2026=true;
 const $=id=>document.getElementById(id);
 const style=document.createElement('style');
 style.id='mb-nav-layout-2026';
 style.textContent=[
  '#homeScreen .mb-home-dashboard>.mb-mascot-stage{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:clamp(7px,1vw,12px)!important;width:min(100%,552px)!important;height:auto!important;min-height:0!important;aspect-ratio:auto!important;align-self:start!important}',
  '#homeScreen .mb-home-dashboard>.mb-mascot-stage>.hero-character.mb-mascot-animated{display:block!important;flex:none!important;position:relative!important;width:100%!important;height:auto!important;aspect-ratio:1!important;object-fit:contain!important}',
  '#homeScreen .mb-mascot-stage>.mb-online-actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:clamp(7px,1vw,13px)!important;position:relative!important;z-index:8!important;box-sizing:border-box!important;width:100%!important;margin:0!important;padding:0!important;pointer-events:auto!important}',
  '#homeScreen .mb-mascot-stage>.mb-online-actions button{box-sizing:border-box!important;display:grid!important;place-items:center!important;min-width:0!important;min-height:54px!important;margin:0!important;padding:8px!important;border:4px double #9e6b55!important;border-radius:13px!important;background:linear-gradient(180deg,#fff3d9,#deb28d)!important;color:#432727!important;box-shadow:inset 0 0 0 2px #fff8eb,0 4px 0 #3b2428!important;font-size:clamp(12px,1.25vw,18px)!important;font-weight:950!important;line-height:1.25!important;word-break:keep-all!important;cursor:pointer!important;transition:transform .15s,filter .15s}',
  '#homeScreen .mb-mascot-stage>.mb-online-actions button:hover{transform:translateY(-3px)!important;filter:brightness(1.08)}',
  '#homeScreen .mb-mascot-stage>.mb-online-actions button:active{transform:translateY(1px)!important;filter:brightness(.95)}',
  '.sidebar-nav .mb-hard-nav,.mobile-drawer .mb-hard-nav{box-sizing:border-box!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;width:100%!important;min-height:76px!important;padding:9px 5px!important;border:4px double #9e7156!important;border-radius:12px!important;background:linear-gradient(180deg,#fff0d1,#d8ac8b)!important;box-shadow:inset 0 0 0 2px #fff8e7,0 4px 0 #3e262b!important;color:#40272b!important;font-size:clamp(15px,1.55vw,22px)!important;font-weight:950!important;line-height:1.2!important;text-align:center!important;cursor:pointer;transition:transform .15s,filter .15s}',
  '.sidebar-nav .mb-hard-nav small,.mobile-drawer .mb-hard-nav small{display:block!important;font-size:clamp(10px,.95vw,13px)!important;font-weight:750!important;white-space:normal!important;line-height:1.25!important}',
  '.sidebar-nav .mb-hard-nav.locked,.mobile-drawer .mb-hard-nav.locked{filter:grayscale(.65);opacity:.77}',
  '.sidebar-nav .mb-hard-nav.active,.mobile-drawer .mb-hard-nav.active{background:linear-gradient(180deg,#d8b08a,#b38c72)!important;filter:brightness(.8)!important;outline:3px solid #e1aa77!important;outline-offset:-3px!important;transform:scale(.98)!important}',
  '.sidebar-nav .navbtn.active:not(.mb-hard-nav),.mobile-drawer .navbtn.active:not(.mb-hard-nav),.mobile-bottom [data-route].active{filter:brightness(.78)!important}',
  '@media(max-width:700px){#homeScreen .mb-home-dashboard>.mb-mascot-stage{width:100%!important;max-width:100%!important;gap:7px!important}#homeScreen .mb-mascot-stage>.mb-online-actions{grid-template-columns:minmax(0,1fr)!important;gap:6px!important}#homeScreen .mb-mascot-stage>.mb-online-actions button{min-height:42px!important;padding:5px 2px!important;font-size:clamp(10px,2.35vw,14px)!important;border-width:3px!important} .sidebar-nav .mb-hard-nav,.mobile-drawer .mb-hard-nav{min-height:60px!important;font-size:17px!important}}',
  '@media(prefers-reduced-motion:reduce){#homeScreen .mb-mascot-stage>.mb-online-actions button,.sidebar-nav .mb-hard-nav,.mobile-drawer .mb-hard-nav{transition:none!important}}'
 ].join('\n');
 document.head.append(style);
 // Move online buttons below the home mascot; don't clone (their IDs and listeners must stay unique).
 const stage=document.querySelector('#homeScreen .mb-mascot-stage');
 const onlineRow=document.querySelector('#homeScreen .mb-online-actions');
 if(stage && onlineRow)stage.append(onlineRow);
 // Move the original hard button to the main left navigation, and mirror it
 // across the separate learning/mobile sidebars.
 const primary=document.querySelector('.mb-hard-button');
 const hardButtons=[];
 document.querySelectorAll('.sidebar-nav,.mobile-drawer').forEach(sidebar=>{
  if(sidebar.querySelector('[data-route="hard"]'))return;
  const anchor=sidebar.querySelector('[data-route="timed"]')||sidebar.querySelector('[data-route="infinite"]');
  if(!anchor)return;
  const button=hardButtons.length===0 && primary?primary:document.createElement('button');
  button.type='button';
  button.className='navbtn mb-hard-nav';
  button.dataset.route='hard';
  button.setAttribute('aria-label','하드코어 모드');
  button.title='하드코어 모드';
  if(button!==primary && primary){
   button.innerHTML=primary.innerHTML;
   button.classList.toggle('locked',primary.classList.contains('locked'));
  }
  anchor.after(button);
  hardButtons.push(button);
 });
 // Hide the legacy local ranking entirely; only live server ranking remains.
 document.querySelectorAll('#mb-hard-account').forEach(el=>el.remove());
 function syncHard(){
  if(!primary)return;
  for(const btn of hardButtons){
   if(btn===primary)continue;
   btn.innerHTML=primary.innerHTML;
   btn.classList.toggle('locked',primary.classList.contains('locked'));
  }
 }
 if(primary)new MutationObserver(syncHard).observe(primary,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
 let selected='home';
 const tracked=new Set(['home','spelling','idiom','application','infinite','timed','hard','mistakes','history','settings']);
 function paint(){
  for(const btn of document.querySelectorAll('.sidebar-nav [data-route],.mobile-drawer [data-route],.mobile-bottom [data-route]')){
   const active=btn.dataset.route===selected;
   btn.classList.toggle('active',active);
   btn.setAttribute('aria-current',active?'page':'false');
   if(btn.dataset.route==='hard')btn.setAttribute('aria-pressed',String(active));
  }
 }
 function selectRoute(route){
  if(tracked.has(route))selected=route;
  paint();
 }
 const oldNav=window.navigate,oldSetup=window.openModeSetup,oldStart=window.startSession,oldRender=window.renderQuestion,oldFinish=window.finishSession;
 if(typeof oldNav!=='function'||typeof oldSetup!=='function')return;
 window.openModeSetup=function(m){
  const out=oldSetup.apply(this,arguments);
  if(m!=='hard'||!primary?.classList.contains('locked'))selectRoute(m);
  return out;
 };
 window.navigate=function(route){
  const out=oldNav.apply(this,arguments);
  if(route!=='hard'||!primary?.classList.contains('locked'))selectRoute(route);
  else paint();
  return out;
 };
 if(typeof oldStart==='function')window.startSession=function(){
  const out=oldStart.apply(this,arguments);paint();return out;
 };
 if(typeof oldRender==='function')window.renderQuestion=function(){
  const out=oldRender.apply(this,arguments);paint();return out;
 };
 if(typeof oldFinish==='function')window.finishSession=function(){
  const out=oldFinish.apply(this,arguments);paint();return out;
 };
 // Keep the selected special mode when the base engine opens its generic
 // spelling setup/quiz/result internally. Only a click on an actual mode menu
 // changes the selected mode, not selecting a question category.
 window.__mbSelectedMenu=()=>selected;
 paint();
})();

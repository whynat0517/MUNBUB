/* Tasteful, single-player music controller.
   Keeps playback position for equal music URLs even when modes change;
   preserves old and new BGM, and exposes a home-track selector in Settings.
*/
(()=>{
 'use strict';
 if(window.__mbBgm2026v3)return;
 if(typeof bgmPlayer==='undefined'||!bgmPlayer)return;
 window.__mbBgm2026v3=true;
 const audio=bgmPlayer;
 const HOME_TRACKS=[
  {id:'new',label:'새 메인 배경음악',path:'assets/bgm/home-new.mp3'},
  {id:'original',label:'기존 메인 배경음악',path:'assets/bgm/main.mp3'},
  {id:'pixel',label:'Pixel Confetti Rush',path:'assets/bgm/spelling-new.mp3'},
  {id:'harbor',label:'Harbor View Drive',path:'assets/bgm/idiom-new.mp3'}
 ];
 const TRACKS={
  spelling:{label:'Pixel Confetti Rush',path:'assets/bgm/spelling-new.mp3'},
  idiom:{label:'Harbor View Drive',path:'assets/bgm/idiom-new.mp3'},
  hardcore:{label:'하드코어 BGM',path:'assets/bgm/hardcore-new.mp3'},
  duel:{label:'1대1 대전 BGM',path:'assets/bgm/duel-new.mp3'}
 };
 const STORAGE='matchunbeom_home_bgm_choice_v1';
 const $=id=>document.getElementById(id);
 let homeChoice='new',wantedUrl='',duelObserver=null,updating=false,wasEnabled=false;
 try{const stored=localStorage.getItem(STORAGE);if(HOME_TRACKS.some(t=>t.id===stored))homeChoice=stored}catch(_){}
 const toURL=path=>new URL(path,document.baseURI).href;
 const inDuel=()=>!!$('mb-duel-dialog')?.open;
 function currentMode(){
  if(inDuel())return 'duel';
  let view='home';
  try{view=typeof section!=='undefined'?section:'home'}catch(_){}
  if(view==='home')return 'home';
  const active=typeof store!=='undefined'?store.active:null;
  const route=window.__mbSelectedMenu?.();
  if((route==='hard'||active?.cfg?.hard)&&view!=='home')return 'hardcore';
  let category=active?.cfg?.category;
  if(view==='setup')category=$('categorySelect')?.value||category;
  if(category==='idiom'||view==='idiom'||(route==='idiom'&&view!=='quiz'))return 'idiom';
  if(['quiz','setup','result','mistakes','spelling','application','idiom','infinite','timed'].includes(view))return 'spelling';
  return 'home';
 }
 function desired(){
  const m=currentMode();
  return m==='home'?HOME_TRACKS.find(t=>t.id===homeChoice)||HOME_TRACKS[0]:TRACKS[m]||TRACKS.spelling;
 }
 function showLabel(t){
  const el=$('bgmNowPlaying');
  if(el)el.textContent=(typeof bgmEnabled!=='undefined'&&!bgmEnabled)?'배경음악 꺼짐':'선택된 곡: '+t.label;
 }
 function refreshControls(){
  const on=!!(typeof bgmEnabled!=='undefined'&&bgmEnabled);
  const pressed=String(on);
  const main=$('bgmToggle'),quick=$('bgmQuick');
  if(main){
   if(main.getAttribute('aria-pressed')!==pressed)main.setAttribute('aria-pressed',pressed);
   const text=on?'🔊 음악 끄기':'🔇 음악 켜기';
   if(main.textContent!==text)main.textContent=text;
  }
  if(quick){
   if(quick.getAttribute('aria-pressed')!==pressed)quick.setAttribute('aria-pressed',pressed);
   const text=on?'♫':'♪̸';
   if(quick.textContent!==text)quick.textContent=text;
   quick.setAttribute('aria-label',on?'배경음악 끄기':'배경음악 켜기');
  }
  const vol=$('bgmVolume');
  if(vol&&typeof bgmVolume!=='undefined'){
   const number=String(Math.round(bgmVolume*100));
   if(vol.value!==number)vol.value=number;
   const label=$('bgmVolumeText');
   if(label&&label.textContent!==number+'%')label.textContent=number+'%';
  }
 }
 function update(){
  if(updating)return;
  updating=true;
  try{
   refreshControls();
   const t=desired(),url=toURL(t.path);
   const playingAllowed=!!(typeof bgmEnabled!=='undefined'&&bgmEnabled&&typeof bgmArmed!=='undefined'&&bgmArmed&&!document.hidden);
   showLabel(t);
   audio.loop=true;
   if(typeof bgmVolume!=='undefined')audio.volume=bgmVolume;
   // Change sources ONLY when the actual music file changes. This avoids
   // restarting e.g. spelling -> infinite -> timed (same music).
   if(wantedUrl!==url){
    wantedUrl=url;
    if(audio.src!==url){
     audio.src=url;
     audio.load();
    }
   }
   if(!playingAllowed){
    if(!audio.paused)audio.pause();
    wasEnabled=false;
    return;
   }
   if(audio.paused){
    const promise=audio.play();
    if(promise?.catch)promise.catch(()=>{});
   }
   wasEnabled=true;
  }finally{updating=false}
 }
 function attachSelector(){
  const box=document.querySelector('#view-settings .bgm-settings');
  if(!box||$('mb-home-bgm-choice'))return;
  const wrap=document.createElement('div');
  wrap.className='mb-home-bgm-picker';
  const label=document.createElement('label');
  label.htmlFor='mb-home-bgm-choice';
  label.textContent='🏠 홈 화면 배경음악 선택';
  const select=document.createElement('select');
  select.id='mb-home-bgm-choice';
  select.setAttribute('aria-label','홈 화면 배경음악');
  for(const item of HOME_TRACKS){
   const option=document.createElement('option');
   option.value=item.id;option.textContent=item.label;
   select.append(option);
  }
  select.value=homeChoice;
  const tip=document.createElement('small');
  tip.textContent='기존 음악도 그대로 남아 있어. 같은 곡으로 모드를 이동하면 이어서 재생돼.';
  wrap.append(label,select,tip);
  box.append(wrap);
  select.addEventListener('change',()=>{
   homeChoice=select.value;
   try{localStorage.setItem(STORAGE,homeChoice)}catch(_){}
   update();
  });
 }
 const style=document.createElement('style');
 style.id='mb-music-v3-style';
 style.textContent=[
  '#view-settings .mb-home-bgm-picker{display:flex;flex-direction:column;align-items:flex-start;gap:8px;margin:13px 0 4px;padding:13px 15px;border:2px solid #b58b70;border-radius:11px;background:#f4dfc6;color:#422729}',
  '#view-settings .mb-home-bgm-picker label{font-weight:900;font-size:clamp(14px,1.5vw,18px)}',
  '#view-settings .mb-home-bgm-picker select{width:min(100%,390px);min-height:42px;padding:9px 12px;background:#fff7e9;color:#432c2a;border:2px solid #886452;border-radius:8px;font:inherit;font-size:15px}',
  '#view-settings .mb-home-bgm-picker small{font-size:12px;line-height:1.5;color:#71544c}'
 ].join('\n');
 document.head.append(style);
 // Core methods call global syncBgm() when switching sections, toggling
 // sound, or changing volume. Reuse the same Audio element and its timeline.
 if(typeof window.syncBgm==='function'){
  window.syncBgm=function(){update()};
 }
 function bindDuel(){
  const dialog=$('mb-duel-dialog');
  if(!dialog||duelObserver)return;
  duelObserver=new MutationObserver(update);
  duelObserver.observe(dialog,{attributes:true,attributeFilter:['open']});
 }
 attachSelector();
 bindDuel();
 const control=$('bgmToggle');
 if(control)new MutationObserver(()=>requestAnimationFrame(update)).observe(control,{attributes:true,attributeFilter:['aria-pressed']});
 document.addEventListener('pointerup',()=>requestAnimationFrame(update),{passive:true});
 document.addEventListener('keydown',()=>requestAnimationFrame(update),{passive:true});
 document.addEventListener('visibilitychange',update);
 const timer=setInterval(()=>{bindDuel();attachSelector();if(!document.hidden)update()},1250);
 window.addEventListener('pagehide',()=>{clearInterval(timer);duelObserver?.disconnect()},{once:true});
 update();
})();

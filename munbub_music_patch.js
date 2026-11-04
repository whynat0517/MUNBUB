/* Five creator-supplied full-length BGM tracks; one shared audio player.
 * Preserve the app's mute and volume controls and the browser gesture policy.
 */
(()=>{
 'use strict';
 if(window.__mbBgm2026v2)return;
 if(typeof bgmPlayer==='undefined'||!bgmPlayer)return;
 const audio=bgmPlayer;
 const native=Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,'src');
 if(!native?.set||!native?.get)return;
 window.__mbBgm2026v2=true;
 const TRACKS=Object.freeze({
  home:'assets/bgm/home-new.mp3',
  spelling:'assets/bgm/spelling-new.mp3',
  idiom:'assets/bgm/idiom-new.mp3',
  hardcore:'assets/bgm/hardcore-new.mp3',
  duel:'assets/bgm/duel-new.mp3'
 });
 const LABELS={home:'메인화면 BGM',spelling:'Pixel Confetti Rush',idiom:'Harbor View Drive',hardcore:'하드코어 BGM',duel:'1대1 대전 BGM'};
 let preferred='',duelObserver=null,refreshing=false;
 function inDuel(){return !!document.getElementById('mb-duel-dialog')?.open}
 function currentMode(){
  if(inDuel())return 'duel';
  let view='home';
  try{view=typeof section!=='undefined'?section:'home'}catch(_){}
  if(view==='home')return 'home';
  let route=window.__mbSelectedMenu?.();
  const active=typeof store!=='undefined'?store.active:null;
  if((route==='hard'||active?.cfg?.hard)&&view!=='home')return 'hardcore';
  let category=active?.cfg?.category;
  if(view==='setup')category=document.getElementById('categorySelect')?.value||category;
  if(category==='idiom'||route==='idiom'&&view!=='quiz')return 'idiom';
  if(['quiz','setup','result','mistakes'].includes(view))return 'spelling';
  return 'home';
 }
 function allowed(){
  try{return !!bgmEnabled&&!!bgmArmed&&!document.hidden}catch{return false}
 }
 const url=key=>new URL(TRACKS[key]||TRACKS.home,document.baseURI).href;
 function showLabel(key){
  const el=document.getElementById('bgmNowPlaying');
  if(!el)return;
  try{el.textContent=bgmEnabled?'선택된 곡: '+LABELS[key]:'배경음악 꺼짐'}catch(_){}
 }
 function setDesired(){
  const key=currentMode(),desired=url(key);
  preferred=key;
  if(native.get.call(audio)!==desired){
   native.set.call(audio,desired);
   audio.loop=true;
   audio.preload='auto';
  }
  showLabel(key);
  if(!allowed()){if(!audio.paused)audio.pause();return}
  if(audio.paused)audio.play().catch(()=>{});
 }
 // Existing syncBgm continues to manage play/pause/volume, but it can no
 // longer replace the user's BGM with outdated original sample tracks.
 Object.defineProperty(audio,'src',{
  configurable:true,
  enumerable:true,
  get(){return native.get.call(audio)},
  set(_originalTrack){native.set.call(audio,url(currentMode()))}
 });
 function update(){
  if(refreshing)return;
  refreshing=true;
  try{setDesired()}finally{refreshing=false}
 }
 function installDuelObserver(){
  const dialog=document.getElementById('mb-duel-dialog');
  if(!dialog||duelObserver)return;
  duelObserver=new MutationObserver(update);
  duelObserver.observe(dialog,{attributes:true,attributeFilter:['open']});
 }
 const musicControl=document.getElementById('bgmToggle');
 if(musicControl)new MutationObserver(()=>requestAnimationFrame(update)).observe(musicControl,{attributes:true,attributeFilter:['aria-pressed']});
 document.addEventListener('pointerup',()=>requestAnimationFrame(update),{passive:true});
 document.addEventListener('keydown',()=>requestAnimationFrame(update),{passive:true});
 document.addEventListener('visibilitychange',update);
 const interval=setInterval(()=>{
  installDuelObserver();
  if(!document.hidden)update();
 },1300);
 window.addEventListener('pagehide',()=>{clearInterval(interval);duelObserver?.disconnect()},{once:true});
 installDuelObserver();
 update();
})();

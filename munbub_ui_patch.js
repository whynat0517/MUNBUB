(()=>{
 'use strict';
 if(window.__munbubUIPatchV3)return;
 window.__munbubUIPatchV3=true;
 const s=document.createElement('style');
 s.id='munbub-responsive-v3';
 s.textContent="\n/* Responsive home and typography: one scoped override layer, v3 */\n#homeScreen .home-main{display:flex;flex-direction:column;align-items:stretch;gap:0;width:100%;max-width:none;min-width:0;overflow:visible;padding:clamp(12px,1.5vw,24px) clamp(12px,2vw,30px) 30px}\n#homeScreen .home-hero{order:0;height:clamp(115px,12.5vw,192px);min-height:0;max-width:920px;width:100%;margin:0 auto;overflow:visible}\n#homeScreen .hero-scroll{max-height:90%;top:3%;left:2%;width:60%}\n#homeScreen .hero-character{max-height:103%;width:40%;bottom:-4px;right:2%}\n#homeScreen .progress-panel{order:1;align-self:center;width:min(100%,850px);max-width:100%;margin:3px auto 12px;padding:8px 14px}\n#homeScreen .progress-mobile{display:none!important}\n#homeScreen .resume-group{order:2;width:100%;max-width:860px;min-width:0;display:flex;justify-content:center;align-self:center;margin:0 auto 9px}\n#resumeHotspot,#mobileResume{box-sizing:border-box!important;display:block;width:min(100%,600px)!important;max-width:600px!important;height:auto!important;min-height:0!important;aspect-ratio:660/162!important;position:relative;overflow:hidden;background:transparent url('./ui-assets/resume.png') center/contain no-repeat!important;border:0!important;box-shadow:none!important;padding:0!important;color:transparent!important;font-size:0!important;cursor:pointer;transition:transform .16s,filter .16s}\n#resumeHotspot[hidden],#mobileResume[hidden]{display:none!important}\n#mobileResume:not([hidden]){display:none!important}\n#resumeHotspot:not([hidden]){display:block!important}\n#homeScreen .timed-home-wrap{order:3;align-self:center;display:block;width:min(100%,1050px);max-width:100%;margin:3px auto 14px!important;min-width:0}\n#homeScreen .timed-home-btn{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:center!important;gap:clamp(6px,1.5vw,24px)!important;width:100%!important;max-width:none!important;min-width:0!important;height:auto!important;min-height:clamp(78px,7.6vw,112px)!important;aspect-ratio:auto!important;margin:0!important;padding:clamp(9px,1.5vw,18px) clamp(10px,2vw,26px)!important;box-sizing:border-box!important;color:#2c1817!important;text-indent:0!important;font-size:clamp(17px,2.65vw,39px)!important;line-height:1.2!important;font-weight:900!important;word-break:keep-all;border:clamp(4px,.5vw,7px) double #bd896e!important;border-radius:clamp(13px,2vw,23px)!important;background:linear-gradient(180deg,#ffebd4 0%,#f3d0ad 100%)!important;box-shadow:inset 0 0 0 3px #fff7e9,0 7px 0 #351c20,0 11px 0 #180f13!important;white-space:normal!important;overflow:visible!important;isolation:isolate}\n#homeScreen .timed-home-btn::before{content:\"⏱\";display:inline-grid;place-items:center;flex:0 0 auto;font-size:clamp(25px,3.8vw,54px);width:clamp(36px,5.2vw,70px);height:clamp(36px,5.2vw,70px);border-right:3px solid #c08a75;padding-right:clamp(4px,1vw,17px);color:#713d35}\n#homeScreen .timed-home-btn span{display:inline!important;color:#3c2321!important;opacity:1!important;flex:0 1 auto;min-width:0;font-size:clamp(12px,1.65vw,24px)!important;font-weight:750!important;line-height:1.25!important;text-align:center;padding-left:clamp(5px,1vw,17px);border-left:3px solid #c48b74}\n#homeScreen .home-card-grid{order:4;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(8px,1.5vw,22px);align-items:start;width:100%;max-width:1080px;margin:0 auto;isolation:auto}\n#homeScreen .home-card-grid .img-button{width:100%;max-width:100%;min-width:0;display:block;overflow:visible;align-self:start}\n#homeScreen .home-card-grid .img-button img{display:block;object-fit:contain;width:100%;height:auto;max-height:clamp(145px,21vw,300px)}\n#homeScreen .home-actions{order:5;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(8px,1.5vw,22px);width:100%;max-width:1080px;margin:12px auto 0}\n#homeScreen .home-actions .img-button{width:100%;min-width:0}\n#homeScreen .home-actions img{display:block;width:100%;height:auto;max-height:94px;object-fit:contain}\n#homeScreen .home-foot{order:6;position:static;margin-top:12px;line-height:1.5}\n#homeScreen .timed-home-btn:hover,#resumeHotspot:hover,#mobileResume:hover{transform:translateY(-2px) scale(1.015)!important;filter:brightness(1.05)!important}\n#homeScreen .timed-home-btn:active,#resumeHotspot:active,#mobileResume:active{transform:translateY(1px) scale(.985)!important}\n#homeScreen .timed-home-btn:focus-visible,.timed-nav:focus-visible,#resumeHotspot:focus-visible,#mobileResume:focus-visible{outline:3px solid #ffdfb0!important;outline-offset:3px}\n.sidebar-nav .timed-nav{box-sizing:border-box!important;display:block!important;width:100%!important;max-width:100%!important;min-height:44px!important;height:auto!important;aspect-ratio:420/122!important;margin:1px 0!important;padding:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:transparent url('./ui-assets/timed_sidebar_new.png') center/contain no-repeat!important;color:transparent!important;font-size:0!important;line-height:0!important;overflow:hidden!important;cursor:pointer!important;appearance:none!important;-webkit-appearance:none!important;transition:transform .16s ease,filter .16s ease}\n\n.sidebar-nav .timed-nav:hover{transform:scale(1.035)!important;filter:brightness(1.12)}\n.sidebar-nav .timed-nav:active{transform:scale(.985)!important;filter:brightness(.96)}\n/* Large-text mode changes real text (not the decorative PNG labels). */\nbody.large-text .panel{font-size:18px!important}\nbody.large-text :is(.panel h2,.panel h3){font-size:clamp(23px,2.5vw,32px)!important}\nbody.large-text :is(.lead,.panel p,.history-item,.note-row,.feedback,.note-row p,.form-grid label,.quiz-meta,.app-caption,.prompt-desc){font-size:clamp(17px,1.75vw,20px)!important;line-height:1.7!important}\nbody.large-text .prompt{font-size:clamp(27px,3.25vw,43px)!important;line-height:1.6!important}\nbody.large-text .option{font-size:clamp(20px,2.15vw,25px)!important;line-height:1.5!important}\nbody.large-text :is(.action,.go-home,.essay-form input,.search,.form-grid input,.form-grid select,.form-grid select option){font-size:clamp(17px,1.85vw,22px)!important}\nbody.large-text :is(.work-header h1,.summary,.fb-title){font-size:clamp(26px,2.6vw,35px)!important}\nbody.large-text :is(.history-item small,.note-row small,.app-caption){font-size:16px!important}\n#fontNormal[aria-pressed=\"true\"],#fontLarge[aria-pressed=\"true\"]{outline:3px solid #8c5047;box-shadow:inset 0 0 0 2px #fff5dd}\n/* Tablet: no fixed-width desktop frame overflow */\n@media(max-width:1100px){\n #homeScreen .home-main{width:100%;max-width:900px;margin:auto;padding:10px max(12px,env(safe-area-inset-left)) calc(104px + env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-right))}\n #homeScreen .home-hero{height:clamp(130px,23vw,220px)}\n #homeScreen .progress-panel:not(.progress-mobile){display:none!important}\n #homeScreen .progress-mobile{display:block!important}\n #homeScreen .resume-group>#resumeHotspot{display:none!important}\n #homeScreen #mobileResume:not([hidden]){display:block!important;width:min(100%,560px)!important;margin:0 auto!important}\n #homeScreen .home-card-grid,#homeScreen .home-actions{max-width:800px;gap:clamp(8px,1.4vw,18px)}\n #homeScreen .timed-home-wrap{max-width:800px}\n #homeScreen .timed-home-btn{font-size:clamp(20px,3vw,30px)!important;min-height:92px!important}\n #homeScreen .timed-home-btn span{font-size:clamp(12px,2.05vw,20px)!important}\n .work-main{max-width:950px!important;min-width:0}\n}\n@media(max-width:600px){\n #homeScreen .home-hero{height:clamp(110px,30vw,170px)}\n #homeScreen .hero-scroll{width:68%;top:10%;left:-2%}\n #homeScreen .hero-character{width:45%;right:0;max-height:96%}\n #homeScreen .home-card-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}\n #homeScreen .home-card-grid .img-button:last-child{grid-column:1/-1;width:min(58%,215px);margin:auto}\n #homeScreen .home-actions{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}\n #homeScreen .home-actions .img-button:last-child{grid-column:1/-1;width:min(58%,215px);margin:auto}\n #homeScreen .timed-home-btn{min-height:78px!important;padding:10px!important;gap:7px!important;border-width:4px!important}\n #homeScreen .timed-home-btn::before{font-size:27px;width:35px;height:38px;padding-right:4px;border-right-width:2px}\n #homeScreen .timed-home-btn span{font-size:12px!important;padding-left:6px;border-left-width:2px}\n #homeScreen .timed-home-btn{font-size:clamp(16px,4.2vw,23px)!important}\n #homeScreen .home-foot{text-align:center}\n body.large-text .prompt{font-size:clamp(25px,6.5vw,33px)!important}\n body.large-text .option{font-size:clamp(18px,5vw,23px)!important}\n body.large-text :is(.panel p,.lead,.history-item,.note-row,.feedback,.form-grid label,.app-caption){font-size:17px!important}\n}\n@media(max-width:360px){\n #homeScreen .timed-home-btn span{font-size:11px!important}\n #homeScreen .home-card-grid .img-button:last-child,#homeScreen .home-actions .img-button:last-child{width:62%}\n}\n@media(hover:none){#homeScreen .timed-home-btn:hover,#resumeHotspot:hover,#mobileResume:hover{transform:none!important;filter:none!important}}\n@media(prefers-reduced-motion:reduce){#homeScreen .timed-home-btn,#resumeHotspot,#mobileResume{transition:none!important}}\n.munbub-timed-dialog{border:4px double #86584a;border-radius:16px;box-shadow:0 12px 0 #2b191a,0 24px 54px #0008;background:#f5dfc6;color:#392221;width:min(440px,calc(100vw - 32px));max-width:95vw;padding:22px;text-align:center}\n.munbub-timed-dialog::backdrop{background:#1d1118bd}\n.munbub-timed-dialog h2{margin:0 0 12px;font-size:1.5rem}\n.munbub-timed-dialog p{margin:0 0 18px}\n.munbub-timed-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n.munbub-timed-grid button,.munbub-timed-close{font:inherit;font-weight:900;border:2px solid #8f624f;color:#3f2821;background:#ffe9cc;min-height:49px;border-radius:8px;padding:12px}\n.munbub-timed-grid button:hover,.munbub-timed-close:hover{background:#fff9eb}\n.munbub-timed-close{margin-top:14px;width:100%}\n";
 document.head.append(s);
 for(const b of document.querySelectorAll('.sidebar-nav .timed-nav')){
  b.setAttribute('aria-label','시간제한');
  b.textContent='';
 }
 const normal=document.getElementById('fontNormal'),large=document.getElementById('fontLarge');
 if(normal)normal.textContent='작은 글씨';
 const updateFontButtons=()=>{
  const big=document.body.classList.contains('large-text');
  normal?.setAttribute('aria-pressed',String(!big));
  large?.setAttribute('aria-pressed',String(big));
 };
 normal?.addEventListener('click',updateFontButtons);
 large?.addEventListener('click',updateFontButtons);
 updateFontButtons();
 const dialog=document.createElement('dialog');
 dialog.className='munbub-timed-dialog';
 dialog.setAttribute('aria-label','시간제한 도전 시간 선택');
 dialog.innerHTML='<h2>⏱ 시간제한 도전</h2><p>도전할 시간을 선택해 주세요.</p><div class="munbub-timed-grid"><button type="button" data-seconds="60">1분</button><button type="button" data-seconds="120">2분</button><button type="button" data-seconds="180">3분</button><button type="button" data-seconds="300">5분</button></div><button type="button" class="munbub-timed-close">돌아가기</button>';
 document.body.append(dialog);
 document.addEventListener('click',e=>{
  const button=e.target.closest?.('button[data-route="timed"]');
  if(!button||typeof dialog.showModal!=='function')return;
  e.preventDefault();e.stopImmediatePropagation();
  if(!dialog.open)dialog.showModal();
 },true);
 dialog.addEventListener('click',e=>{
  const choice=e.target.closest?.('button[data-seconds]');
  if(choice){
   const seconds=Number(choice.dataset.seconds);
   if(![60,120,180,300].includes(seconds))return;
   dialog.close();
   if(typeof window.startSession==='function')window.startSession({category:'all',style:'mixed',count:'all',infinite:true,onlyWrong:false,timed:true,timeSeconds:seconds});
  }else if(e.target.closest?.('.munbub-timed-close'))dialog.close();
 });

 // A single extra style layer follows the existing responsive patch (no duplicated overrides).
 const v4=document.createElement('style');
 v4.id='munbub-application-touch-v4';
 v4.textContent="\n/* v4: application-topic choices, Candy-pop touch response and viewport-safe layouts */\n#applicationTopicWrap{grid-column:1/-1;min-width:0;margin:0;padding:13px 14px 15px;border:3px solid #a77562;border-radius:15px;background:#fff0dc;box-shadow:inset 0 0 0 3px #ffe8cb,0 4px 0 #d3ae96}\n#applicationTopicWrap legend{padding:0 10px;color:#54332b;font-weight:950;font-size:clamp(14px,1.6vw,18px)}\n.application-topic-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n.form-grid .application-topic-option{position:relative;display:flex!important;flex-direction:row!important;justify-content:center;align-items:center;gap:6px!important;text-align:center;min-width:0;min-height:60px;padding:8px 7px;cursor:pointer;user-select:none;-webkit-user-select:none;border:2px solid #b98c75;border-radius:11px;background:#fae5ca;box-shadow:0 4px 0 #9d6c58,inset 0 2px #fff7e6;color:#49312e;font-size:clamp(12px,1.25vw,16px)!important;font-weight:900;line-height:1.25;word-break:keep-all;touch-action:manipulation;transition:background .14s,box-shadow .14s,filter .14s,transform .14s}\n.form-grid .application-topic-option input[type=radio]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;opacity:0!important;cursor:pointer!important;margin:0!important;padding:0!important;z-index:1}\n.form-grid .application-topic-option .application-topic-icon{display:inline-grid;place-items:center;flex:none;width:30px;height:30px;border-radius:8px;background:#f5cba4;color:#603c33;font-size:20px;line-height:1;font-weight:900}\n.form-grid .application-topic-option:has(input:checked){background:#3e292e;color:#ffe7cb;box-shadow:0 4px 0 #1c1216,inset 0 0 0 2px #efc69e;border-color:#f0bf8f}\n.form-grid .application-topic-option:has(input:checked) .application-topic-icon{background:#f9d3ac;color:#3f292a}\n.form-grid .application-topic-option:has(input:focus-visible){outline:4px solid #e28b5a;outline-offset:4px}\n@media(hover:hover){.form-grid .application-topic-option:hover{filter:brightness(1.06);transform:translateY(-2px)}}\n.munbub-pop-ring,.munbub-pop-star{position:fixed;left:0;top:0;pointer-events:none!important;z-index:2147483000;will-change:transform,opacity;transform:translate(-50%,-50%)}\n.munbub-pop-ring{width:54px;height:54px;border-radius:50%;border:5px solid #ffe3a1;box-shadow:0 0 0 3px #9f5a56,0 0 13px #ffc87a88;animation:munbub-ring .40s ease-out forwards}\n.munbub-pop-star{font-size:clamp(15px,2.5vw,25px);line-height:1;font-weight:900;text-shadow:1px 2px 0 #4c2826;animation:munbub-star .54s cubic-bezier(.1,.74,.4,1) forwards}\n@keyframes munbub-ring{from{transform:translate(-50%,-50%) scale(.16);opacity:.95}to{transform:translate(-50%,-50%) scale(1.7);opacity:0}}\n@keyframes munbub-star{0%{transform:translate(-50%,-50%) scale(.3) rotate(-25deg);opacity:1}65%{opacity:1}100%{transform:translate(calc(-50% + var(--pop-x)),calc(-50% + var(--pop-y))) scale(.65) rotate(var(--pop-rot));opacity:0}}\n@media(max-width:1100px){\n html,body{max-width:100%;overflow-x:clip}\n #homeScreen .home-main,#workspace .work-main{box-sizing:border-box;min-width:0;width:100%;margin-inline:auto}\n #workspace .work-main{max-width:940px!important;padding-left:max(14px,env(safe-area-inset-left))!important;padding-right:max(14px,env(safe-area-inset-right))!important;padding-bottom:calc(112px + env(safe-area-inset-bottom))!important}\n #homeScreen .home-main{padding-left:max(12px,env(safe-area-inset-left))!important;padding-right:max(12px,env(safe-area-inset-right))!important;padding-bottom:calc(110px + env(safe-area-inset-bottom))!important}\n #workspace .panel,#workspace .view,#workspace .form-grid{min-width:0;max-width:100%}\n .mobile-bottom{box-sizing:border-box;padding-bottom:env(safe-area-inset-bottom)!important}\n .mobile-bottom button{touch-action:manipulation;min-height:52px}\n}\n@media(min-width:601px) and (max-width:1100px){\n #homeScreen .home-card-grid,#homeScreen .home-actions{grid-template-columns:repeat(3,minmax(0,1fr))!important;max-width:900px}\n #homeScreen .home-card-grid .img-button:last-child,#homeScreen .home-actions .img-button:last-child{grid-column:auto;width:100%}\n #workspace .form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}\n}\n@media(max-width:600px){\n #homeScreen .home-hero{height:clamp(112px,29vw,168px)}\n #homeScreen .home-card-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;max-width:440px}\n #homeScreen .home-card-grid .img-button:last-child{grid-column:1/-1;width:min(58%,215px);margin:auto}\n #homeScreen .home-actions{grid-template-columns:repeat(2,minmax(0,1fr))!important;max-width:440px}\n #homeScreen .home-actions .img-button:last-child{grid-column:1/-1;width:min(58%,215px);margin:auto}\n #workspace .form-grid,#workspace .option-list{grid-template-columns:minmax(0,1fr)!important}\n .application-topic-options{grid-template-columns:repeat(2,minmax(0,1fr))}\n .application-topic-option:last-child{grid-column:1/-1}\n .form-grid .application-topic-option{min-height:53px;font-size:14px!important}\n #workspace .work-main{padding-top:15px!important}\n #workspace .work-header{gap:8px}\n #workspace .work-header h1{font-size:clamp(19px,5vw,27px)}\n #workspace .panel{padding:clamp(12px,3.7vw,21px)}\n #workspace .option{min-width:0;min-height:62px;overflow-wrap:anywhere}\n}\n@media(max-width:360px){\n #applicationTopicWrap{padding:10px 8px}\n .application-topic-options{gap:7px}\n .form-grid .application-topic-option{font-size:12px!important;gap:3px!important;padding:6px 4px}\n .form-grid .application-topic-option .application-topic-icon{width:25px;height:25px;font-size:17px}\n}\n@media(max-height:530px) and (orientation:landscape) and (max-width:1100px){\n #homeScreen .home-main,#workspace .work-main{padding-top:8px!important}\n #homeScreen .home-main{padding-bottom:calc(75px + env(safe-area-inset-bottom))!important}\n #workspace .work-main{padding-bottom:calc(80px + env(safe-area-inset-bottom))!important}\n #homeScreen .home-hero{height:clamp(100px,28svh,155px)}\n .mobile-bottom button{min-height:43px}\n}\n@media(prefers-reduced-motion:reduce){\n .munbub-pop-ring,.munbub-pop-star{display:none!important;animation:none!important}\n .form-grid .application-topic-option{transition:none!important}\n}";
 document.head.append(v4);

 // V5 interaction layer. Earlier responsive rules are retained; all new
 // behavior is registered here once, rather than stacking competing handlers.
 const v5=document.createElement('style');
 v5.id='munbub-interaction-v5';
 v5.textContent=`
 /* Selected menu: pressed/darker, not highlighted/brighter. */
 .sidebar-nav .navbtn.active,.sidebar-nav .timed-nav.active{
   filter:brightness(.66) saturate(.86) drop-shadow(0 2px 2px #1c1016)!important;
   background:rgba(26,14,20,.21)!important;
   box-shadow:inset 0 0 0 2px #efc99c7a!important;
   transform:scale(.992)!important;
   z-index:1;
 }
 .sidebar-nav .navbtn.active:hover{filter:brightness(.75) saturate(.9) drop-shadow(0 4px 3px #180c14)!important;transform:scale(1.02)!important}
 /* Match all other menu buttons: settings now visibly grows on hover. */
 @media(hover:hover) and (pointer:fine){
  .sidebar-nav .navbtn[data-route="settings"]:not(.active):hover,
  #homeScreen .sidebar-nav .navbtn[data-route="settings"]:hover,
  #workspace .sidebar-nav .navbtn[data-route="settings"]:not(.active):hover{
    transform:scale(1.065)!important;filter:brightness(1.13) drop-shadow(0 5px 5px #0007)!important;z-index:4;
  }
 }
 /* Press animation also works on touchscreens (where :hover is unreliable). */
 button.mb-pressing,.img-button.mb-pressing,.navbtn.mb-pressing,.application-topic-option.mb-pressing{
   transform:scale(.955)!important;filter:brightness(1.16) saturate(1.06)!important;
   transition:transform .10s cubic-bezier(.2,.8,.2,1),filter .10s ease!important;
 }
 .sidebar-nav .navbtn.active.mb-pressing{transform:scale(.965)!important;filter:brightness(.8)!important}
 .mb-tap-burst{position:fixed;left:0;top:0;pointer-events:none!important;z-index:2147483000;width:0;height:0;contain:layout style;isolation:isolate}
 .mb-tap-halo,.mb-tap-core,.mb-tap-spark{position:absolute;left:0;top:0;pointer-events:none;transform:translate(-50%,-50%)}
 .mb-tap-halo{width:72px;height:72px;border-radius:50%;border:4px solid #ffe0ab;box-shadow:0 0 0 2px #995b53aa,0 0 20px #ffe4b177;animation:mb-halo .42s ease-out both}
 .mb-tap-core{width:15px;height:15px;border-radius:50%;background:#fff8db;box-shadow:0 0 0 3px #f2af87a6;animation:mb-core .34s ease-out both}
 .mb-tap-spark{width:9px;height:9px;background:var(--mb-spark-color,#f1b78b);border:1px solid #fff5d9;box-shadow:1px 1px 0 #71463a85;clip-path:polygon(50% 0,67% 33%,100% 50%,67% 67%,50% 100%,33% 67%,0 50%,33% 33%);animation:mb-spark .48s cubic-bezier(.15,.66,.3,1) both}
 @keyframes mb-halo{0%{opacity:1;transform:translate(-50%,-50%) scale(.15)}65%{opacity:.8}100%{opacity:0;transform:translate(-50%,-50%) scale(1.65)}}
 @keyframes mb-core{0%{opacity:1;transform:translate(-50%,-50%) scale(.5)}100%{opacity:0;transform:translate(-50%,-50%) scale(2.1)}}
 @keyframes mb-spark{0%{opacity:1;transform:translate(-50%,-50%) scale(.3) rotate(0)}70%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--sx)),calc(-50% + var(--sy))) scale(.8) rotate(125deg)}}
 /* Range-driven reading size: PNG menu labels are deliberately untouched. */
 #workspace :is(.panel,.view){overflow-wrap:break-word}
 #workspace .panel{font-size:calc(16px * var(--mb-text-scale,1))!important;line-height:1.55}
 #workspace :is(.panel p,.lead,.history-item,.note-row,.feedback,.form-grid label,.quiz-meta,.app-caption,.prompt-desc,.empty){font-size:calc(15.5px * var(--mb-text-scale,1))!important;line-height:1.65!important}
 #workspace :is(.panel h2,.panel h3){font-size:calc(24px * var(--mb-text-scale,1))!important;line-height:1.3!important}
 #workspace .prompt{font-size:calc(clamp(25px,2.7vw,35px) * var(--mb-text-scale,1))!important;line-height:1.5!important}
 #workspace .option{font-size:calc(19px * var(--mb-text-scale,1))!important;line-height:1.42!important;min-width:0;white-space:normal}
 #workspace :is(.action,.go-home,.essay-form input,.form-grid input,.form-grid select,.search,.form-grid select option){font-size:calc(16px * var(--mb-text-scale,1))!important}
 #workspace :is(.work-header h1,.summary,.fb-title){font-size:calc(26px * var(--mb-text-scale,1))!important}
 #workspace :is(.history-item small,.note-row small){font-size:calc(13px * var(--mb-text-scale,1))!important}
 .mb-font-range{margin:13px 0 17px;padding:14px 16px;background:#fff0de;border:2px solid #c49a80;border-radius:12px;color:#46302a}
 .mb-font-range label{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;font-weight:900;align-items:center}
 .mb-font-range output{font-variant-numeric:tabular-nums;font-weight:900;color:#66362f}
 .mb-font-range input{display:block;width:100%;margin:13px 0 4px;accent-color:#8f6150;min-height:24px;touch-action:pan-x}
 .mb-font-range .mb-font-preview{font-size:calc(15px * var(--mb-text-scale,1));margin:9px 0 0;color:#584036}
 #fontNormal[aria-pressed=true],#fontLarge[aria-pressed=true]{background:#433039!important;color:#ffeed9!important;outline:2px solid #d5a988}
 .mobile-bottom [data-route].active,.mobile-drawer [data-route].active{background:#3a2529!important;color:#ffe0b4!important;filter:brightness(.88)}
 @media(max-width:600px){
  #workspace .prompt{font-size:calc(clamp(22px,5.5vw,30px) * var(--mb-text-scale,1))!important}
  #workspace .option{font-size:calc(17px * var(--mb-text-scale,1))!important}
  .mb-font-range{padding:11px}
 }
 @media(prefers-reduced-motion:reduce){
  .mb-tap-burst{display:none!important}
  button.mb-pressing,.img-button.mb-pressing,.navbtn.mb-pressing{transition:none!important}
 }`;
 document.head.append(v5);

 const reduced=()=>!!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 const lastPointer=new WeakMap();
 const pressTimeouts=new WeakMap();
 const clickableSelector='button:not(:disabled),[role="button"],.application-topic-option,a[href],summary,input[type="checkbox"],input[type="radio"],select,input[type="range"]';
 const clickableFor=e=>e?.target instanceof Element?e.target.closest(clickableSelector):null;
 const pressable=el=>el.matches('button,.img-button,.navbtn,.application-topic-option,[role="button"]');
 function burst(clientX,clientY){
  if(reduced())return;
  const burstEl=document.createElement('span');burstEl.className='mb-tap-burst';
  burstEl.style.left=clientX+'px';burstEl.style.top=clientY+'px';
  burstEl.innerHTML='<i class="mb-tap-halo"></i><i class="mb-tap-core"></i>';
  const colors=['#fff0bf','#f5b891','#e7998c','#e6bb8d','#ffdf9a','#f3a99a'];
  for(let i=0;i<6;i++){
    const star=document.createElement('i');
    star.className='mb-tap-spark';
    const a=i*Math.PI/3-.35,dist=38+(i%2)*12;
    star.style.setProperty('--sx',Math.round(Math.cos(a)*dist)+'px');
    star.style.setProperty('--sy',Math.round(Math.sin(a)*dist-7)+'px');
    star.style.setProperty('--mb-spark-color',colors[i]);
    burstEl.append(star);
  }
  document.body.append(burstEl);
  setTimeout(()=>burstEl.remove(),560);
 }
 function press(el){
  if(!pressable(el))return;
  clearTimeout(pressTimeouts.get(el));
  el.classList.add('mb-pressing');
  pressTimeouts.set(el,setTimeout(()=>el.classList.remove('mb-pressing'),155));
 }
 let ctx=null;
 function tapSound(){
  try{
   const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
   if(!ctx)ctx=new C();
   if(ctx.state==='suspended')ctx.resume().catch(()=>{});
   const now=ctx.currentTime,osc=ctx.createOscillator(),gain=ctx.createGain();
   osc.type='sine';osc.frequency.setValueAtTime(740,now);osc.frequency.exponentialRampToValueAtTime(520,now+.068);
   gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.028,now+.009);gain.gain.exponentialRampToValueAtTime(.0001,now+.077);
   osc.connect(gain).connect(ctx.destination);osc.start(now);osc.stop(now+.082);
  }catch(_){}
 }
 function showInteraction(el,x,y,source){
  if(!el || el.matches?.(':disabled,[aria-disabled="true"]'))return;
  press(el);
  burst(x,y);
  if(source!=='click')tapSound();
  if(source==='touch'&&!reduced())try{navigator.vibrate?.(7)}catch(_){}
 }
 document.addEventListener('pointerdown',e=>{
  if(e.button!==0 || !e.isPrimary)return;
  const el=clickableFor(e);if(!el)return;
  lastPointer.set(el,Date.now());
  showInteraction(el,e.clientX,e.clientY,e.pointerType==='touch'?'touch':'pointer');
 },{passive:true});
 // Covers synthetic clicks, accessibility activation and touch-only browsers,
 // without double-firing after pointerdown.
 document.addEventListener('click',e=>{
  const el=clickableFor(e);if(!el)return;
  if(Date.now()-(lastPointer.get(el)||0)<500)return;
  const rect=el.getBoundingClientRect();
  showInteraction(el,rect.left+rect.width/2,rect.top+rect.height/2,'click');
 });
 document.addEventListener('keydown',e=>{
  if(e.repeat||!['Enter',' '].includes(e.key))return;
  const el=clickableFor(e);if(!el)return;
  const rect=el.getBoundingClientRect();
  showInteraction(el,rect.left+rect.width/2,rect.top+rect.height/2,'keyboard');
 });

 // Selected item follows the actual route, including timed/infinite sessions.
 function actualRoute(){
  const current=typeof section!=='undefined'?section:'home';
  if(current!=='quiz')return current;
  const cfg=typeof store!=='undefined'?store?.active?.cfg:null;
  return cfg?.timed?'timed':cfg?.infinite?'infinite':(cfg?.category||'home');
 }
 function showSelected(route=actualRoute()){
  document.querySelectorAll('.sidebar-nav [data-route],.mobile-bottom [data-route],.mobile-drawer [data-route]').forEach(el=>{
   const on=el.dataset.route===route;
   el.classList.toggle('active',on);
   if(el.classList.contains('navbtn'))el.setAttribute('aria-current',on?'page':'false');
  });
 }
 showSelected();
 let fromSidebar=false;
 document.addEventListener('pointerdown',e=>{
  const nav=e.target instanceof Element?e.target.closest('.sidebar-nav [data-route]'):null;
  if(nav && nav.dataset.route!=='home')showSelected(nav.dataset.route);
 },{passive:true});
 // The inline app explicitly calls scrollTo({top:0}) inside navigate().
 // Block that *one* scroll request for left menu switches; preserve all
 // ordinary scrolling and home/quiz navigation.
 document.addEventListener('click',e=>{
  const nav=e.target instanceof Element?e.target.closest('.sidebar-nav [data-route]'):null;
  if(!nav || nav.dataset.route==='home')return;
  fromSidebar=true;
  queueMicrotask(()=>{fromSidebar=false});
 },true);
 if(typeof window.navigate==='function'){
  const originalNavigate=window.navigate;
  window.navigate=function(...args){
   const keep=fromSidebar,priorY=window.scrollY,oldScroll=window.scrollTo;
   if(keep){
    window.scrollTo=function(...scrollArgs){
     if(scrollArgs.length===1&&scrollArgs[0]&&typeof scrollArgs[0]==='object'&&scrollArgs[0].top===0)return;
     return oldScroll.apply(window,scrollArgs);
    };
   }
   try{return originalNavigate.apply(this,args)}
   finally{
    if(keep){
     window.scrollTo=oldScroll;
     requestAnimationFrame(()=>{
      const maxY=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
      const desired=Math.min(priorY,maxY);
      if(Math.abs(window.scrollY-desired)>6)oldScroll.call(window,{top:desired,behavior:'instant'});
     });
    }
    showSelected();
    boostHomeMusic();
   }
  };
 }

 // Font-size slider: 80-150%, retained per browser.
 const small=document.getElementById('fontNormal');
 const big=document.getElementById('fontLarge');
 const fontKey='matchunbeom_font_scale_v2';
 let range=null,number=null;
 if(small && big && !document.getElementById('mbFontSizeRange')){
  const wrap=document.createElement('div');
  wrap.className='mb-font-range';
  wrap.innerHTML='<label for="mbFontSizeRange"><span>글씨 크기 조절</span><output id="mbFontPercent" for="mbFontSizeRange">100%</output></label><input id="mbFontSizeRange" type="range" min="80" max="150" step="5" value="100" aria-label="글씨 크기 조절"><p class="mb-font-preview">미리보기 · 맞춤법 문제를 편하게 읽어 봐!</p>';
  big.parentElement.insertAdjacentElement('afterend',wrap);
  range=wrap.querySelector('input');
  number=wrap.querySelector('output');
 }else{range=document.getElementById('mbFontSizeRange');number=document.getElementById('mbFontPercent');}
 function setTextScale(value){
  const v=Math.max(80,Math.min(150,Math.round(Number(value)/5)*5 || 100));
  document.documentElement.style.setProperty('--mb-text-scale',String(v/100));
  if(range)range.value=String(v);
  if(number)number.textContent=v+'%';
  // Keep older two-button setting and previously saved preferences in sync.
  document.body.classList.toggle('large-text',v>=120);
  small?.setAttribute('aria-pressed',String(v===100));
  big?.setAttribute('aria-pressed',String(v>=120));
  try{localStorage.setItem(fontKey,String(v));localStorage.setItem('matchunbeom_large_font',v>=120?'1':'0')}catch(_){}
 }
 let initial=100;
 try{const saved=Number(localStorage.getItem(fontKey));if(saved>=80&&saved<=150)initial=saved;else if(localStorage.getItem('matchunbeom_large_font')==='1')initial=125;}catch(_){}
 setTextScale(initial);
 range?.addEventListener('input',()=>setTextScale(range.value));
 small?.addEventListener('click',()=>setTextScale(100));
 big?.addEventListener('click',()=>setTextScale(125));

 // Homepage track is 3x the base slider volume, capped at browser max 1.0.
 function boostHomeMusic(){
  try{
   if(typeof bgmPlayer==='undefined')return;
   const base=Number(document.getElementById('bgmVolume')?.value ?? 35)/100;
   const home=typeof section!=='undefined' && section==='home';
   bgmPlayer.volume=Math.max(0,Math.min(1,base*(home?3:1)));
  }catch(_){}
 }
 if(typeof window.syncBgm==='function'){
  const originalSync=window.syncBgm;
  window.syncBgm=function(...args){
   const result=originalSync.apply(this,args);
   boostHomeMusic();
   return result;
  };
 }
 document.getElementById('bgmVolume')?.addEventListener('input',boostHomeMusic);
 for(const type of ['pointerdown','keydown','visibilitychange'])document.addEventListener(type,boostHomeMusic);
 const playerLabel=document.getElementById('bgmNowPlaying');
 if(playerLabel){
  const info=document.createElement('p');info.className='app-caption';
  info.textContent='홈 배경음악은 설정 볼륨의 3배로 재생돼. (최대 100%)';
  playerLabel.insertAdjacentElement('afterend',info);
 }
 boostHomeMusic();
})();

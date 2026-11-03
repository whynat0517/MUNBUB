/* 맛춘범 UI 확장: 독립 패치, 문제 데이터와 기존 퀴즈 핸들러 보존 */
(()=>{
  'use strict';
  if(window.__munbubUIPatchV2)return;
  window.__munbubUIPatchV2=true;
  const css=`
#resumeHotspot,#mobileResume,.timed-home-btn{position:relative!important;box-sizing:border-box!important;overflow:hidden!important;isolation:isolate;background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;text-indent:-9999px!important;font-size:0!important;line-height:0!important;cursor:pointer!important;transition:transform .15s ease,filter .15s ease!important}
#resumeHotspot,#mobileResume{width:min(100%,650px)!important;aspect-ratio:660/162!important;min-height:0!important;background-image:url('./ui-assets/resume.png')!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:center!important}
#resumeHotspot[hidden],#mobileResume[hidden]{display:none!important}
#resumeHotspot:not([hidden]){display:inline-block!important}
#mobileResume:not([hidden]){display:none!important}
.timed-home-btn{display:block!important;width:min(100%,660px)!important;max-width:660px!important;height:auto!important;min-height:0!important;aspect-ratio:660/92!important;background-image:url('./ui-assets/timed_dark.png')!important;background-repeat:no-repeat!important;background-position:center!important;background-size:contain!important;margin-inline:auto!important}
.timed-home-btn span{display:none!important}
#resumeHotspot:hover,#mobileResume:hover,.timed-home-btn:hover{transform:scale(1.025)!important;filter:brightness(1.09)!important}
#resumeHotspot:active,#mobileResume:active,.timed-home-btn:active{transform:scale(.975)!important;filter:brightness(.93)!important}
#resumeHotspot:focus-visible,#mobileResume:focus-visible,.timed-home-btn:focus-visible{outline:3px solid #f5d9b6!important;outline-offset:2px!important}
.timed-home-wrap{max-width:670px!important;margin:10px auto!important;display:flex!important;justify-content:center!important}
.munbub-timed-dialog{border:3px solid #5b3330;border-radius:17px;box-shadow:0 18px 0 #2a1719,0 24px 70px #0009;background:#f4ddc0;color:#392221;max-width:min(92vw,430px);width:430px;padding:24px;text-align:center}
.munbub-timed-dialog::backdrop{background:#1d1118b9;backdrop-filter:blur(3px)}
.munbub-timed-dialog h2{font-size:1.45rem;margin:0 0 8px;font-weight:900}
.munbub-timed-dialog p{font-size:.92rem;margin:0 0 19px;line-height:1.6}
.munbub-timed-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.munbub-timed-grid button,.munbub-timed-close{font:inherit;font-weight:900;border:2px solid #744b42;color:#35201c;background:#ffeaca;box-shadow:0 4px #76514b;border-radius:12px;padding:13px;cursor:pointer;min-height:48px;transition:transform .12s ease,background .12s ease}
.munbub-timed-grid button:hover,.munbub-timed-close:hover{background:#fff4df;transform:translateY(-2px)}
.munbub-timed-grid button:active,.munbub-timed-close:active{transform:translateY(2px);box-shadow:0 2px #76514b}
.munbub-timed-close{margin-top:18px;background:#e6c4a8;width:100%}
.munbub-timed-dialog button:focus-visible{outline:3px solid #a35648;outline-offset:3px}
@media(max-width:800px){.resume-group>#resumeHotspot{display:none!important}#mobileResume:not([hidden]){display:block!important;width:min(100%,540px)!important;margin:0 auto 9px!important}.timed-home-btn{width:100%!important}}
@media(prefers-reduced-motion:reduce){#resumeHotspot,#mobileResume,.timed-home-btn,.munbub-timed-grid button,.munbub-timed-close{transition:none!important}}
`;
  const style=document.createElement('style');style.id='munbub-ui-patch-v2';style.textContent=css;document.head.append(style);
  const dialog=document.createElement('dialog');dialog.className='munbub-timed-dialog';dialog.setAttribute('aria-label','시간제한 도전 시간 선택');
  dialog.innerHTML=`<h2>⏱ 시간제한 도전</h2><p>도전 시간을 선택해 봐!<br>시간이 끝나면 기록이 저장돼.</p><div class="munbub-timed-grid"><button type="button" data-seconds="60">1분</button><button type="button" data-seconds="120">2분</button><button type="button" data-seconds="180">3분</button><button type="button" data-seconds="300">5분</button></div><button type="button" class="munbub-timed-close">돌아가기</button>`;
  document.body.append(dialog);
  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('[data-route="timed"]');if(!btn)return;
    if(typeof dialog.showModal!=='function')return;
    e.preventDefault();e.stopImmediatePropagation();dialog.showModal();
  },true);
  dialog.addEventListener('click',e=>{
    const select=e.target.closest?.('[data-seconds]');
    if(select){const timeSeconds=Number(select.dataset.seconds);if(![60,120,180,300].includes(timeSeconds))return;
      dialog.close();if(typeof window.startSession==='function')window.startSession({category:'all',style:'mixed',count:'all',infinite:true,onlyWrong:false,timed:true,timeSeconds});
    }else if(e.target.closest?.('.munbub-timed-close'))dialog.close();
  });
  let context;
  const tap=()=>{try{
    const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
    context ||=new C();if(context.state==='suspended')context.resume().catch(()=>{});
    const t=context.currentTime,o=context.createOscillator(),g=context.createGain();o.type='sine';o.frequency.setValueAtTime(830,t);o.frequency.exponentialRampToValueAtTime(490,t+.065);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.038,t+.009);g.gain.exponentialRampToValueAtTime(.0001,t+.077);
    o.connect(g).connect(context.destination);o.start(t);o.stop(t+.083);
  }catch(_){/* 미지원 환경은 무음으로 처리 */}};
  document.addEventListener('pointerdown',e=>{const b=e.target.closest?.('button,[role="button"]');if(b&&!b.disabled)tap()},{passive:true});
  document.addEventListener('keydown',e=>{if(e.repeat||!['Enter',' '].includes(e.key))return;const b=e.target.closest?.('button,[role="button"]');if(b&&!b.disabled)tap()});
})();

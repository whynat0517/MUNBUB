/* Apply requested live play backgrounds only to the actual quiz view. */
(()=>{
 'use strict';
 if(window.__mbQuizScene2026)return;window.__mbQuizScene2026=true;
 const quiz=document.getElementById('view-quiz');if(!quiz)return;
 const css=document.createElement('link');css.rel='stylesheet';css.href='./munbub_quiz_scenes_2026.css';css.id='mb-quiz-scenes-css';document.head.append(css);
 const timer=document.createElement('img');
 timer.className='mb-quiz-hourglass';timer.id='mb-timed-hourglass';
 timer.src='./ui-assets/hourglass_loop.webp';timer.alt='모래가 흐르고 뒤집히는 모래시계';
 timer.loading='eager';timer.decoding='async';
 quiz.prepend(timer);
 const CLASSES=['mb-scene-spelling','mb-scene-idiom','mb-scene-infinite','mb-scene-hard','mb-scene-timed'];
 function refresh(){
  const active=typeof store!=='undefined'&&store?.active;
  if(quiz.hidden||!active){
   quiz.classList.remove('mb-quiz-scene',...CLASSES);return;
  }
  const cfg=active.cfg||{};
  const item=active.queue?.[active.index];
  const type=item?.type||(typeof MAP!=='undefined'?MAP.get(item?.id)?.type:'');
  let scene='spelling';
  if(cfg.hard)scene='hard';
  else if(cfg.timed)scene='timed';
  else if(cfg.infinite)scene='infinite';
  else if(type==='idiom'||cfg.category==='idiom')scene='idiom';
  quiz.classList.remove(...CLASSES);
  quiz.classList.add('mb-quiz-scene','mb-scene-'+scene);
 }
 const obs=new MutationObserver(refresh);
 obs.observe(quiz,{attributes:true,attributeFilter:['hidden']});
 for(const target of [document.getElementById('questionPrompt'),document.getElementById('quizCategory')]){
  if(target)obs.observe(target,{childList:true,characterData:true,subtree:true});
 }
 document.addEventListener('visibilitychange',refresh);
 refresh();setTimeout(refresh,300);
})();

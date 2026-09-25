(function(){
  'use strict';

  const answer=document.getElementById('answer');
  const question=document.getElementById('question');
  const revealBtn=document.getElementById('reveal');
  if(!answer||!question||!revealBtn)return;

  let token=0;
  let revealRequested=false;
  let prepared=false;
  let currentCardId=null;
  let currentInner=null;
  let resizeRAF=0;

  function currentCard(){
    try{
      if(typeof reviewIds==='undefined'||typeof reviewPos==='undefined'||typeof cards==='undefined')return null;
      if(!Array.isArray(reviewIds)||!reviewIds.length)return null;
      return cards.find(c=>c.id===reviewIds[reviewPos])||null;
    }catch(_e){return null;}
  }

  function escapeHtml(s){
    return String(s??'').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  }

  function formulaMarkup(card){
    if(!card)return '';
    const latex=String(card.latex||'').trim();
    if(latex&&window.katex){
      try{
        return katex.renderToString(latex,{displayMode:true,throwOnError:true,strict:'ignore',trust:false,output:'htmlAndMathml'});
      }catch(_e){}
    }
    if(card.formulaImage){
      const src=String(card.formulaImage).replace(/"/g,'&quot;');
      return `<img src="${src}" alt="Formula">`;
    }
    return `<span class="formula-fidelity-text">${escapeHtml(card.answer||'')}</span>`;
  }

  function buildStage(card){
    const stage=document.createElement('div');
    stage.className='review-formula-stage';
    const inner=document.createElement('div');
    inner.className='review-formula-inner';
    inner.innerHTML=formulaMarkup(card);
    stage.appendChild(inner);
    answer.replaceChildren(stage);
    answer.dataset.reviewCardId=String(card?.id??'');
    if(card&&card.latex)answer.dataset.mathCard=`latex:${card.latex}`;
    else delete answer.dataset.mathCard;
    currentInner=inner;
    return inner;
  }

  function naturalSize(inner){
    if(!inner)return {w:0,h:0};
    // Measure before transform. offset* is layout size and is unaffected by transform.
    const w=Math.max(inner.offsetWidth||0,inner.scrollWidth||0);
    const h=Math.max(inner.offsetHeight||0,inner.scrollHeight||0);
    return {w,h};
  }

  function fit(){
    if(!currentInner||!answer.isConnected)return;
    const stage=currentInner.parentElement;
    if(!stage)return;

    currentInner.style.setProperty('--review-fit-scale','1');
    const {w,h}=naturalSize(currentInner);
    const availableW=Math.max(20,stage.clientWidth-28);
    const availableH=Math.max(20,stage.clientHeight-24);
    if(!w||!h)return;

    const scale=Math.min(1,availableW/w,availableH/h);
    currentInner.style.setProperty('--review-fit-scale',String(Math.max(.25,scale*.985)));
  }

  function showIfReady(myToken){
    if(myToken!==token||!currentInner)return;
    fit();
    prepared=true;
    if(revealRequested)currentInner.classList.add('is-revealed');
  }

  async function prepare(myToken){
    // Wait for both layout and KaTeX fonts before allowing reveal. This prevents
    // a visible resize after the answer appears.
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    if(myToken!==token)return;
    fit();

    try{
      if(document.fonts&&document.fonts.status!=='loaded')await document.fonts.ready;
    }catch(_e){}
    if(myToken!==token)return;

    await new Promise(resolve=>requestAnimationFrame(resolve));
    showIfReady(myToken);
  }

  function renderFromState(){
    const card=currentCard();
    if(!card)return;

    const myToken=++token;
    currentCardId=card.id;
    revealRequested=false;
    prepared=false;
    buildStage(card);
    if(currentInner)currentInner.classList.remove('is-revealed');
    prepare(myToken);
  }

  function reveal(){
    revealRequested=true;
    if(prepared&&currentInner){
      fit();
      currentInner.classList.add('is-revealed');
    }
  }

  // Override the legacy reveal handler. Reveal now changes opacity only.
  revealBtn.onclick=reveal;

  // The scheduler still owns navigation/rating. We only listen for the prompt to
  // change and then render the current card once. We never observe #answer, so our
  // own KaTeX DOM changes cannot trigger a render loop.
  const questionObserver=new MutationObserver(()=>queueMicrotask(renderFromState));
  questionObserver.observe(question,{childList:true,characterData:true,subtree:true});

  // Some actions can rebuild a queue while landing on the same prompt. Schedule a
  // state render after those actions as a fallback; it is idempotent and does not
  // alter scheduling/history logic.
  [
    'prevBtn','nextBtn','markWrong','markDifficult','markKnown',
    'restartReviewBtn','randomModeBtn','subjectModeBtn','startReview'
  ].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.addEventListener('click',()=>setTimeout(renderFromState,0));
  });

  const subjectSelect=document.getElementById('reviewSubjectSelect');
  if(subjectSelect)subjectSelect.addEventListener('change',()=>setTimeout(renderFromState,0));

  document.querySelectorAll('.navbtn[data-view="review"]').forEach(el=>{
    el.addEventListener('click',()=>setTimeout(renderFromState,0));
  });

  if(window.ResizeObserver){
    const ro=new ResizeObserver(()=>{
      cancelAnimationFrame(resizeRAF);
      resizeRAF=requestAnimationFrame(fit);
    });
    ro.observe(answer);
  }else{
    window.addEventListener('resize',()=>{
      cancelAnimationFrame(resizeRAF);
      resizeRAF=requestAnimationFrame(fit);
    });
  }

  // If Review already has a card when this script loads, normalize it immediately.
  setTimeout(renderFromState,0);

  window.CFAReviewRendererV2={render:renderFromState,reveal,fit};
})();

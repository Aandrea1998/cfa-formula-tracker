(function(){
  'use strict';

  const answer=document.getElementById('answer');
  if(!answer)return;

  // Keep the answer in the document flow at all times. Review renderers may set
  // display:none inline; !important here deliberately overrides that so KaTeX can
  // render and auto-fit before the user reveals the formula.
  const style=document.createElement('style');
  style.textContent=`
    #reviewView #answer{
      display:block!important;
      min-height:132px;
      box-sizing:border-box;
    }
    #reviewView #answer.review-answer-hidden{
      visibility:hidden!important;
      pointer-events:none;
    }
    #reviewView #answer.review-answer-visible{
      visibility:visible!important;
    }
  `;
  document.head.appendChild(style);

  function fitHidden(){
    if(window.CFAReviewFormulaFit&&typeof window.CFAReviewFormulaFit.fit==='function'){
      requestAnimationFrame(()=>window.CFAReviewFormulaFit.fit());
    }
  }

  function conceal(){
    answer.classList.remove('review-answer-visible');
    answer.classList.add('review-answer-hidden');
    answer.setAttribute('aria-hidden','true');
    fitHidden();
  }

  function reveal(){
    // The formula has already been rendered and fitted while hidden, so revealing
    // it changes visibility only — no layout shift and no visible font resize.
    answer.classList.remove('review-answer-hidden');
    answer.classList.add('review-answer-visible');
    answer.setAttribute('aria-hidden','false');
  }

  // Hide immediately on load and whenever Review replaces the current answer.
  conceal();
  new MutationObserver(()=>{
    conceal();
    requestAnimationFrame(fitHidden);
  }).observe(answer,{childList:true,subtree:true,characterData:true});

  const revealBtn=document.getElementById('reveal');
  if(revealBtn)revealBtn.onclick=reveal;

  // Conceal before any control can change the current card. Capture phase is used
  // so the old answer cannot flash while the next Review render is running.
  [
    'prevBtn','nextBtn','markWrong','markDifficult','markKnown',
    'restartReviewBtn','randomModeBtn','subjectModeBtn','startReview'
  ].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.addEventListener('click',conceal,true);
  });

  const subjectSelect=document.getElementById('reviewSubjectSelect');
  if(subjectSelect)subjectSelect.addEventListener('change',conceal,true);

  document.querySelectorAll('.navbtn[data-view="review"]').forEach(el=>{
    el.addEventListener('click',conceal,true);
  });

  window.CFAReviewRevealStability={conceal,reveal};
})();

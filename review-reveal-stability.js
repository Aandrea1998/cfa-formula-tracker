(function(){
  'use strict';

  const answer=document.getElementById('answer');
  if(!answer)return;

  const style=document.createElement('style');
  style.textContent=`
    #reviewView #answer{
      display:flex!important;
      height:140px!important;
      min-height:140px!important;
      max-height:140px!important;
      box-sizing:border-box;
      overflow:hidden!important;
      align-items:center;
      justify-content:center;
      margin-top:0!important;
    }
    #reviewView #answer.review-answer-hidden{
      visibility:hidden!important;
      pointer-events:none;
    }
    #reviewView #answer.review-answer-visible{
      visibility:visible!important;
    }
    @media(max-width:900px){
      #reviewView #answer{
        height:130px!important;
        min-height:130px!important;
        max-height:130px!important;
      }
    }
  `;
  document.head.appendChild(style);

  let revealRequested=false;
  let revealToken=0;

  function fitNow(){
    if(window.CFAReviewFormulaFit&&typeof window.CFAReviewFormulaFit.fitNow==='function'){
      window.CFAReviewFormulaFit.fitNow();
    }else if(window.CFAReviewFormulaFit&&typeof window.CFAReviewFormulaFit.fit==='function'){
      window.CFAReviewFormulaFit.fit();
    }
  }

  function hideOnly(){
    answer.classList.remove('review-answer-visible');
    answer.classList.add('review-answer-hidden');
    answer.setAttribute('aria-hidden','true');
  }

  function conceal(){
    revealRequested=false;
    revealToken++;
    hideOnly();
    requestAnimationFrame(fitNow);
  }

  function settleAndReveal(){
    const token=++revealToken;
    hideOnly();

    // Fit while hidden inside a fixed-height slot. Nothing outside the answer
    // box can move, and visibility is the only property changed at reveal time.
    requestAnimationFrame(()=>{
      fitNow();
      requestAnimationFrame(()=>{
        fitNow();
        if(!revealRequested||token!==revealToken)return;
        answer.classList.remove('review-answer-hidden');
        answer.classList.add('review-answer-visible');
        answer.setAttribute('aria-hidden','false');
      });
    });
  }

  function reveal(){
    revealRequested=true;
    settleAndReveal();
  }

  conceal();

  new MutationObserver(()=>{
    hideOnly();
    requestAnimationFrame(()=>{
      fitNow();
      if(revealRequested)settleAndReveal();
    });
  }).observe(answer,{childList:true,subtree:true,characterData:true});

  const revealBtn=document.getElementById('reveal');
  if(revealBtn)revealBtn.onclick=reveal;

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

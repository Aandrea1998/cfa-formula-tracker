(function(){
  'use strict';

  const answer=document.getElementById('answer');
  if(!answer)return;

  let rafA=0,rafB=0,resizeTimer=0;

  function fitReviewFormula(){
    const box=answer.querySelector('.formula-math-review');
    if(!box)return;
    if(getComputedStyle(answer).display==='none')return;

    const katex=box.querySelector('.katex');
    if(!katex)return;

    // Reset to the normal Review size first so short formulas stay large.
    box.style.fontSize='';

    const style=getComputedStyle(box);
    const pad=(parseFloat(style.paddingLeft)||0)+(parseFloat(style.paddingRight)||0);
    const available=Math.max(40,box.clientWidth-pad-6);
    if(available<=40)return;

    let basePx=parseFloat(getComputedStyle(box).fontSize)||23.2;
    let width=katex.getBoundingClientRect().width;
    if(!width)return;

    // Leave formulas that already fit at the normal size untouched.
    if(width<=available)return;

    const minPx=window.innerWidth<=760?11.5:12.5;
    let target=Math.max(minPx,basePx*(available/width)*0.975);
    box.style.fontSize=target+'px';

    // A second measurement handles font/KaTeX rounding and very long text blocks.
    for(let i=0;i<6;i++){
      width=katex.getBoundingClientRect().width;
      if(width<=available+0.5||target<=minPx)break;
      target=Math.max(minPx,target*(available/width)*0.975);
      box.style.fontSize=target+'px';
    }
  }

  function scheduleFit(){
    cancelAnimationFrame(rafA);
    cancelAnimationFrame(rafB);
    rafA=requestAnimationFrame(()=>{
      rafB=requestAnimationFrame(fitReviewFormula);
    });
  }

  // KaTeX is injected after the review card text is rendered, so observe the
  // answer box and fit only after the final typeset DOM exists.
  new MutationObserver(scheduleFit).observe(answer,{
    childList:true,
    subtree:true,
    characterData:true,
    attributes:true,
    attributeFilter:['style']
  });

  const reveal=document.getElementById('reveal');
  if(reveal)reveal.addEventListener('click',()=>setTimeout(scheduleFit,0));

  ['prevBtn','nextBtn','markWrong','markDifficult','markKnown','restartReviewBtn','randomModeBtn','subjectModeBtn']
    .forEach(id=>{
      const el=document.getElementById(id);
      if(el)el.addEventListener('click',()=>setTimeout(scheduleFit,0));
    });

  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(scheduleFit,80);
  });

  scheduleFit();
  window.CFAReviewFormulaFit={fit:scheduleFit};
})();

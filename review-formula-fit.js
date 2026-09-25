(function(){
  'use strict';

  const answer=document.getElementById('answer');
  if(!answer)return;

  let rafA=0,rafB=0,resizeTimer=0;

  function measuredWidth(katex){
    if(!katex)return 0;
    const html=katex.querySelector('.katex-html');
    const widths=[
      katex.getBoundingClientRect().width,
      katex.scrollWidth||0,
      html?html.getBoundingClientRect().width:0,
      html?(html.scrollWidth||0):0
    ];
    return Math.max(...widths.filter(Number.isFinite));
  }

  function fitReviewFormula(){
    const box=answer.querySelector('.formula-math-review');
    if(!box)return false;
    if(getComputedStyle(answer).display==='none')return false;

    const katex=box.querySelector('.katex');
    if(!katex)return false;

    // Always restart from the normal Review size, then shrink only if needed.
    box.style.fontSize='';

    const style=getComputedStyle(box);
    const pad=(parseFloat(style.paddingLeft)||0)+(parseFloat(style.paddingRight)||0);
    const available=Math.max(40,box.clientWidth-pad-16);
    if(available<=40)return false;

    const basePx=parseFloat(getComputedStyle(box).fontSize)||23.2;
    let width=measuredWidth(katex);
    if(!width)return false;

    if(width<=available)return true;

    const minPx=window.innerWidth<=760?10:11;
    let target=Math.max(minPx,basePx*(available/width)*0.94);
    box.style.fontSize=target+'px';

    for(let i=0;i<10;i++){
      width=measuredWidth(katex);
      if(width<=available||target<=minPx)break;
      target=Math.max(minPx,target*(available/width)*0.94);
      box.style.fontSize=target+'px';
    }
    return true;
  }

  function scheduleFit(){
    cancelAnimationFrame(rafA);
    cancelAnimationFrame(rafB);
    rafA=requestAnimationFrame(()=>{
      rafB=requestAnimationFrame(fitReviewFormula);
    });
  }

  new MutationObserver(scheduleFit).observe(answer,{
    childList:true,
    subtree:true,
    characterData:true
  });

  ['prevBtn','nextBtn','markWrong','markDifficult','markKnown','restartReviewBtn','randomModeBtn','subjectModeBtn']
    .forEach(id=>{
      const el=document.getElementById(id);
      if(el)el.addEventListener('click',()=>setTimeout(scheduleFit,0));
    });

  if(window.ResizeObserver){
    const ro=new ResizeObserver(scheduleFit);
    ro.observe(answer);
  }

  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(scheduleFit,80);
  });

  scheduleFit();
  window.CFAReviewFormulaFit={fit:scheduleFit,fitNow:fitReviewFormula};
})();

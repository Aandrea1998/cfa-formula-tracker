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
    if(!box)return;
    if(getComputedStyle(answer).display==='none')return;

    const katex=box.querySelector('.katex');
    if(!katex)return;

    // Start from the normal review size so short formulas remain large.
    box.style.fontSize='';

    const style=getComputedStyle(box);
    const pad=(parseFloat(style.paddingLeft)||0)+(parseFloat(style.paddingRight)||0);
    const available=Math.max(40,box.clientWidth-pad-12);
    if(available<=40)return;

    let basePx=parseFloat(getComputedStyle(box).fontSize)||23.2;
    let width=measuredWidth(katex);
    if(!width)return;

    if(width<=available)return;

    const minPx=window.innerWidth<=760?10.5:11.5;
    let target=Math.max(minPx,basePx*(available/width)*0.96);
    box.style.fontSize=target+'px';

    // Re-measure the actual KaTeX contents after every reduction.
    for(let i=0;i<8;i++){
      width=measuredWidth(katex);
      if(width<=available||target<=minPx)break;
      target=Math.max(minPx,target*(available/width)*0.96);
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

  // Observe only content replacement. Do NOT observe style changes: the fitter
  // changes font-size itself, and observing that caused a reset/shrink loop.
  new MutationObserver(scheduleFit).observe(answer,{
    childList:true,
    subtree:true,
    characterData:true
  });

  const reveal=document.getElementById('reveal');
  if(reveal)reveal.addEventListener('click',()=>setTimeout(scheduleFit,0));

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
  window.CFAReviewFormulaFit={fit:scheduleFit};
})();

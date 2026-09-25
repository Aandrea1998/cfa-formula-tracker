(function(){
  'use strict';
  const box=document.getElementById('extractList');
  if(!box)return;
  function cleanPrompt(front){
    const s=String(front||'');
    const cut=s.lastIndexOf(' — ');
    if(cut<0)return s;
    const suffix=s.slice(cut+3).trim();
    const semanticWords=(suffix.match(/[A-Za-z]{4,}/g)||[]).filter(w=>!/^(WACC|FCFF|FCFE|EBIT|CFO|ROE|EPS)$/i.test(w));
    return semanticWords.length?s:s.slice(0,cut).trim();
  }
  function polish(){
    try{
      if(typeof extracted==='undefined'||!Array.isArray(extracted))return;
      extracted.forEach((c,i)=>{
        const cleaned=cleanPrompt(c.front);
        if(cleaned!==c.front)c.front=cleaned;
        const input=box.querySelector(`.xfront[data-i="${i}"]`);
        if(input&&input.value!==cleaned)input.value=cleaned;
      });
    }catch(_e){}
  }
  new MutationObserver(()=>requestAnimationFrame(polish)).observe(box,{childList:true,subtree:true});
  polish();

  // Load the complete-block reconstruction layer last so it can replace
  // fragment-level PDF parsing when this CFA formula sheet is recognized.
  if(!document.querySelector('script[data-formula-reconstruction-v2]')){
    const s=document.createElement('script');
    s.src='formula-reconstruction-v2.js?v=2';
    s.dataset.formulaReconstructionV2='true';
    document.body.appendChild(s);
  }
})();

(function(){
  'use strict';

  const root=document.getElementById('libraryContent');
  if(!root)return;

  function renderLatex(latex){
    if(!window.katex||!latex)return '';
    try{
      return katex.renderToString(String(latex).trim(),{
        displayMode:true,
        throwOnError:true,
        strict:'ignore',
        trust:false,
        output:'htmlAndMathml'
      });
    }catch(_e){
      return '';
    }
  }

  function applyLibraryFormulaFormat(){
    if(typeof cards==='undefined'||!Array.isArray(cards))return;

    root.querySelectorAll('tbody tr').forEach(row=>{
      const id=Number(row.children[0]?.textContent);
      if(!id)return;

      const card=cards.find(c=>+c.id===id);
      const cell=row.querySelector('.formula-cell')||row.children[2];
      if(!card||!cell)return;

      // Preserve exact-image cards and plain-text cards exactly as they are.
      if(card.formulaImage||!card.latex)return;

      const marker='library-latex:'+card.latex;
      if(cell.dataset.libraryFormulaFormat===marker)return;

      const html=renderLatex(card.latex);
      if(!html)return;

      cell.innerHTML='<div class="formula-math formula-math-library">'+html+'</div>';
      cell.dataset.libraryFormulaFormat=marker;
    });
  }

  let queued=false;
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      applyLibraryFormulaFormat();
    });
  }

  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  schedule();

  window.CFALibraryFormulaFormatFix={apply:applyLibraryFormulaFormat};
})();
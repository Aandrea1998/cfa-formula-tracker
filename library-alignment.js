(function(){
  'use strict';

  const root=document.getElementById('libraryContent');
  const answer=document.getElementById('answer');
  if(!root&&!answer)return;

  function alignTable(table){
    table.classList.add('formula-library-table');

    let colgroup=table.querySelector(':scope > colgroup');
    if(!colgroup){
      colgroup=document.createElement('colgroup');
      ['col-id','col-prompt','col-formula','col-status'].forEach(cls=>{
        const col=document.createElement('col');
        col.className=cls;
        colgroup.appendChild(col);
      });
      table.insertBefore(colgroup,table.firstChild);
    }

    table.querySelectorAll('tr').forEach(row=>{
      const cells=[...row.children].filter(el=>el.tagName==='TH'||el.tagName==='TD');
      const classes=['col-id','col-prompt','col-formula','col-status'];
      cells.forEach((cell,i)=>{if(classes[i])cell.classList.add(classes[i]);});
    });
  }

  function subjectFor(box){
    const group=box.closest('.library-group');
    return group?.querySelector('.library-title')?.textContent?.trim()||'';
  }

  function fitLibraryFormula(box){
    if(!box)return;
    const katex=box.querySelector('.katex');
    if(!katex)return;

    const subject=subjectFor(box);
    let baseRem=1.08;
    box.style.fontSize=`${baseRem}rem`;

    const available=Math.max(20,box.clientWidth-10);
    let rect=katex.getBoundingClientRect();

    if(subject==='Economics' && rect.width<available*0.72 && rect.height<30){
      baseRem=1.20;
      box.style.fontSize=`${baseRem}rem`;
      rect=katex.getBoundingClientRect();
    }

    if(!rect.width||rect.width<=available)return;

    const ratio=Math.min(1,(available/rect.width)*0.985);
    box.style.fontSize=`${Math.max(0.52,baseRem*ratio)}rem`;

    requestAnimationFrame(()=>{
      const width=katex.getBoundingClientRect().width;
      const avail=Math.max(20,box.clientWidth-10);
      if(width>avail){
        const current=parseFloat(getComputedStyle(box).fontSize)||17.28;
        const nextPx=Math.max(8.5,current*(avail/width)*0.98);
        box.style.fontSize=`${nextPx}px`;
      }
    });
  }

  function fitReviewFormula(){
    if(!answer)return;
    const box=answer.querySelector('.formula-math-review');
    const katex=box?.querySelector('.katex');
    if(!box||!katex)return;

    // The answer is hidden before Reveal. Wait until it has a measurable width.
    if(box.clientWidth<20)return;

    const mobile=window.matchMedia&&window.matchMedia('(max-width:760px)').matches;
    const baseRem=mobile?1.25:1.45;
    const minRem=mobile?0.72:0.82;
    box.style.fontSize=`${baseRem}rem`;

    const available=Math.max(40,box.clientWidth-28);
    let width=katex.getBoundingClientRect().width;
    if(!width||width<=available)return;

    const ratio=Math.min(1,(available/width)*0.975);
    box.style.fontSize=`${Math.max(minRem,baseRem*ratio)}rem`;

    // Precision pass after KaTeX/browser layout settles.
    requestAnimationFrame(()=>{
      width=katex.getBoundingClientRect().width;
      const avail=Math.max(40,box.clientWidth-28);
      if(width>avail){
        const currentPx=parseFloat(getComputedStyle(box).fontSize)||23.2;
        const minPx=(parseFloat(getComputedStyle(document.documentElement).fontSize)||16)*minRem;
        box.style.fontSize=`${Math.max(minPx,currentPx*(avail/width)*0.97)}px`;
      }
    });
  }

  function normalizeLibrary(){
    if(!root)return;
    root.querySelectorAll('table').forEach(alignTable);
    root.querySelectorAll('.formula-math-library').forEach(fitLibraryFormula);
  }

  let libraryQueued=false;
  const scheduleLibrary=()=>{
    if(libraryQueued)return;
    libraryQueued=true;
    requestAnimationFrame(()=>{
      libraryQueued=false;
      normalizeLibrary();
      setTimeout(normalizeLibrary,60);
    });
  };

  let reviewQueued=false;
  const scheduleReview=()=>{
    if(reviewQueued)return;
    reviewQueued=true;
    requestAnimationFrame(()=>{
      reviewQueued=false;
      fitReviewFormula();
      setTimeout(fitReviewFormula,60);
    });
  };

  if(root){
    new MutationObserver(scheduleLibrary).observe(root,{childList:true,subtree:true});
    normalizeLibrary();
  }

  if(answer){
    new MutationObserver(scheduleReview).observe(answer,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
    const reveal=document.getElementById('reveal');
    if(reveal)reveal.addEventListener('click',()=>setTimeout(scheduleReview,0));
    if(window.ResizeObserver)new ResizeObserver(scheduleReview).observe(answer);
    fitReviewFormula();
  }

  window.addEventListener('resize',()=>{scheduleLibrary();scheduleReview();},{passive:true});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{scheduleLibrary();scheduleReview();}).catch(()=>{});
})();

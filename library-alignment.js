(function(){
  'use strict';

  const root=document.getElementById('libraryContent');
  if(!root)return;

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

  function fitFormula(box){
    if(!box)return;
    const katex=box.querySelector('.katex');
    if(!katex)return;

    const subject=subjectFor(box);

    // Start from the shared Equity reference size.
    let baseRem=1.08;
    box.style.fontSize=`${baseRem}rem`;

    const available=Math.max(20,box.clientWidth-10);
    let rect=katex.getBoundingClientRect();

    // Economics contains several very short one-line growth identities at the
    // bottom of the chapter. At the same CSS size their lowercase notation has
    // a noticeably smaller visual footprint than the Equity formulas. Give
    // compact Economics identities a controlled boost so their perceived size
    // matches Equity, without enlarging fractions/sums or long formulas.
    if(subject==='Economics' && rect.width<available*0.72 && rect.height<30){
      baseRem=1.20;
      box.style.fontSize=`${baseRem}rem`;
      rect=katex.getBoundingClientRect();
    }

    if(!rect.width||rect.width<=available)return;

    // Long formulas shrink only as much as necessary; never create a scrollbar.
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

  function normalize(){
    root.querySelectorAll('table').forEach(alignTable);
    root.querySelectorAll('.formula-math-library').forEach(fitFormula);
  }

  let queued=false;
  const schedule=()=>{
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      normalize();
      setTimeout(normalize,60);
    });
  };

  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  window.addEventListener('resize',schedule,{passive:true});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(schedule).catch(()=>{});
  normalize();
})();

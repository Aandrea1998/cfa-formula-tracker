(function(){
  'use strict';

  const root=document.getElementById('libraryContent');
  if(!root)return;

  function statusLabel(c){
    if(!c||!c.status)return 'Unreviewed';
    if(c.status==='known')return 'Known';
    if(c.status==='missed')return 'Missed';
    if(c.status==='difficult')return 'Difficult';
    return 'Unreviewed';
  }

  function enhance(){
    root.querySelectorAll('.formula-library-table, .library-group table').forEach(table=>{
      const head=table.querySelector('thead tr');
      if(head&&head.children[3]&&head.children[3].textContent!=='Rolling status'){
        head.children[3].textContent='Rolling status';
      }

      table.querySelectorAll('tbody tr').forEach(row=>{
        const cells=row.children;
        if(cells.length<4)return;
        const id=Number((cells[0].textContent||'').trim());
        const card=Array.isArray(window.cards)?window.cards.find(c=>+c.id===id):
          (typeof cards!=='undefined'&&Array.isArray(cards)?cards.find(c=>+c.id===id):null);
        if(!card)return;

        let accuracy=null,attempts=0,known=0,difficult=0,missed=0;
        try{
          if(window.cfaRollingInfo){
            const r=window.cfaRollingInfo(card);
            accuracy=r.accuracy;
            attempts=r.attempts||0;
            known=r.known||0;
            difficult=r.difficult||0;
            missed=r.missed||0;
          }
        }catch(_e){}

        const label=statusLabel(card);
        const cls=accuracy!==null?(accuracy>=80?'known':accuracy<60?'missed':'difficult'):(card.status||'');
        const pct=accuracy===null?'—':`${accuracy}%`;
        const cell=cells[3];
        const sig=[label,cls,pct,attempts,known,difficult,missed].join('|');

        if(cell.dataset.rollingSignature===sig)return;
        cell.dataset.rollingSignature=sig;
        cell.classList.add('rolling-status-cell');
        cell.title=attempts?`Last ${Math.min(attempts,5)} attempt${attempts===1?'':'s'}: ${known} Known · ${difficult} Difficult · ${missed} Missed`:'No review attempts yet';
        cell.innerHTML=`<span class="status-dot ${cls}"></span><span class="rolling-status-main"><span class="rolling-status-label">${label}</span><span class="rolling-status-pct">${pct}</span></span>`;
      });
    });
  }

  const style=document.createElement('style');
  style.textContent=`
    .rolling-status-cell{white-space:nowrap!important;vertical-align:middle!important}
    .rolling-status-main{display:inline-flex;align-items:baseline;gap:8px}
    .rolling-status-label{font-weight:600}
    .rolling-status-pct{font-variant-numeric:tabular-nums;color:var(--muted,#94a3b8);font-weight:700;min-width:38px;text-align:right}
  `;
  document.head.appendChild(style);

  let queued=false;
  const schedule=()=>{
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;enhance();});
  };

  new MutationObserver(schedule).observe(root,{childList:true});

  if(typeof renderLibrary==='function'){
    const baseRender=renderLibrary;
    renderLibrary=function(){
      const out=baseRender.apply(this,arguments);
      schedule();
      return out;
    };
  }

  schedule();
})();

(function loadEquityChapter456(){
  if(document.querySelector('script[src="equity-chapter-456.js"]'))return;
  const script=document.createElement('script');
  script.src='equity-chapter-456.js';
  script.defer=true;
  document.body.appendChild(script);
})();

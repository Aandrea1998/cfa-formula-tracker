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

  function normalize(){
    root.querySelectorAll('table').forEach(alignTable);
  }

  let queued=false;
  const schedule=()=>{
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;normalize();});
  };

  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  normalize();
})();

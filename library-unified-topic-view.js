(function(){
  'use strict';

  const root=document.getElementById('libraryContent');
  if(!root||typeof renderLibrary!=='function')return;

  let normalizing=false;

  function updateLibraryCopy(){
    const subtitle=document.querySelector('#formulasView .topbar .subtitle');
    if(subtitle)subtitle.textContent='Browse formulas by CFA topic.';
    const help=document.querySelector('#formulasView .library-sticky-top .card .help');
    if(help)help.textContent='Each CFA topic is shown as one continuous formula table.';
  }

  function originalOrderActive(){
    const sortSelect=document.querySelector('.library-sort-control select');
    const sortMode=(sortSelect&&sortSelect.value)||'original';
    return /original/i.test(sortMode);
  }

  function sortRowsById(tbody){
    if(!tbody||!originalOrderActive())return;
    [...tbody.children]
      .sort((a,b)=>(Number(a.children[0]?.textContent)||0)-(Number(b.children[0]?.textContent)||0))
      .forEach(row=>tbody.appendChild(row));
  }

  function cleanHead(group,subject){
    const head=group.querySelector('.library-head');
    const tbody=group.querySelector('tbody');
    if(!head||!tbody)return;

    const title=head.querySelector('.library-title');
    if(title)title.textContent=subject;

    // Chapter/subtopic remains stored on cards, but it should never create or
    // label a separate visual block inside the Formula Library.
    const left=head.firstElementChild;
    if(left)[...left.querySelectorAll('.library-meta')].forEach(meta=>meta.remove());

    const countMeta=[...head.querySelectorAll(':scope > .library-meta')].pop();
    const n=tbody.children.length;
    if(countMeta)countMeta.textContent=`${n} formula${n===1?'':'s'}`;
  }

  function subjectOf(group){
    return group.querySelector('.library-title')?.textContent?.trim()||'';
  }

  function mergeGroups(groups,subject){
    if(!groups.length)return;
    const first=groups[0];
    const tbody=first.querySelector('tbody');
    if(!tbody)return;

    groups.slice(1).forEach(group=>{
      const otherBody=group.querySelector('tbody');
      if(otherBody)[...otherBody.children].forEach(row=>tbody.appendChild(row));
      group.remove();
    });

    sortRowsById(tbody);
    cleanHead(first,subject);
  }

  function unifyLibrary(){
    if(normalizing)return;
    try{
      if(typeof librarySubject==='undefined')return;
      const groups=[...root.querySelectorAll(':scope > .library-group')];
      if(!groups.length)return;

      normalizing=true;

      if(librarySubject!=='All'){
        // A selected CFA topic is always one single table.
        mergeGroups(groups,librarySubject);
        return;
      }

      // Consolidated / All view: keep one section per CFA topic, never one per
      // chapter or subtopic.
      const bySubject=new Map();
      groups.forEach(group=>{
        const subject=subjectOf(group);
        if(!subject)return;
        if(!bySubject.has(subject))bySubject.set(subject,[]);
        bySubject.get(subject).push(group);
      });
      bySubject.forEach((subjectGroups,subject)=>mergeGroups(subjectGroups,subject));
    }catch(_e){}
    finally{normalizing=false;}
  }

  const baseRender=renderLibrary;
  renderLibrary=function(){
    const out=baseRender.apply(this,arguments);
    updateLibraryCopy();
    unifyLibrary();
    requestAnimationFrame(unifyLibrary);
    setTimeout(unifyLibrary,50);
    return out;
  };

  // Some later decorators/importers can rebuild libraryContent after the base
  // renderer. Re-apply consolidation without changing any stored card data.
  const observer=new MutationObserver(()=>{
    if(normalizing)return;
    requestAnimationFrame(unifyLibrary);
  });
  observer.observe(root,{childList:true});

  updateLibraryCopy();
  unifyLibrary();

  window.CFAUnifiedTopicLibrary={unify:unifyLibrary};
})();

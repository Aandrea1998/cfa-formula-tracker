(function(){
  'use strict';

  const root=document.getElementById('libraryContent');
  if(!root||typeof renderLibrary!=='function')return;

  let normalizing=false;

  function updateLibraryCopy(){
    const subtitle=document.querySelector('#formulasView .topbar .subtitle');
    if(subtitle)subtitle.textContent='Browse formulas by CFA topic.';
    const help=document.querySelector('#formulasView .library-sticky-top .card .help');
    if(help)help.textContent='Select a CFA topic to view all of its formulas in one continuous table.';
  }

  function unifySelectedTopic(){
    if(normalizing)return;
    try{
      if(typeof librarySubject==='undefined'||librarySubject==='All')return;

      const groups=[...root.querySelectorAll(':scope > .library-group')];
      if(!groups.length)return;

      normalizing=true;
      const first=groups[0];
      const tbody=first.querySelector('tbody');
      if(!tbody){normalizing=false;return;}

      // Merge every chapter/subtopic table into the first table. Card.topic is
      // intentionally left untouched so import metadata is preserved internally.
      groups.slice(1).forEach(group=>{
        const otherBody=group.querySelector('tbody');
        if(otherBody)[...otherBody.children].forEach(row=>tbody.appendChild(row));
        group.remove();
      });

      // When the UI is in Original order, restore one global order for the topic
      // rather than the old chapter-by-chapter order.
      const sortSelect=document.querySelector('.library-sort-control select');
      const sortMode=(sortSelect&&sortSelect.value)||'original';
      if(/original/i.test(sortMode)){
        [...tbody.children]
          .sort((a,b)=>(Number(a.children[0]?.textContent)||0)-(Number(b.children[0]?.textContent)||0))
          .forEach(row=>tbody.appendChild(row));
      }

      const head=first.querySelector('.library-head');
      if(head){
        const title=head.querySelector('.library-title');
        if(title)title.textContent=librarySubject;

        // Remove the chapter/subtopic line entirely in a selected CFA topic.
        const left=head.firstElementChild;
        if(left){
          const metas=[...left.querySelectorAll('.library-meta')];
          metas.forEach(meta=>meta.remove());
        }

        const countMeta=[...head.querySelectorAll(':scope > .library-meta')].pop();
        const n=tbody.children.length;
        if(countMeta)countMeta.textContent=`${n} formula${n===1?'':'s'}`;
      }
    }catch(_e){}
    finally{normalizing=false;}
  }

  const baseRender=renderLibrary;
  renderLibrary=function(){
    const out=baseRender.apply(this,arguments);
    updateLibraryCopy();
    unifySelectedTopic();
    requestAnimationFrame(unifySelectedTopic);
    setTimeout(unifySelectedTopic,50);
    return out;
  };

  // Catch any later decorator/importer that rebuilds libraryContent directly.
  const observer=new MutationObserver(()=>{
    if(normalizing)return;
    requestAnimationFrame(unifySelectedTopic);
  });
  observer.observe(root,{childList:true});

  updateLibraryCopy();
  unifySelectedTopic();

  window.CFAUnifiedTopicLibrary={unify:unifySelectedTopic};
})();

(function(){
  'use strict';

  const root=document.getElementById('libraryContent');
  if(!root||typeof renderLibrary!=='function')return;

  function unifySelectedTopic(){
    try{
      if(typeof librarySubject==='undefined'||librarySubject==='All')return;

      const groups=[...root.querySelectorAll(':scope > .library-group')];
      if(!groups.length)return;

      const first=groups[0];
      const tbody=first.querySelector('tbody');
      if(!tbody)return;

      // Merge every chapter/subtopic table into the first table.
      groups.slice(1).forEach(group=>{
        const otherBody=group.querySelector('tbody');
        if(otherBody){
          [...otherBody.children].forEach(row=>tbody.appendChild(row));
        }
        group.remove();
      });

      // "Original order" should mean deck/card order across the whole CFA topic,
      // not chapter-by-chapter order inherited from the old grouped view.
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

        const left=head.firstElementChild;
        if(left){
          const chapterMeta=left.querySelector('.library-meta');
          if(chapterMeta)chapterMeta.remove();
        }

        const countMeta=[...head.querySelectorAll(':scope > .library-meta')].pop();
        const n=tbody.children.length;
        if(countMeta)countMeta.textContent=`${n} formula${n===1?'':'s'}`;
      }
    }catch(_e){}
  }

  const baseRender=renderLibrary;
  renderLibrary=function(){
    const out=baseRender.apply(this,arguments);
    // Run immediately and once again after other library decorators (KaTeX,
    // rolling status, alignment) have had a chance to finish.
    unifySelectedTopic();
    requestAnimationFrame(unifySelectedTopic);
    setTimeout(unifySelectedTopic,40);
    return out;
  };

  // Normalize the currently visible library as soon as this enhancement loads.
  unifySelectedTopic();

  window.CFAUnifiedTopicLibrary={unify:unifySelectedTopic};
})();

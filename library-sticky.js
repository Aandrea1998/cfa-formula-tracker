(function(){
  const view=document.getElementById('formulasView');
  const top=view&&view.querySelector('.library-sticky-top');
  const content=document.getElementById('libraryContent');
  if(!view||!top||!content)return;

  let ro;
  let lastTopH=-1,lastHeadH=-1;

  function setOffsets(){
    if(window.innerWidth<=900){
      if(lastTopH!==0||lastHeadH!==0){
        view.style.removeProperty('--library-sticky-top-height');
        view.style.removeProperty('--library-group-head-height');
        lastTopH=0;lastHeadH=0;
      }
      return;
    }

    const topH=Math.ceil(top.getBoundingClientRect().height);
    const head=content.querySelector('.library-head');
    const headH=head?Math.ceil(head.getBoundingClientRect().height):0;

    // Avoid rewriting CSS variables when dimensions did not actually change.
    if(topH!==lastTopH){
      view.style.setProperty('--library-sticky-top-height',topH+'px');
      lastTopH=topH;
    }
    if(headH!==lastHeadH){
      view.style.setProperty('--library-group-head-height',headH+'px');
      lastHeadH=headH;
    }
  }

  function observeHeads(){
    if(ro)ro.disconnect();
    ro=new ResizeObserver(()=>requestAnimationFrame(setOffsets));
    ro.observe(top);
    const head=content.querySelector('.library-head');
    if(head)ro.observe(head);
    setOffsets();
  }

  // A library render replaces direct group children. Internal table/status edits
  // should not rebuild the sticky observers or recalculate offsets.
  const mo=new MutationObserver(()=>requestAnimationFrame(observeHeads));
  mo.observe(content,{childList:true});

  window.addEventListener('resize',()=>requestAnimationFrame(setOffsets),{passive:true});
  window.addEventListener('load',()=>requestAnimationFrame(observeHeads),{once:true});
  setTimeout(observeHeads,0);
})();

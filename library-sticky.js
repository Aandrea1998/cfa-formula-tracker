(function(){
  const view=document.getElementById('formulasView');
  const top=view&&view.querySelector('.library-sticky-top');
  const content=document.getElementById('libraryContent');
  if(!view||!top||!content)return;

  let ro;
  function setOffsets(){
    if(window.innerWidth<=900){
      view.style.removeProperty('--library-sticky-top-height');
      view.style.removeProperty('--library-group-head-height');
      return;
    }
    const topH=Math.ceil(top.getBoundingClientRect().height);
    const head=content.querySelector('.library-head');
    const headH=head?Math.ceil(head.getBoundingClientRect().height):0;
    view.style.setProperty('--library-sticky-top-height',topH+'px');
    view.style.setProperty('--library-group-head-height',headH+'px');
  }

  function observeHeads(){
    if(ro)ro.disconnect();
    ro=new ResizeObserver(setOffsets);
    ro.observe(top);
    const head=content.querySelector('.library-head');
    if(head)ro.observe(head);
    setOffsets();
  }

  const mo=new MutationObserver(()=>requestAnimationFrame(observeHeads));
  mo.observe(content,{childList:true,subtree:true});
  window.addEventListener('resize',()=>requestAnimationFrame(setOffsets));
  window.addEventListener('load',()=>requestAnimationFrame(observeHeads));
  setTimeout(observeHeads,0);
})();

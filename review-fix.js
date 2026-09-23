(function(){
  const KEY='cfa_review_current_id';
  const queue=()=>[
    ...cards.filter(c=>c.status==='missed').map(c=>c.id),
    ...cards.filter(c=>!c.status).map(c=>c.id),
    ...cards.filter(c=>c.status==='known').map(c=>c.id)
  ];
  function persist(){if(reviewIds.length)localStorage.setItem(KEY,String(reviewIds[reviewPos]));}
  function restore(){
    reviewIds=queue();
    if(!reviewIds.length){reviewPos=0;return;}
    const saved=Number(localStorage.getItem(KEY));
    const i=reviewIds.indexOf(saved);
    reviewPos=i>=0?i:0;
  }
  function render(){
    if(!reviewIds.length){
      $('question').textContent='No formulas in the deck yet.';
      $('answer').textContent='';
      $('reviewCounter').textContent='0 / 0';
      return;
    }
    if(reviewPos<0||reviewPos>=reviewIds.length)reviewPos=0;
    let c=cards.find(x=>x.id===reviewIds[reviewPos]);
    if(!c){restore();c=cards.find(x=>x.id===reviewIds[reviewPos]);if(!c)return;}
    $('question').textContent=c.question;
    $('answer').textContent=c.answer;
    $('answer').style.display='none';
    const kicker=document.querySelector('#reviewView .kicker');
    if(kicker)kicker.textContent=`${c.subject||'Unassigned'} · ${c.topic||'General'}`;
    $('reviewCounter').textContent=`${reviewPos+1} / ${reviewIds.length}`;
    persist();
  }
  function move(step){if(!reviewIds.length)return;reviewPos=(reviewPos+step+reviewIds.length)%reviewIds.length;render();}
  function startNew(){reviewIds=queue();reviewPos=0;persist();render();showView('review');}
  function rateContinuous(status){
    if(!reviewIds.length)return;
    const c=cards.find(x=>x.id===reviewIds[reviewPos]);
    if(!c)return;
    c.status=status;
    save();refresh();
    move(1);
  }
  startReview=startNew;
  renderReview=render;
  rate=rateContinuous;
  $('startReview').onclick=startNew;
  $('prevBtn').onclick=()=>move(-1);
  $('nextBtn').onclick=()=>move(1);
  $('markWrong').onclick=()=>rateContinuous('missed');
  $('markKnown').onclick=()=>rateContinuous('known');
  document.querySelectorAll('.navbtn[data-view="review"]').forEach(b=>b.onclick=()=>{restore();showView('review');render();});
  const add=$('addExtractedBtn');
  if(add)add.addEventListener('click',()=>setTimeout(()=>{reviewIds=[];},0));
  const reset=$('resetDemo');
  if(reset)reset.addEventListener('click',()=>localStorage.removeItem(KEY));
})();

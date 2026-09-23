(function(){
  const CURRENT_KEY='cfa_review_current_id';
  const MODE_KEY='cfa_review_mode';
  const SUBJECT_KEY='cfa_review_subject';
  let reviewMode=localStorage.getItem(MODE_KEY)||'random';
  let reviewSubject=localStorage.getItem(SUBJECT_KEY)||((window.CFA_TOPICS&&window.CFA_TOPICS[0])||'Economics');

  function shuffle(arr){
    const out=[...arr];
    for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
    return out;
  }

  function subjectCards(){return cards.filter(c=>c.subject===reviewSubject);}

  function priorityQueue(pool){
    return [
      ...pool.filter(c=>c.status==='missed').map(c=>c.id),
      ...pool.filter(c=>!c.status).map(c=>c.id),
      ...pool.filter(c=>c.status==='known').map(c=>c.id)
    ];
  }

  function queue(){
    if(reviewMode==='subject') return priorityQueue(subjectCards());
    return shuffle(cards.map(c=>c.id));
  }

  function persist(){
    localStorage.setItem(MODE_KEY,reviewMode);
    localStorage.setItem(SUBJECT_KEY,reviewSubject);
    if(reviewIds.length)localStorage.setItem(CURRENT_KEY,String(reviewIds[reviewPos]));
  }

  function restore(){
    reviewIds=queue();
    if(!reviewIds.length){reviewPos=0;return;}
    const saved=Number(localStorage.getItem(CURRENT_KEY));
    const i=reviewIds.indexOf(saved);
    reviewPos=i>=0?i:0;
  }

  function render(){
    updateControls();
    if(!reviewIds.length){
      $('question').textContent=reviewMode==='subject'?`No formulas in ${reviewSubject} yet.`:'No formulas in the deck yet.';
      $('answer').textContent='';
      $('reviewCounter').textContent='0 / 0';
      const kicker=document.querySelector('#reviewView .kicker');
      if(kicker)kicker.textContent=reviewMode==='subject'?reviewSubject.toUpperCase():'RANDOM MIX';
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

  function startNew(){
    reviewIds=queue();
    reviewPos=0;
    localStorage.removeItem(CURRENT_KEY);
    persist();
    render();
    showView('review');
  }

  function rateContinuous(status){
    if(!reviewIds.length)return;
    const c=cards.find(x=>x.id===reviewIds[reviewPos]);
    if(!c)return;
    c.status=status;
    save();refresh();
    move(1);
  }

  function setMode(mode){
    reviewMode=mode;
    persist();
    startNew();
  }

  function setSubject(subject){
    reviewSubject=subject;
    reviewMode='subject';
    persist();
    startNew();
  }

  function buildControls(){
    if(document.getElementById('reviewModePanel'))return;
    const top=document.querySelector('#reviewView .topbar');
    if(!top)return;
    const panel=document.createElement('div');
    panel.id='reviewModePanel';
    panel.className='review-mode-panel';
    panel.innerHTML=`
      <div class="review-mode-copy">
        <div class="review-mode-title">Training mode</div>
        <div class="review-mode-sub">Choose a full random mix or focus on one CFA topic.</div>
      </div>
      <div class="review-mode-actions">
        <button type="button" class="mode-btn" id="randomModeBtn">↻ Random mix</button>
        <div class="subject-mode-wrap">
          <button type="button" class="mode-btn" id="subjectModeBtn">Focus topic</button>
          <select id="reviewSubjectSelect" aria-label="Choose CFA topic"></select>
        </div>
        <button type="button" class="mode-restart" id="restartReviewBtn" title="Start this mode from a new first card">New session</button>
      </div>`;
    top.insertAdjacentElement('afterend',panel);
    const select=document.getElementById('reviewSubjectSelect');
    const topics=window.CFA_TOPICS||[];
    select.innerHTML=topics.map(t=>`<option value="${t.replace(/"/g,'&quot;')}">${t} · ${cards.filter(c=>c.subject===t).length}</option>`).join('');
    if(topics.includes(reviewSubject))select.value=reviewSubject;
    else if(topics.length){reviewSubject=topics[0];select.value=reviewSubject;}
    document.getElementById('randomModeBtn').onclick=()=>setMode('random');
    document.getElementById('subjectModeBtn').onclick=()=>setMode('subject');
    select.onchange=()=>setSubject(select.value);
    document.getElementById('restartReviewBtn').onclick=startNew;
    updateControls();
  }

  function updateControls(){
    const randomBtn=document.getElementById('randomModeBtn');
    const subjectBtn=document.getElementById('subjectModeBtn');
    const select=document.getElementById('reviewSubjectSelect');
    if(!randomBtn||!subjectBtn||!select)return;
    randomBtn.classList.toggle('active',reviewMode==='random');
    subjectBtn.classList.toggle('active',reviewMode==='subject');
    select.classList.toggle('active',reviewMode==='subject');
    select.disabled=reviewMode!=='subject';
    if(select.value!==reviewSubject&&[...select.options].some(o=>o.value===reviewSubject))select.value=reviewSubject;
  }

  startReview=startNew;
  renderReview=render;
  rate=rateContinuous;
  buildControls();
  $('startReview').onclick=startNew;
  $('prevBtn').onclick=()=>move(-1);
  $('nextBtn').onclick=()=>move(1);
  $('markWrong').onclick=()=>rateContinuous('missed');
  $('markKnown').onclick=()=>rateContinuous('known');
  document.querySelectorAll('.navbtn[data-view="review"]').forEach(b=>b.onclick=()=>{buildControls();restore();showView('review');render();});
  const add=$('addExtractedBtn');
  if(add)add.addEventListener('click',()=>setTimeout(()=>{reviewIds=[];buildControls();},0));
  const reset=$('resetDemo');
  if(reset)reset.addEventListener('click',()=>{localStorage.removeItem(CURRENT_KEY);localStorage.removeItem(MODE_KEY);localStorage.removeItem(SUBJECT_KEY);reviewMode='random';});
})();
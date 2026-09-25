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

  function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}

  function cardInfo(c){
    if(window.cfaRollingInfo)return window.cfaRollingInfo(c);
    let h=Array.isArray(c.history)?c.history.slice(-5):[];
    if(!h.length&&c.status)h=[{result:c.status}];
    if(!h.length)return {attempts:0,accuracy:null};
    let points=0;
    h.forEach(x=>{const r=typeof x==='string'?x:x.result;points+=r==='known'?1:r==='difficult'?.5:0;});
    return {attempts:h.length,accuracy:Math.round(points/h.length*100)};
  }

  function subjectCards(){return cards.filter(c=>c.subject===reviewSubject);}

  function activePool(){return reviewMode==='subject'?subjectCards():cards;}

  function adaptiveOrder(pool){
    return pool.map(c=>{
      const r=cardInfo(c);
      let priority;
      if(!r.attempts)priority=76;
      else if(r.accuracy<60)priority=112;
      else if(r.accuracy<80)priority=82;
      else priority=Math.max(18,46-r.attempts*4);
      priority+=Math.random()*34;
      return {id:c.id,priority};
    }).sort((a,b)=>b.priority-a.priority).map(x=>x.id);
  }

  // Random Mix should look and behave like a real cross-topic shuffle.
  // Shuffle inside each topic, then randomly draw from topic buckets while
  // avoiding the same topic twice in a row whenever another topic is available.
  function diversifiedRandomOrder(pool){
    const buckets=new Map();
    pool.forEach(c=>{
      const subject=c.subject||'Unassigned';
      if(!buckets.has(subject))buckets.set(subject,[]);
      buckets.get(subject).push(c.id);
    });
    buckets.forEach((ids,subject)=>buckets.set(subject,shuffle(ids)));

    const out=[];
    let lastSubject=null;
    while(out.length<pool.length){
      let available=[...buckets.entries()].filter(([,ids])=>ids.length);
      if(!available.length)break;
      const alternatives=available.filter(([subject])=>subject!==lastSubject);
      if(alternatives.length)available=alternatives;

      // Weight selection by remaining cards so large topics still appear
      // proportionally, without allowing long same-topic runs.
      const total=available.reduce((sum,[,ids])=>sum+ids.length,0);
      let draw=Math.random()*total;
      let chosen=available[available.length-1];
      for(const entry of available){
        draw-=entry[1].length;
        if(draw<0){chosen=entry;break;}
      }
      const [subject,ids]=chosen;
      out.push(ids.pop());
      lastSubject=subject;
    }
    return out;
  }

  function queue(){
    return reviewMode==='random'?diversifiedRandomOrder(cards):adaptiveOrder(subjectCards());
  }

  function persist(){
    localStorage.setItem(MODE_KEY,reviewMode);
    localStorage.setItem(SUBJECT_KEY,reviewSubject);
    if(reviewIds.length)localStorage.setItem(CURRENT_KEY,String(reviewIds[reviewPos]));
  }

  function restore(){
    // Keep the current session order when simply navigating away and back.
    // Rebuild only if there is no usable queue for the current mode.
    const allowed=new Set(activePool().map(c=>c.id));
    const usable=reviewIds.filter(id=>allowed.has(id));
    if(usable.length!==reviewIds.length)reviewIds=usable;
    if(!reviewIds.length)reviewIds=queue();
    if(!reviewIds.length){reviewPos=0;return;}
    const saved=Number(localStorage.getItem(CURRENT_KEY));
    const i=reviewIds.indexOf(saved);
    reviewPos=i>=0?i:Math.min(reviewPos,reviewIds.length-1);
  }

  function render(){
    updateControls();
    if(!reviewIds.length){
      $('question').textContent=reviewMode==='subject'?`No formulas in ${reviewSubject} yet.`:'No formulas in the deck yet.';
      $('answer').textContent='';
      $('reviewCounter').textContent='0 / 0';
      const kicker=document.querySelector('#reviewView .kicker');
      if(kicker)kicker.textContent=reviewMode==='subject'?reviewSubject.toUpperCase():'ADAPTIVE MIX';
      return;
    }
    if(reviewPos<0||reviewPos>=reviewIds.length)reviewPos=0;
    let c=cards.find(x=>x.id===reviewIds[reviewPos]);
    if(!c){reviewIds=[];restore();c=cards.find(x=>x.id===reviewIds[reviewPos]);if(!c)return;}
    $('question').textContent=c.question;
    $('answer').textContent=c.answer;
    $('answer').style.display='none';
    const kicker=document.querySelector('#reviewView .kicker');
    if(kicker)kicker.textContent=`${c.subject||'Unassigned'} · ${c.topic||'General'}`;
    $('reviewCounter').textContent=`${reviewPos+1} / ${reviewIds.length}`;
    persist();
  }

  function move(step){
    if(!reviewIds.length)return;
    reviewPos=(reviewPos+step+reviewIds.length)%reviewIds.length;
    render();
  }

  function startNew(){
    reviewIds=queue();
    reviewPos=0;
    localStorage.removeItem(CURRENT_KEY);
    persist();
    render();
    showView('review');
  }

  function scheduleRepeat(c,status){
    for(let i=reviewIds.length-1;i>reviewPos;i--){
      if(reviewIds[i]===c.id)reviewIds.splice(i,1);
    }
    const r=cardInfo(c);
    let delay=null;
    if(status==='missed')delay=rand(3,5);
    else if(status==='difficult')delay=rand(8,12);
    else if(status==='known'){
      if(r.accuracy!==null&&r.accuracy<60)delay=rand(14,18);
      else if(r.accuracy!==null&&r.accuracy<80)delay=rand(20,28);
      else if(r.attempts<3)delay=rand(28,40);
    }
    if(delay===null)return;

    let available=reviewIds.length-reviewPos-1;
    let needed=delay-available;
    if(needed>0){
      const fillerPool=activePool().filter(x=>x.id!==c.id);
      const fillers=reviewMode==='random'?diversifiedRandomOrder(fillerPool):adaptiveOrder(fillerPool);
      if(fillers.length){
        while(needed>0){
          const take=fillers.slice(0,Math.min(needed,fillers.length));
          reviewIds.push(...take);
          needed-=take.length;
          if(!take.length)break;
        }
      }
    }
    const insertAt=Math.min(reviewPos+1+delay,reviewIds.length);
    reviewIds.splice(insertAt,0,c.id);
  }

  function rateContinuous(status){
    if(!reviewIds.length)return;
    const c=cards.find(x=>x.id===reviewIds[reviewPos]);
    if(!c)return;
    c.status=status;
    save();
    refresh();
    scheduleRepeat(c,status);
    move(1);
  }

  function setMode(mode){
    reviewMode=mode;
    reviewIds=[];
    persist();
    startNew();
  }

  function setSubject(subject){
    reviewSubject=subject;
    reviewMode='subject';
    reviewIds=[];
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
        <div class="review-mode-title">Training mode <span class="adaptive-badge">Adaptive</span></div>
        <div class="review-mode-sub">Random Mix shuffles across topics; weak formulas still return sooner after you rate them.</div>
      </div>
      <div class="review-mode-actions">
        <button type="button" class="mode-btn" id="randomModeBtn">↻ Random mix</button>
        <div class="subject-mode-wrap">
          <button type="button" class="mode-btn" id="subjectModeBtn">Focus topic</button>
          <select id="reviewSubjectSelect" aria-label="Choose CFA topic"></select>
        </div>
        <button type="button" class="mode-restart" id="restartReviewBtn" title="Start this mode from a newly shuffled queue">New session</button>
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
  const difficult=$('markDifficult');
  if(difficult)difficult.onclick=()=>rateContinuous('difficult');
  $('markKnown').onclick=()=>rateContinuous('known');
  document.querySelectorAll('.navbtn[data-view="review"]').forEach(b=>b.onclick=()=>{buildControls();restore();showView('review');render();});
  const add=$('addExtractedBtn');
  if(add)add.addEventListener('click',()=>setTimeout(()=>{reviewIds=[];buildControls();},0));
  const reset=$('resetDemo');
  if(reset)reset.addEventListener('click',()=>{localStorage.removeItem(CURRENT_KEY);localStorage.removeItem(MODE_KEY);localStorage.removeItem(SUBJECT_KEY);reviewMode='random';reviewIds=[];});
})();

(function loadAppearanceControls(){
  if(!document.querySelector('link[href="ui-settings.css"]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='ui-settings.css';
    document.head.appendChild(link);
  }
  if(!document.querySelector('script[src="ui-settings.js"]')){
    const script=document.createElement('script');
    script.src='ui-settings.js';
    document.body.appendChild(script);
  }
})();
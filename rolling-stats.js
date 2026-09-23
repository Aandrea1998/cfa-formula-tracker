(function(){
  const WINDOW=5;
  const SORT_KEY='cfa_library_accuracy_sort';
  let librarySort=localStorage.getItem(SORT_KEY)||'default';

  function normalizeEntry(x){
    if(typeof x==='string') return {result:x,ts:Date.now()};
    if(!x||!x.result) return null;
    return {result:x.result,ts:x.ts||Date.now()};
  }

  function migrateCard(c){
    if(!Array.isArray(c.history)){
      c.history=c.status?[{result:c.status,ts:Date.now()}]:[];
    }else{
      c.history=c.history.map(normalizeEntry).filter(Boolean).slice(-WINDOW);
    }
    if(c.history.length)c.status=c.history[c.history.length-1].result;
    return c;
  }

  function migrateAll(){cards.forEach(migrateCard);}

  function historyOf(c){
    migrateCard(c);
    return c.history.slice(-WINDOW);
  }

  function info(c){
    const h=historyOf(c);
    const known=h.filter(x=>x.result==='known').length;
    const missed=h.filter(x=>x.result==='missed').length;
    const accuracy=h.length?Math.round(known/h.length*100):null;
    return {attempts:h.length,known,missed,accuracy};
  }

  function appendAttempt(c,result){
    migrateCard(c);
    c.history.push({result,ts:Date.now()});
    c.history=c.history.slice(-WINDOW);
    c.status=result;
  }

  function statsRolling(){
    migrateAll();
    const reviewed=cards.filter(c=>info(c).attempts>0);
    const totalAttempts=reviewed.reduce((s,c)=>s+info(c).attempts,0);
    const knownAttempts=reviewed.reduce((s,c)=>s+info(c).known,0);
    const missedAttempts=totalAttempts-knownAttempts;
    const mastered=reviewed.filter(c=>info(c).accuracy>=80);
    const needReview=reviewed.filter(c=>info(c).accuracy<60);
    return {
      reviewed,
      known:mastered,
      missed:needReview,
      mastered,
      needReview,
      totalAttempts,
      knownAttempts,
      missedAttempts,
      coverage:cards.length?Math.round(reviewed.length/cards.length*100):0,
      accuracy:totalAttempts?Math.round(knownAttempts/totalAttempts*100):0,
      mastery:cards.length?Math.round(mastered.length/cards.length*100):0
    };
  }

  function rollingStatus(c){
    const r=info(c);
    if(!r.attempts)return {accuracy:'—',record:'Unreviewed',cls:'',attempts:0,numeric:null};
    const cls=r.accuracy>=80?'known':r.accuracy<60?'missed':'';
    return {accuracy:r.accuracy+'%',record:`${r.known}/${r.attempts}`,cls,attempts:r.attempts,numeric:r.accuracy};
  }

  function sortCards(list){
    const out=[...list];
    if(librarySort==='default')return out.sort((a,b)=>(+a.id||0)-(+b.id||0));
    return out.sort((a,b)=>{
      const ra=info(a),rb=info(b);
      if(!ra.attempts&&!rb.attempts)return (+a.id||0)-(+b.id||0);
      if(!ra.attempts)return 1;
      if(!rb.attempts)return -1;
      const diff=librarySort==='high'?rb.accuracy-ra.accuracy:ra.accuracy-rb.accuracy;
      if(diff)return diff;
      if(rb.attempts!==ra.attempts)return rb.attempts-ra.attempts;
      return (+a.id||0)-(+b.id||0);
    });
  }

  function ensureSortControls(){
    if(document.getElementById('librarySortControl'))return;
    const card=document.querySelector('#formulasView .card');
    if(!card)return;
    const help=card.querySelector('.help');
    const panel=document.createElement('div');
    panel.id='librarySortControl';
    panel.className='library-sort-control';
    panel.innerHTML=`
      <label for="librarySortSelect">Sort formulas</label>
      <select id="librarySortSelect" aria-label="Sort formulas by rolling accuracy">
        <option value="default">Original order</option>
        <option value="high">Accuracy: high → low</option>
        <option value="low">Accuracy: low → high</option>
      </select>`;
    if(help)help.insertAdjacentElement('beforebegin',panel); else card.appendChild(panel);
    const select=document.getElementById('librarySortSelect');
    select.value=librarySort;
    select.onchange=()=>{
      librarySort=select.value;
      localStorage.setItem(SORT_KEY,librarySort);
      renderLibraryRolling();
    };
  }

  function statusCell(c){
    const s=rollingStatus(c);
    return `<td class="rolling-status-cell" title="Based on the last up to ${WINDOW} attempts">
      <span class="status-dot ${s.cls}"></span>
      <span class="rolling-accuracy">${s.accuracy}</span>
      <span class="rolling-record">${s.record}</span>
    </td>`;
  }

  function renderLibraryRolling(){
    ensureSortControls();
    const sortSelect=document.getElementById('librarySortSelect');
    if(sortSelect&&sortSelect.value!==librarySort)sortSelect.value=librarySort;

    const subjects=['All',...TOPICS];
    $('topicTabs').innerHTML=subjects.map(t=>{const n=t==='All'?cards.length:cards.filter(c=>c.subject===t).length;return `<button class="topic-chip ${librarySubject===t?'active':''}" data-subject="${attr(t)}">${esc(t)} · ${n}</button>`}).join('');
    document.querySelectorAll('.topic-chip').forEach(b=>b.onclick=()=>{librarySubject=b.dataset.subject;renderLibraryRolling()});
    const visible=librarySubject==='All'?cards:cards.filter(c=>c.subject===librarySubject);
    $('formulaCountPill').textContent=`${visible.length} formula${visible.length===1?'':'s'}`;
    if(!visible.length){$('libraryContent').innerHTML=`<div class="empty">No formulas in <strong>${esc(librarySubject)}</strong> yet. Use Upload chapter to add some.</div>`;return;}

    const groups={};
    visible.forEach(c=>{groups[c.subject]??={};groups[c.subject][c.topic]??=[];groups[c.subject][c.topic].push(c)});
    let html='';
    Object.keys(groups).sort((a,b)=>TOPICS.indexOf(a)-TOPICS.indexOf(b)).forEach(subject=>Object.keys(groups[subject]).sort().forEach(topic=>{
      const g=sortCards(groups[subject][topic]);
      html+=`<div class="library-group"><div class="library-head"><div><div class="library-title">${esc(subject)}</div><div class="library-meta">${esc(topic)}</div></div><div class="library-meta">${g.length} formula${g.length===1?'':'s'}</div></div><div class="table-wrap"><table class="table formula-library-table"><colgroup><col class="col-id"><col class="col-prompt"><col class="col-formula"><col class="col-status"></colgroup><thead><tr><th>#</th><th>Prompt</th><th>Formula</th><th class="rolling-status-head">Rolling status</th></tr></thead><tbody>${g.map(c=>`<tr><td>${c.id}</td><td>${esc(c.question)}</td><td><code>${esc(c.answer)}</code></td>${statusCell(c)}</tr>`).join('')}</tbody></table></div></div>`;
    }));
    $('libraryContent').innerHTML=html;
  }

  function refreshRolling(){
    migrateAll();
    const s=statsRolling();
    $('coverage').textContent=s.coverage+'%';
    $('coverageSmall').textContent=`${s.reviewed.length} of ${cards.length} reviewed`;
    $('accuracy').textContent=s.accuracy+'%';
    $('accuracySmall').textContent=`${s.knownAttempts} correct · ${s.missedAttempts} missed · rolling`;
    $('knownCount').textContent=s.mastered.length;
    $('missedCount').textContent=s.needReview.length;
    const knownSmall=$('knownCount').parentElement.querySelector('.small');
    const missedSmall=$('missedCount').parentElement.querySelector('.small');
    if(knownSmall)knownSmall.textContent='≥80% across recent attempts';
    if(missedSmall)missedSmall.textContent='<60% across recent attempts';
    $('accuracyPct').textContent=s.accuracy+'%';
    $('accuracyBar').style.width=s.accuracy+'%';
    $('reviewPct').textContent=s.coverage+'%';
    $('reviewBar').style.width=s.coverage+'%';
    $('masteryPct').textContent=s.mastery+'%';
    $('masteryBar').style.width=s.mastery+'%';

    const rows=document.querySelectorAll('#dashboardView .progress-row .row span:first-child');
    if(rows[2])rows[2].textContent='Mastered among all formulas';

    let note=document.getElementById('rollingWindowNote');
    if(!note){
      note=document.createElement('div');
      note.id='rollingWindowNote';
      note.style.cssText='font-size:12px;color:var(--muted);margin:-8px 0 14px';
      const title=document.querySelector('#dashboardView .two .card .section-title');
      if(title)title.insertAdjacentElement('afterend',note);
    }
    if(note)note.textContent=`Rolling window: last ${WINDOW} attempts per formula (or all available attempts if fewer).`;

    const weak=cards.map(c=>({c,r:info(c)})).filter(x=>x.r.attempts&&x.r.accuracy<80).sort((a,b)=>a.r.accuracy-b.r.accuracy||b.r.attempts-a.r.attempts).slice(0,6);
    $('weakList').innerHTML=weak.length?weak.map(({c,r})=>`<div class="weak"><span>${esc(c.question)}</span><span class="bad">${r.accuracy}% · ${r.known}/${r.attempts}</span></div>`).join(''):`<div class="help">No weak formulas in the current rolling window.</div>`;

    $('subjectOverview').innerHTML=TOPICS.map(t=>{
      const subset=cards.filter(c=>c.subject===t);
      const attempted=subset.filter(c=>info(c).attempts>0);
      const attempts=attempted.reduce((n,c)=>n+info(c).attempts,0);
      const correct=attempted.reduce((n,c)=>n+info(c).known,0);
      const acc=attempts?Math.round(correct/attempts*100):null;
      return `<div class="subject-mini"><span>${esc(t)}</span><span>${acc===null?'—':acc+'%'} · ${attempted.length}/${subset.length}</span></div>`;
    }).join('');

    renderLibraryRolling();
    save();
  }

  migrateAll();
  stats=statsRolling;
  refresh=refreshRolling;
  renderLibrary=renderLibraryRolling;
  window.cfaRollingInfo=info;
  window.cfaRollingWindow=WINDOW;

  function wrapRatingButton(id,result){
    const btn=$(id);
    if(!btn||btn.dataset.rollingWrapped==='1')return;
    const original=btn.onclick;
    btn.onclick=function(e){
      if(reviewIds.length){
        const c=cards.find(x=>x.id===reviewIds[reviewPos]);
        if(c)appendAttempt(c,result);
      }
      return original?original.call(this,e):undefined;
    };
    btn.dataset.rollingWrapped='1';
  }

  wrapRatingButton('markWrong','missed');
  wrapRatingButton('markKnown','known');
  refreshRolling();
})();
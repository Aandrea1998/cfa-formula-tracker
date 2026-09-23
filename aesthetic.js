(function(){
  const accents=['#7c9cff','#5cc8ff','#a78bfa','#f2b34c','#e879f9','#34d399','#fb7185','#22d3ee','#f472b6'];
  const esc=s=>(s||'').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  const info=c=>window.cfaRollingInfo?window.cfaRollingInfo(c):{attempts:c.status?1:0,known:c.status==='known'?1:0,difficult:c.status==='difficult'?1:0,missed:c.status==='missed'?1:0,points:c.status==='known'?1:c.status==='difficult'?.5:0,accuracy:c.status==='known'?100:c.status==='difficult'?50:c.status==='missed'?0:null};

  function gradeClass(acc){
    if(acc===null||acc===undefined)return'unreviewed';
    if(acc>=80)return'strong';
    if(acc>=60)return'medium';
    return'weak';
  }

  function enhanceSubjects(){
    const root=document.getElementById('subjectOverview');
    if(!root||!window.CFA_TOPICS)return;
    [...root.children].forEach((el,i)=>{
      const subject=window.CFA_TOPICS[i];
      if(!subject)return;
      const subset=cards.filter(c=>c.subject===subject);
      const reviewed=subset.filter(c=>info(c).attempts>0);
      const attempts=reviewed.reduce((n,c)=>n+info(c).attempts,0);
      const points=reviewed.reduce((n,c)=>n+info(c).points,0);
      const accuracy=attempts?Math.round(points/attempts*100):null;
      const weak=reviewed.filter(c=>info(c).accuracy<60).length;
      const coverage=subset.length?Math.round(reviewed.length/subset.length*100):0;
      el.style.setProperty('--subject-accent',accents[i%accents.length]);
      el.innerHTML=`
        <div class="subject-mini-top">
          <span class="subject-name"><span class="subject-dot"></span>${esc(subject)}</span>
          <span class="subject-acc ${gradeClass(accuracy)}">${accuracy===null?'—':accuracy+'%'}</span>
        </div>
        <div class="subject-meta">${reviewed.length}/${subset.length} reviewed · ${weak} weak</div>
        <div class="subject-progress"><span style="width:${coverage}%"></span></div>`;
    });
  }

  function recentEvents(){
    const events=[];
    cards.forEach(c=>(c.history||[]).forEach(h=>events.push({result:h.result,ts:h.ts||0})));
    return events.filter(x=>x.result==='known'||x.result==='difficult'||x.result==='missed').sort((a,b)=>a.ts-b.ts).slice(-24);
  }

  function scoreResult(result){return result==='known'?1:result==='difficult'?.5:0;}

  function sparkData(events){
    return events.map((_,i)=>{
      const w=events.slice(Math.max(0,i-4),i+1);
      return Math.round(w.reduce((s,x)=>s+scoreResult(x.result),0)/w.length*100);
    });
  }

  function enhanceTrend(){
    const progressCard=document.querySelector('#dashboardView .two > .card:first-child');
    if(!progressCard)return;
    let box=document.getElementById('recentTrend');
    if(!box){
      box=document.createElement('div');
      box.id='recentTrend';
      box.className='recent-trend';
      const note=document.getElementById('rollingWindowNote');
      if(note)note.insertAdjacentElement('afterend',box);
      else{
        const title=progressCard.querySelector('.section-title');
        if(title)title.insertAdjacentElement('afterend',box);
      }
    }
    const events=recentEvents();
    if(!events.length){
      box.innerHTML='<div><div class="recent-trend-label">Recent recall</div><div class="recent-trend-value">—</div><div class="recent-trend-sub">Start reviewing to build your trend.</div></div>';
      return;
    }
    const vals=sparkData(events);
    const recent=events.slice(-10);
    const recentAcc=Math.round(recent.reduce((s,x)=>s+scoreResult(x.result),0)/recent.length*100);
    const W=210,H=48,pad=3;
    const pts=vals.map((v,i)=>{
      const x=vals.length===1?W/2:pad+i*(W-2*pad)/(vals.length-1);
      const y=pad+(100-v)*(H-2*pad)/100;
      return [x,y];
    });
    const pointStr=pts.map(p=>p.join(',')).join(' ');
    const fillStr=`${pad},${H-pad} ${pointStr} ${W-pad},${H-pad}`;
    box.innerHTML=`
      <div>
        <div class="recent-trend-label">Recent recall</div>
        <div class="recent-trend-value">${recentAcc}%</div>
        <div class="recent-trend-sub">Last ${recent.length} attempt${recent.length===1?'':'s'}</div>
      </div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Recent recall trend">
        <defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7c9cff" stop-opacity=".20"/><stop offset="100%" stop-color="#7c9cff" stop-opacity="0"/></linearGradient></defs>
        <line class="spark-guide" x1="0" x2="${W}" y1="${H/2}" y2="${H/2}"></line>
        <polygon class="spark-fill" points="${fillStr}"></polygon>
        <polyline class="spark-line" points="${pointStr}"></polyline>
      </svg>`;
  }

  function enhanceWeak(){
    const list=document.getElementById('weakList');
    if(!list)return;
    list.querySelectorAll('.weak').forEach(row=>{
      const score=row.querySelector('.bad');
      if(!score)return;
      const m=(score.textContent||'').match(/(\d+)%/);
      const acc=m?Number(m[1]):0;
      score.classList.add('weak-score');
      score.classList.toggle('score-low',acc<60);
      score.classList.toggle('score-mid',acc>=60&&acc<80);
    });
  }

  function enhanceLibrary(){
    document.querySelectorAll('.rolling-status-cell').forEach(cell=>{
      const a=cell.querySelector('.rolling-accuracy');
      const text=(a&&a.textContent||'').trim();
      cell.classList.remove('status-strong','status-medium','status-weak','status-unreviewed');
      if(text==='—')cell.classList.add('status-unreviewed');
      else{
        const n=parseInt(text,10);
        cell.classList.add(n>=80?'status-strong':n>=60?'status-medium':'status-weak');
      }
    });
  }

  function setLibraryCondensed(){
    const view=document.getElementById('formulasView');
    if(!view)return;
    const visible=getComputedStyle(view).display!=='none';
    view.classList.toggle('library-condensed',visible&&view.getBoundingClientRect().top<-36);
  }

  function enhanceAll(){
    enhanceSubjects();
    enhanceTrend();
    enhanceWeak();
    enhanceLibrary();
    setLibraryCondensed();
  }

  if(typeof refresh==='function'){
    const baseRefresh=refresh;
    refresh=function(){
      const out=baseRefresh.apply(this,arguments);
      requestAnimationFrame(enhanceAll);
      return out;
    };
  }

  const watched=['weakList','libraryContent'];
  watched.forEach(id=>{
    const node=document.getElementById(id);
    if(node)new MutationObserver(()=>requestAnimationFrame(enhanceAll)).observe(node,{childList:true,subtree:true});
  });
  window.addEventListener('scroll',setLibraryCondensed,{passive:true});
  window.addEventListener('resize',setLibraryCondensed);
  requestAnimationFrame(enhanceAll);
})();
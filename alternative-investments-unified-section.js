(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Alternative Investments';
  const TOPIC='Alternative Investments';
  const SORTINO_QUESTION='Alternative Investment Performance — Sortino Ratio';
  const SORTINO_LATEX='\\mathrm{Sortino\\ Ratio}=\\frac{R_p-\\mathrm{MAR}}{\\text{Downside Deviation}}';
  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  let changed=0;

  for(const card of cards){
    if(card.subject!==SUBJECT)continue;
    if(card.topic!==TOPIC){
      card.topic=TOPIC;
      changed++;
    }
  }

  let sortino=cards.find(c=>c.subject===SUBJECT&&norm(c.question)===norm(SORTINO_QUESTION));
  if(!sortino){
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    sortino={id:nextId,question:SORTINO_QUESTION,answer:SORTINO_LATEX,latex:SORTINO_LATEX,subject:SUBJECT,topic:TOPIC,sourcePage:7,status:null,history:[]};
    cards.push(sortino);
    changed++;
  }else{
    if(sortino.question!==SORTINO_QUESTION){sortino.question=SORTINO_QUESTION;changed++;}
    if(sortino.answer!==SORTINO_LATEX){sortino.answer=SORTINO_LATEX;changed++;}
    if(sortino.latex!==SORTINO_LATEX){sortino.latex=SORTINO_LATEX;changed++;}
    if(sortino.topic!==TOPIC){sortino.topic=TOPIC;changed++;}
    if(sortino.sourcePage!==7){sortino.sourcePage=7;changed++;}
    if(sortino.formulaImage){delete sortino.formulaImage;changed++;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
    try{if(typeof refresh==='function')refresh();}catch(_e){}
    try{
      ['cfa_review_current_id','cfa_review_position','cfa_review_queue','cfa_review_queue_signature'].forEach(k=>localStorage.removeItem(k));
      localStorage.setItem('cfa_review_coverage_complete','0');
      if(typeof reviewIds!=='undefined')reviewIds=[];
      if(typeof reviewPos!=='undefined')reviewPos=0;
    }catch(_e){}
    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);
  }

  window.CFAAlternativeInvestmentsUnifiedSection={changed};
})();

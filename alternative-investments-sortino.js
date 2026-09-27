(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Alternative Investments';
  const TOPIC='Alternative Investments';
  const QUESTION='Alternative Investment Performance — Sortino Ratio';
  const LATEX='\\mathrm{Sortino\\ Ratio}=\\frac{R_p-\\mathrm{MAR}}{\\text{Downside Deviation}}';
  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');

  let changed=false;
  let card=cards.find(c=>c.subject===SUBJECT&&norm(c.question)===norm(QUESTION));

  if(!card){
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    card={id:nextId,question:QUESTION,answer:LATEX,latex:LATEX,subject:SUBJECT,topic:TOPIC,sourcePage:7,status:null,history:[]};
    cards.push(card);
    changed=true;
  }else{
    if(card.question!==QUESTION){card.question=QUESTION;changed=true;}
    if(card.answer!==LATEX){card.answer=LATEX;changed=true;}
    if(card.latex!==LATEX){card.latex=LATEX;changed=true;}
    if(card.topic!==TOPIC){card.topic=TOPIC;changed=true;}
    if(card.sourcePage!==7){card.sourcePage=7;changed=true;}
    if(card.formulaImage){delete card.formulaImage;changed=true;}
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
    },0);
  }

  window.CFAAlternativeInvestmentsSortino={changed};
})();

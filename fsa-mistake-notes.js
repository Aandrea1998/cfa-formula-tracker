(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Financial Statement Analysis';
  const TOPIC='Equity Method Investments';
  const QUESTION='Impairment of Associates — IFRS vs US GAAP';
  const LATEX='\\begin{aligned}&\\text{No separate goodwill impairment test}\\\\&\\text{IFRS: Recoverable amount; reversal allowed}\\\\&\\text{US GAAP: Fair value + permanent decline; no reversal}\\end{aligned}';
  const ANSWER='No separate goodwill impairment test; IFRS: Recoverable amount, reversal allowed; US GAAP: Fair value + permanent decline, no reversal.';

  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const qkey=s=>tidy(s).toLowerCase().replace(/[^a-z0-9]+/g,'');

  let changed=0,added=0;
  let card=cards.find(c=>qkey(c.question)===qkey(QUESTION));

  if(!card){
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    card={
      id:nextId,
      question:QUESTION,
      answer:ANSWER,
      latex:LATEX,
      subject:SUBJECT,
      topic:TOPIC,
      status:null,
      history:[]
    };
    cards.push(card);
    added=1;
    changed=1;
  }else{
    const updates={
      question:QUESTION,
      answer:ANSWER,
      latex:LATEX,
      subject:SUBJECT,
      topic:TOPIC
    };
    for(const [k,v] of Object.entries(updates)){
      if(card[k]!==v){card[k]=v;changed=1;}
    }
    if(card.formulaImage){delete card.formulaImage;changed=1;}
    if(!Array.isArray(card.history)){card.history=[];changed=1;}
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

  window.CFAFSAMistakeNotes={
    version:'2026-10-16',
    added,
    changed
  };
})();
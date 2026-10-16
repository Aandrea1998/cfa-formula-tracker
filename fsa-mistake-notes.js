(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Financial Statement Analysis';
  const TOPIC='Equity Method Investments';
  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const qkey=s=>tidy(s).toLowerCase().replace(/[^a-z0-9]+/g,'');

  const defs=[
    {
      question:'Impairment of Associates — IFRS vs US GAAP',
      latex:'\\begin{aligned}&\\text{No separate goodwill impairment test}\\\\&\\text{IFRS: Recoverable amount; reversal allowed}\\\\&\\text{US GAAP: Fair value + permanent decline; no reversal}\\end{aligned}',
      answer:'No separate goodwill impairment test; IFRS: Recoverable amount, reversal allowed; US GAAP: Fair value + permanent decline, no reversal.'
    },
    {
      question:'Upstream Transaction — Unrealized Profit Elimination',
      latex:'\\begin{aligned}&\\text{Associate}\\rightarrow\\text{Investor}\\\\&\\text{Eliminate: Ownership \\%}\\times\\text{Profit from Equity Income}\\\\&\\text{Investor NI}\\downarrow,\\quad\\text{Investment in Associate}\\downarrow\\end{aligned}',
      answer:'Associate → Investor. Eliminate ownership % × profit from Equity Income. Investor NI ↓ and Investment in Associate ↓.'
    },
    {
      question:'Downstream Transaction — Unrealized Profit Elimination',
      latex:'\\begin{aligned}&\\text{Investor}\\rightarrow\\text{Associate}\\\\&\\text{Eliminate: Ownership \\%}\\times\\text{Profit from Investor\'s Own Profit}\\\\&\\text{Investor NI}\\downarrow,\\quad\\text{Investment in Associate}\\downarrow\\end{aligned}',
      answer:'Investor → Associate. Eliminate ownership % × profit from investor’s own profit. Investor NI ↓ and Investment in Associate ↓.'
    }
  ];

  let changed=0,added=0;
  for(const def of defs){
    let card=cards.find(c=>qkey(c.question)===qkey(def.question));
    if(!card){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      card={
        id:nextId,
        question:def.question,
        answer:def.answer,
        latex:def.latex,
        subject:SUBJECT,
        topic:TOPIC,
        status:null,
        history:[]
      };
      cards.push(card);
      added++;
      changed++;
    }else{
      const updates={
        question:def.question,
        answer:def.answer,
        latex:def.latex,
        subject:SUBJECT,
        topic:TOPIC
      };
      let local=false;
      for(const [k,v] of Object.entries(updates)){
        if(card[k]!==v){card[k]=v;local=true;}
      }
      if(card.formulaImage){delete card.formulaImage;local=true;}
      if(!Array.isArray(card.history)){card.history=[];local=true;}
      if(local)changed++;
    }
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
    changed,
    total:defs.length
  };
})();
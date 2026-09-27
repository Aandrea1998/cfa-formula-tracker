(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Corporate Issuers';
  const TOPIC='Corporate Issuers';
  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  const formulaKey=s=>String(s??'').replace(/\s+/g,'').toLowerCase();

  const defs=[
    {
      page:1,
      question:'Stock Dividend — Shares, Price, and EPS Adjustment',
      latex:'\\begin{aligned}\\text{Shares}_{\\text{after}}&=\\text{Shares}_{\\text{before}}(1+s)\\\\P_{\\text{after}}&=\\frac{P_{\\text{before}}}{1+s}\\\\\\mathrm{EPS}_{\\text{after}}&=\\frac{\\mathrm{EPS}_{\\text{before}}}{1+s}\\end{aligned}'
    },
    {
      page:1,
      question:'Dividend Taxation — Double Taxation System',
      latex:'\\begin{aligned}\\text{Net Dividend}&=E(1-T_c)(1-T_s)\\\\T_{\\text{effective}}&=1-(1-T_c)(1-T_s)\\end{aligned}'
    },
    {
      page:1,
      question:'Dividend Taxation — Full Imputation System',
      latex:'\\begin{aligned}\\text{Shareholder Tax Due}&=T_sE-\\text{Corporate Tax Credit}\\\\\\text{Net Amount to Shareholder}&=E(1-T_s)\\end{aligned}'
    },
    {
      page:1,
      question:'Dividend Taxation — Split-Rate Tax System',
      latex:'\\begin{aligned}\\text{Net Dividend}&=E_D(1-T_D)(1-T_s)\\\\T_{\\text{effective}}&=1-(1-T_D)(1-T_s)\\end{aligned}'
    },
    {
      page:2,
      question:'Lintner Model — Dividend Adjustment',
      latex:'\\begin{aligned}\\Delta D&=\\big(E\\times\\mathrm{TPR}-D_{t-1}\\big)\\times\\mathrm{AF}\\\\D_t&=D_{t-1}+\\mathrm{AF}\\big(E\\times\\mathrm{TPR}-D_{t-1}\\big)\\end{aligned}'
    },
    {
      page:2,
      question:'Cash-Financed Share Repurchase — Effect on BVPS',
      latex:'\\begin{cases}P_{\\text{buyback}}>\\mathrm{BVPS}\\Rightarrow\\mathrm{BVPS}\\downarrow\\\\P_{\\text{buyback}}<\\mathrm{BVPS}\\Rightarrow\\mathrm{BVPS}\\uparrow\\\\P_{\\text{buyback}}=\\mathrm{BVPS}\\Rightarrow\\mathrm{BVPS}\\text{ unchanged}\\end{cases}'
    },
    {
      page:2,
      question:'FCFE Coverage Ratio',
      latex:'\\mathrm{FCFE\\ Coverage\\ Ratio}=\\frac{\\mathrm{FCFE}}{\\text{Dividends}+\\text{Share Repurchases}}'
    }
  ];

  let changed=0,added=0,removed=0;

  function mergeHistory(target,source){
    const a=Array.isArray(target.history)?target.history:[];
    const b=Array.isArray(source.history)?source.history:[];
    if(b.length)target.history=[...a,...b];
    if(!target.status&&source.status)target.status=source.status;
  }

  function upsert(def){
    const qKey=norm(def.question);
    const fKey=formulaKey(def.latex);
    let card=cards.find(c=>c.subject===SUBJECT&&norm(c.question)===qKey);
    if(!card)card=cards.find(c=>c.subject===SUBJECT&&formulaKey(c.latex||c.answer)===fKey);

    if(!card){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:def.question,answer:def.latex,latex:def.latex,subject:SUBJECT,topic:TOPIC,sourcePage:def.page,status:null,history:[]});
      added++;changed++;
      return;
    }

    let local=false;
    if(card.question!==def.question){card.question=def.question;local=true;}
    if(card.answer!==def.latex){card.answer=def.latex;local=true;}
    if(card.latex!==def.latex){card.latex=def.latex;local=true;}
    if(card.subject!==SUBJECT){card.subject=SUBJECT;local=true;}
    if(card.topic!==TOPIC){card.topic=TOPIC;local=true;}
    if(card.sourcePage!==def.page){card.sourcePage=def.page;local=true;}
    if(card.formulaImage){delete card.formulaImage;local=true;}
    if(local)changed++;
  }

  defs.forEach(upsert);

  // Keep Corporate Issuers as one section and remove exact formula duplicates.
  for(const card of cards){
    if(card.subject===SUBJECT&&card.topic!==TOPIC){card.topic=TOPIC;changed++;}
  }
  const seen=new Map();
  for(const card of [...cards]){
    if(card.subject!==SUBJECT)continue;
    const key=formulaKey(card.latex||card.answer);
    if(!key)continue;
    if(!seen.has(key)){seen.set(key,card);continue;}
    const keep=seen.get(key);
    mergeHistory(keep,card);
    const i=cards.indexOf(card);
    if(i>=0){cards.splice(i,1);removed++;changed++;}
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

  window.CFACorporateIssuersPayoutPolicy={added,removed,changed,total:defs.length};
})();

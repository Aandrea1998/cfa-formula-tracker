(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Corporate Issuers';
  const TOPIC='Corporate Issuers';
  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  const formulaKey=s=>String(s??'').replace(/\s+/g,'').toLowerCase();

  const defs=[
    {page:1,question:'Pyramid Ownership — Effective Economic Ownership',latex:'\\text{Effective Economic Ownership}=\\prod_{i=1}^{n}\\text{Ownership Stake}_i'},
    {page:1,question:'Pre-Tax Cost of Debt — Risk-Free Rate Plus Credit Spread',latex:'r_d=r_f+\\text{Credit Spread}'},
    {page:1,question:'CAPM Cost of Equity — Equity Risk Premium',latex:'\\begin{aligned}r_e&=r_f+\\beta(\\mathrm{ERP})\\\\\\mathrm{ERP}&=R_m-r_f\\end{aligned}'},
    {page:1,question:'Cost of Debt — Traded Straight Debt',latex:'\\begin{aligned}r_d&\\approx\\mathrm{YTM}_{\\text{existing straight debt}}\\\\r_d&\\approx\\mathrm{YTM}_{\\text{most representative liquid bond}}\\end{aligned}'},
    {page:2,question:'Cost of Debt — Non-Traded Debt from Comparable Bonds',latex:'r_d\\approx\\mathrm{YTM}_{\\text{comparable bonds}}'},
    {page:2,question:'Matrix Pricing — YTM Linear Interpolation',latex:'\\mathrm{YTM}_x=\\mathrm{YTM}_1+\\frac{x-M_1}{M_2-M_1}(\\mathrm{YTM}_2-\\mathrm{YTM}_1)'},
    {page:2,question:'Rate Implicit in a Lease — Valuation Identity',latex:'\\mathrm{PV}(\\text{Lease Payments})+\\mathrm{PV}(\\text{Residual Value})=\\mathrm{FV}(\\text{Leased Asset})+\\text{Lessor Initial Direct Costs}'},
    {page:2,question:'Forward-Looking Equity Risk Premium — DDM Approach',latex:'\\begin{aligned}r_e&=\\frac{D_1}{V_0}+g\\\\\\mathrm{ERP}&=E\\!\\left(\\frac{D_1}{V_0}\\right)+E(g)-r_f\\end{aligned}'},
    {page:2,question:'Forward-Looking Equity Risk Premium — Grinold-Kroner',latex:'\\begin{aligned}\\mathrm{ERP}&=\\mathrm{DY}+\\Delta(P/E)+i+g-\\Delta S-E(r_f)\\\\\\text{EPS Growth}&=i+g-\\Delta S\\end{aligned}'},
    {page:2,question:'Expected Inflation — Treasury and TIPS Yields',latex:'i=\\frac{1+\\mathrm{YTM}_{\\text{Treasury}}}{1+\\mathrm{YTM}_{\\text{TIPS}}}-1\\approx\\mathrm{YTM}_{\\text{Treasury}}-\\mathrm{YTM}_{\\text{TIPS}}'},
    {page:3,question:'Required Return on Equity — Bond Yield Plus Risk Premium',latex:'r_e=r_d+\\mathrm{RP}'},
    {page:3,question:'Required Return on Equity — Fama-French Three-Factor Model',latex:'r_e=r_f+\\beta_1\\mathrm{ERP}+\\beta_2\\mathrm{SMB}+\\beta_3\\mathrm{HML}'},
    {page:3,question:'Required Return on Equity — Global CAPM',latex:'E(r_e)=r_f+\\beta_G\\left[E(r_{GM})-r_f\\right]'},
    {page:4,question:'Required Return on Equity — International CAPM',latex:'E(r_e)=r_f+\\beta_G\\left[E(r_{GM})-r_f\\right]+\\beta_C\\left[E(r_C)-r_f\\right]'},
    {page:4,question:'Private Company Required Return — Build-Up Approach',latex:'r_e=r_f+\\mathrm{ERP}+\\mathrm{SP}+\\mathrm{IP}+\\mathrm{SCRP}'},
    {page:4,question:'Local Equity Risk Premium — Country Spread Model',latex:'\\mathrm{ERP}_{\\text{local}}=\\mathrm{ERP}_{\\text{developed}}+\\lambda(\\mathrm{CRP})'},
    {page:4,question:'Country Risk Premium — Volatility-Adjusted Sovereign Spread',latex:'\\mathrm{CRP}=\\text{Sovereign Yield Spread}\\times\\frac{\\sigma_{\\text{Equity}}}{\\sigma_{\\text{Bond}}}'}
  ];

  let changed=0,added=0,removed=0;

  function mergeHistory(target,source){
    const a=Array.isArray(target.history)?target.history:[];
    const b=Array.isArray(source.history)?source.history:[];
    if(b.length)target.history=[...a,...b];
    if(!target.status&&source.status)target.status=source.status;
  }

  function upsert(def){
    const qKey=norm(def.question),fKey=formulaKey(def.latex);
    let card=cards.find(c=>c.subject===SUBJECT&&norm(c.question)===qKey);
    if(!card)card=cards.find(c=>c.subject===SUBJECT&&formulaKey(c.latex||c.answer)===fKey);

    if(!card){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:def.question,answer:def.latex,latex:def.latex,subject:SUBJECT,topic:TOPIC,sourcePage:def.page,status:null,history:[]});
      added++;changed++;return;
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

  for(const card of cards){
    if(card.subject===SUBJECT&&card.topic!==TOPIC){card.topic=TOPIC;changed++;}
  }

  const seen=new Map();
  for(const card of [...cards]){
    if(card.subject!==SUBJECT)continue;
    const key=formulaKey(card.latex||card.answer);
    if(!key)continue;
    if(!seen.has(key)){seen.set(key,card);continue;}
    const keep=seen.get(key);mergeHistory(keep,card);
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
    setTimeout(()=>{try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}},0);
  }

  window.CFACorporateIssuersOwnershipESGCostCapital={added,removed,changed,total:defs.length};
})();

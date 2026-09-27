(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Alternative Investments';
  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  const formulaKey=s=>String(s??'').replace(/\s+/g,'').toLowerCase();

  const defs=[
    {topic:'Commodity Markets',page:1,question:'Commodity Futures Basis',latex:'\\mathrm{Basis}=S_0-F_0'},
    {topic:'Commodity Markets',page:1,question:'Commodity Futures Calendar Spread',latex:'\\text{Calendar Spread}=F_{\\text{near}}-F_{\\text{far}}'},
    {topic:'Commodity Markets',page:1,question:'Commodity Futures Roll Return',latex:'\\begin{aligned}\\text{Roll Return}&=\\frac{F_{\\text{near, close}}-F_{\\text{far, close}}}{F_{\\text{near, close}}}\\times\\%\\text{ Position Rolled}\\\\\\text{Full Roll}&=\\frac{F_{\\text{near}}-F_{\\text{far}}}{F_{\\text{near}}}\\end{aligned}'},
    {topic:'Commodity Markets',page:1,question:'Commodity Total Return',latex:'\\text{Total Return}=\\text{Spot Return}+\\text{Roll Return}+\\text{Collateral Return}'},
    {topic:'Commodity Markets',page:1,question:'Commodity Basis Swap — Basis Differential',latex:'\\mathrm{Basis}=P_A-P_B'},
    {topic:'Commodity Markets',page:1,question:'Commodity Basis Swap — Net Settlement',latex:'\\text{Net Settlement}=(\\text{Actual Basis}-\\text{Fixed Basis})Q'},

    {topic:'Real Estate & REITs',page:1,question:'Real Estate NOI — Effective Gross Income Method',latex:'\\mathrm{NOI}=\\mathrm{EGI}-\\mathrm{OE}-\\mathrm{MA}'},
    {topic:'Real Estate & REITs',page:1,question:'Effective Gross Income',latex:'\\mathrm{EGI}=\\text{Gross Rental Revenue}-\\text{Vacancy \\& Collection Loss}'},
    {topic:'Real Estate & REITs',page:1,question:'Real Estate NOI — Rental Revenue Method',latex:'\\begin{aligned}\\mathrm{NOI}&=\\text{Gross Rental Revenue}-\\text{Vacancy \\& Collection Loss}\\\\&\\quad-\\text{Operating Expenses}\\end{aligned}'},

    {topic:'Real Estate & REITs',page:2,question:'Loan-to-Value Ratio (LTV)',latex:'\\mathrm{LTV}=\\frac{\\text{Mortgage Debt Outstanding}}{\\text{Current Property Value}}'},
    {topic:'Real Estate & REITs',page:2,question:'Debt Service Coverage Ratio (DSCR)',latex:'\\mathrm{DSCR}=\\frac{\\mathrm{NOI}}{\\text{Debt Service}}'},
    {topic:'Real Estate & REITs',page:2,question:'Real Estate Pre-Tax Cash Flow',latex:'\\text{Pre-Tax Cash Flow}=\\mathrm{NOI}-\\text{Debt Service}'},
    {topic:'Real Estate & REITs',page:2,question:'Real Estate Equity Dividend Rate',latex:'\\begin{aligned}\\text{Equity Investment}&=\\text{Purchase Price}-\\text{Mortgage Loan}\\\\\\text{Equity Dividend Rate}&=\\frac{\\text{Pre-Tax Cash Flow}}{\\text{Equity Investment}}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:2,question:'Real Estate After-Tax Cash Flow',latex:'\\begin{aligned}\\text{Taxes}&=t(\\mathrm{NOI}-\\text{Interest Expense}-\\text{Depreciation})\\\\\\text{After-Tax Cash Flow}&=\\text{Pre-Tax Cash Flow}-\\text{Taxes}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:2,question:'REIT Funds From Operations (FFO)',latex:'\\begin{aligned}\\mathrm{FFO}=\\mathrm{NI}+\\text{Depreciation}+\\text{Amortization}\\\\-\\text{Net Gains on Property Sales}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:2,question:'Gross Potential Rental Income',latex:'\\text{Gross Potential Rental Income}=\\text{Market Rent}\\times\\text{Rentable Space}'},
    {topic:'Real Estate & REITs',page:2,question:'Direct Capitalization — Property Value',latex:'\\begin{aligned}V_0&=\\frac{\\mathrm{NOI}_1}{\\text{Cap Rate}}\\\\\\text{Cap Rate}&=r-g\\\\\\therefore V_0&=\\frac{\\mathrm{NOI}_1}{r-g}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:2,question:'DCF Property Valuation',latex:'V_0=\\sum_{i=1}^{n}\\frac{\\mathrm{NOI}_i}{(1+r)^i}+\\frac{\\text{Terminal Value}}{(1+r)^n}'},

    {topic:'Real Estate & REITs',page:3,question:'Real Estate Cost New',latex:'\\begin{aligned}\\text{Cost New}&=\\text{Land Value}+\\text{Construction Costs}+\\text{Soft Costs}\\\\&\\quad+\\text{Financing Costs}+\\text{Developer Profit}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:3,question:'Real Estate Depreciable Base',latex:'\\text{Depreciable Base}=\\text{Cost New}-\\text{Land Value}'},
    {topic:'Real Estate & REITs',page:3,question:'Straight-Line Depreciation — Real Estate',latex:'\\begin{aligned}\\text{Annual Depreciation}&=\\frac{\\text{Depreciable Base}}{\\text{Useful Life}}\\\\\\text{Accumulated Depreciation}&=\\text{Annual Depreciation}\\times\\text{Property Age}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:3,question:'Cost Approach — Property Value',latex:'\\begin{aligned}\\text{Property Value}&=\\text{Cost New}-\\text{Accumulated Depreciation}\\\\&=\\text{Land Value}+\\text{Depreciated Value of Improvements}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:3,question:'Real Estate Holding Period Return (HPR)',latex:'\\begin{aligned}\\mathrm{HPR}&=\\frac{\\mathrm{NOI}-\\mathrm{CapEx}+(\\text{Ending Value}-\\text{Beginning Value})}{\\text{Beginning Value}}\\\\\\mathrm{HPR}&=\\text{Income Return}+\\text{Capital Appreciation Return}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:3,question:'Smoothed Appraisal Return',latex:'R_t^{*}=\\alpha R_t+(1-\\alpha)R_{t-1}^{*}'},
    {topic:'Real Estate & REITs',page:3,question:'Unsmoothing Appraisal Return',latex:'R_t=\\frac{R_t^{*}-(1-\\alpha)R_{t-1}^{*}}{\\alpha}'},
    {topic:'Real Estate & REITs',page:3,question:'REIT Adjusted Funds From Operations (AFFO)',latex:'\\mathrm{AFFO}=\\mathrm{FFO}-\\text{Noncash Rent}-\\text{Recurring CapEx}'},

    {topic:'Real Estate & REITs',page:4,question:'REIT Pro Forma Cash NOI',latex:'\\begin{aligned}\\text{Pro Forma Cash NOI}&=\\text{Historical NOI}-\\text{Noncash Rent}\\\\&\\quad\\pm\\text{Acquisition/Other Adjustments}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:4,question:'REIT Forecast NOI',latex:'\\mathrm{NOI}_1=\\mathrm{NOI}_0(1+g)'},
    {topic:'Real Estate & REITs',page:4,question:'REIT Operating Real Estate Value',latex:'\\text{Operating Real Estate Value}=\\frac{\\text{Expected Cash NOI}}{\\text{Cap Rate}}'},
    {topic:'Real Estate & REITs',page:4,question:'REIT Gross Asset Value (GAV)',latex:'\\begin{aligned}\\mathrm{GAV}&=\\text{Operating Real Estate Value}+\\text{Cash}+\\text{Development Land}\\\\&\\quad+\\text{Receivables}+\\text{Other Assets}\\end{aligned}'},
    {topic:'Real Estate & REITs',page:4,question:'REIT Net Asset Value (NAV)',latex:'\\begin{aligned}\\mathrm{NAV}&=\\mathrm{GAV}-\\text{Debt}-\\text{Other Liabilities}\\\\&=\\mathrm{FV}(\\text{Assets})-\\mathrm{FV}(\\text{Liabilities})\\end{aligned}'},
    {topic:'Real Estate & REITs',page:4,question:'REIT NAV per Share',latex:'\\mathrm{NAVPS}=\\frac{\\mathrm{NAV}}{\\text{Shares Outstanding}}'}
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
      cards.push({id:nextId,question:def.question,answer:def.latex,latex:def.latex,subject:SUBJECT,topic:def.topic,sourcePage:def.page,status:null,history:[]});
      added++;changed++;
      return;
    }

    let local=false;
    if(card.question!==def.question){card.question=def.question;local=true;}
    if(card.answer!==def.latex){card.answer=def.latex;local=true;}
    if(card.latex!==def.latex){card.latex=def.latex;local=true;}
    if(card.subject!==SUBJECT){card.subject=SUBJECT;local=true;}
    if(card.topic!==def.topic){card.topic=def.topic;local=true;}
    if(card.sourcePage!==def.page){card.sourcePage=def.page;local=true;}
    if(card.formulaImage){delete card.formulaImage;local=true;}
    if(local){changed++;}
  }

  defs.forEach(upsert);

  // Remove exact formula duplicates inside Alternative Investments while preserving history.
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

    // New formulas must enter the next full-coverage review pass.
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

  window.CFAAlternativeInvestmentsPages1to4={added,removed,changed,total:defs.length};
})();

(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Portfolio Management';
  const TOPIC='Chapter 1';
  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const key=s=>tidy(s).toLowerCase().replace(/[^a-z0-9]+/g,'');
  const latexKey=s=>tidy(s)
    .replace(/\\(?:left|right|,|;|!|quad|qquad)/g,'')
    .replace(/\\(?:mathrm|text)\{([^{}]*)\}/g,'$1')
    .replace(/\\begin\{aligned\}|\\end\{aligned\}|\\\\/g,'')
    .replace(/[{}\s]/g,'')
    .toLowerCase();

  const SPECS=[
    {
      question:'General Asset Pricing — Expected Cash Flows and Required Return',
      aliases:['General Asset Pricing Formula'],
      latex:'P_t^i=\\sum_{s=1}^{N}\\frac{E_t[\\widetilde{CF}_{t+s}^i]}{(1+l_{t,s}+\\theta_{t,s}+\\rho_{t,s}^i)^s}'
    },
    {
      question:'Price of Future Consumption — From the Stochastic Discount Factor',
      aliases:['Price of Future Consumption'],
      latex:'P_{t,s}=E_t[\\widetilde{m}_{t,s}]'
    },
    {
      question:'Lognormal Stochastic Discount Factor',
      aliases:['Lognormal Stochastic Discount Factor'],
      latex:'m_{t,1}=e^{a+bz}'
    },
    {
      question:'One-Period Real Risk-Free Rate — From the Stochastic Discount Factor',
      aliases:['One-Period Real Risk-Free Rate','Risk-Free Rate from the Pricing Relation'],
      latex:'\\begin{aligned}1&=E_t(m_{t,1})(1+r_f)\\\\r_f&=\\frac{1}{E_t(m_{t,1})}-1\\\\l_{t,1}&=\\frac{1-P_{t,1}}{P_{t,1}}=\\frac{1}{E_t(\\widetilde m_{t,1})}-1\\end{aligned}'
    },
    {
      question:'Risky Future Payoff Pricing — SDF Covariance Decomposition',
      aliases:['Pricing a Risky Future Payoff with the Stochastic Discount Factor'],
      latex:'\\begin{aligned}P_{t,s}&=E_t(\\widetilde P_{t+1,s-1}\\widetilde m_{t,1})\\\\&=E_t(\\widetilde P_{t+1,s-1})E_t(\\widetilde m_{t,1})+\\operatorname{Cov}_t(\\widetilde P_{t+1,s-1},\\widetilde m_{t,1})\\\\\\operatorname{Cov}_t(\\widetilde P,\\widetilde m)<0&\\Rightarrow\\text{ positive risk premium}\\end{aligned}'
    },
    {
      question:'Taylor Rule — Policy Rate',
      aliases:['Taylor Rule'],
      latex:'\\begin{aligned}pr_t&=l_t+i_t+0.5(i_t-i_t^{*})+0.5(Y_t-Y_t^{*})\\\\&=l_t+1.5i_t-0.5i_t^{*}+0.5(Y_t-Y_t^{*})\\end{aligned}'
    },
    {
      question:'Break-Even Inflation — Nominal vs Real Yield',
      aliases:['Break-Even Inflation (BEI)','Break-Even Inflation'],
      latex:'\\begin{aligned}\\mathrm{BEI}&=y_{\\text{Nominal}}-y_{\\text{Real}}\\\\&=E(\\pi)+\\text{Inflation Risk Premium}\\end{aligned}'
    },
    {
      question:'Yield Curve — Main Drivers',
      aliases:['Yield Curve Drivers'],
      latex:'\\text{Yield Curve}=\\text{Expected Future Short Rates}+\\text{Inflation Expectations}+\\text{Term/Risk Premium}'
    },
    {
      question:'Asset-Class Discount Rate Build-Up',
      aliases:['Default-Free Nominal Coupon-Paying Bond','Pricing a Bond with Credit Risk','Equity Pricing Formula','Commercial Real Estate Pricing Formula'],
      latex:'\\begin{aligned}r_{\\text{Default-Free Nominal}}&=l+\\theta+\\pi\\\\r_{\\text{Credit Bond}}&=l+\\theta+\\pi+\\gamma\\\\r_{\\text{Equity}}&=l+\\theta+\\pi+\\gamma+\\kappa\\\\r_{\\text{Commercial Real Estate}}&=l+\\theta+\\pi+\\gamma+\\kappa+\\phi\\end{aligned}'
    },
    {
      question:'Commercial Real Estate Discount Rate — Tenant and Cash-Flow Type',
      aliases:['Discount rate by property/tenant type'],
      latex:'\\begin{aligned}r_{\\text{Real Government}}&=l+\\kappa+\\phi\\\\r_{\\text{Nominal Government}}&=l+\\theta+\\pi+\\kappa+\\phi\\\\r_{\\text{Nominal Corporate}}&=l+\\theta+\\pi+\\gamma+\\kappa+\\phi\\end{aligned}'
    }
  ];

  const existingPromptKeys=new Set(cards.map(c=>key(c.question)));
  const existingLatexKeys=new Set(cards.map(c=>latexKey(c.latex||c.answer)).filter(Boolean));
  let nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
  let added=0,skipped=0;

  for(const spec of SPECS){
    const promptKeys=[spec.question,...(spec.aliases||[])].map(key);
    const formulaKey=latexKey(spec.latex);
    const promptExists=promptKeys.some(k=>existingPromptKeys.has(k));
    const formulaExists=formulaKey&&existingLatexKeys.has(formulaKey);
    if(promptExists||formulaExists){skipped++;continue;}

    cards.push({
      id:nextId++,
      question:spec.question,
      answer:spec.latex,
      latex:spec.latex,
      subject:SUBJECT,
      topic:TOPIC,
      status:null,
      history:[]
    });
    existingPromptKeys.add(key(spec.question));
    existingLatexKeys.add(formulaKey);
    added++;
  }

  if(added){
    try{if(typeof save==='function')save();}catch(_e){}
    try{if(typeof refresh==='function')refresh();}catch(_e){}
    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);
  }

  window.CFAPortfolioManagementChapter1={added,skipped,total:SPECS.length};
})();

(function loadPortfolioManagementChapter2(){
  if(document.querySelector('script[src="portfolio-management-chapter-2.js"]'))return;
  const script=document.createElement('script');
  script.src='portfolio-management-chapter-2.js';
  script.defer=true;
  document.body.appendChild(script);
})();

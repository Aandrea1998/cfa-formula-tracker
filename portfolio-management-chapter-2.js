(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Portfolio Management';
  const TOPIC='Chapter 2';
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
      question:'Benchmark Portfolio Return',
      aliases:['Benchmark Return'],
      latex:'R_B=\\sum_{i=1}^{N}w_{B,i}R_i'
    },
    {
      question:'Active Return — Portfolio vs Benchmark',
      aliases:['Active Return','Value Added'],
      latex:'R_A=R_P-R_B'
    },
    {
      question:'Portfolio Alpha — Relative to the Benchmark',
      aliases:['Portfolio Alpha'],
      latex:'\\alpha_P=R_P-\\beta_P R_B'
    },
    {
      question:'Portfolio Beta — Relative to the Benchmark',
      aliases:['Portfolio Beta Relative to the Benchmark'],
      latex:'\\beta_P=\\frac{\\operatorname{Cov}(R_P,R_B)}{\\operatorname{Var}(R_B)}'
    },
    {
      question:'Active Weight — Portfolio vs Benchmark',
      aliases:['Active Weight'],
      latex:'\\begin{aligned}\\Delta w_i&=w_{P,i}-w_{B,i}\\\\\\sum_{i=1}^{N}\\Delta w_i&=0\\end{aligned}'
    },
    {
      question:'Value Added Decomposition — Asset Allocation and Security Selection',
      aliases:['Decomposition of Value Added','Asset Allocation Effect','Security Selection Effect'],
      latex:'R_A=\\underbrace{\\sum_{j=1}^{M}\\Delta w_jR_{B,j}}_{\\text{Asset Allocation}}+\\underbrace{\\sum_{j=1}^{M}w_{P,j}R_{A,j}}_{\\text{Security Selection}}'
    },
    {
      question:'Sharpe Ratio — Excess Return per Unit of Total Risk',
      aliases:['Sharpe Ratio'],
      latex:'SR_P=\\frac{R_P-R_F}{\\sigma_P}'
    },
    {
      question:'Monthly-to-Annual Return and Volatility Scaling',
      aliases:['Annualization'],
      latex:'\\begin{aligned}R_{\\text{annual}}&=12R_{\\text{monthly}}\\\\\\sigma_{\\text{annual}}&=\\sigma_{\\text{monthly}}\\sqrt{12}\\end{aligned}'
    },
    {
      question:'Information Ratio and Tracking Error',
      aliases:['Information Ratio','Tracking Error'],
      latex:'\\begin{aligned}IR&=\\frac{R_P-R_B}{\\sigma(R_P-R_B)}=\\frac{R_A}{\\sigma_A}\\\\TE&=\\sigma(R_P-R_B)=\\sigma_A\\end{aligned}'
    },
    {
      question:'Maximum Sharpe Ratio — Benchmark Plus Active Management',
      aliases:['Sharpe Ratio and Information Ratio Relationship','Maximum Sharpe Ratio with Constraints'],
      latex:'\\begin{aligned}SR_P^2&=SR_B^2+IR^2\\\\SR_{P,\\text{constrained}}^2&=SR_B^2+TC^2(IR^{*})^2\\end{aligned}'
    },
    {
      question:'Optimal Active Risk — Unconstrained and Constrained',
      aliases:['Optimal Active Risk','Optimal Active Risk with Constraints'],
      latex:'\\begin{aligned}\\sigma_A^{*}&=\\frac{IR}{SR_B}\\sigma_B\\\\\\sigma_{A,\\text{constrained}}^{*}&=TC\\frac{IR^{*}}{SR_B}\\sigma_B\\end{aligned}'
    },
    {
      question:'Total Portfolio Risk — Benchmark and Active Components',
      aliases:['Total Portfolio Risk'],
      latex:'\\begin{aligned}\\sigma_P^2&=\\sigma_B^2+\\sigma_A^2\\\\\\operatorname{Cov}(R_B,R_A)&=0\\end{aligned}'
    },
    {
      question:'Information Coefficient (IC) — Forecasting Skill',
      aliases:['Information Coefficient'],
      latex:'IC=\\operatorname{Corr}(\\text{Forecast Active Returns},\\text{Realized Active Returns})'
    },
    {
      question:'Transfer Coefficient (TC) — Implementation Efficiency',
      aliases:['Transfer Coefficient','Transfer Coefficient – Full Definition'],
      latex:'TC=\\rho\\!\\left(\\frac{\\mu_i}{\\sigma_i},\\Delta w_i\\sigma_i\\right)'
    },
    {
      question:'Grinold Scaling Rule — Expected Active Return per Security',
      aliases:['Grinold Scaling Rule'],
      latex:'\\mu_i=IC\\times\\sigma_i\\times S_i'
    },
    {
      question:'Optimal Active Security Weight — Mean-Variance and Grinold Forms',
      aliases:['Mean–Variance Optimal Active Security Weight','Optimal Active Weight Using the Grinold Rule'],
      latex:'\\begin{aligned}\\Delta w_i^{*}&=\\frac{\\mu_i}{\\sigma_i^2}\\frac{\\sigma_A}{\\sqrt{\\sum_{j=1}^{N}\\frac{\\mu_j^2}{\\sigma_j^2}}}\\\\&=\\frac{\\mu_i}{\\sigma_i^2}\\frac{\\sigma_A}{IC\\sqrt{BR}}\\end{aligned}'
    },
    {
      question:'Fundamental Law of Active Management — Unconstrained',
      aliases:['Fundamental Law of Active Management','Expected Active Return'],
      latex:'\\begin{aligned}IR&=IC\\sqrt{BR}\\\\E(R_A)&=IR\\sigma_A=IC\\sqrt{BR}\\,\\sigma_A\\end{aligned}'
    },
    {
      question:'Full Fundamental Law — With Transfer Coefficient',
      aliases:['Full Fundamental Law – Information Ratio','Full Fundamental Law – Expected Active Return'],
      latex:'\\begin{aligned}IR&=IC\\times TC\\times\\sqrt{BR}\\\\E(R_A)&=IR\\sigma_A=TC\\times IC\\sqrt{BR}\\,\\sigma_A\\end{aligned}'
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

  window.CFAPortfolioManagementChapter2={added,skipped,total:SPECS.length};
})();

(function loadPortfolioManagementChapter3456(){
  if(document.querySelector('script[src="portfolio-management-chapter-3-4-5-6.js"]'))return;
  const script=document.createElement('script');
  script.src='portfolio-management-chapter-3-4-5-6.js';
  script.defer=true;
  document.body.appendChild(script);
})();

(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Portfolio Management';
  const TOPIC='Chapter 3-4-5-6';
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
      question:'ETF Ownership Costs — Trading and Holding Components',
      aliases:['Total Costs of ETF Ownership','One-Time Trading Costs','Ongoing Holding Costs'],
      latex:'\\begin{aligned}\\text{Total ETF Costs}&=\\text{One-Time Trading Costs}+\\text{Ongoing Holding Costs}\\\\\\text{Trading Costs}&=\\text{Commissions}+\\text{Bid-Ask Spread}+\\text{Premium/Discount to NAV}\\\\\\text{Holding Costs}&=\\text{Management Fees}+\\text{Turnover Costs}+\\text{Tracking Error}+\\text{Taxes}+\\text{Security Lending Effects}\\end{aligned}'
    },
    {
      question:'ETF Bid-Ask Spread — Main Components',
      aliases:['ETF Bid-Ask Spread Components'],
      latex:'\\begin{aligned}\\text{ETF Spread}&\\approx\\text{Creation/Redemption Costs}+\\text{Underlying Securities Spreads}\\\\&\\quad+\\text{Hedging/Inventory Compensation}+\\text{Market Maker Profit Spread}\\\\&\\quad-\\text{Offsetting-Order Discount}\\end{aligned}'
    },
    {
      question:'CAPM Expected Return',
      aliases:['CAPM Expected Return'],
      latex:'E(R_i)=R_f+\\beta_i[E(R_m)-R_f]'
    },
    {
      question:'General Multifactor Return Model',
      aliases:['Types of Multifactor Models','General Multifactor Form','Macroeconomic Multifactor Model'],
      latex:'R_i=\\alpha_i+\\beta_{i1}F_1+\\beta_{i2}F_2+\\cdots+\\beta_{ik}F_k+\\varepsilon_i'
    },
    {
      question:'Fundamental Factor Exposure — Standardized Beta',
      aliases:['Standardized Beta in Fundamental Factor Models'],
      latex:'b_{ik}=\\frac{X_{ik}-\\bar X_k}{\\sigma(X_k)}'
    },
    {
      question:'Active Return Attribution — Factor Tilts and Security Selection',
      aliases:['Decomposition of Active Return Using a Factor Model','Factor Tilt Return'],
      latex:'\\begin{aligned}R_A&=\\sum_{k=1}^{K}(b_{P,k}-b_{B,k})F_k+\\text{Security Selection}\\\\\\text{Factor Tilt Return}&=\\sum_{k=1}^{K}(b_{P,k}-b_{B,k})F_k\\end{aligned}'
    },
    {
      question:'Active Risk Decomposition — Factor and Specific Risk',
      aliases:['Active Risk Decomposition'],
      latex:'\\begin{aligned}\\sigma_A^2&=\\text{Active Factor Risk}+\\text{Active Specific Risk}\\\\\\text{Well-diversified portfolio: }\\sigma_A^2&\\approx\\text{Active Factor Risk}\\end{aligned}'
    },
    {
      question:'Parametric VaR — Z-Score and Return Threshold',
      aliases:['Parametric VaR','Standard Normal Z-Score','VaR Return Threshold'],
      latex:'\\begin{aligned}z&=\\frac{R-\\mu}{\\sigma}\\\\R_{VaR,\\alpha}&=\\mu+z_{\\alpha}\\sigma\\end{aligned}'
    },
    {
      question:'Portfolio Expected Return — Weighted Average',
      aliases:['Portfolio Expected Return'],
      latex:'E(R_P)=\\sum_{i=1}^{N}w_iE(R_i)'
    },
    {
      question:'Two-Asset Portfolio Volatility',
      aliases:['Portfolio Volatility – Two Assets'],
      latex:'\\sigma_P=\\sqrt{w_1^2\\sigma_1^2+w_2^2\\sigma_2^2+2w_1w_2\\rho_{1,2}\\sigma_1\\sigma_2}'
    },
    {
      question:'Historical Simulation VaR — Portfolio Return and Tail Percentile',
      aliases:['Historical Simulation VaR','Historical Portfolio Returns','Historical VaR'],
      latex:'\\begin{aligned}R_{P,t}&=\\sum_{i=1}^{N}w_iR_{i,t}\\\\R_{VaR,\\alpha}&=\\alpha\\text{-percentile of historical portfolio returns}\\end{aligned}'
    },
    {
      question:'Monte Carlo VaR — Simulated Portfolio Return and Tail Percentile',
      aliases:['Monte Carlo Simulation VaR','Monte Carlo VaR'],
      latex:'\\begin{aligned}R_P^{(j)}&=\\sum_{i=1}^{N}w_iR_i^{(j)}\\\\R_{VaR,\\alpha}&=\\alpha\\text{-percentile of simulated portfolio returns}\\end{aligned}'
    },
    {
      question:'Conditional VaR (CVaR) — Expected Tail Loss',
      aliases:['Conditional VaR (CVaR)','Expected Tail Loss','Expected Shortfall'],
      latex:'CVaR_{\\alpha}=E[L\\mid L>VaR_{\\alpha}]'
    },
    {
      question:'Incremental VaR — Change in Portfolio VaR',
      aliases:['Incremental VaR (IVaR)','Incremental VaR'],
      latex:'IVaR=VaR_{\\text{New Portfolio}}-VaR_{\\text{Old Portfolio}}'
    },
    {
      question:'Marginal VaR — Sensitivity to Position Size',
      aliases:['Marginal VaR (MVaR)','Marginal VaR'],
      latex:'MVaR_i=\\frac{\\partial VaR_P}{\\partial x_i}'
    },
    {
      question:'Bond Price Sensitivity — Duration and Convexity',
      aliases:['Fixed-Income Exposure – Duration','Fixed-Income Exposure – Duration + Convexity'],
      latex:'\\begin{aligned}\\frac{\\Delta B}{B}&\\approx-D\\frac{\\Delta y}{1+y}\\\\\\frac{\\Delta B}{B}&\\approx-D\\frac{\\Delta y}{1+y}+\\frac{1}{2}C\\frac{(\\Delta y)^2}{(1+y)^2}\\end{aligned}'
    },
    {
      question:'Option Delta — Price Sensitivity to the Underlying',
      aliases:['Option Delta'],
      latex:'\\Delta\\approx\\frac{\\Delta V}{\\Delta S}'
    },
    {
      question:'Option Gamma — Delta Sensitivity and Delta-Gamma Approximation',
      aliases:['Option Gamma','Delta-Gamma Approximation'],
      latex:'\\begin{aligned}\\Gamma&\\approx\\frac{\\Delta\\Delta}{\\Delta S}\\\\\\Delta V&\\approx\\Delta\\,\\Delta S+\\frac{1}{2}\\Gamma(\\Delta S)^2\\end{aligned}'
    },
    {
      question:'Option Vega — Price Sensitivity to Volatility',
      aliases:['Option Vega'],
      latex:'\\mathrm{Vega}\\approx\\frac{\\Delta V}{\\Delta\\sigma}'
    },
    {
      question:'Delta-Gamma-Vega Approximation — Option Value Change',
      aliases:['Delta-Gamma-Vega Approximation'],
      latex:'\\Delta V\\approx\\Delta\\,\\Delta S+\\frac{1}{2}\\Gamma(\\Delta S)^2+\\mathrm{Vega}(\\Delta\\sigma)'
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

  window.CFAPortfolioManagementChapter3456={added,skipped,total:SPECS.length};
})();

(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Equity Valuation';
  const TOPIC='Chapter 4-5-6';
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
      question:'Valuation Multiples — Comparables vs Forecasted Fundamentals',
      aliases:['Valuation Multiples – Comparables vs Forecasted Fundamentals','Comparable-Multiple Valuation','Forecasted-Fundamentals Multiple'],
      latex:'\\begin{aligned}\\text{Estimated Value}&=(\\text{Peer Multiple})(\\text{Company Fundamental})\\\\\\text{Justified Multiple}&=\\frac{\\text{Intrinsic Value}}{\\text{Fundamental}}\\\\P_0&=(P/B)_{\\text{Peers}}\\,BVPS_0\\\\\\text{Justified }P/B&=\\frac{V_0}{BVPS_0}\\end{aligned}'
    },
    {
      question:'Normalized P/E Ratio',
      aliases:['Normalized P/E'],
      latex:'(P/E)_{\\text{Normalized}}=\\frac{P_0}{EPS_{\\text{Normalized}}}'
    },
    {
      question:'Normalized EPS — From Average ROE',
      aliases:['Normalized EPS from Average ROE'],
      latex:'EPS_{\\text{Normalized}}=ROE_{\\text{Average}}\\times BVPS_0'
    },
    {
      question:'Predicted P/E — Cross-Sectional Regression',
      aliases:['Predicted P/E – Cross-Sectional Regression'],
      latex:'\\begin{aligned}(P/E)_{\\text{Predicted}}&=\\beta_0+\\beta_1X_1+\\beta_2X_2+\\cdots+\\beta_kX_k\\\\(P/E)_{\\text{Actual}}>(P/E)_{\\text{Predicted}}&\\Rightarrow\\text{ Overvalued}\\\\(P/E)_{\\text{Actual}}<(P/E)_{\\text{Predicted}}&\\Rightarrow\\text{ Undervalued}\\end{aligned}'
    },
    {
      question:'Book Value per Share (BVPS)',
      aliases:['Price/Book Value – Determining Book Value','Book Value Per Share'],
      latex:'\\begin{aligned}\\text{Total Equity}&=\\text{Assets}-\\text{Liabilities}\\\\\\text{Common Equity}&=\\text{Total Shareholders\' Equity}-\\text{Senior Equity Claims}\\\\BVPS&=\\frac{\\text{Common Shareholders\' Equity}}{\\text{Common Shares Outstanding}}\\end{aligned}'
    },
    {
      question:'Justified P/B — Forecasted Fundamentals',
      aliases:['Justified P/B – Forecasted Fundamentals'],
      latex:'\\begin{aligned}\\frac{P_0}{B_0}&=\\frac{ROE-g}{r-g}\\\\g&=b\\times ROE\\end{aligned}'
    },
    {
      question:'Justified P/B — Residual Earnings Approach',
      aliases:['Justified P/B – Residual Earnings Approach'],
      latex:'\\frac{P_0}{B_0}=1+\\frac{PV(\\text{Expected Future Residual Earnings})}{B_0}'
    },
    {
      question:'Justified Forward P/S — Forecasted Fundamentals',
      aliases:['Justified Forward P/S – Forecasted Fundamentals'],
      latex:'\\begin{aligned}\\frac{P_0}{S_1}&=\\left(\\frac{E_1}{S_1}\\right)\\frac{1-b}{r-g}\\\\&=\\text{Profit Margin}\\times\\text{Justified Forward }P/E\\end{aligned}'
    },
    {
      question:'Justified Trailing P/S — Forecasted Fundamentals',
      aliases:['Justified Trailing P/S – Forecasted Fundamentals'],
      latex:'\\begin{aligned}\\frac{P_0}{S_0}&=\\left(\\frac{E_0}{S_0}\\right)\\frac{(1-b)(1+g)}{r-g}\\\\&=\\text{Profit Margin}\\times\\text{Justified Trailing }P/E\\end{aligned}'
    },
    {
      question:'Sustainable Growth — DuPont Decomposition',
      aliases:['Sustainable growth decomposition'],
      latex:'g=b\\times PM_0\\times\\frac{\\text{Sales}}{\\text{Total Assets}}\\times\\frac{\\text{Total Assets}}{\\text{Shareholders\' Equity}}'
    },
    {
      question:'Price/Cash Flow Multiples — P/CF, P/CFO and P/FCFE',
      aliases:['Price/Cash Flow Multiples'],
      latex:'\\begin{aligned}CFPS&\\approx EPS+\\text{Noncash Charges per Share}\\\\P/CF&=\\frac{P_0}{CFPS}\\\\P/CFO&=\\frac{\\text{Price per Share}}{\\text{CFO per Share}}\\\\P/FCFE&=\\frac{\\text{Price per Share}}{\\text{FCFE per Share}}\\end{aligned}'
    },
    {
      question:'FCFE — From CFO',
      aliases:['FCFE from CFO'],
      latex:'\\mathrm{FCFE}=\\mathrm{CFO}-\\mathrm{CapEx}+\\text{Net Borrowing}'
    },
    {
      question:'EBITDA — Equivalent Computations',
      aliases:['EBITDA'],
      latex:'\\begin{aligned}\\mathrm{EBITDA}&=\\mathrm{EBIT}+\\text{D\\&A}\\\\&=\\mathrm{NI}+\\text{Interest}+\\text{Taxes}+\\text{Depreciation}+\\text{Amortization}\\end{aligned}'
    },
    {
      question:'Justified Cash-Flow Multiples — P/CF and P/FCFE',
      aliases:['Justified P/CF and P/FCFE – Forecasted Fundamentals','Justified P/CF','Justified P/FCFE'],
      latex:'\\begin{aligned}\\text{Justified }P/CF&=\\frac{V_0}{CF_0}\\\\\\text{Justified }P/FCFE&=\\frac{V_0}{FCFE_0}=\\frac{1+g}{r-g}\\end{aligned}'
    },
    {
      question:'Dividend Yield and Price/Dividend — Constant Growth',
      aliases:['Dividend Yield – Forecasted Fundamentals','Price/Dividend Ratio'],
      latex:'\\begin{aligned}\\frac{D_0}{P_0}&=\\frac{r-g}{1+g}\\\\\\frac{P_0}{D_0}&=\\frac{1+g}{r-g}\\\\\\frac{P_0}{D_0}&=\\frac{\\text{Trailing }P/E}{\\text{Dividend Payout Ratio}}\\end{aligned}'
    },
    {
      question:'Enterprise Value and EV/EBITDA',
      aliases:['Enterprise Value / EBITDA','EV/EBITDA'],
      latex:'\\begin{aligned}EV&=MV(\\text{Common Equity})+MV(\\text{Debt})+\\text{Preferred}+\\text{Minority Interest}\\\\&\\quad-\\text{Cash}-\\text{Short-Term Investments}\\\\EV/EBITDA&=\\frac{EV}{EBITDA}\\\\TIC&=\\text{Common Equity}+\\text{Debt}+\\text{Preferred}\\end{aligned}'
    },
    {
      question:'Earnings Surprise — Unexpected Earnings and SUE',
      aliases:['Unexpected Earnings','Standardized Unexpected Earnings'],
      latex:'\\begin{aligned}UE_t&=EPS_t-E(EPS_t)\\\\SUE_t&=\\frac{EPS_t-E(EPS_t)}{\\sigma[EPS_t-E(EPS_t)]}\\end{aligned}'
    },
    {
      question:'Fed Model — Implied Fair P/E',
      aliases:['Fed Model'],
      latex:'\\begin{aligned}E/P&=\\frac{1}{P/E}\\\\\\text{Fair }P/E&\\approx\\frac{1}{\\text{10Y Treasury Yield}}\\end{aligned}'
    },
    {
      question:'Yardeni Model — Justified P/E',
      aliases:['Yardeni Model'],
      latex:'\\begin{aligned}CEY&=CBY-b(LTEG)\\\\\\text{Justified }P/E&=\\frac{1}{CBY-b(LTEG)}\\end{aligned}'
    },
    {
      question:'Residual Income — Total Capital Approach',
      aliases:['Residual Income – Equity vs Total Capital Approach','Total Capital Approach'],
      latex:'\\begin{aligned}RI&=NOPAT-\\text{Capital Charge}\\\\\\text{Capital Charge}&=r_e(\\text{Equity})+r_d(1-T)(\\text{Debt})\\end{aligned}'
    },
    {
      question:'ROIC and Invested Capital',
      aliases:['ROIC – Return on Invested Capital','Return on Invested Capital'],
      latex:'\\begin{aligned}ROIC&=\\frac{NOPAT}{\\text{Invested Capital}}\\\\\\text{Invested Capital}&=\\text{Operating Assets}-\\text{Noninterest-Bearing Operating Liabilities}\\\\&=\\text{Debt}+\\text{Equity}-\\text{Nonoperating Assets}\\end{aligned}'
    },
    {
      question:'Economic Profit — ROIC/WACC Spread',
      aliases:['Economic Profit Shortcut'],
      latex:'\\begin{aligned}RI&=(ROIC-WACC)\\times\\text{Invested Capital}\\\\&=NOPAT-WACC\\times\\text{Invested Capital}\\end{aligned}'
    },
    {
      question:'Market Value Added (MVA)',
      aliases:['MVA','Market Value Added'],
      latex:'MVA=\\text{Market Value of the Company}-\\text{Accounting Book Value of Total Capital}'
    },
    {
      question:'Residual Income — Constant-Growth Valuation',
      aliases:['Constant-Growth RI Model'],
      latex:'V_0=B_0+\\frac{ROE-r}{r-g}B_0'
    },
    {
      question:'Residual Income — Persistence Model',
      aliases:['Persistence Model'],
      latex:'V_0=B_0+\\sum_{t=1}^{T-1}\\frac{E_t-rB_{t-1}}{(1+r)^t}+\\frac{E_T-rB_{T-1}}{(1+r-\\omega)(1+r)^{T-1}}'
    },
    {
      question:'Private Company FCFF DCF — Forecast and Terminal Value',
      aliases:['Private Company – Key Areas','Free Cash Flow Valuation','Private Company FCFF DCF'],
      latex:'V_0=\\sum_{t=1}^{n}\\frac{FCFF_t}{(1+WACC)^t}+\\frac{TV_n}{(1+WACC)^n}'
    },
    {
      question:'Normalized Earnings — Private Company',
      aliases:['Earnings Normalization'],
      latex:'\\text{Normalized Earnings}=\\text{Reported Earnings}\\pm\\text{Normalization Adjustments}'
    },
    {
      question:'Private Company Required Return — CAPM, Expanded CAPM and Build-Up',
      aliases:['Private Company – Required Return, Discounts & Premiums','Expanded CAPM','Build-Up Approach'],
      latex:'\\begin{aligned}r_e&=r_f+\\beta(R_m-r_f)\\\\r_e&=r_f+\\beta(R_m-r_f)+SP+CSRP\\\\r_e&=r_f+ERP+SP+IRP+CSRP\\end{aligned}'
    },
    {
      question:'Private Company Discounts — DLOC, DLOM and Combined Discount',
      aliases:['Discount for Lack of Control','Discount for Lack of Marketability','Combined Discount'],
      latex:'\\begin{aligned}DLOC&=1-\\frac{1}{1+\\text{Control Premium}}\\\\DLOM&\\approx\\frac{\\text{Put Option Value}}{\\text{Stock Value}}\\\\\\text{Total Discount}&=1-(1-DLOC)(1-DLOM)\\\\V_{\\text{Nonmarketable Minority}}&=V_{\\text{Base}}(1-DLOC)(1-DLOM)\\end{aligned}'
    },
    {
      question:'Reinvestment Rate and Growth — Private Company',
      aliases:['Reinvestment Rate'],
      latex:'\\begin{aligned}RIR&=\\frac{g}{ROIC}\\\\g&=ROIC\\times RIR\\end{aligned}'
    },
    {
      question:'FCFF from Operating Profit — With Reinvestment',
      aliases:['FCFF from Operating Profit'],
      latex:'\\begin{aligned}FCFF_{t+1}&=EBIT_{t+1}(1-T)(1-RIR)\\\\V_t&=\\frac{EBIT_{t+1}(1-T)(1-RIR)}{WACC-g}\\end{aligned}'
    },
    {
      question:'Excess Earnings Method — Private Company',
      aliases:['Private Company – Excess Earnings Method (EEM)','Excess Earnings','Residual Value of Intangibles'],
      latex:'\\begin{aligned}RI_t&=\\text{Normalized Income}-(WC\\times r_{WC})-(FA\\times r_{FA})\\\\RV_t&=\\frac{RI_t(1+g)}{r_{RI}-g}\\\\\\text{Firm Value}&=WC+FA+RV_t\\end{aligned}'
    },
    {
      question:'Market-Based Private Company Valuation — Selected Multiples',
      aliases:['Private Company – Market-Based Approaches','Equity Multiple','Enterprise Value Multiple'],
      latex:'\\begin{aligned}\\text{Equity Value}&=(P/E)_{\\text{Selected}}\\times\\text{Subject Earnings}\\\\EV&=(EV/EBITDA)_{\\text{Selected}}\\times EBITDA_{\\text{Subject}}\\\\EV&=(EV/Sales)_{\\text{Selected}}\\times Sales_{\\text{Subject}}\\end{aligned}'
    },
    {
      question:'Comparable Beta — Unlever and Relever for Private Company',
      aliases:['Unlever Comparable Beta','Relever for Private Company'],
      latex:'\\begin{aligned}\\beta_U&=\\frac{\\beta_{L,Comp}}{1+(1-T_{Comp})(D/E)_{Comp}}\\\\\\beta_{L,Private}&=\\beta_U[1+(1-T_{Private})(D/E)_{Private}]\\end{aligned}'
    },
    {
      question:'Weighted Market-Multiple Valuation — Private Company',
      aliases:['Weighted EV/Sales Approach','Comparable Weights','General Form'],
      latex:'\\begin{aligned}\\sum_{i=1}^{n}w_i&=1\\\\w_i&=\\frac{\\text{Business Line Sales}_i}{\\text{Total Sales}}\\\\EV&=\\sum_{i=1}^{n}w_i(EV/Sales)_i\\times Sales_{Private}\\\\EV&=\\sum_{i=1}^{n}w_i\\times\\text{Comparable Multiple}_i\\times\\text{Private Company Metric}\\end{aligned}'
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
    },0);
  }

  window.CFAEquityChapter456={added,skipped,total:SPECS.length};
})();

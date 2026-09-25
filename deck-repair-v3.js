(function(){
  'use strict';

  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const qnorm=s=>tidy(s).toLowerCase().replace(/[^a-z0-9]+/g,'');

  // One-time canonical repairs for cards created by the earlier fragment parser.
  // Only the formula fields are changed: id, status, history, subject and topic stay intact.
  const FIX={
    presentvalueofexpectedcashflows:'V_0=\\sum_{t=1}^{n}\\frac{CF_t}{(1+r)^t}',
    residualincomevaluationmodel:'V_0=BV_0+\\sum_{t=1}^{\\infty}\\frac{RI_t}{(1+r)^t}',
    ddmmultipleholdingperiods:'V_0=\\sum_{t=1}^{n}\\frac{D_t}{(1+r)^t}+\\frac{P_n}{(1+r)^n}',
    twostagedividenddiscountmodel:'V_0=\\sum_{t=1}^{n}\\frac{D_0(1+g_S)^t}{(1+r)^t}+\\frac{D_0(1+g_S)^n(1+g_L)}{(1+r)^n(r-g_L)}',
    twostagedividenddiscountmodelterminalvalue:'V_n=\\frac{D_{n+1}}{r-g_L}=\\frac{D_0(1+g_S)^n(1+g_L)}{r-g_L}',
    twostagedividenddiscountmodelvaluetoday:'V_0=\\sum_{t=1}^{n}\\frac{D_0(1+g_S)^t}{(1+r)^t}+\\frac{D_0(1+g_S)^n(1+g_L)}{(1+r)^n(r-g_L)}',
    hmodel:'V_0=\\frac{D_0(1+g_L)+D_0H(g_S-g_L)}{r-g_L}',
    hmodelcombinedform:'V_0=\\frac{D_0(1+g_L)+D_0H(g_S-g_L)}{r-g_L}',
    hmodelhighgrowthpremium:'\\text{High-Growth Premium}=\\frac{D_0H(g_S-g_L)}{r-g_L}',
    firmvaluefromfcff:'\\text{Firm Value}=\\sum_{t=1}^{\\infty}\\frac{\\mathrm{FCFF}_t}{(1+\\mathrm{WACC})^t}',
    equityvaluefromfcfe:'\\text{Equity Value}=\\sum_{t=1}^{\\infty}\\frac{\\mathrm{FCFE}_t}{(1+r_e)^t}',
    fcffalternativecomputationformulasfromebit:'\\mathrm{FCFF}=\\mathrm{EBIT}(1-T)+\\text{D\\&A}-\\mathrm{FCInv}-\\mathrm{WCInv}',
    fcffalternativecomputationformulasfromebitda:'\\mathrm{FCFF}=\\mathrm{EBITDA}(1-T)+(\\text{D\\&A})T-\\mathrm{FCInv}-\\mathrm{WCInv}',
    fcffalternativecomputationformulasfromcfo:'\\mathrm{FCFF}=\\mathrm{CFO}+\\mathrm{Int}(1-T)-\\mathrm{FCInv}',
    fcffalternativecomputationformulasfromnetincome:'\\mathrm{FCFF}=\\mathrm{NI}+\\mathrm{NCC}+\\mathrm{Int}(1-T)-\\mathrm{FCInv}-\\mathrm{WCInv}',
    fcffalternativecomputationformulasfromnetincomeavailabletocommon:'\\mathrm{FCFF}=\\mathrm{NI}_{common}+\\mathrm{NCC}+\\mathrm{Int}(1-T)+\\mathrm{PrefDiv}-\\mathrm{FCInv}-\\mathrm{WCInv}',
    fcfealternativecomputationformulasfromfcff:'\\mathrm{FCFE}=\\mathrm{FCFF}-\\mathrm{Interest}(1-T)+\\text{Net Borrowing}',
    fcfealternativecomputationformulasfromnetincome:'\\mathrm{FCFE}=\\mathrm{NI}_{common}+\\mathrm{NCC}-\\mathrm{FCInv}-\\mathrm{WCInv}+\\text{Net Financing}',
    weightedaveragecostofcapitaldebtcommonequity:'\\mathrm{WACC}=w_d r_d(1-T)+w_e r_e',
    weightedaveragecostofcapitaldebtpreferredcommonequity:'\\mathrm{WACC}=w_d r_d(1-T)+w_p r_p+w_e r_e'
  };

  function isSuspicious(c){
    const v=tidy(c&&c.latex||c&&c.answer||'');
    if(!v)return true;
    if(/^t\s*=\s*1$/i.test(v)||/^n$/i.test(v)||/^\\?infty$/i.test(v))return true;
    if(/PV\s*\(High\s*-?\s*Growth/i.test(v))return true;
    if(/^D0H\(/i.test(v.replace(/\\/g,'')))return true;
    if(/F\s+C\s+F\s+F/i.test(v)||/F\s+C\s+F\s+E/i.test(v))return true;
    return false;
  }

  let changed=0;
  try{
    if(typeof cards==='undefined'||!Array.isArray(cards))return;
    cards.forEach(c=>{
      const key=qnorm(c.question);
      const latex=FIX[key];
      if(!latex)return;
      // Canonicalize all matching legacy cards; this also fixes acronym spacing.
      if(tidy(c.latex)!==latex||isSuspicious(c)){
        c.latex=latex;
        c.answer=latex;
        if(c.formulaImage)delete c.formulaImage;
        changed++;
      }
    });

    if(changed){
      if(typeof save==='function')save();
      if(typeof refresh==='function')refresh();
    }

    // Re-render after all late-loading UI overrides are in place.
    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);

    window.CFADeckRepair={changed};
  }catch(_e){}
})();

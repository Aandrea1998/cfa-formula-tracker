(function(){
  'use strict';

  // Canonical display LaTeX + concise Equity-style labels for Economics / Economic Growth.
  // IDs, statuses, review histories, subjects and topics are preserved.
  const LATEX={
    1:'E(R_e)=dy+\\Delta(P/E)+i+g-\\Delta S',
    2:'\\text{EPS growth}=i+g-\\Delta S',
    3:'\\Delta S=\\mathrm{RD}-\\mathrm{NBB}',
    4:'Y=AK^{\\alpha}L^{1-\\alpha}',
    5:'\\mathrm{MPK}=\\alpha\\left(\\frac{Y}{K}\\right)=r',
    6:'\\mathrm{MPL}=(1-\\alpha)\\left(\\frac{Y}{L}\\right)=w',
    7:'\\alpha=\\frac{rK}{Y},\\qquad 1-\\alpha=\\frac{wL}{Y}',
    8:'y=\\frac{Y}{L}=Ak^{\\alpha},\\qquad k=\\frac{K}{L}',
    9:'g_Y=g_A+\\alpha g_K+(1-\\alpha)g_L',
    10:'g_{\\text{Potential GDP}}=g_{\\text{Labor Force}}+g_{\\text{Labor Productivity}}',
    11:'g_K=s\\left(\\frac{Y}{K}\\right)-\\delta',
    12:'g_k=g_K-n',
    13:'g_k=s\\left(\\frac{Y}{K}\\right)-\\delta-n',
    14:'g_y=\\theta+\\alpha g_k',
    15:'g_y=\\theta+\\alpha\\left[s\\left(\\frac{Y}{K}\\right)-\\delta-n\\right]',
    16:'g^{*}=\\frac{\\theta}{1-\\alpha}',
    17:'\\left[\\delta+n+\\frac{\\theta}{1-\\alpha}\\right]k',
    18:'\\Psi=\\frac{\\delta+n+\\frac{\\theta}{1-\\alpha}}{s}',
    19:'\\Psi=\\left(\\frac{Y}{K}\\right)^{*}',
    20:'g_k=\\frac{\\theta}{1-\\alpha}+s\\left[\\left(\\frac{Y}{K}\\right)-\\Psi\\right]',
    21:'g_y=\\frac{\\theta}{1-\\alpha}+\\alpha s\\left[\\left(\\frac{Y}{K}\\right)-\\Psi\\right]',
    22:'g_k^{*}=g_y^{*}=\\frac{\\theta}{1-\\alpha}',
    23:'g_K=g_k+n',
    24:'g_Y=g_y+n',
    25:'g_K^{*}=g_Y^{*}=n+\\frac{\\theta}{1-\\alpha}',
    26:'g_k=g_y=0',
    27:'g_K=g_Y=g_L=n',
    28:'g_k=sc-\\delta-n',
    29:'g_y=g_k=sc-\\delta-n'
  };

  const PROMPT={
    1:'Grinold–Kroner Expected Equity Return',
    2:'Grinold–Kroner — EPS Growth',
    3:'Change in Shares Outstanding',
    4:'Cobb–Douglas Production Function',
    5:'Marginal Product of Capital (MPK)',
    6:'Marginal Product of Labor (MPL)',
    7:'Capital and Labor Income Shares',
    8:'Cobb–Douglas — Output per Worker',
    9:'Growth Accounting Equation',
    10:'Potential GDP Growth',
    11:'Aggregate Capital Growth',
    12:'Capital per Worker Growth — Link to Aggregate Capital',
    13:'Capital per Worker Growth — Expanded',
    14:'Output per Worker Growth',
    15:'Output per Worker Growth — Expanded',
    16:'Steady-State Growth per Worker',
    17:'Steady-State Required Investment per Worker',
    18:'Steady-State Threshold Ratio (Ψ)',
    19:'Steady-State Capital–Output Ratio',
    20:'Convergence — Capital per Worker Growth',
    21:'Convergence — Output per Worker Growth',
    22:'Steady-State Per-Worker Growth',
    23:'Aggregate Capital Growth — From Per-Worker Capital Growth',
    24:'Aggregate vs Per-Worker Output Growth',
    25:'Steady-State Aggregate Growth',
    26:'No Technological Progress — Per-Worker Growth',
    27:'No Technological Progress — Aggregate Growth',
    28:'Endogenous Growth — Capital per Worker',
    29:'Endogenous Growth — Output per Worker'
  };

  let changed=0;
  try{
    if(typeof cards==='undefined'||!Array.isArray(cards))return;
    cards.forEach(c=>{
      if(c.subject!=='Economics'||c.topic!=='Economic Growth')return;
      const id=Number(c.id),latex=LATEX[id],prompt=PROMPT[id];
      if(latex&&c.latex!==latex){c.latex=latex;if(c.formulaImage)delete c.formulaImage;changed++;}
      if(prompt&&c.question!==prompt){c.question=prompt;changed++;}
    });

    const fiscalTwoStageQuestion='Expansionary Fiscal Policy — Short Run vs Long Run';
    const fiscalTwoStageLatex='\\begin{aligned}\\text{1. Mundell–Fleming (high mobility): }&G\\uparrow\\text{ or }T\\downarrow\\Rightarrow Y\\uparrow\\Rightarrow i\\uparrow\\\\&\\Rightarrow\\text{capital inflows}\\uparrow\\Rightarrow\\text{currency appreciates}\\\\\\text{2. Portfolio Balance Approach: }&\\text{persistent deficits}\\Rightarrow\\text{public debt}\\uparrow\\\\&\\Rightarrow\\text{debt/monetization risk}\\uparrow\\Rightarrow\\pi^e\\uparrow\\\\&\\Rightarrow\\text{currency depreciation risk}\\end{aligned}';
    let fiscalTwoStageCard=cards.find(c=>c.subject==='Economics'&&c.question===fiscalTwoStageQuestion);
    if(!fiscalTwoStageCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:fiscalTwoStageQuestion,answer:fiscalTwoStageLatex,latex:fiscalTwoStageLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(fiscalTwoStageCard.answer!==fiscalTwoStageLatex){fiscalTwoStageCard.answer=fiscalTwoStageLatex;changed++;}
      if(fiscalTwoStageCard.latex!==fiscalTwoStageLatex){fiscalTwoStageCard.latex=fiscalTwoStageLatex;changed++;}
      if(fiscalTwoStageCard.topic!=='Currency Exchange Rates'){fiscalTwoStageCard.topic='Currency Exchange Rates';changed++;}
    }

    const dornbuschQuestion='Dornbusch Model — Currency Overshooting';
    const dornbuschLatex='\\begin{aligned}M\\uparrow&\\Rightarrow i\\downarrow\\Rightarrow\\text{capital outflow}\\\\&\\Rightarrow\\text{currency overshoots downward}\\\\P\\uparrow&\\Rightarrow\\text{currency appreciates toward long-run equilibrium}\\end{aligned}';
    let dornbuschCard=cards.find(c=>c.subject==='Economics'&&c.question===dornbuschQuestion);
    if(!dornbuschCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:dornbuschQuestion,answer:dornbuschLatex,latex:dornbuschLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(dornbuschCard.answer!==dornbuschLatex){dornbuschCard.answer=dornbuschLatex;changed++;}
      if(dornbuschCard.latex!==dornbuschLatex){dornbuschCard.latex=dornbuschLatex;changed++;}
      if(dornbuschCard.topic!=='Currency Exchange Rates'){dornbuschCard.topic='Currency Exchange Rates';changed++;}
    }

    const moneyModelCompareQuestion='Monetary Model vs Mundell–Fleming — Money Supply & FX';
    const moneyModelCompareLatex='\\begin{aligned}\\text{Monetary Model: }&M\\uparrow\\Rightarrow P\\uparrow\\Rightarrow\\pi\\uparrow\\Rightarrow\\text{FX depreciates}\\\\&M\\downarrow\\Rightarrow P\\downarrow\\Rightarrow\\pi\\downarrow\\Rightarrow\\text{FX appreciates}\\\\\\text{Mundell–Fleming: }&M\\uparrow\\Rightarrow i\\downarrow\\Rightarrow\\text{capital outflow}\\\\&\\Rightarrow\\text{FX depreciates}\\\\\\text{Key: }&\\text{same result, different channel}\\end{aligned}';
    let moneyModelCompareCard=cards.find(c=>c.subject==='Economics'&&c.question===moneyModelCompareQuestion);
    if(!moneyModelCompareCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:moneyModelCompareQuestion,answer:moneyModelCompareLatex,latex:moneyModelCompareLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(moneyModelCompareCard.answer!==moneyModelCompareLatex){moneyModelCompareCard.answer=moneyModelCompareLatex;changed++;}
      if(moneyModelCompareCard.latex!==moneyModelCompareLatex){moneyModelCompareCard.latex=moneyModelCompareLatex;changed++;}
      if(moneyModelCompareCard.topic!=='Currency Exchange Rates'){moneyModelCompareCard.topic='Currency Exchange Rates';changed++;}
    }

    const fiscalMobilityQuestion='Expansionary Fiscal Policy — Capital Mobility';
    const fiscalMobilityLatex='\\begin{aligned}\\text{Expansionary fiscal: }&G\\uparrow\\;\\text{or}\\;T\\downarrow\\\\\\text{Low mobility: }&Y\\uparrow\\rightarrow\\text{Imports}\\uparrow\\rightarrow CA\\downarrow\\\\&\\rightarrow\\text{Currency depreciation}\\\\\\text{High mobility: }&Y\\uparrow\\rightarrow i\\uparrow\\rightarrow\\text{Capital inflows}\\uparrow\\\\&\\rightarrow\\text{Currency appreciation}\\end{aligned}';
    let fiscalMobilityCard=cards.find(c=>c.subject==='Economics'&&c.question===fiscalMobilityQuestion);
    if(!fiscalMobilityCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:fiscalMobilityQuestion,answer:fiscalMobilityLatex,latex:fiscalMobilityLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(fiscalMobilityCard.answer!==fiscalMobilityLatex){fiscalMobilityCard.answer=fiscalMobilityLatex;changed++;}
      if(fiscalMobilityCard.latex!==fiscalMobilityLatex){fiscalMobilityCard.latex=fiscalMobilityLatex;changed++;}
      if(fiscalMobilityCard.topic!=='Currency Exchange Rates'){fiscalMobilityCard.topic='Currency Exchange Rates';changed++;}
    }

    const caChannelsQuestion='Current Account Imbalances — Three Exchange Rate Channels';
    const caChannelsLatex='\\begin{gathered}\\textbf{Current Account Deficit: Why USD Depreciates}\\\\[5pt]\\begin{aligned}\\textbf{Flow Supply/Demand: }&\\text{Net USD supply rises}\\\\&\\Rightarrow\\text{USD depreciates}\\\\[5pt]\\textbf{Portfolio Approach: }&\\text{Relative demand for US assets falls}\\\\&\\Rightarrow\\text{USD depreciates}\\\\[5pt]\\textbf{Debt Sustainability: }&\\text{Persistent deficits raise external debt}\\\\&\\Rightarrow\\text{Expected future adjustment}\\\\&\\Rightarrow\\text{Long-run USD value falls}\\end{aligned}\\end{gathered}';
    let caChannelsCard=cards.find(c=>c.subject==='Economics'&&c.question===caChannelsQuestion);
    if(!caChannelsCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:caChannelsQuestion,answer:caChannelsLatex,latex:caChannelsLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(caChannelsCard.answer!==caChannelsLatex){caChannelsCard.answer=caChannelsLatex;changed++;}
      if(caChannelsCard.latex!==caChannelsLatex){caChannelsCard.latex=caChannelsLatex;changed++;}
      if(caChannelsCard.topic!=='Currency Exchange Rates'){caChannelsCard.topic='Currency Exchange Rates';changed++;}
    }

    const mfQuestion='Exchange Rate Determination — Three Main Models';
    const mfLatex='\\begin{aligned}1.&\\;\\text{Mundell–Fleming Model}\\\\2.&\\;\\text{Monetary Models of Exchange Rate Determination}\\\\3.&\\;\\text{Portfolio Balance Approach}\\end{aligned}';
    let mfCard=cards.find(c=>c.subject==='Economics'&&c.question===mfQuestion);
    if(!mfCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:mfQuestion,answer:mfLatex,latex:mfLatex,subject:'Economics',topic:'Monetary and Fiscal Policies',status:null,history:[]});
      changed++;
    }else{
      if(mfCard.answer!==mfLatex){mfCard.answer=mfLatex;changed++;}
      if(mfCard.latex!==mfLatex){mfCard.latex=mfLatex;changed++;}
      if(mfCard.topic!=='Monetary and Fiscal Policies'){mfCard.topic='Monetary and Fiscal Policies';changed++;}
    }

    const uipQuestion='Uncovered Interest Rate Parity (UIP) — Carry Trade Takeaway';
    const uipLatex='\\begin{aligned}\\text{UIP holds: }&\\text{FX move offsets yield differential}\\\\\\text{Carry trade: }&\\text{UIP often fails short/medium term}\\\\&\\Rightarrow\\text{high-yield FX may not depreciate enough}\\end{aligned}';
    let uipCard=cards.find(c=>c.subject==='Economics'&&c.question===uipQuestion);
    if(!uipCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:uipQuestion,answer:uipLatex,latex:uipLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(uipCard.answer!==uipLatex){uipCard.answer=uipLatex;changed++;}
      if(uipCard.latex!==uipLatex){uipCard.latex=uipLatex;changed++;}
      if(uipCard.topic!=='Currency Exchange Rates'){uipCard.topic='Currency Exchange Rates';changed++;}
    }

    const fxReservesQuestion='FX Reserves — EM vs DM Exchange Rate Influence';
    const fxReservesLatex='\\begin{aligned}\\text{EM: }&\\frac{\\text{FX reserves}}{\\text{daily FX turnover}}\\text{ relatively high}\\\\&\\Rightarrow\\text{greater ability to influence FX}\\\\\\text{DM: }&\\text{ratio much smaller}\\end{aligned}';
    let fxReservesCard=cards.find(c=>c.subject==='Economics'&&c.question===fxReservesQuestion);
    if(!fxReservesCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:fxReservesQuestion,answer:fxReservesLatex,latex:fxReservesLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(fxReservesCard.answer!==fxReservesLatex){fxReservesCard.answer=fxReservesLatex;changed++;}
      if(fxReservesCard.latex!==fxReservesLatex){fxReservesCard.latex=fxReservesLatex;changed++;}
      if(fxReservesCard.topic!=='Currency Exchange Rates'){fxReservesCard.topic='Currency Exchange Rates';changed++;}
    }

    const fxForwardMtmQuestion='FX Forward MTM — Short Base Currency';
    const fxForwardMtmLatex='\\begin{aligned}V_t&=\\frac{N(F_0-F_t)}{1+r_q(\\tau/360)}\\\\N&=\\text{notional in base}\\\\F_0,F_t&=\\text{forward rates (quote/base)}\\\\r_q&=\\text{quote-currency money-market rate}\\\\\\text{Units: }&\\text{base}\\times\\frac{\\text{quote}}{\\text{base}}=\\text{quote}\\\\\\text{Example: }&5{,}000{,}000(0.8940-0.90296)\\\\&=-44{,}800\\,\\mathrm{USD}\\end{aligned}';
    let fxForwardMtmCard=cards.find(c=>c.subject==='Economics'&&c.question===fxForwardMtmQuestion);
    if(!fxForwardMtmCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:fxForwardMtmQuestion,answer:fxForwardMtmLatex,latex:fxForwardMtmLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(fxForwardMtmCard.answer!==fxForwardMtmLatex){fxForwardMtmCard.answer=fxForwardMtmLatex;changed++;}
      if(fxForwardMtmCard.latex!==fxForwardMtmLatex){fxForwardMtmCard.latex=fxForwardMtmLatex;changed++;}
      if(fxForwardMtmCard.topic!=='Currency Exchange Rates'){fxForwardMtmCard.topic='Currency Exchange Rates';changed++;}
    }

    const debtWhyQ='Debt Sustainability — Why Investors Expect Depreciation';
    const debtWhyA='Persistent CA deficit → rising net external debt → unsustainable path → future CA adjustment needed → weaker currency helps exports and discourages imports → investors anticipate lower long-run FX value today (if trade volumes respond).';
    const debtWhyL='\\begin{aligned}\\text{Persistent CA deficit}&\\Rightarrow\\text{External debt}\\uparrow\\\\&\\Rightarrow\\text{Future CA adjustment needed}\\\\&\\Rightarrow\\text{Expected depreciation}\\\\&\\Rightarrow\\text{Long-run FX value revised down}\\end{aligned}';
    let debtWhyCard=cards.find(c=>c.subject==='Economics'&&c.question===debtWhyQ);
    if(!debtWhyCard){debtWhyCard={id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]};cards.push(debtWhyCard);}
    Object.assign(debtWhyCard,{question:debtWhyQ,answer:debtWhyA,latex:debtWhyL});changed++;

    const fxQuestion='FX Bid–Offer Spread — Main Drivers';
    const fxLatex='\\begin{aligned}\\text{Narrower spread: }&\\text{liquid pair + good timing}\\\\&\\text{larger/relationship trade + low volatility}\\\\\\text{Spot FX: }&\\text{credit rating usually less important}\\end{aligned}';
    let fxCard=cards.find(c=>c.subject==='Economics'&&c.question===fxQuestion);
    if(!fxCard){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      cards.push({id:nextId,question:fxQuestion,answer:fxLatex,latex:fxLatex,subject:'Economics',topic:'Currency Exchange Rates',status:null,history:[]});
      changed++;
    }else{
      if(fxCard.answer!==fxLatex){fxCard.answer=fxLatex;changed++;}
      if(fxCard.latex!==fxLatex){fxCard.latex=fxLatex;changed++;}
      if(fxCard.topic!=='Currency Exchange Rates'){fxCard.topic='Currency Exchange Rates';changed++;}
    }

    if(changed){
      if(typeof save==='function')save();
      if(typeof refresh==='function')refresh();
    }

    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);

    window.CFAEconomicsTypesetMigration={changed};
  }catch(_e){}
})();

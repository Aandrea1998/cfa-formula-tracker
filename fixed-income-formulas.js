(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Fixed Income';
  const SOURCE='CFA Level II Fixed Income Formula Sheet';

  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const qkey=s=>tidy(s).toLowerCase().replace(/[^a-z0-9]+/g,'');
  const fkey=s=>tidy(s)
    .replace(/\\(?:left|right|,|;|!|quad|qquad)/g,'')
    .replace(/\\(?:mathrm|text)\{([^{}]*)\}/g,'$1')
    .replace(/\\begin\{aligned\}|\\end\{aligned\}|\\\\/g,'')
    .replace(/[{}\s]/g,'')
    .toLowerCase();

  const defs=[
    {
      topic:'Spot & Forward Rates',
      question:'Discount-Factor Forward Relation',
      latex:'DF_B=DF_A\\times F_{A,B-A}',
      notation:[
        ['DF_A','Discount factor to time A'],
        ['DF_B','Discount factor to time B'],
        ['F_{A,B-A}','Forward discount factor from time A to time B'],
        ['A','Start of the forward period'],
        ['B','End of the forward period'],
        ['B-A','Length of the forward period']
      ],
      interpretation:'The discount factor to B equals discounting to A and then applying the forward discount factor from A to B.',
      sourcePage:1
    },
    {
      topic:'Spot & Forward Rates',
      question:'Forward Rate Model',
      latex:'(1+z_B)^B=(1+z_A)^A(1+f_{A,B-A})^{B-A}',
      notation:[
        ['z_A','A-period spot rate'],
        ['z_B','B-period spot rate'],
        ['f_{A,B-A}','Forward rate starting at time A for B-A periods'],
        ['A','Number of periods from today to the start of the forward period'],
        ['B','Number of periods from today to the end of the forward period'],
        ['B-A','Length of the forward period']
      ],
      interpretation:'Long spot accumulation equals short spot accumulation times forward-period accumulation.',
      memoryRule:'Long spot accumulation = short spot accumulation × forward-period accumulation.',
      sourcePage:1
    },
    {
      topic:'Spot & Forward Rates',
      question:'Spot Rate and Successive One-Period Forward Rates',
      latex:'(1+z_T)^T=(1+z_1)(1+f_{1,1})(1+f_{2,1})(1+f_{3,1})\\cdots(1+f_{T-1,1})',
      notation:[
        ['z_T','T-period spot rate'],
        ['z_1','One-period spot rate'],
        ['f_{1,1},f_{2,1},\\ldots,f_{T-1,1}','Successive one-period forward rates'],
        ['T','Maturity, in periods, of the spot rate']
      ],
      interpretation:'A T-period spot accumulation can be decomposed into the one-period spot rate followed by successive one-period forward rates.',
      sourcePage:1
    },
    {
      topic:'Spot & Forward Rates',
      question:'Spot Rate from One-Period Forward Rates',
      latex:'z_T=\\left[(1+z_1)(1+f_{1,1})(1+f_{2,1})(1+f_{3,1})\\cdots(1+f_{T-1,1})\\right]^{1/T}-1',
      notation:[
        ['z_T','T-period spot rate being calculated'],
        ['z_1','One-period spot rate'],
        ['f_{1,1},f_{2,1},\\ldots,f_{T-1,1}','Successive one-period forward rates'],
        ['T','Maturity, in periods']
      ],
      interpretation:'The T-period spot rate is the geometric average rate implied by the one-period spot and successive one-period forwards.',
      sourcePage:1
    },

    {
      topic:'Yield-Curve Expectations & Riding the Yield Curve',
      question:'Projected Spot vs Forward Curve — Effect on Realized Return',
      aliases:['Projected Spot Curve Above Forward Curve','Projected Spot Curve Below Forward Curve'],
      latex:'\\begin{aligned}\\text{Projected Spot}>\\text{Forward}&\\Rightarrow R_{\\text{realized}}<R_f^{(1)}\\\\\\text{Projected Spot}<\\text{Forward}&\\Rightarrow R_{\\text{realized}}>R_f^{(1)}\\end{aligned}',
      interpretation:'If the projected future spot curve is above the forward curve and the projection is realized, return is below the one-period risk-free rate; if it is below the forward curve, return is above the one-period risk-free rate.',
      memoryRule:'Projected Spot > Forward ⇒ realized return < one-period risk-free rate; Projected Spot < Forward ⇒ realized return > one-period risk-free rate.',
      sourcePage:2
    },
    {
      topic:'Yield-Curve Expectations & Riding the Yield Curve',
      question:'Riding the Yield Curve — Yield Curve Unchanged',
      latex:'\\begin{aligned}\\text{Yield Curve Unchanged}&\\Rightarrow y_{\\text{roll-down}}\\downarrow\\\\&\\Rightarrow P\\uparrow\\Rightarrow\\text{Extra Price Return}\\end{aligned}',
      notation:[['P','Bond price']],
      interpretation:'Classic positive roll-down assumes the yield curve remains approximately unchanged.',
      memoryRule:'Classic positive roll-down ⇔ yield curve remains approximately unchanged.',
      sourcePage:2
    },
    {
      topic:'Yield-Curve Expectations & Riding the Yield Curve',
      question:'Riding the Yield Curve — Future Spot vs Forward (3 Cases)',
      aliases:['Future Spot Equals Forward','Future Spot Below Forward','Future Spot Above Forward'],
      latex:'\\begin{aligned}\\text{Future Spot}<\\text{Forward}&\\Rightarrow P\\uparrow\\Rightarrow\\text{Extra Return}\\\\\\text{Future Spot}=\\text{Forward}&\\Rightarrow\\text{No Extra Return vs. Priced}\\\\\\text{Future Spot}>\\text{Forward}&\\Rightarrow P\\downarrow\\Rightarrow\\text{Lower Return}\\end{aligned}',
      notation:[['P','Bond price']],
      interpretation:'Below forward implies a better-than-priced outcome; equal to forward implies no extra return versus what was already priced; above forward implies a worse-than-priced outcome.',
      memoryRule:'Spot < Forward ⇒ extra return; Spot = Forward ⇒ no extra return vs. priced; Spot > Forward ⇒ lower return.',
      sourcePage:2
    },

    {
      topic:'Credit Spread Benchmarks & Spread Measures',
      question:'Treasury Benchmark Spread',
      latex:'\\begin{aligned}\\text{Bond Yield}&=\\text{Treasury Yield}+\\text{Spread}\\\\\\text{Spread}&=\\text{Bond Yield}-\\text{Treasury Yield}\\end{aligned}',
      interpretation:'The spread is measured relative to the government/Treasury benchmark.',
      sourcePage:2
    },
    {
      topic:'Credit Spread Benchmarks & Spread Measures',
      question:'Swap Benchmark / I-Spread',
      aliases:['I-Spread'],
      latex:'\\begin{aligned}\\text{Bond Yield}&=\\text{Swap Rate}+\\text{I-Spread}\\\\\\text{I-Spread}&=\\text{Bond Yield}-\\text{Swap Rate}\\end{aligned}',
      interpretation:'The I-spread is measured relative to the swap market.',
      sourcePage:2
    },
    {
      topic:'Credit Spread Benchmarks & Spread Measures',
      question:'Swap Spread',
      latex:'\\text{Swap Spread}=\\text{Swap Rate}-\\text{Treasury Yield}',
      sourcePage:2
    },
    {
      topic:'Credit Spread Benchmarks & Spread Measures',
      question:'TED Spread',
      latex:'\\text{TED Spread}=\\text{LIBOR}-\\text{T-bill Rate}',
      sourcePage:2
    },
    {
      topic:'Credit Spread Benchmarks & Spread Measures',
      question:'MRR-OIS Spread',
      latex:'\\text{MRR-OIS Spread}=\\text{MRR}-\\text{OIS Rate}',
      interpretation:'The source describes the MRR-OIS spread as a measure of stress/risk in the banking system.',
      sourcePage:2
    },


    {
      topic:'Credit Spread Benchmarks & Spread Measures',
      question:'OAS vs Z-Spread — Relationship & 3 Cases',
      aliases:['OAS vs Z-Spread — Signed Embedded-Option Effect','OAS and Z-Spread Relationship'],
      latex:'\\begin{aligned}\\text{OAS}&\\approx\\text{Z-spread}+\\text{Option Effect}_{\\text{holder}}\\\\\\text{Callable: }&\\text{OAS}<\\text{Z-spread}\\\\\\text{Putable: }&\\text{OAS}>\\text{Z-spread}\\\\\\text{Option-free: }&\\text{OAS}\\approx\\text{Z-spread}\\end{aligned}',
      notation:[
        ['Option Effect_{holder}','Signed spread-equivalent effect from the bondholder perspective'],
        ['Callable','Bondholder is short the issuer call → negative option effect'],
        ['Putable','Bondholder is long the put → positive option effect'],
        ['Option-free','No embedded-option effect']
      ],
      interpretation:'Memory relationship in spread terms, not an exact equality with a monetary option value. The sign is always from the bondholder perspective.',
      memoryRule:'Callable: OAS < Z-spread. Putable: OAS > Z-spread. Option-free: OAS ≈ Z-spread.'
    },

    {
      topic:'Credit Spread Benchmarks & Spread Measures',
      question:'Interest-Rate Volatility vs OAS — Callable & Putable',
      aliases:['Volatility and OAS Relationship','Interest Rate Volatility and OAS'],
      latex:'\\begin{aligned}\\text{Callable: }&\\sigma\\uparrow\\Rightarrow\\text{OAS}\\downarrow,\\quad \\sigma\\downarrow\\Rightarrow\\text{OAS}\\uparrow\\\\\\text{Putable: }&\\sigma\\uparrow\\Rightarrow\\text{OAS}\\uparrow,\\quad \\sigma\\downarrow\\Rightarrow\\text{OAS}\\downarrow\\end{aligned}',
      notation:[
        ['\\sigma','Interest-rate volatility'],
        ['OAS','Option-adjusted spread fitted so model value equals the observed market price']
      ],
      interpretation:'Holding the observed market price constant, callable-bond OAS moves opposite to interest-rate volatility, while putable-bond OAS moves in the same direction as volatility.',
      memoryRule:'Callable: volatility and OAS move opposite. Putable: volatility and OAS move together.'
    },

    {
      topic:'Convertible Bonds',
      question:'Convertible Bond — Conversion Price, Ratio & Initial Premium',
      aliases:['Convertible Bond Conversion Price and Ratio'],
      latex:'\\begin{aligned}\\text{Conversion Ratio}&=\\frac{\\text{Par Value}}{\\text{Conversion Price}}\\\\\\text{Conversion Price}&=\\frac{\\text{Par Value}}{\\text{Conversion Ratio}}\\\\\\text{Initial Conversion Price}&=S_0(1+\\text{Initial Premium Ratio})\\end{aligned}',
      notation:[
        ['S_0','Stock price at issuance'],
        ['Conversion Ratio','Number of shares received on conversion'],
        ['Conversion Price','Effective share price embedded in the bond terms']
      ],
      interpretation:'Conversion price and conversion ratio are reciprocally linked through par value. If the initial conversion premium is given, apply it to the stock price at issuance to obtain the initial conversion price.',
      memoryRule:'Par links price and ratio: Ratio = Par / Price; Price = Par / Ratio.'
    },
    {
      topic:'Convertible Bonds',
      question:'Convertible Bond — Conversion Value & Minimum Value',
      aliases:['Convertible Bond Conversion Value and Floor'],
      latex:'\\begin{aligned}\\text{Conversion Value}&=S\\times\\text{Conversion Ratio}\\\\\\text{Minimum Convertible Value}&=\\max(\\text{Straight Value},\\text{Conversion Value})\\end{aligned}',
      notation:[
        ['S','Current stock price'],
        ['Straight Value','Value of the otherwise identical option-free bond'],
        ['Minimum Convertible Value','Bond floor from debt value or immediate conversion value']
      ],
      interpretation:'Conversion value is what the shares received on conversion are worth today. The convertible should not be worth less than the greater of straight-bond value and conversion value.',
      memoryRule:'Convertible floor = max(straight value, conversion value).'
    },
    {
      topic:'Convertible Bonds',
      question:'Convertible Bond — Market Conversion Price & Premium',
      aliases:['Convertible Bond Market Conversion Premium'],
      latex:'\\begin{aligned}\\text{Market Conversion Price}&=\\frac{\\text{Convertible Price}}{\\text{Conversion Ratio}}\\\\\\text{Premium/share}&=\\text{Market Conversion Price}-S\\\\\\text{Premium Ratio}&=\\frac{\\text{Market Conversion Price}-S}{S}\\end{aligned}',
      notation:[
        ['S','Current stock price'],
        ['Market Conversion Price','Effective price per share paid through the convertible'],
        ['Premium Ratio','Premium relative to buying the stock directly']
      ],
      interpretation:'The market conversion price converts the bond market price into an effective per-share price. The premium compares that effective price with the current stock price.',
      memoryRule:'Premium ratio denominator = current stock price.'
    },
    {
      topic:'Convertible Bonds',
      question:'Convertible Bond — Value Decomposition',
      aliases:['Convertible Bond Value Components'],
      latex:'\\begin{aligned}V_{\\text{conv}}&\\approx V_{\\text{straight}}+V_{\\text{conversion option}}\\\\V_{\\text{conv, callable}}&\\approx V_{\\text{straight}}+V_{\\text{conversion option}}-V_{\\text{issuer call}}\\end{aligned}',
      notation:[
        ['V_{conv}','Convertible bond value'],
        ['V_{straight}','Otherwise identical option-free bond value'],
        ['V_{conversion option}','Value of the investor conversion option'],
        ['V_{issuer call}','Value of any issuer call feature']
      ],
      interpretation:'The holder is long the conversion option, so it adds value. If the issuer also owns a call, that issuer option reduces the holder’s value.',
      memoryRule:'Holder option adds; issuer option subtracts.'
    },
    {
      topic:'Convertible Bonds',
      question:'Convertible Bond — Premium over Straight Value & Equity Sensitivity',
      aliases:['Convertible Bond Premium over Straight Value'],
      latex:'\\begin{aligned}\\text{Premium over Straight Value}&=\\frac{V_{\\text{conv}}}{V_{\\text{straight}}}-1\\\\S\\uparrow&\\Rightarrow\\text{Conversion Value}\\uparrow\\Rightarrow V_{\\text{conv}}\\uparrow\\\\\\sigma_S\\uparrow&\\Rightarrow V_{\\text{conversion option}}\\uparrow\\Rightarrow V_{\\text{conv}}\\uparrow\\end{aligned}',
      notation:[
        ['S','Stock price'],
        ['\\sigma_S','Stock-price volatility'],
        ['V_{straight}','Straight-bond value / bond floor']
      ],
      interpretation:'A larger premium over straight value means more of the convertible’s value comes from equity optionality. Higher stock price or stock volatility generally increases the value of the conversion option and therefore the convertible.',
      memoryRule:'More equity upside or stock volatility → more conversion-option value.'
    },

    {
      topic:'Term Premium, Supply, Demand & Flight to Quality',
      question:'Term Bond Risk Premium',
      aliases:['Term Premium'],
      latex:'\\text{Term Premium}=E(R_{\\text{long bond}})-E(R_{\\text{short bond}})',
      notation:[
        ['E(R_{long bond})','Expected return on a long-term bond'],
        ['E(R_{short bond})','Expected return on a short-term bond']
      ],
      interpretation:'The term premium is the extra expected return required for holding the longer-term bond.',
      sourcePage:3
    },
    {
      topic:'Term Premium, Supply, Demand & Flight to Quality',
      question:'Government Deficit Increase — Effect on Bond Supply, Price, and Yield',
      aliases:['Fiscal Policy and Government Bond Supply'],
      latex:'\\text{Government Deficit}\\uparrow\\Rightarrow\\text{Borrowing}\\uparrow\\Rightarrow\\text{Bond Supply}\\uparrow\\Rightarrow P\\downarrow\\Rightarrow y\\uparrow',
      notation:[['P','Bond price'],['y','Bond yield']],
      interpretation:'Larger government deficits can require more borrowing; more bond supply pushes price down and yield up.',
      memoryRule:'Supply ↑ ⇒ P ↓ ⇒ y ↑.',
      sourcePage:3
    },
    {
      topic:'Term Premium, Supply, Demand & Flight to Quality',
      question:'Higher Bond Demand — Effect on Price, Yield, and Risk Premium',
      aliases:['Investor Demand for Bonds'],
      latex:'\\text{Bond Demand}\\uparrow\\Rightarrow P\\uparrow\\Rightarrow y\\downarrow\\Rightarrow\\text{Risk Premium}\\downarrow',
      notation:[['P','Bond price'],['y','Bond yield']],
      interpretation:'The source specifically mentions pension funds, insurers and foreign investors as sources of long-term bond demand.',
      memoryRule:'Demand ↑ ⇒ P ↑ ⇒ y ↓.',
      sourcePage:3
    },
    {
      topic:'Term Premium, Supply, Demand & Flight to Quality',
      question:'Flight to Quality — Effect on Government Bond Demand, Price, and Yield',
      aliases:['Flight to Quality'],
      latex:'\\text{Market Stress}\\Rightarrow\\text{Government Bond Demand}\\uparrow\\Rightarrow P\\uparrow\\Rightarrow y\\downarrow',
      notation:[['P','Government bond price'],['y','Government bond yield']],
      interpretation:'During market stress, demand for safe government bonds rises, increasing price and lowering yield.',
      sourcePage:3
    },
    {
      topic:'Term Premium, Supply, Demand & Flight to Quality',
      question:'Bullish Flattening — Long-Term Yields Fall More Than Short-Term Yields',
      aliases:['Bullish Flattening'],
      latex:'y_{\\text{long}}\\downarrow\\text{ more than }y_{\\text{short}}\\downarrow\\Rightarrow\\text{Bullish Flattening}',
      notation:[['y_{long}','Long-term yield'],['y_{short}','Short-term yield']],
      interpretation:'Bullish flattening occurs when long-term yields fall more than short-term yields.',
      sourcePage:3
    },

    {
      topic:'Term Structure Models',
      question:'Cox-Ingersoll-Ross (CIR) Model — Mean Reversion & Level-Dependent Volatility',
      aliases:['Cox-Ingersoll-Ross (CIR) Model','CIR Model'],
      latex:'dr_t=\\kappa(\\theta-r_t)\\,dt+\\sigma\\sqrt{r_t}\\,dZ',
      notation:[
        ['r_t','Short-term interest rate at time t'],
        ['\\theta','Long-run mean rate'],
        ['\\kappa','Speed of mean reversion'],
        ['\\sigma','Volatility parameter'],
        ['dt','Small change in time'],
        ['dZ','Stochastic shock']
      ],
      interpretation:'CIR is an equilibrium mean-reverting model with volatility that varies with the square root of the short rate.',
      memoryRule:'CIR = mean reversion + level-dependent volatility.',
      sourcePage:3
    },
    {
      topic:'Term Structure Models',
      question:'Vasicek Model — Mean Reversion & Constant Volatility',
      aliases:['Vasicek Model'],
      latex:'dr_t=\\kappa(\\theta-r_t)\\,dt+\\sigma\\,dZ',
      notation:[
        ['r_t','Short rate'],
        ['\\theta','Long-run mean'],
        ['\\kappa','Speed of mean reversion'],
        ['\\sigma','Constant volatility'],
        ['dZ','Stochastic shock']
      ],
      interpretation:'Vasicek is an equilibrium mean-reverting model with constant volatility.',
      memoryRule:'Vasicek = mean reversion + constant volatility.',
      sourcePage:4
    },
    {
      topic:'Term Structure Models',
      question:'Ho-Lee Model — Time-Dependent Drift, No Mean Reversion',
      aliases:['Ho-Lee Model'],
      latex:'dr_t=\\theta_t\\,dt+\\sigma\\,dZ',
      notation:[
        ['r_t','Short rate'],
        ['\\theta_t','Time-dependent drift'],
        ['\\sigma','Constant volatility'],
        ['dZ','Stochastic shock']
      ],
      interpretation:'Ho-Lee is an arbitrage-free model with no mean reversion, time-dependent drift and constant volatility.',
      memoryRule:'Ho-Lee = time-dependent drift + no mean reversion + constant volatility.',
      sourcePage:4
    },
    {
      topic:'Term Structure Models',
      question:'Kalotay-Williams-Fabozzi (KWF) Model — Lognormal Short Rate',
      aliases:['Kalotay-Williams-Fabozzi (KWF) Model','KWF Model'],
      latex:'d\\ln(r_t)=\\theta_t\\,dt+\\sigma\\,dZ',
      notation:[
        ['r_t','Short rate'],
        ['\\ln(r_t)','Log of the short rate'],
        ['\\theta_t','Time-dependent drift'],
        ['\\sigma','Constant volatility'],
        ['dZ','Stochastic shock']
      ],
      interpretation:'KWF is an arbitrage-free model with no mean reversion and constant volatility; modeling the log short rate makes the short rate lognormal.',
      memoryRule:'KWF = Ho-Lee applied to ln(r_t) ⇒ lognormal short rate.',
      sourcePage:4
    }
  ];

  function mergeState(target,source){
    if(!target.status&&source.status)target.status=source.status;
    const a=Array.isArray(target.history)?target.history:[];
    const b=Array.isArray(source.history)?source.history:[];
    if(b.length)target.history=[...a,...b];
  }

  let changed=0,added=0,removed=0;
  const existingQuestionKeys=new Map();

  cards.forEach(c=>{
    if(c.subject!==SUBJECT)return;
    existingQuestionKeys.set(qkey(c.question),c);
  });

  for(const def of defs){
    const aliases=[def.question,...(def.aliases||[])];
    let card=null;
    for(const name of aliases){
      const found=existingQuestionKeys.get(qkey(name));
      if(found){card=found;break;}
    }

    if(!card){
      const targetFormula=fkey(def.latex);
      card=cards.find(c=>c.subject===SUBJECT&&fkey(c.latex||c.answer)===targetFormula)||null;
    }

    if(!card){
      const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      card={
        id:nextId,
        question:def.question,
        answer:def.latex,
        latex:def.latex,
        subject:SUBJECT,
        topic:def.topic,
        source:SOURCE,
        sourcePage:def.sourcePage,
        notation:def.notation||[],
        interpretation:def.interpretation||'',
        memoryRule:def.memoryRule||'',
        status:null,
        history:[]
      };
      cards.push(card);
      added++;changed++;
    }else{
      let local=false;
      const updates={
        question:def.question,
        answer:def.latex,
        latex:def.latex,
        subject:SUBJECT,
        topic:def.topic,
        source:SOURCE,
        sourcePage:def.sourcePage,
        notation:def.notation||[],
        interpretation:def.interpretation||'',
        memoryRule:def.memoryRule||''
      };
      for(const [k,v] of Object.entries(updates)){
        if(JSON.stringify(card[k])!==JSON.stringify(v)){card[k]=v;local=true;}
      }
      if(card.formulaImage){delete card.formulaImage;local=true;}
      if(!Array.isArray(card.history)){card.history=[];local=true;}
      if(local){changed++;}
    }
    existingQuestionKeys.set(qkey(def.question),card);
  }

  // Consolidate the two earlier projected-spot/forward cards into one comparison card.
  // Preserve existing review state/history on the surviving card.
  const projectedSpotTarget=qkey('Projected Spot vs Forward Curve — Effect on Realized Return');
  const legacyProjectedSpotCases=new Set([
    qkey('Projected Spot Curve Above Forward Curve'),
    qkey('Projected Spot Curve Below Forward Curve')
  ]);
  for(const card of [...cards]){
    if(card.subject!==SUBJECT||!legacyProjectedSpotCases.has(qkey(card.question)))continue;
    const keep=cards.find(c=>c!==card&&c.subject===SUBJECT&&qkey(c.question)===projectedSpotTarget);
    if(!keep)continue;
    mergeState(keep,card);
    const i=cards.indexOf(card);
    if(i>=0){cards.splice(i,1);removed++;changed++;}
  }

  // Consolidate the three earlier future-spot/forward cards into one 3-case riding-the-yield-curve card.
  // Preserve existing review state/history on the surviving card.
  const ridingCasesTarget=qkey('Riding the Yield Curve — Future Spot vs Forward (3 Cases)');
  const legacyRidingCases=new Set([
    qkey('Future Spot Equals Forward'),
    qkey('Future Spot Below Forward'),
    qkey('Future Spot Above Forward')
  ]);
  for(const card of [...cards]){
    if(card.subject!==SUBJECT||!legacyRidingCases.has(qkey(card.question)))continue;
    const keep=cards.find(c=>c!==card&&c.subject===SUBJECT&&qkey(c.question)===ridingCasesTarget);
    if(!keep)continue;
    mergeState(keep,card);
    const i=cards.indexOf(card);
    if(i>=0){cards.splice(i,1);removed++;changed++;}
  }

  // Consolidate the earlier split model cards into the four canonical model rows.
  // Preserve any existing rating/history on the surviving model card.
  const legacyModelMerge={
    [qkey('CIR Mean-Reversion Direction')]:qkey('Cox-Ingersoll-Ross (CIR) Model — Mean Reversion & Level-Dependent Volatility'),
    [qkey('CIR Level-Dependent Volatility')]:qkey('Cox-Ingersoll-Ross (CIR) Model — Mean Reversion & Level-Dependent Volatility'),
    [qkey('KWF Distributional Implication')]:qkey('Kalotay-Williams-Fabozzi (KWF) Model — Lognormal Short Rate')
  };
  for(const card of [...cards]){
    if(card.subject!==SUBJECT)continue;
    const targetKey=legacyModelMerge[qkey(card.question)];
    if(!targetKey)continue;
    const keep=cards.find(c=>c!==card&&c.subject===SUBJECT&&qkey(c.question)===targetKey);
    if(!keep)continue;
    mergeState(keep,card);
    const i=cards.indexOf(card);
    if(i>=0){cards.splice(i,1);removed++;changed++;}
  }

  // Remove only exact Fixed Income duplicates created by earlier imports.
  // Keep review history/status on the surviving canonical card.
  const seen=new Map();
  for(const card of [...cards]){
    if(card.subject!==SUBJECT)continue;
    const k=fkey(card.latex||card.answer);
    if(!k)continue;
    if(!seen.has(k)){seen.set(k,card);continue;}
    const keep=seen.get(k);
    mergeState(keep,card);
    const i=cards.indexOf(card);
    if(i>=0){cards.splice(i,1);removed++;changed++;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
    try{if(typeof refresh==='function')refresh();}catch(_e){}

    // Preserve all ratings/history, but rebuild the review queue so newly added
    // Fixed Income cards are included in the next full-coverage pass.
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

  window.CFAFixedIncomeFormulaSheet={
    version:'2026-10-09',
    source:SOURCE,
    added,
    removed,
    changed,
    total:defs.length
  };
})();
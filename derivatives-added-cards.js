(function(){
  'use strict';
  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Derivatives';
  let changed=0;

  const futuresMTMQuestion='Futures — Daily Mark-to-Market Gain/Loss';
  const futuresMTMLatex='\\begin{aligned}v_t&=N_f(f_t-f_{t-1})\\\\&=\\text{Multiplier}\\times(\\text{Current futures price}-\\text{Previous settlement price})\\end{aligned}';
  const futuresMTMAnswer='Daily futures gain/loss: v_t = N_f(f_t − f_{t−1}), where N_f is the contract multiplier.';

  let card=cards.find(c=>c.subject===SUBJECT&&c.question===futuresMTMQuestion);
  if(!card){
    card={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:futuresMTMQuestion,
      answer:futuresMTMAnswer,
      latex:futuresMTMLatex,
      subject:SUBJECT,
      topic:'Futures',
      status:null,
      history:[]
    };
    cards.push(card);
    changed=1;
  }else{
    if(card.answer!==futuresMTMAnswer){card.answer=futuresMTMAnswer;changed=1;}
    if(card.latex!==futuresMTMLatex){card.latex=futuresMTMLatex;changed=1;}
    if(card.topic!=='Futures'){card.topic='Futures';changed=1;}
    if(!Array.isArray(card.history)){card.history=[];changed=1;}
  }


  const oldCarryQuestion='Forward Arbitrage — Cash-and-Carry vs Reverse Cash-and-Carry';
  const carryQuestion='Forward Arbitrage — Carry Arbitrage vs Reverse Carry Arbitrage';
  const carryLatex='\\begin{aligned}\\text{Carry Arbitrage: }&\\text{Long Asset + Short Bond + Short Forward}=0\\\\\\text{Reverse Carry Arbitrage: }&\\text{Short Asset + Long Bond + Long Forward}=0\\\\\\text{Short Forward}&\\Rightarrow\\text{Carry Arbitrage}\\\\\\text{Long Forward}&\\Rightarrow\\text{Reverse Carry Arbitrage}\\end{aligned}';
  const carryAnswer='Carry arbitrage: long asset + short bond + short forward. Reverse carry arbitrage: short asset + long bond + long forward.';
  let carryCard=cards.find(c=>c.subject===SUBJECT&&(c.question===carryQuestion||c.question===oldCarryQuestion));
  if(!carryCard){
    carryCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:carryQuestion,
      answer:carryAnswer,
      latex:carryLatex,
      subject:SUBJECT,
      topic:'Forwards',
      status:null,
      history:[]
    };
    cards.push(carryCard);
    changed=1;
  }else{
    if(carryCard.question!==carryQuestion){carryCard.question=carryQuestion;changed=1;}
    if(carryCard.answer!==carryAnswer){carryCard.answer=carryAnswer;changed=1;}
    if(carryCard.latex!==carryLatex){carryCard.latex=carryLatex;changed=1;}
    if(carryCard.topic!=='Forwards'){carryCard.topic='Forwards';changed=1;}
    if(!Array.isArray(carryCard.history)){carryCard.history=[];changed=1;}
  }


  const forwardValueQuestion='Forward Contract Value at Time t — Long Position';
  const forwardValueLatex='\\begin{aligned}V_t&=S_t-PV(F_0)\\\\&=S_t-\\frac{F_0}{(1+r)^{T-t}}\\end{aligned}';
  const forwardValueAnswer='For a long forward with no interim income: V_t = S_t − PV(F_0) = S_t − F_0/(1+r)^(T−t). Here F_0 is the delivery price fixed when the contract was initiated, S_t is the current spot price, r is the relevant discount rate, and T−t is the remaining time to maturity. Equivalent form: V_t = PV(F_t − F_0). For a short forward, reverse the sign.';
  let forwardValueCard=cards.find(c=>c.subject===SUBJECT&&c.question===forwardValueQuestion);
  if(!forwardValueCard){
    forwardValueCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:forwardValueQuestion,
      answer:forwardValueAnswer,
      latex:forwardValueLatex,
      subject:SUBJECT,
      topic:'Forwards',
      status:null,
      history:[]
    };
    cards.push(forwardValueCard);
    changed=1;
  }else{
    if(forwardValueCard.answer!==forwardValueAnswer){forwardValueCard.answer=forwardValueAnswer;changed=1;}
    if(forwardValueCard.latex!==forwardValueLatex){forwardValueCard.latex=forwardValueLatex;changed=1;}
    if(forwardValueCard.topic!=='Forwards'){forwardValueCard.topic='Forwards';changed=1;}
    if(!Array.isArray(forwardValueCard.history)){forwardValueCard.history=[];changed=1;}
  }


  const forwardCarryQuestion='Forward Price — Income, Carry Costs & Carry Benefits';
  const forwardCarryLatex='\\begin{aligned}F_0&=FV\\left(S_0-PV(D)\\right)\\\\&=FV(S_0)-FV(D)\\\\[6pt]F_0&=S_0e^{(r_c+CC-CB)T}\\end{aligned}';
  const forwardCarryAnswer='Known income/dividends: F₀ = FV[S₀ − PV(D)] = FV(S₀) − FV(D). With continuous carry: F₀ = S₀e^((r_c + CC − CB)T), where CC = carrying costs and CB = carrying benefits.';
  let forwardCarryCard=cards.find(c=>c.subject===SUBJECT&&c.question===forwardCarryQuestion);
  if(!forwardCarryCard){
    forwardCarryCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:forwardCarryQuestion,
      answer:forwardCarryAnswer,
      latex:forwardCarryLatex,
      subject:SUBJECT,
      topic:'Forwards',
      status:null,
      history:[]
    };
    cards.push(forwardCarryCard);
    changed=1;
  }else{
    if(forwardCarryCard.answer!==forwardCarryAnswer){forwardCarryCard.answer=forwardCarryAnswer;changed=1;}
    if(forwardCarryCard.latex!==forwardCarryLatex){forwardCarryCard.latex=forwardCarryLatex;changed=1;}
    if(forwardCarryCard.topic!=='Forwards'){forwardCarryCard.topic='Forwards';changed=1;}
    if(!Array.isArray(forwardCarryCard.history)){forwardCarryCard.history=[];changed=1;}
  }


  const futuresForwardRelationQuestion='Futures vs Forward Prices — Effect of Interest Rate Correlation';
  const futuresForwardRelationLatex='\\begin{aligned}\\text{Rates constant/independent of price} &\\Rightarrow F_{\\text{futures}}=F_{\\text{forward}}\\\\\\text{Positive rates + price increasing with rates} &\\Rightarrow F_{\\text{futures}}>F_{\\text{forward}}\\\\\\text{Positive rates + price decreasing with rates} &\\Rightarrow F_{\\text{futures}}<F_{\\text{forward}}\\end{aligned}';
  const futuresForwardRelationAnswer='If interest rates are constant or uncorrelated with the underlying price, futures = forward. With positive rates: positive price-rate correlation => futures > forward; negative correlation => futures < forward.';
  let futuresForwardRelationCard=cards.find(c=>c.subject===SUBJECT&&c.question===futuresForwardRelationQuestion);
  if(!futuresForwardRelationCard){
    futuresForwardRelationCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:futuresForwardRelationQuestion,
      answer:futuresForwardRelationAnswer,
      latex:futuresForwardRelationLatex,
      subject:SUBJECT,
      topic:'Futures',
      status:null,
      history:[]
    };
    cards.push(futuresForwardRelationCard);
    changed=1;
  }else{
    if(futuresForwardRelationCard.answer!==futuresForwardRelationAnswer){futuresForwardRelationCard.answer=futuresForwardRelationAnswer;changed=1;}
    if(futuresForwardRelationCard.latex!==futuresForwardRelationLatex){futuresForwardRelationCard.latex=futuresForwardRelationLatex;changed=1;}
    if(futuresForwardRelationCard.topic!=='Futures'){futuresForwardRelationCard.topic='Futures';changed=1;}
    if(!Array.isArray(futuresForwardRelationCard.history)){futuresForwardRelationCard.history=[];changed=1;}
  }


  const fraSettlementQuestion='FRA Settlement at Expiration — Advanced Set, Advanced Settled';
  const fraSettlementLatex='\\begin{aligned}\\text{Long / receive-floating: }\\quad\\text{Settlement}_h&=NA\\times\\frac{(L_m-FRA_0)t_m}{1+D_m t_m}\\\\\\text{Short / receive-fixed: }\\quad\\text{Settlement}_h&=NA\\times\\frac{(FRA_0-L_m)t_m}{1+D_m t_m}\\end{aligned}';
  const fraSettlementAnswer='FRA settlement is paid at h, so the interest differential for the underlying m-period is discounted back from h+m to h. D_m is the annualized discount rate for that m-period (from FRA expiration h to underlying maturity h+m); in the standard setup at h, L_m = D_m.';
  let fraSettlementCard=cards.find(c=>c.subject===SUBJECT&&c.question===fraSettlementQuestion);
  if(!fraSettlementCard){
    fraSettlementCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:fraSettlementQuestion,
      answer:fraSettlementAnswer,
      latex:fraSettlementLatex,
      subject:SUBJECT,
      topic:'FRAs',
      status:null,
      history:[]
    };
    cards.push(fraSettlementCard);
    changed=1;
  }else{
    if(fraSettlementCard.answer!==fraSettlementAnswer){fraSettlementCard.answer=fraSettlementAnswer;changed=1;}
    if(fraSettlementCard.latex!==fraSettlementLatex){fraSettlementCard.latex=fraSettlementLatex;changed=1;}
    if(fraSettlementCard.topic!=='FRAs'){fraSettlementCard.topic='FRAs';changed=1;}
    if(!Array.isArray(fraSettlementCard.history)){fraSettlementCard.history=[];changed=1;}
  }


  const fraGeneralValueQuestion='FRA Value at Any Valuation Date t ≤ T₁';
  const fraGeneralValueLatex='\\begin{aligned}V_t&=N\\,\\tau\\,[F_t(T_1,T_2)-K]\\,P(t,T_2)\\end{aligned}';
  const fraGeneralValueAnswer='For receive-floating/pay-fixed: V_t = N × τ × [F_t(T₁,T₂) − K] × P(t,T₂). N = notional; K = contractual FRA rate; F_t(T₁,T₂) = forward rate observed at valuation date t for T₁→T₂; τ = accrual factor for T₁→T₂; P(t,T₂) = discount factor from T₂ directly to valuation date t.';
  let fraGeneralValueCard=cards.find(c=>c.subject===SUBJECT&&c.question===fraGeneralValueQuestion);
  if(!fraGeneralValueCard){
    fraGeneralValueCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:fraGeneralValueQuestion,
      answer:fraGeneralValueAnswer,
      latex:fraGeneralValueLatex,
      subject:SUBJECT,
      topic:'FRAs',
      status:null,
      history:[]
    };
    cards.push(fraGeneralValueCard);
    changed=1;
  }else{
    if(fraGeneralValueCard.answer!==fraGeneralValueAnswer){fraGeneralValueCard.answer=fraGeneralValueAnswer;changed=1;}
    if(fraGeneralValueCard.latex!==fraGeneralValueLatex){fraGeneralValueCard.latex=fraGeneralValueLatex;changed=1;}
    if(fraGeneralValueCard.topic!=='FRAs'){fraGeneralValueCard.topic='FRAs';changed=1;}
    if(!Array.isArray(fraGeneralValueCard.history)){fraGeneralValueCard.history=[];changed=1;}
  }


  const fraForwardRateQuestion='FRA Forward Rate from Spot MRRs';
  const fraForwardRateLatex='\\begin{aligned}[1+L_h t_h][1+FRA_0 t_m]&=[1+L_T t_T]\\\\FRA_0&=\\frac{\\frac{1+L_T t_T}{1+L_h t_h}-1}{t_m}\\end{aligned}';
  const fraForwardRateAnswer='Use no-arbitrage between investing to T directly and investing to h then locking the h→T rate. L_h = spot MRR to h; L_T = spot MRR to T; t_h = time 0→h; t_m = time h→T; t_T = t_h + t_m.';
  let fraForwardRateCard=cards.find(c=>c.subject===SUBJECT&&c.question===fraForwardRateQuestion);
  if(!fraForwardRateCard){
    fraForwardRateCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:fraForwardRateQuestion,
      answer:fraForwardRateAnswer,
      latex:fraForwardRateLatex,
      subject:SUBJECT,
      topic:'FRAs',
      status:null,
      history:[]
    };
    cards.push(fraForwardRateCard);
    changed=1;
  }else{
    if(fraForwardRateCard.answer!==fraForwardRateAnswer){fraForwardRateCard.answer=fraForwardRateAnswer;changed=1;}
    if(fraForwardRateCard.latex!==fraForwardRateLatex){fraForwardRateCard.latex=fraForwardRateLatex;changed=1;}
    if(fraForwardRateCard.topic!=='FRAs'){fraForwardRateCard.topic='FRAs';changed=1;}
    if(!Array.isArray(fraForwardRateCard.history)){fraForwardRateCard.history=[];changed=1;}
  }


  const bondFuturesQuotedPriceQuestion='Bond Futures — Conversion-Factor-Adjusted Quoted Futures Price';
  const bondFuturesQuotedPriceLatex='\\begin{aligned}Q_0&=\\frac{1}{CF}\\left\\{FV(B_0+AI_0)-AI_T-FVCI\\right\\}\\end{aligned}';
  const bondFuturesQuotedPriceAnswer='Quoted futures price = [FV(B₀ + AI₀) − AI_T − FVCI] / CF. B₀ = current clean bond price; AI₀ = accrued interest today; AI_T = accrued interest at delivery; FVCI = future value of coupon income received before delivery; CF = conversion factor.';
  let bondFuturesQuotedPriceCard=cards.find(c=>c.subject===SUBJECT&&c.question===bondFuturesQuotedPriceQuestion);
  if(!bondFuturesQuotedPriceCard){
    bondFuturesQuotedPriceCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:bondFuturesQuotedPriceQuestion,
      answer:bondFuturesQuotedPriceAnswer,
      latex:bondFuturesQuotedPriceLatex,
      subject:SUBJECT,
      topic:'Futures',
      status:null,
      history:[]
    };
    cards.push(bondFuturesQuotedPriceCard);
    changed=1;
  }else{
    if(bondFuturesQuotedPriceCard.answer!==bondFuturesQuotedPriceAnswer){bondFuturesQuotedPriceCard.answer=bondFuturesQuotedPriceAnswer;changed=1;}
    if(bondFuturesQuotedPriceCard.latex!==bondFuturesQuotedPriceLatex){bondFuturesQuotedPriceCard.latex=bondFuturesQuotedPriceLatex;changed=1;}
    if(bondFuturesQuotedPriceCard.topic!=='Futures'){bondFuturesQuotedPriceCard.topic='Futures';changed=1;}
    if(!Array.isArray(bondFuturesQuotedPriceCard.history)){bondFuturesQuotedPriceCard.history=[];changed=1;}
  }


  const swapRateQuestion='Swap Rate — Core Definition';
  const swapRateLatex='\\begin{aligned}PV(\\text{Floating Leg})&=PV(\\text{Fixed Leg})\\end{aligned}';
  const swapRateAnswer='The swap rate is the fixed rate that makes the present value of the fixed leg equal to the present value of the floating leg at initiation.';
  let swapRateCard=cards.find(c=>c.subject===SUBJECT&&c.question===swapRateQuestion);
  if(!swapRateCard){
    swapRateCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:swapRateQuestion,
      answer:swapRateAnswer,
      latex:swapRateLatex,
      subject:SUBJECT,
      topic:'Swaps',
      status:null,
      history:[]
    };
    cards.push(swapRateCard);
    changed=1;
  }else{
    if(swapRateCard.answer!==swapRateAnswer){swapRateCard.answer=swapRateAnswer;changed=1;}
    if(swapRateCard.latex!==swapRateLatex){swapRateCard.latex=swapRateLatex;changed=1;}
    if(swapRateCard.topic!=='Swaps'){swapRateCard.topic='Swaps';changed=1;}
    if(!Array.isArray(swapRateCard.history)){swapRateCard.history=[];changed=1;}
  }


  const swapFixedRateQuestion='Fixed Swap Rate from Discount Factors';
  const swapFixedRateLatex='\\begin{aligned}r_{FIX}&=\\frac{1-P_{V_n}(1)}{\\sum_{i=1}^{n}P_{V_i}(1)}\\times\\frac{1}{AP}\\end{aligned}';
  const swapFixedRateAnswer='Fixed swap rate = [1 − PV_n(1)] / [Σ_{i=1}^n PV_i(1)] × 1/AP. PV_i(1) is the discount factor for payment date i; AP is the number of settlement periods per year (so 1/AP is the accrual fraction).';
  let swapFixedRateCard=cards.find(c=>c.subject===SUBJECT&&c.question===swapFixedRateQuestion);
  if(!swapFixedRateCard){
    swapFixedRateCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:swapFixedRateQuestion,
      answer:swapFixedRateAnswer,
      latex:swapFixedRateLatex,
      subject:SUBJECT,
      topic:'Swaps',
      status:null,
      history:[]
    };
    cards.push(swapFixedRateCard);
    changed=1;
  }else{
    if(swapFixedRateCard.answer!==swapFixedRateAnswer){swapFixedRateCard.answer=swapFixedRateAnswer;changed=1;}
    if(swapFixedRateCard.latex!==swapFixedRateLatex){swapFixedRateCard.latex=swapFixedRateLatex;changed=1;}
    if(swapFixedRateCard.topic!=='Swaps'){swapFixedRateCard.topic='Swaps';changed=1;}
    if(!Array.isArray(swapFixedRateCard.history)){swapFixedRateCard.history=[];changed=1;}
  }


  const swapValueRateDiffQuestion='Interest Rate Swap Value from Fixed-Rate Difference';
  const swapValueRateDiffLatex='\\begin{aligned}V&=NA(FS_0-FS_t)\\,AP\\sum_i PV_i\\end{aligned}';
  const swapValueRateDiffAnswer='Swap value = NA × (FS₀ − FS_t) × AP × ΣPV_i. Here FS₀ is the contractual fixed swap rate, FS_t is the current market fixed swap rate for the remaining swap, AP is the accrual period per settlement, and PV_i are the discount factors for the remaining payment dates. Sign shown is for receive-fixed/pay-floating; reverse the sign for pay-fixed.';
  let swapValueRateDiffCard=cards.find(c=>c.subject===SUBJECT&&c.question===swapValueRateDiffQuestion);
  if(!swapValueRateDiffCard){
    swapValueRateDiffCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:swapValueRateDiffQuestion,
      answer:swapValueRateDiffAnswer,
      latex:swapValueRateDiffLatex,
      subject:SUBJECT,
      topic:'Swaps',
      status:null,
      history:[]
    };
    cards.push(swapValueRateDiffCard);
    changed=1;
  }else{
    if(swapValueRateDiffCard.answer!==swapValueRateDiffAnswer){swapValueRateDiffCard.answer=swapValueRateDiffAnswer;changed=1;}
    if(swapValueRateDiffCard.latex!==swapValueRateDiffLatex){swapValueRateDiffCard.latex=swapValueRateDiffLatex;changed=1;}
    if(swapValueRateDiffCard.topic!=='Swaps'){swapValueRateDiffCard.topic='Swaps';changed=1;}
    if(!Array.isArray(swapValueRateDiffCard.history)){swapValueRateDiffCard.history=[];changed=1;}
  }


  const currencySwapValueBQuestion='Currency Swap Value in Currency b — Currency a is Foreign';
  const currencySwapValueBLatex='\\begin{aligned}V_{CS}^{(b)}&=S_tN A_a\\left[AP\\,r_{\\text{Fix},a}\\sum_{i=1}^{n}PV_{a,i}+PV_{a,n}\\right]\\\\&\\quad-N A_b\\left[AP\\,r_{\\text{Fix},b}\\sum_{i=1}^{n}PV_{b,i}+PV_{b,n}\\right]\\end{aligned}';
  const currencySwapValueBAnswer='If currency a is foreign and the swap value is required in currency b: convert the entire a-leg into b using spot S_t, then subtract the b-leg. Assumes S_t is quoted as b per 1 unit of a.';
  let currencySwapValueBCard=cards.find(c=>c.subject===SUBJECT&&c.question===currencySwapValueBQuestion);
  if(!currencySwapValueBCard){
    currencySwapValueBCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:currencySwapValueBQuestion,
      answer:currencySwapValueBAnswer,
      latex:currencySwapValueBLatex,
      subject:SUBJECT,
      topic:'Swaps',
      status:null,
      history:[]
    };
    cards.push(currencySwapValueBCard);
    changed=1;
  }else{
    if(currencySwapValueBCard.answer!==currencySwapValueBAnswer){currencySwapValueBCard.answer=currencySwapValueBAnswer;changed=1;}
    if(currencySwapValueBCard.latex!==currencySwapValueBLatex){currencySwapValueBCard.latex=currencySwapValueBLatex;changed=1;}
    if(currencySwapValueBCard.topic!=='Swaps'){currencySwapValueBCard.topic='Swaps';changed=1;}
    if(!Array.isArray(currencySwapValueBCard.history)){currencySwapValueBCard.history=[];changed=1;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
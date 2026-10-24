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
  const bondFuturesQuotedPriceAnswer='Quoted futures price = [FV(B₀ + AI₀) − AI_T − FVCI] / CF. B₀ = current clean bond price; AI₀ = accrued interest today; AI_T = accrued interest at delivery; FVCI = future value of coupon income received before delivery; CF = conversion factor. Arbitrage profit today = |CF × (Q_market − Q_fair)| / (1+r)^T (discount the delivery-price mispricing to today).';
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


  const equitySwapReceiveEquityQuestion='Equity Swap — Receive Equity / Pay Fixed';
  const equitySwapReceiveEquityLatex='\\begin{aligned}V_t&=PV(\\text{Equity Leg})-PV(\\text{Fixed Leg})\\\\S_i&=NA_E R_{E,i}\\\\FS_i&=NA_E\\,AP_{\\text{FIX}}\\,r_{\\text{FIX}}\\end{aligned}';
  const equitySwapReceiveEquityAnswer='For a receive-equity/pay-fixed swap: V_t = PV(Equity Leg) − PV(Fixed Leg). Per period: equity cash flow S_i = NA_E × R_{E,i}; fixed cash flow FS_i = NA_E × AP_FIX × r_FIX.';
  let equitySwapReceiveEquityCard=cards.find(c=>c.subject===SUBJECT&&c.question===equitySwapReceiveEquityQuestion);
  if(!equitySwapReceiveEquityCard){
    equitySwapReceiveEquityCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:equitySwapReceiveEquityQuestion,
      answer:equitySwapReceiveEquityAnswer,
      latex:equitySwapReceiveEquityLatex,
      subject:SUBJECT,
      topic:'Swaps',
      status:null,
      history:[]
    };
    cards.push(equitySwapReceiveEquityCard);
    changed=1;
  }else{
    if(equitySwapReceiveEquityCard.answer!==equitySwapReceiveEquityAnswer){equitySwapReceiveEquityCard.answer=equitySwapReceiveEquityAnswer;changed=1;}
    if(equitySwapReceiveEquityCard.latex!==equitySwapReceiveEquityLatex){equitySwapReceiveEquityCard.latex=equitySwapReceiveEquityLatex;changed=1;}
    if(equitySwapReceiveEquityCard.topic!=='Swaps'){equitySwapReceiveEquityCard.topic='Swaps';changed=1;}
    if(!Array.isArray(equitySwapReceiveEquityCard.history)){equitySwapReceiveEquityCard.history=[];changed=1;}
  }


  const forwardDividendRelationQuestion='Equity Forward Value — Effect of a Newly Announced Dividend';
  const forwardDividendRelationLatex='\\begin{aligned}\\text{Dividend announced} &\\Rightarrow F_t\\downarrow\\\\V_t^{\\text{long}}&=PV(F_t-F_0)\\downarrow\\end{aligned}';
  const forwardDividendRelationAnswer='For an existing long equity forward, the contractual forward price F₀ is fixed. A newly announced dividend lowers the current fair forward price F_t, so the long forward value decreases, assuming the underlying spot price does not change.';
  let forwardDividendRelationCard=cards.find(c=>c.subject===SUBJECT&&c.question===forwardDividendRelationQuestion);
  if(!forwardDividendRelationCard){
    forwardDividendRelationCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:forwardDividendRelationQuestion,
      answer:forwardDividendRelationAnswer,
      latex:forwardDividendRelationLatex,
      subject:SUBJECT,
      topic:'Forwards',
      status:null,
      history:[]
    };
    cards.push(forwardDividendRelationCard);
    changed=1;
  }else{
    if(forwardDividendRelationCard.answer!==forwardDividendRelationAnswer){forwardDividendRelationCard.answer=forwardDividendRelationAnswer;changed=1;}
    if(forwardDividendRelationCard.latex!==forwardDividendRelationLatex){forwardDividendRelationCard.latex=forwardDividendRelationLatex;changed=1;}
    if(forwardDividendRelationCard.topic!=='Forwards'){forwardDividendRelationCard.topic='Forwards';changed=1;}
    if(!Array.isArray(forwardDividendRelationCard.history)){forwardDividendRelationCard.history=[];changed=1;}
  }


  const binomialHedgeRatioQuestion='Binomial Option Pricing — Hedge Ratio';
  const binomialHedgeRatioLatex='\\begin{aligned}h&=\\frac{c^{+}-c^{-}}{S^{+}-S^{-}}\\ge 0\\end{aligned}';
  const binomialHedgeRatioAnswer='Hedge ratio (option delta) in a one-period binomial model: h = (c⁺ − c⁻)/(S⁺ − S⁻). It gives the number of shares needed per option in the replicating portfolio.';
  let binomialHedgeRatioCard=cards.find(c=>c.subject===SUBJECT&&c.question===binomialHedgeRatioQuestion);
  if(!binomialHedgeRatioCard){
    binomialHedgeRatioCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:binomialHedgeRatioQuestion,
      answer:binomialHedgeRatioAnswer,
      latex:binomialHedgeRatioLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(binomialHedgeRatioCard);
    changed=1;
  }else{
    if(binomialHedgeRatioCard.answer!==binomialHedgeRatioAnswer){binomialHedgeRatioCard.answer=binomialHedgeRatioAnswer;changed=1;}
    if(binomialHedgeRatioCard.latex!==binomialHedgeRatioLatex){binomialHedgeRatioCard.latex=binomialHedgeRatioLatex;changed=1;}
    if(binomialHedgeRatioCard.topic!=='Options'){binomialHedgeRatioCard.topic='Options';changed=1;}
    if(!Array.isArray(binomialHedgeRatioCard.history)){binomialHedgeRatioCard.history=[];changed=1;}
  }


  const binomialReplicatingValueQuestion='Binomial Option Value — General Replicating Portfolio Formula';
  const binomialReplicatingValueLatex='\\begin{aligned}V_0&=hS_0+PV\\left(V^{-}-hS^{-}\\right)\\\\&=hS_0+PV\\left(V^{+}-hS^{+}\\right)\\\\h&=\\frac{V^{+}-V^{-}}{S^{+}-S^{-}}\\end{aligned}';
  const binomialReplicatingValueAnswer='General one-period binomial formula for either a call or a put: option value = stock position hS₀ + PV of the risk-free payoff. Either the up-state or down-state expression can be used because h equalizes the two state payoffs.';
  let binomialReplicatingValueCard=cards.find(c=>c.subject===SUBJECT&&c.question===binomialReplicatingValueQuestion);
  if(!binomialReplicatingValueCard){
    binomialReplicatingValueCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:binomialReplicatingValueQuestion,
      answer:binomialReplicatingValueAnswer,
      latex:binomialReplicatingValueLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(binomialReplicatingValueCard);
    changed=1;
  }else{
    if(binomialReplicatingValueCard.answer!==binomialReplicatingValueAnswer){binomialReplicatingValueCard.answer=binomialReplicatingValueAnswer;changed=1;}
    if(binomialReplicatingValueCard.latex!==binomialReplicatingValueLatex){binomialReplicatingValueCard.latex=binomialReplicatingValueLatex;changed=1;}
    if(binomialReplicatingValueCard.topic!=='Options'){binomialReplicatingValueCard.topic='Options';changed=1;}
    if(!Array.isArray(binomialReplicatingValueCard.history)){binomialReplicatingValueCard.history=[];changed=1;}
  }


  const binomialExpectationsQuestion='Binomial Option Pricing — Expectations Approach';
  const binomialExpectationsLatex='\\begin{aligned}c_0&=PV\\left[\\pi c^{+}+(1-\\pi)c^{-}\\right]\\\\p_0&=PV\\left[\\pi p^{+}+(1-\\pi)p^{-}\\right]\\\\\\pi&=\\frac{FV(1)-d}{u-d}\\end{aligned}';
  const binomialExpectationsAnswer='Expectations approach: discount the risk-neutral expected option payoff. For both calls and puts, use the same risk-neutral up probability π = [FV(1) − d]/(u − d), where u and d are the up/down stock return multipliers.';
  let binomialExpectationsCard=cards.find(c=>c.subject===SUBJECT&&c.question===binomialExpectationsQuestion);
  if(!binomialExpectationsCard){
    binomialExpectationsCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:binomialExpectationsQuestion,
      answer:binomialExpectationsAnswer,
      latex:binomialExpectationsLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(binomialExpectationsCard);
    changed=1;
  }else{
    if(binomialExpectationsCard.answer!==binomialExpectationsAnswer){binomialExpectationsCard.answer=binomialExpectationsAnswer;changed=1;}
    if(binomialExpectationsCard.latex!==binomialExpectationsLatex){binomialExpectationsCard.latex=binomialExpectationsLatex;changed=1;}
    if(binomialExpectationsCard.topic!=='Options'){binomialExpectationsCard.topic='Options';changed=1;}
    if(!Array.isArray(binomialExpectationsCard.history)){binomialExpectationsCard.history=[];changed=1;}
  }


  const americanCallDividendQuestion='American vs European Call — Dividend-Paying Stock';
  const americanCallDividendLatex='\\begin{aligned}C_{Am}&\\ge C_{Eu}\\\\\\text{Usually, if dividends are paid: }\\quad C_{Am}&>C_{Eu}\\end{aligned}';
  const americanCallDividendAnswer='For a dividend-paying stock, an American call is worth at least as much as a European call and is usually worth more because early exercise just before the ex-dividend date can be optimal.';
  let americanCallDividendCard=cards.find(c=>c.subject===SUBJECT&&c.question===americanCallDividendQuestion);
  if(!americanCallDividendCard){
    americanCallDividendCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:americanCallDividendQuestion,
      answer:americanCallDividendAnswer,
      latex:americanCallDividendLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(americanCallDividendCard);
    changed=1;
  }else{
    if(americanCallDividendCard.answer!==americanCallDividendAnswer){americanCallDividendCard.answer=americanCallDividendAnswer;changed=1;}
    if(americanCallDividendCard.latex!==americanCallDividendLatex){americanCallDividendCard.latex=americanCallDividendLatex;changed=1;}
    if(americanCallDividendCard.topic!=='Options'){americanCallDividendCard.topic='Options';changed=1;}
    if(!Array.isArray(americanCallDividendCard.history)){americanCallDividendCard.history=[];changed=1;}
  }


  const binomialVsBSMQuestion='Binomial Model vs Black-Scholes Model';
  const binomialVsBSMLatex='\\begin{array}{c|c}\\textbf{Binomial Model}&\\textbf{Black-Scholes Model}\\\\\\hline\\text{Discrete time steps}&\\text{Continuous time}\\\\\\text{Stock price jumps}&\\text{Stock moves continuously}\\\\\\text{Finite number of nodes}&\\text{Infinite possible paths}\\\\\\text{Intuitive / flexible tree}&\\text{Closed-form pricing formula}\\\\\\text{As steps}\\to\\infty,\\;\\text{converges to BSM}&\\text{Continuous-time limit}\\end{array}';
  const binomialVsBSMAnswer='Binomial uses discrete steps and a finite tree; Black-Scholes is continuous-time with infinitely many paths and a closed-form solution. As the number of binomial steps increases, the binomial value converges to the Black-Scholes value under consistent assumptions.';
  let binomialVsBSMCard=cards.find(c=>c.subject===SUBJECT&&c.question===binomialVsBSMQuestion);
  if(!binomialVsBSMCard){
    binomialVsBSMCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:binomialVsBSMQuestion,
      answer:binomialVsBSMAnswer,
      latex:binomialVsBSMLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(binomialVsBSMCard);
    changed=1;
  }else{
    if(binomialVsBSMCard.answer!==binomialVsBSMAnswer){binomialVsBSMCard.answer=binomialVsBSMAnswer;changed=1;}
    if(binomialVsBSMCard.latex!==binomialVsBSMLatex){binomialVsBSMLatex=binomialVsBSMLatex;changed=1;}
    if(binomialVsBSMCard.topic!=='Options'){binomialVsBSMCard.topic='Options';changed=1;}
    if(!Array.isArray(binomialVsBSMCard.history)){binomialVsBSMCard.history=[];changed=1;}
  }


  const bsmAssumptionsQuestion='Black-Scholes-Merton Assumptions — Keywords';
  const bsmAssumptionsLatex='\\begin{gathered}\\textbf{GBM / lognormal prices}\\\\\\textbf{Continuous prices + continuous trading}\\\\\\textbf{Liquid underlying}\\\\\\textbf{Short selling allowed}\\\\\\textbf{No frictions / taxes / constraints}\\\\\\textbf{No arbitrage}\\\\\\textbf{European options only}\\Rightarrow\\textbf{ no early exercise}\\\\\\textbf{Known constant }r_f\\textbf{ (continuous compounding)}\\\\\\textbf{Known constant volatility }\\sigma\\\\\\textbf{Known constant continuous yield }q\\textbf{, if any}\\end{gathered}';
  const bsmAssumptionsAnswer='Keywords: GBM; continuous prices/trading; liquid; short selling; no frictions/taxes; no arbitrage; European only; constant known risk-free rate; constant known volatility; constant known continuous yield if applicable.';
  let bsmAssumptionsCard=cards.find(c=>c.subject===SUBJECT&&c.question===bsmAssumptionsQuestion);
  if(!bsmAssumptionsCard){
    bsmAssumptionsCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:bsmAssumptionsQuestion,
      answer:bsmAssumptionsAnswer,
      latex:bsmAssumptionsLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(bsmAssumptionsCard);
    changed=1;
  }else{
    if(bsmAssumptionsCard.answer!==bsmAssumptionsAnswer){bsmAssumptionsCard.answer=bsmAssumptionsAnswer;changed=1;}
    if(bsmAssumptionsCard.latex!==bsmAssumptionsLatex){bsmAssumptionsCard.latex=bsmAssumptionsLatex;changed=1;}
    if(bsmAssumptionsCard.topic!=='Options'){bsmAssumptionsCard.topic='Options';changed=1;}
    if(!Array.isArray(bsmAssumptionsCard.history)){bsmAssumptionsCard.history=[];changed=1;}
  }


  const bsmStockQuestion='Black-Scholes-Merton — European Stock Call & Put';
  const bsmStockLatex='\\begin{aligned}c&=S_0N(d_1)-\\underbrace{Xe^{-rT}N(d_2)}_{\\text{bond component}}\\\\p&=Xe^{-rT}N(-d_2)-S_0N(-d_1)\\\\N(d_1)&=\\text{option delta}\\end{aligned}';
  const bsmStockAnswer='Call = weighted stock value − weighted PV of strike. Put = weighted PV of strike − weighted stock value. N(d₁) = option delta. N(d₂) ≈ risk-neutral probability that the call finishes in the money. The term Xe^{-rT}N(d₂) is the bond component (short borrowing) in the call-replicating portfolio.';
  let bsmStockCard=cards.find(c=>c.subject===SUBJECT&&c.question===bsmStockQuestion);
  if(!bsmStockCard){
    bsmStockCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:bsmStockQuestion,
      answer:bsmStockAnswer,
      latex:bsmStockLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(bsmStockCard);
    changed=1;
  }else{
    if(bsmStockCard.answer!==bsmStockAnswer){bsmStockCard.answer=bsmStockAnswer;changed=1;}
    if(bsmStockCard.latex!==bsmStockLatex){bsmStockCard.latex=bsmStockLatex;changed=1;}
    if(bsmStockCard.topic!=='Options'){bsmStockCard.topic='Options';changed=1;}
    if(!Array.isArray(bsmStockCard.history)){bsmStockCard.history=[];changed=1;}
  }


  const irOptionBlackQuestion='Interest Rate Options — Black Model Call & Put';
  const irOptionBlackLatex='\\begin{aligned}c&=(AP)e^{-r(t_{j-1}+t_m)}\\left[FRA(0,t_{j-1},t_m)N(d_1)-R_XN(d_2)\\right]\\\\p&=(AP)e^{-r(t_{j-1}+t_m)}\\left[R_XN(-d_2)-FRA(0,t_{j-1},t_m)N(-d_1)\\right]\\end{aligned}';
  const irOptionBlackAnswer='Black model for interest-rate options: discount the option payoff on the forward/FRA rate to the payment date. AP is the accrual period; R_X is the exercise/strike rate; FRA(0,t_{j-1},t_m) is the current forward rate for the underlying period.';
  let irOptionBlackCard=cards.find(c=>c.subject===SUBJECT&&c.question===irOptionBlackQuestion);
  if(!irOptionBlackCard){
    irOptionBlackCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:irOptionBlackQuestion,
      answer:irOptionBlackAnswer,
      latex:irOptionBlackLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(irOptionBlackCard);
    changed=1;
  }else{
    if(irOptionBlackCard.answer!==irOptionBlackAnswer){irOptionBlackCard.answer=irOptionBlackAnswer;changed=1;}
    if(irOptionBlackCard.latex!==irOptionBlackLatex){irOptionBlackCard.latex=irOptionBlackLatex;changed=1;}
    if(irOptionBlackCard.topic!=='Options'){irOptionBlackCard.topic='Options';changed=1;}
    if(!Array.isArray(irOptionBlackCard.history)){irOptionBlackCard.history=[];changed=1;}
  }


  const optionDeltaDividendQuestion='Option Delta with Continuous Dividend Yield';
  const optionDeltaDividendLatex='\\begin{aligned}\\Delta_c&=e^{-\\delta T}N(d_1)\\\\\\Delta_p&=-e^{-\\delta T}N(-d_1)\\end{aligned}';
  const optionDeltaDividendAnswer='With continuous dividend yield δ: call delta = e^{-δT}N(d₁); put delta = −e^{-δT}N(−d₁). If δ = 0, these reduce to Δ_c = N(d₁) and Δ_p = −N(−d₁).';
  let optionDeltaDividendCard=cards.find(c=>c.subject===SUBJECT&&c.question===optionDeltaDividendQuestion);
  if(!optionDeltaDividendCard){
    optionDeltaDividendCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:optionDeltaDividendQuestion,
      answer:optionDeltaDividendAnswer,
      latex:optionDeltaDividendLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(optionDeltaDividendCard);
    changed=1;
  }else{
    if(optionDeltaDividendCard.answer!==optionDeltaDividendAnswer){optionDeltaDividendCard.answer=optionDeltaDividendAnswer;changed=1;}
    if(optionDeltaDividendCard.latex!==optionDeltaDividendLatex){optionDeltaDividendCard.latex=optionDeltaDividendLatex;changed=1;}
    if(optionDeltaDividendCard.topic!=='Options'){optionDeltaDividendCard.topic='Options';changed=1;}
    if(!Array.isArray(optionDeltaDividendCard.history)){optionDeltaDividendCard.history=[];changed=1;}
  }


  const deltaHedgeContractsQuestion='Delta Hedging — Number of Hedge Contracts';
  const deltaHedgeContractsLatex='\\begin{aligned}N_H&=-\\frac{\\text{Portfolio Delta}}{\\Delta_H}\\end{aligned}';
  const deltaHedgeContractsAnswer='Number of hedge contracts = − Portfolio Delta / Delta of the hedging instrument. The minus sign means take the opposite delta exposure to make the total portfolio delta approximately zero.';
  let deltaHedgeContractsCard=cards.find(c=>c.subject===SUBJECT&&c.question===deltaHedgeContractsQuestion);
  if(!deltaHedgeContractsCard){
    deltaHedgeContractsCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:deltaHedgeContractsQuestion,
      answer:deltaHedgeContractsAnswer,
      latex:deltaHedgeContractsLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(deltaHedgeContractsCard);
    changed=1;
  }else{
    if(deltaHedgeContractsCard.answer!==deltaHedgeContractsAnswer){deltaHedgeContractsCard.answer=deltaHedgeContractsAnswer;changed=1;}
    if(deltaHedgeContractsCard.latex!==deltaHedgeContractsLatex){deltaHedgeContractsCard.latex=deltaHedgeContractsLatex;changed=1;}
    if(deltaHedgeContractsCard.topic!=='Options'){deltaHedgeContractsCard.topic='Options';changed=1;}
    if(!Array.isArray(deltaHedgeContractsCard.history)){deltaHedgeContractsCard.history=[];changed=1;}
  }


  const optionGammaQuestion='Option Gamma — Call and Put';
  const optionGammaLatex='\\begin{aligned}\\Gamma_c&=\\Gamma_p=\\frac{e^{-\\delta T}n(d_1)}{S_0\\sigma\\sqrt{T}}\\end{aligned}';
  const optionGammaAnswer='Call and put gamma are identical: Γ = e^{-δT} n(d₁) / (S₀σ√T). Here n(d₁) is the standard normal PDF.';
  let optionGammaCard=cards.find(c=>c.subject===SUBJECT&&c.question===optionGammaQuestion);
  if(!optionGammaCard){
    optionGammaCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:optionGammaQuestion,
      answer:optionGammaAnswer,
      latex:optionGammaLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(optionGammaCard);
    changed=1;
  }else{
    if(optionGammaCard.answer!==optionGammaAnswer){optionGammaCard.answer=optionGammaAnswer;changed=1;}
    if(optionGammaCard.latex!==optionGammaLatex){optionGammaCard.latex=optionGammaLatex;changed=1;}
    if(optionGammaCard.topic!=='Options'){optionGammaCard.topic='Options';changed=1;}
    if(!Array.isArray(optionGammaCard.history)){optionGammaCard.history=[];changed=1;}
  }


  const deltaGammaApproxQuestion='Delta-Gamma Approximation — Option Value';
  const deltaGammaApproxLatex='\\begin{aligned}\\hat{c}&=c+\\Delta_c(\\hat{S}-S)+\\frac{\\Gamma_c}{2}(\\hat{S}-S)^2\\end{aligned}';
  const deltaGammaApproxAnswer='Delta-gamma approximation for a call: estimated new option value = current value + delta effect + one-half gamma times the squared stock-price change. More generally: ΔV ≈ Δ·ΔS + 1/2 Γ(ΔS)^2.';
  let deltaGammaApproxCard=cards.find(c=>c.subject===SUBJECT&&c.question===deltaGammaApproxQuestion);
  if(!deltaGammaApproxCard){
    deltaGammaApproxCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:deltaGammaApproxQuestion,
      answer:deltaGammaApproxAnswer,
      latex:deltaGammaApproxLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(deltaGammaApproxCard);
    changed=1;
  }else{
    if(deltaGammaApproxCard.answer!==deltaGammaApproxAnswer){deltaGammaApproxCard.answer=deltaGammaApproxAnswer;changed=1;}
    if(deltaGammaApproxCard.latex!==deltaGammaApproxLatex){deltaGammaApproxCard.latex=deltaGammaApproxLatex;changed=1;}
    if(deltaGammaApproxCard.topic!=='Options'){deltaGammaApproxCard.topic='Options';changed=1;}
    if(!Array.isArray(deltaGammaApproxCard.history)){deltaGammaApproxCard.history=[];changed=1;}
  }


  const historicalVsImpliedVolQuestion='Historical vs Implied Volatility';
  const historicalVsImpliedVolLatex='\\begin{array}{c|c}\\textbf{Historical Volatility}&\\textbf{Implied Volatility}\\\\\\hline\\text{Past}&\\text{Future expectation}\\\\\\text{Observable from returns}&\\text{Inferred from option prices}\\\\\\text{Backward-looking}&\\text{Forward-looking}\\end{array}';
  const historicalVsImpliedVolAnswer='Historical volatility is based on past observed returns and is backward-looking. Implied volatility is backed out from option prices and reflects the market’s forward-looking volatility expectation.';
  let historicalVsImpliedVolCard=cards.find(c=>c.subject===SUBJECT&&c.question===historicalVsImpliedVolQuestion);
  if(!historicalVsImpliedVolCard){
    historicalVsImpliedVolCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:historicalVsImpliedVolQuestion,
      answer:historicalVsImpliedVolAnswer,
      latex:historicalVsImpliedVolLatex,
      subject:SUBJECT,
      topic:'Options',
      status:null,
      history:[]
    };
    cards.push(historicalVsImpliedVolCard);
    changed=1;
  }else{
    if(historicalVsImpliedVolCard.answer!==historicalVsImpliedVolAnswer){historicalVsImpliedVolCard.answer=historicalVsImpliedVolAnswer;changed=1;}
    if(historicalVsImpliedVolCard.latex!==historicalVsImpliedVolLatex){historicalVsImpliedVolCard.latex=historicalVsImpliedVolLatex;changed=1;}
    if(historicalVsImpliedVolCard.topic!=='Options'){historicalVsImpliedVolCard.topic='Options';changed=1;}
    if(!Array.isArray(historicalVsImpliedVolCard.history)){historicalVsImpliedVolCard.history=[];changed=1;}
  }


  const forwardFuturesValueQuestion='Forward vs Futures Value — Long Position After Price Increase';
  const forwardFuturesValueLatex='\\begin{aligned}\\text{Long + underlying price rises:}\\\\V_{\\text{forward}}&>V_{\\text{futures}}\\\\\\text{Futures: daily MTM}&\\Rightarrow\\text{gains paid out + value reset}\\end{aligned}';
  const forwardFuturesValueAnswer='If you are long and the underlying price has risen, the outstanding forward usually has a higher value than the equivalent futures contract. Futures gains are settled daily through mark-to-market, so the futures contract value is reset toward zero.';
  let forwardFuturesValueCard=cards.find(c=>c.subject===SUBJECT&&c.question===forwardFuturesValueQuestion);
  if(!forwardFuturesValueCard){
    forwardFuturesValueCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:forwardFuturesValueQuestion,
      answer:forwardFuturesValueAnswer,
      latex:forwardFuturesValueLatex,
      subject:SUBJECT,
      topic:'Futures',
      status:null,
      history:[]
    };
    cards.push(forwardFuturesValueCard);
    changed=1;
  }else{
    if(forwardFuturesValueCard.answer!==forwardFuturesValueAnswer){forwardFuturesValueCard.answer=forwardFuturesValueAnswer;changed=1;}
    if(forwardFuturesValueCard.latex!==forwardFuturesValueLatex){forwardFuturesValueCard.latex=forwardFuturesValueLatex;changed=1;}
    if(forwardFuturesValueCard.topic!=='Futures'){forwardFuturesValueCard.topic='Futures';changed=1;}
    if(!Array.isArray(forwardFuturesValueCard.history)){forwardFuturesValueCard.history=[];changed=1;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
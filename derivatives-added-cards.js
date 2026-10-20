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

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
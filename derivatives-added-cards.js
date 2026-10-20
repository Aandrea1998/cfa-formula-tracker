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


  const carryQuestion='Forward Arbitrage — Cash-and-Carry vs Reverse Cash-and-Carry';
  const carryLatex='\\begin{aligned}\\text{Cash-and-Carry: }&\\text{Long Asset + Short Bond + Short Forward}=0\\\\\\text{Reverse Cash-and-Carry: }&\\text{Short Asset + Long Bond + Long Forward}=0\\\\\\text{Short Forward}&\\Rightarrow\\text{Cash-and-Carry}\\\\\\text{Long Forward}&\\Rightarrow\\text{Reverse Cash-and-Carry}\\end{aligned}';
  const carryAnswer='Cash-and-carry: long asset + short bond + short forward. Reverse cash-and-carry: short asset + long bond + long forward. Each creates a zero-arbitrage payoff at maturity.';
  let carryCard=cards.find(c=>c.subject===SUBJECT&&c.question===carryQuestion);
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
    if(carryCard.answer!==carryAnswer){carryCard.answer=carryAnswer;changed=1;}
    if(carryCard.latex!==carryLatex){carryCard.latex=carryLatex;changed=1;}
    if(carryCard.topic!=='Forwards'){carryCard.topic='Forwards';changed=1;}
    if(!Array.isArray(carryCard.history)){carryCard.history=[];changed=1;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
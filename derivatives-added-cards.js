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

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
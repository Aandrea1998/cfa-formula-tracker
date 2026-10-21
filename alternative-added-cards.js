(function(){
  'use strict';
  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Alternative Investments';
  const question='REIT NAVPS — Additional Value Components';
  const latex='\\begin{aligned}\\mathrm{NAVPS}\\text{ should include:}\\\\&\\text{Non-asset-based income streams}\\\\&\\text{Non-real-estate assets}\\\\&\\text{Value added by management}\\end{aligned}';
  const answer='NAVPS should include investors’ assessments of non-asset-based income streams, non-real-estate assets, and value added by management.';

  let changed=0;
  let card=cards.find(c=>c.subject===SUBJECT&&c.question===question);
  if(!card){
    card={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question,
      answer,
      latex,
      subject:SUBJECT,
      topic:'Real Estate & REITs',
      status:null,
      history:[]
    };
    cards.push(card);
    changed=1;
  }else{
    if(card.answer!==answer){card.answer=answer;changed=1;}
    if(card.latex!==latex){card.latex=latex;changed=1;}
    if(card.topic!=='Real Estate & REITs'){card.topic='Real Estate & REITs';changed=1;}
    if(!Array.isArray(card.history)){card.history=[];changed=1;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
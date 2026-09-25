(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Equity Valuation';
  const TOPIC='Chapter 4-5-6';
  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  const byQuestion=q=>cards.find(c=>norm(c.question)===norm(q));
  const setFormula=(c,question,latex)=>{
    if(!c)return false;
    let changed=false;
    if(c.question!==question){c.question=question;changed=true;}
    if(c.latex!==latex||c.answer!==latex){c.latex=latex;c.answer=latex;changed=true;}
    if(c.formulaImage){delete c.formulaImage;changed=true;}
    return changed;
  };

  let changed=0,added=0,removed=0;

  // Split invested capital into two standalone review cards so each formula is readable by itself.
  const oldQuestion='Invested Capital — Operating and Financing Views';
  const operatingQuestion='Invested Capital — Operating View';
  const operatingLatex='\\begin{aligned}\\text{Invested Capital}&=\\text{Operating Assets}\\\\&\\quad-\\text{Noninterest-Bearing Operating Liabilities}\\end{aligned}';

  let operatingCard=byQuestion(operatingQuestion)||byQuestion(oldQuestion);
  if(operatingCard){
    if(setFormula(operatingCard,operatingQuestion,operatingLatex))changed++;
  }

  // Remove any duplicate legacy combined card if one remains after the rename.
  for(let i=cards.length-1;i>=0;i--){
    if(cards[i]!==operatingCard&&norm(cards[i].question)===norm(oldQuestion)){
      cards.splice(i,1);
      removed++;
    }
  }

  const financingQuestion='Invested Capital — Financing View';
  const financingLatex='\\begin{aligned}\\text{Invested Capital}&=\\text{Debt}+\\text{Equity}-\\text{Nonoperating Assets}\\\\&=\\text{Debt}+\\text{Equity}-\\text{Excess Cash}\\end{aligned}';
  let financingCard=byQuestion(financingQuestion);
  if(!financingCard){
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    cards.push({id:nextId,question:financingQuestion,answer:financingLatex,latex:financingLatex,subject:SUBJECT,topic:TOPIC,status:null,history:[]});
    added++;
  }else if(setFormula(financingCard,financingQuestion,financingLatex))changed++;

  if(changed||added||removed){
    try{if(typeof save==='function')save();}catch(_e){}
    try{if(typeof refresh==='function')refresh();}catch(_e){}
    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);
  }

  window.CFAEquityChapter456RepairV2={changed,added,removed};
})();

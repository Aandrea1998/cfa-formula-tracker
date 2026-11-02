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

  // Keep the P/B use-case card synchronized in existing browser storage.
  const pbQuestion='P/B Valuation — When It Is Most Useful';
  const pbLatex='\\begin{aligned}\\text{P/B useful when: }&\\text{company may not remain a going concern}\\\\&\\text{assets are mostly liquid and reliably valued}\\\\&\\text{e.g. banks, insurers, investment firms}\\\\&\\text{EPS is negative or highly volatile}\\end{aligned}';
  let pbCard=byQuestion(pbQuestion)||byQuestion('Price-to-Book — Appropriate Uses')||byQuestion('P/B — Appropriate Situations');
  if(pbCard){
    if(setFormula(pbCard,pbQuestion,pbLatex))changed++;
  }

  const reqReturnQuestion='Private Company Required Return — CAPM, Expanded CAPM and Build-Up';
  const reqReturnLatex='\\begin{aligned}r_e&=r_f+\\beta(R_m-r_f)\\\\r_e&=r_f+\\beta(R_m-r_f)+SP+CSRP\\\\r_e&=r_f+ERP+SP+IRP+CSRP\\\\\\text{CAPM limitation for private firms: }&\\text{assumes well-diversified investors}\\\\&\\Rightarrow\\text{may omit relevant company-specific risk}\\\\\\text{Expected inflation: }&\\text{do not add separately; already embedded in nominal }r_f\\end{aligned}';
  const reqReturnCard=byQuestion(reqReturnQuestion);
  if(reqReturnCard&&setFormula(reqReturnCard,reqReturnQuestion,reqReturnLatex))changed++;

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

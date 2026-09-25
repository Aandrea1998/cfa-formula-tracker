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

  // 1) Split the old mixed "comparables vs forecasted fundamentals" card.
  const oldComparableKey=norm('Valuation Multiples — Comparables vs Forecasted Fundamentals');
  const comparableKey=norm('Comparable-Multiple Valuation');
  const comparableLatex='\\begin{aligned}\\text{Estimated Value}&=\\text{Peer Multiple}\\times\\text{Company Fundamental}\\\\P_0&=(P/B)_{\\text{Peers}}\\times BVPS_0\\end{aligned}';
  const oldComparableCards=cards.filter(c=>norm(c.question)===oldComparableKey);
  let comparableCard=cards.find(c=>norm(c.question)===comparableKey);
  if(!comparableCard&&oldComparableCards.length){
    comparableCard=oldComparableCards.shift();
    if(setFormula(comparableCard,'Comparable-Multiple Valuation',comparableLatex))changed++;
  }else if(comparableCard){
    if(setFormula(comparableCard,'Comparable-Multiple Valuation',comparableLatex))changed++;
  }
  for(const c of oldComparableCards){
    const i=cards.indexOf(c);
    if(i>=0){cards.splice(i,1);removed++;}
  }

  const justifiedQuestion='Justified Multiple — Forecasted Fundamentals';
  const justifiedLatex='\\begin{aligned}\\text{Justified Multiple}&=\\frac{\\text{Intrinsic Value}}{\\text{Fundamental}}\\\\(P/B)_{\\text{Justified}}&=\\frac{V_0}{BVPS_0}\\end{aligned}';
  let justifiedCard=byQuestion(justifiedQuestion);
  if(!justifiedCard){
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    cards.push({id:nextId,question:justifiedQuestion,answer:justifiedLatex,latex:justifiedLatex,subject:SUBJECT,topic:TOPIC,status:null,history:[]});
    added++;
  }else if(setFormula(justifiedCard,justifiedQuestion,justifiedLatex))changed++;

  // 2) Enterprise Value remains one concept; TIC becomes a standalone card.
  const evCard=byQuestion('Enterprise Value and EV/EBITDA');
  const evLatex='\\begin{aligned}EV&=MV(\\text{Common Equity})+MV(\\text{Debt})+\\text{Preferred}\\\\&\\quad+\\text{Minority Interest}-\\text{Cash}-\\text{Short-Term Investments}\\\\EV/EBITDA&=\\frac{EV}{EBITDA}\\end{aligned}';
  if(setFormula(evCard,'Enterprise Value and EV/EBITDA',evLatex))changed++;

  const ticQuestion='Total Invested Capital (TIC) and Link to EV';
  const ticLatex='\\begin{aligned}\\mathrm{TIC}&=\\text{Common Equity}+\\text{Debt}+\\text{Preferred}\\\\EV&=\\mathrm{TIC}-\\text{Cash}\\end{aligned}';
  let ticCard=byQuestion(ticQuestion);
  if(!ticCard){
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    cards.push({id:nextId,question:ticQuestion,answer:ticLatex,latex:ticLatex,subject:SUBJECT,topic:TOPIC,status:null,history:[]});
    added++;
  }else if(setFormula(ticCard,ticQuestion,ticLatex))changed++;

  // 3) Fed Model: show the actual earnings-yield / Treasury-yield fair-value condition.
  const fedCard=byQuestion('Fed Model — Implied Fair P/E');
  const fedLatex='\\begin{aligned}\\text{Earnings Yield}&=\\frac{E}{P}=\\frac{1}{P/E}\\\\\\frac{E}{P}&\\approx y_{10Y}\\quad\\text{(fair-value condition)}\\\\(P/E)_{\\text{Fair}}&\\approx\\frac{1}{y_{10Y}}\\end{aligned}';
  if(setFormula(fedCard,'Fed Model — Implied Fair P/E',fedLatex))changed++;

  // 4) Keep ROIC itself simple; put invested-capital definitions on their own card.
  let roicCard=byQuestion('ROIC and Invested Capital')||byQuestion('ROIC — Return on Invested Capital');
  const roicLatex='\\mathrm{ROIC}=\\frac{\\mathrm{NOPAT}}{\\text{Invested Capital}}';
  if(setFormula(roicCard,'ROIC — Return on Invested Capital',roicLatex))changed++;

  const investedQuestion='Invested Capital — Operating and Financing Views';
  const investedLatex='\\begin{aligned}\\text{Invested Capital}&=\\text{Operating Assets}-\\text{Noninterest-Bearing Operating Liabilities}\\\\&=\\text{Debt}+\\text{Equity}-\\text{Nonoperating Assets}\\\\&=\\text{Debt}+\\text{Equity}-\\text{Excess Cash}\\end{aligned}';
  let investedCard=byQuestion(investedQuestion);
  if(!investedCard){
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    cards.push({id:nextId,question:investedQuestion,answer:investedLatex,latex:investedLatex,subject:SUBJECT,topic:TOPIC,status:null,history:[]});
    added++;
  }else if(setFormula(investedCard,investedQuestion,investedLatex))changed++;

  // 5) MVA: same source relationship, reformatted to remain readable in the formula column.
  const mvaCard=byQuestion('Market Value Added (MVA)');
  const mvaLatex='\\begin{aligned}\\mathrm{MVA}&=\\text{Market Value of Company}\\\\&\\quad-\\text{Book Value of Total Capital}\\end{aligned}';
  if(setFormula(mvaCard,'Market Value Added (MVA)',mvaLatex))changed++;

  if(changed||added||removed){
    try{if(typeof save==='function')save();}catch(_e){}
    try{if(typeof refresh==='function')refresh();}catch(_e){}
    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);
  }

  window.CFAEquityChapter456Repair={changed,added,removed};
})();

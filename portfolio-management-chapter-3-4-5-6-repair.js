(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Portfolio Management';
  const TOPIC='Chapter 3-4-5-6';
  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  const byQuestion=(...qs)=>cards.find(c=>qs.some(q=>norm(c.question)===norm(q)));
  const setCard=(card,question,latex)=>{
    if(!card)return false;
    let changed=false;
    if(card.question!==question){card.question=question;changed=true;}
    if(card.latex!==latex||card.answer!==latex){card.latex=latex;card.answer=latex;changed=true;}
    if(card.formulaImage){delete card.formulaImage;changed=true;}
    return changed;
  };
  const addCard=(question,latex)=>{
    let card=byQuestion(question);
    if(card){return setCard(card,question,latex)?1:0;}
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    cards.push({id:nextId,question,answer:latex,latex,subject:SUBJECT,topic:TOPIC,status:null,history:[]});
    return 1;
  };

  let changed=0;

  // Keep the original card/history, but make it only the top-level ownership-cost relationship.
  const totalCard=byQuestion(
    'ETF Ownership Costs — Trading and Holding Components',
    'Total ETF Ownership Costs'
  );
  const totalLatex='\\text{Total ETF Costs}=\\text{One-Time Trading Costs}+\\text{Ongoing Holding Costs}';
  if(setCard(totalCard,'Total ETF Ownership Costs',totalLatex))changed++;

  // Split the two component formulas into their own standalone review cards.
  const tradingLatex='\\begin{aligned}\\text{Trading Costs}&=\\text{Commissions}+\\text{Bid-Ask Spread}\\\\&\\quad+\\text{Premium/Discount to NAV}\\end{aligned}';
  changed+=addCard('ETF One-Time Trading Costs — Components',tradingLatex);

  const holdingLatex='\\begin{aligned}\\text{Holding Costs}&=\\text{Management Fees}+\\text{Turnover Costs}\\\\&\\quad+\\text{Tracking Error}+\\text{Taxes}\\\\&\\quad+\\text{Security Lending Effects}\\end{aligned}';
  changed+=addCard('ETF Ongoing Holding Costs — Components',holdingLatex);

  // Reformat the spread build-up vertically so it never clips in the formula column.
  const spreadCard=byQuestion('ETF Bid-Ask Spread — Main Components','ETF Bid-Ask Spread — Components');
  const spreadLatex='\\begin{aligned}\\text{ETF Spread}\\approx{}&\\text{Creation/Redemption Costs}\\\\&+\\text{Underlying Securities Spreads}\\\\&+\\text{Hedging/Inventory Compensation}\\\\&+\\text{Market Maker Profit Spread}\\\\&-\\text{Offsetting-Order Discount}\\end{aligned}';
  if(setCard(spreadCard,'ETF Bid-Ask Spread — Components',spreadLatex))changed++;

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
    try{if(typeof refresh==='function')refresh();}catch(_e){}
    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);
  }

  window.CFAPortfolioManagementChapter3456Repair={changed};
})();
(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Portfolio Management';
  const TOPIC='Chapter 3-4-5-6';
  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  const OLD_TOTAL=norm('ETF Ownership Costs — Trading and Holding Components');
  const NEW_TOTAL=norm('Total ETF Ownership Costs');

  const setCard=(card,question,latex)=>{
    if(!card)return false;
    let changed=false;
    if(card.question!==question){card.question=question;changed=true;}
    if(card.latex!==latex||card.answer!==latex){card.latex=latex;card.answer=latex;changed=true;}
    if(card.formulaImage){delete card.formulaImage;changed=true;}
    return changed;
  };

  const findQuestion=q=>cards.find(c=>norm(c.question)===norm(q));

  const addCard=(question,latex)=>{
    const existing=findQuestion(question);
    if(existing)return setCard(existing,question,latex)?1:0;
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    cards.push({id:nextId,question,answer:latex,latex,subject:SUBJECT,topic:TOPIC,status:null,history:[]});
    return 1;
  };

  function applyRepair(){
    const chapterCards=cards.filter(c=>c.subject===SUBJECT&&c.topic===TOPIC);
    const legacyCards=chapterCards.filter(c=>norm(c.question)===OLD_TOTAL);
    const currentTotal=chapterCards.find(c=>norm(c.question)===NEW_TOTAL);

    // The repair script is loaded before the PM chapter scripts. Wait until Chapter 3-4-5-6 exists.
    if(!chapterCards.length||(!legacyCards.length&&!currentTotal))return false;

    let changed=0;
    let totalCard=currentTotal||legacyCards[0];

    // Preserve the original card ID/history (including card 162) but shorten it to the top-level relationship only.
    const totalLatex='\\text{Total ETF Costs}=\\text{One-Time Trading Costs}+\\text{Ongoing Holding Costs}';
    if(setCard(totalCard,'Total ETF Ownership Costs',totalLatex))changed++;

    // Remove any leftover duplicate legacy combined cards so the long, clipped formula cannot survive.
    for(const card of [...cards]){
      if(card===totalCard)continue;
      if(card.subject===SUBJECT&&card.topic===TOPIC&&norm(card.question)===OLD_TOTAL){
        const i=cards.indexOf(card);
        if(i>=0){cards.splice(i,1);changed++;}
      }
    }

    const tradingLatex='\\begin{aligned}\\text{Trading Costs}&=\\text{Commissions}+\\text{Bid-Ask Spread}\\\\&\\quad+\\text{Premium/Discount to NAV}\\end{aligned}';
    changed+=addCard('ETF One-Time Trading Costs — Components',tradingLatex);

    const holdingLatex='\\begin{aligned}\\text{Holding Costs}&=\\text{Management Fees}+\\text{Turnover Costs}\\\\&\\quad+\\text{Tracking Error}+\\text{Taxes}\\\\&\\quad+\\text{Security Lending Effects}\\end{aligned}';
    changed+=addCard('ETF Ongoing Holding Costs — Components',holdingLatex);

    const spreadCard=chapterCards.find(c=>['etfbidaskspreadmaincomponents','etfbidaskspreadcomponents'].includes(norm(c.question)));
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
    return true;
  }

  let attempts=0;
  (function waitForChapter(){
    if(applyRepair())return;
    if(attempts++<50)setTimeout(waitForChapter,100);
  })();
})();
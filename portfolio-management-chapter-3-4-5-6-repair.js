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
    if(!chapterCards.length)return false;

    const legacyCards=chapterCards.filter(c=>norm(c.question)===OLD_TOTAL);
    const currentTotal=chapterCards.find(c=>norm(c.question)===NEW_TOTAL);
    let changed=0;

    if(legacyCards.length||currentTotal){
      let totalCard=currentTotal||legacyCards[0];
      const totalLatex='\\begin{aligned}\\text{Total ETF Costs}&=\\text{One-Time Trading Costs}\\\\&\\quad+\\text{Ongoing Holding Costs}\\end{aligned}';
      if(setCard(totalCard,'Total ETF Ownership Costs',totalLatex))changed++;

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
    }

    const refreshedChapterCards=cards.filter(c=>c.subject===SUBJECT&&c.topic===TOPIC);
    const spreadCard=refreshedChapterCards.find(c=>['etfbidaskspreadmaincomponents','etfbidaskspreadcomponents'].includes(norm(c.question)));
    const spreadLatex='\\begin{aligned}\\text{ETF Spread}\\approx{}&\\text{Creation/Redemption Costs}\\\\&+\\text{Underlying Securities Spreads}\\\\&+\\text{Hedging/Inventory Compensation}\\\\&+\\text{Market Maker Profit Spread}\\\\&-\\text{Offsetting-Order Discount}\\end{aligned}';
    if(setCard(spreadCard,'ETF Bid-Ask Spread — Components',spreadLatex))changed++;

    const portfolioReturnCard=refreshedChapterCards.find(c=>[
      'portfolioexpectedreturnweightedaverage',
      'portfolioexpectedreturn'
    ].includes(norm(c.question)));
    const portfolioReturnLatex='E(R_P)=\\sum_{i=1}^{N}w_iE(R_i)';
    if(setCard(portfolioReturnCard,'Portfolio Expected Return — Weighted Average',portfolioReturnLatex))changed++;

    const fitFixes=[
      ['Historical vs Hypothetical vs Stress Test — Number of Risk Factors',
       '\\begin{aligned}\\text{Historical: }&\\text{many factors; real past event}\\\\\\text{Hypothetical: }&\\text{many factors; custom plausible mix}\\\\\\text{Stress test: }&\\text{one/few factors; extreme shocks}\\end{aligned}'],
      ['Historical Scenario Analysis — Bonds',
       '\\begin{aligned}\\text{Historical scenario: }&\\text{use historical yields}\\\\&\\text{apply yield shocks to current bonds}\\end{aligned}'],
      ['Look-Ahead Bias vs Stale Data',
       '\\begin{aligned}\\text{March uses May earnings} &\\Rightarrow\\text{Look-ahead}\\\\\\text{June uses old earnings} &\\Rightarrow\\text{Stale data}\\\\\\text{Look-ahead: }&\\text{info too early}\\\\\\text{Stale: }&\\text{info too late}\\end{aligned}'],
      ['Simulation Techniques — Sensitivity vs Bootstrapping vs Inverse Transformation',
       '\\begin{aligned}\\text{Sensitivity: }&\\text{test assumptions/distributions}\\\\\\text{Bootstrapping: }&\\text{resample history with replacement}\\\\\\text{Inverse transform: }&\\text{draw from chosen distribution}\\end{aligned}'],
      ['Risk Measures — What Each Metric Focuses On',
       '\\begin{aligned}\\text{CVaR: }&\\text{avg loss beyond VaR; tail risk}\\\\\\text{Stress test: }&\\text{extreme shocks}\\\\\\text{Scenario: }&\\text{portfolio impact under scenarios}\\\\\\text{Monte Carlo VaR: }&\\text{losses from simulated paths}\\\\\\text{Incremental VaR: }&\\Delta VaR\\text{ from add/remove}\\\\\\text{Marginal VaR: }&\\frac{\\partial VaR}{\\partial x_i}\\text{; small position change}\\end{aligned}']
    ];
    for(const [q,latex] of fitFixes){
      const card=cards.find(x=>x.subject===SUBJECT&&norm(x.question)===norm(q));
      if(setCard(card,q,latex))changed++;
    }

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
  (function enforceRepair(){
    const ready=applyRepair();
    if(!ready&&attempts++<20)setTimeout(enforceRepair,100);
  })();
})();

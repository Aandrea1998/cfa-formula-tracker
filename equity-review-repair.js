(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  let changed=false;

  const commonEquity=cards.find(c=>
    c.subject==='Equity Valuation' &&
    norm(c.question).includes('commonequityvaluefromfirmvalue')
  );

  if(commonEquity){
    const latex='\\begin{aligned}\\text{Common Equity Value}&=\\text{Firm Value}-\\text{Debt}-\\text{Preferred}\\\\&\\quad+\\text{Excess Cash}\\end{aligned}';
    if(commonEquity.latex!==latex){commonEquity.latex=latex;changed=true;}
    if(commonEquity.answer!==latex){commonEquity.answer=latex;changed=true;}
    if(commonEquity.formulaImage){delete commonEquity.formulaImage;changed=true;}
  }

  const netPayments=cards.find(c=>
    c.subject==='Equity Valuation' &&
    norm(c.question)==='netpaymentstoequity'
  );

  if(netPayments){
    const latex='\\begin{aligned}\\text{Net Payments to Equity}&=\\text{Dividends}+\\text{Share Repurchases}\\\\&\\quad-\\text{Share Issuance}\\end{aligned}';
    if(netPayments.latex!==latex){netPayments.latex=latex;changed=true;}
    if(netPayments.answer!==latex){netPayments.answer=latex;changed=true;}
    if(netPayments.formulaImage){delete netPayments.formulaImage;changed=true;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
    try{if(typeof refresh==='function')refresh();}catch(_e){}
    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);
  }

  window.CFAEquityReviewRepair={changed};
})();

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

  // Keep the existing PVGO card rather than creating a duplicate. The prompt
  // explicitly identifies P0/E1 as a leading P/E ratio for standalone Review.
  const leadingPEPrompt='Leading P/E Ratio — PVGO Decomposition';
  const leadingPELatex='\\frac{P_0}{E_1}=\\frac{1}{r}+\\frac{\\mathrm{PVGO}}{E_1}';
  const leadingPEAliases=new Set([
    'peratioandpvgo',
    'peratiodecompositionpvgo',
    'leadingperatiopvgodecomposition'
  ]);

  let leadingPE=cards.find(c=>
    c.subject==='Equity Valuation' &&
    leadingPEAliases.has(norm(c.question))
  );

  if(!leadingPE){
    leadingPE=cards.find(c=>
      c.subject==='Equity Valuation' &&
      norm(c.latex||c.answer).includes('pvgo')
    );
  }

  if(!leadingPE){
    const nextId=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    cards.push({
      id:nextId,
      question:leadingPEPrompt,
      answer:leadingPELatex,
      latex:leadingPELatex,
      subject:'Equity Valuation',
      topic:'Chapter 1-2-3',
      status:null,
      history:[]
    });
    changed=true;
  }else{
    if(leadingPE.question!==leadingPEPrompt){leadingPE.question=leadingPEPrompt;changed=true;}
    if(leadingPE.latex!==leadingPELatex){leadingPE.latex=leadingPELatex;changed=true;}
    if(leadingPE.answer!==leadingPELatex){leadingPE.answer=leadingPELatex;changed=true;}
    if(leadingPE.formulaImage){delete leadingPE.formulaImage;changed=true;}
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

// Deck migration loader. Kept here so existing deployments pick up the new
// Alternative Investments cards without changing the stable Review renderer.
(function(){
  'use strict';
  const src='alternative-investments-pages-1-4.js';
  if(document.querySelector(`script[src="${src}"]`))return;
  const script=document.createElement('script');
  script.src=src;
  script.async=false;
  document.body.appendChild(script);
})();

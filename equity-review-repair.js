(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z0-9]+/g,'');
  const target=cards.find(c=>
    c.subject==='Equity Valuation' &&
    norm(c.question).includes('commonequityvaluefromfirmvalue')
  );

  if(!target)return;

  const latex='\\begin{aligned}\\text{Common Equity Value}&=\\text{Firm Value}-\\text{Debt}-\\text{Preferred}\\\\&\\quad+\\text{Excess Cash}\\end{aligned}';
  let changed=false;

  if(target.latex!==latex){target.latex=latex;changed=true;}
  if(target.answer!==latex){target.answer=latex;changed=true;}
  if(target.formulaImage){delete target.formulaImage;changed=true;}

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

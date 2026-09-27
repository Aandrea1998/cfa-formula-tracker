(function(){
  'use strict';

  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Alternative Investments';
  const TOPIC='Alternative Investments';
  let changed=0;

  for(const card of cards){
    if(card.subject!==SUBJECT)continue;
    if(card.topic!==TOPIC){
      card.topic=TOPIC;
      changed++;
    }
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
    try{if(typeof refresh==='function')refresh();}catch(_e){}
    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);
  }

  window.CFAAlternativeInvestmentsUnifiedSection={changed};
})();

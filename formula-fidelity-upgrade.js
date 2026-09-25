(function(){
  'use strict';
  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const addBtn=document.getElementById('addExtractedBtn');
  if(!addBtn)return;

  addBtn.onclick=()=>{
    const subject=tidy($('uploadSubject').value),topic=tidy($('uploadTopic').value);
    if(!topic){$('uploadStatus').textContent='Please enter a chapter / subtopic before adding formulas.';return;}

    const byAnswer=new Map(cards.map(c=>[norm(c.answer),c]));
    let next=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
    let added=0,upgraded=0,skipped=0;
    const imageTouched=[];

    extracted.filter(x=>x.selected).forEach(x=>{
      const key=norm(x.back);
      if(!key){skipped++;return;}
      const existing=byAnswer.get(key);
      if(existing){
        if(x.formulaImage&&!existing.formulaImage){
          existing.formulaImage=x.formulaImage;
          if(x.sourcePage)existing.sourcePage=x.sourcePage;
          imageTouched.push(existing);
          upgraded++;
        }else skipped++;
        return;
      }
      const card={id:next++,question:tidy(x.front)||'Recall the formula?',answer:tidy(x.back),subject,topic,status:null};
      if(x.formulaImage){card.formulaImage=x.formulaImage;imageTouched.push(card);}
      if(x.sourcePage)card.sourcePage=x.sourcePage;
      cards.push(card);byAnswer.set(key,card);added++;
    });

    let fidelityKept=true;
    try{save();}
    catch(_e){
      imageTouched.forEach(c=>delete c.formulaImage);
      fidelityKept=false;
      try{save();}catch(_e2){}
    }
    refresh();
    $('uploadStatus').textContent=`Added ${added} new formula${added===1?'':'s'}${upgraded?` · upgraded ${upgraded} existing formula${upgraded===1?'':'s'} to exact PDF rendering`:''} in ${subject} → ${topic}.${skipped?` Skipped ${skipped} duplicate${skipped===1?'':'s'}.`:''}${!fidelityKept?' Browser storage was full, so the exact-image layer was removed and text fallbacks were kept.':''}`;
  };

  const previewHelp=document.querySelector('#previewCard .help');
  if(previewHelp)previewHelp.textContent='Edit the prompt if needed. The formula preview is kept exactly as rendered in the PDF; extracted text is retained only as a fallback and for duplicate detection.';
})();

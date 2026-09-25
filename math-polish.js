(function(){
  'use strict';
  const box=document.getElementById('extractList');
  if(!box)return;

  function cleanPrompt(front){
    const s=String(front||'');
    const cut=s.lastIndexOf(' — ');
    if(cut<0)return s;
    const suffix=s.slice(cut+3).trim();
    const semanticWords=(suffix.match(/[A-Za-z]{4,}/g)||[]).filter(w=>!/^(WACC|FCFF|FCFE|EBIT|CFO|ROE|EPS)$/i.test(w));
    return semanticWords.length?s:s.slice(0,cut).trim();
  }

  function polish(){
    try{
      if(typeof extracted==='undefined'||!Array.isArray(extracted))return;
      extracted.forEach((c,i)=>{
        const cleaned=cleanPrompt(c.front);
        if(cleaned!==c.front)c.front=cleaned;
        const input=box.querySelector(`.xfront[data-i="${i}"]`);
        if(input&&input.value!==cleaned)input.value=cleaned;
      });
    }catch(_e){}
  }

  new MutationObserver(()=>requestAnimationFrame(polish)).observe(box,{childList:true,subtree:true});
  polish();

  // Final save handler. This intentionally loads last and replaces the older
  // import handlers, which had conflicting requirements around Chapter/Subtopic.
  const addBtn=document.getElementById('addExtractedBtn');
  if(!addBtn)return;

  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const qnorm=s=>tidy(s).toLowerCase().replace(/[^a-z0-9]+/g,'');

  function inferredTopic(){
    const input=document.getElementById('uploadTopic');
    const typed=tidy(input&&input.value);
    if(typed)return typed;
    const fileInput=document.getElementById('uploadFile');
    const file=fileInput&&fileInput.files&&fileInput.files[0];
    let name=file?String(file.name||''):'';
    name=name.replace(/\.[^.]+$/,'').replace(/[_]+/g,' ').trim();
    if(!name)name='Imported formulas';
    if(input)input.value=name;
    return name;
  }

  function normalizedAnswer(x){
    const raw=tidy(x&&((x.latex)||x.back||x.answer));
    try{return typeof norm==='function'?norm(raw):raw.toLowerCase().replace(/\s+/g,'');}
    catch(_e){return raw.toLowerCase().replace(/\s+/g,'');}
  }

  addBtn.onclick=()=>{
    try{
      if(typeof extracted==='undefined'||!Array.isArray(extracted)||!extracted.length){
        $('uploadStatus').textContent='Extract formulas first, then choose the ones you want to add.';
        return;
      }

      const selected=extracted.filter(x=>x.selected);
      if(!selected.length){
        $('uploadStatus').textContent='No formulas are selected. Select at least one formula first.';
        return;
      }

      const subject=tidy($('uploadSubject').value)||'Unassigned';
      const topic=inferredTopic();
      let next=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1;
      let added=0,upgraded=0,skipped=0;

      selected.forEach(x=>{
        const latex=tidy(x.latex||'');
        const answer=tidy(x.back||latex);
        const front=tidy(x.front)||'Recall the formula?';
        const key=normalizedAnswer(x);
        const q=qnorm(front);

        let existing=cards.find(c=>normalizedAnswer({latex:c.latex,back:c.answer})===key);
        if(!existing)existing=cards.find(c=>c.subject===subject&&c.topic===topic&&qnorm(c.question)===q);

        if(existing){
          existing.question=front;
          existing.answer=answer||latex;
          if(latex)existing.latex=latex;
          if(x.sourcePage)existing.sourcePage=x.sourcePage;
          existing.subject=subject;
          existing.topic=topic;
          if(existing.formulaImage)delete existing.formulaImage;
          upgraded++;
          return;
        }

        const card={
          id:next++,
          question:front,
          answer:answer||latex,
          subject,
          topic,
          status:null
        };
        if(latex)card.latex=latex;
        if(x.sourcePage)card.sourcePage=x.sourcePage;
        cards.push(card);
        added++;
      });

      save();
      refresh();
      if(typeof librarySubject!=='undefined')librarySubject=subject;
      if(typeof renderLibrary==='function')renderLibrary();

      $('uploadStatus').textContent=`Saved ${added+upgraded} selected formula${added+upgraded===1?'':'s'} to ${subject} → ${topic}.${added?` ${added} new.`:''}${upgraded?` ${upgraded} existing formula${upgraded===1?'':'s'} updated without resetting review history.`:''}${skipped?` ${skipped} skipped.`:''}`;

      // Show the result immediately so saving is visually unambiguous.
      if(typeof showView==='function')showView('formulas');
    }catch(e){
      $('uploadStatus').textContent='Could not add formulas to the deck: '+(e&&e.message?e.message:String(e));
    }
  };
})();

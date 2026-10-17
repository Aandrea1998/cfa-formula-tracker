(function(){
  'use strict';

  const IMG_PROP='formulaImage';
  const PAGE_PROP='sourcePage';
  const MAX_TEXT=180;

  const htmlEscape=s=>String(s??'').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  const attrEscape=s=>htmlEscape(s).replace(/"/g,'&quot;');
  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();

  function cardFormulaHtml(c,where='library'){
    if(c&&c[IMG_PROP]){
      return `<img class="formula-fidelity-img ${where==='review'?'formula-review-img':'formula-library-img'}" src="${attrEscape(c[IMG_PROP])}" alt="${attrEscape(c.answer||c.question||'Formula')}" loading="lazy">`;
    }
    return `<span class="formula-fidelity-text">${htmlEscape(c&&c.answer||'')}</span>`;
  }

  function applyReviewImage(){
    try{
      const answerEl=document.getElementById('answer');
      if(!answerEl||typeof cards==='undefined'||typeof reviewIds==='undefined'||!reviewIds.length)return;
      const c=cards.find(x=>x.id===reviewIds[reviewPos]);
      if(!c||!c[IMG_PROP])return;
      const current=answerEl.querySelector('img.formula-fidelity-img');
      if(current&&current.src===c[IMG_PROP])return;
      answerEl.innerHTML=cardFormulaHtml(c,'review');
    }catch(_e){}
  }

  const answerEl=document.getElementById('answer');
  if(answerEl){
    const observer=new MutationObserver(()=>requestAnimationFrame(applyReviewImage));
    observer.observe(answerEl,{childList:true,subtree:true,characterData:true});
  }

  renderLibrary=function(){
    const subjects=['All',...TOPICS];
    $('topicTabs').innerHTML=subjects.map(t=>{
      const n=t==='All'?cards.length:cards.filter(c=>c.subject===t).length;
      return `<button class="topic-chip ${librarySubject===t?'active':''}" data-subject="${attrEscape(t)}">${htmlEscape(t)} · ${n}</button>`;
    }).join('');
    document.querySelectorAll('.topic-chip').forEach(b=>b.onclick=()=>{librarySubject=b.dataset.subject;renderLibrary()});
    const visible=librarySubject==='All'?cards:cards.filter(c=>c.subject===librarySubject);
    $('formulaCountPill').textContent=`${visible.length} formula${visible.length===1?'':'s'}`;
    if(!visible.length){
      $('libraryContent').innerHTML=`<div class="empty">No formulas in <strong>${htmlEscape(librarySubject)}</strong> yet. Use Upload chapter to add some.</div>`;
      return;
    }
    const groups={};
    visible.forEach(c=>{groups[c.subject]??={};groups[c.subject][c.topic]??=[];groups[c.subject][c.topic].push(c)});
    let html='';
    Object.keys(groups).sort((a,b)=>TOPICS.indexOf(a)-TOPICS.indexOf(b)).forEach(subject=>{
      Object.keys(groups[subject]).sort().forEach(topic=>{
        const g=groups[subject][topic];
        html+=`<div class="library-group"><div class="library-head"><div><div class="library-title">${htmlEscape(subject)}</div><div class="library-meta">${htmlEscape(topic)}</div></div><div class="library-meta">${g.length} formula${g.length===1?'':'s'}</div></div><div class="table-wrap"><table class="table"><thead><tr><th>#</th><th>Prompt</th><th>Formula</th><th>Status</th></tr></thead><tbody>${g.map(c=>{
          const label=c.status==='known'?'Known':c.status==='missed'?'Missed':c.status==='difficult'?'Difficult':'Unreviewed';
          return `<tr><td>${c.id}</td><td>${htmlEscape(c.question)}</td><td class="formula-cell">${cardFormulaHtml(c,'library')}</td><td><span class="status-dot ${c.status||''}"></span>${label}</td></tr>`;
        }).join('')}</tbody></table></div></div>`;
      });
    });
    $('libraryContent').innerHTML=html;
  };

  function mapItems(tc,viewport){
    return tc.items.filter(it=>tidy(it.str)).map((it,index)=>{
      const tr=pdfjsLib.Util.transform(viewport.transform,it.transform);
      const font=Math.max(6,Math.hypot(tr[2],tr[3])||Math.abs(tr[3])||10);
      return {
        index,
        text:tidy(it.str),
        x:tr[4],
        y:tr[5],
        w:Math.max(1,(it.width||0)*viewport.scale),
        h:Math.max(font,(it.height||0)*viewport.scale||font),
        font
      };
    });
  }

  function makeRows(items){
    const sorted=[...items].sort((a,b)=>a.y-b.y||a.x-b.x);
    const rows=[];
    for(const it of sorted){
      let best=null,bestD=Infinity;
      for(let r=rows.length-1;r>=0;r--){
        const d=Math.abs(rows[r].y-it.y);
        if(d<bestD&&d<=3.4){best=rows[r];bestD=d;}
        if(rows[r].y<it.y-7)break;
      }
      if(!best){best={y:it.y,items:[]};rows.push(best);}
      best.items.push(it);
      best.y=best.items.reduce((s,x)=>s+x.y,0)/best.items.length;
    }
    rows.forEach(r=>{
      r.items.sort((a,b)=>a.x-b.x);
      let text='';let lastEnd=null;
      for(const it of r.items){
        if(text&&lastEnd!==null&&it.x-lastEnd>Math.max(2,it.font*.18))text+=' ';
        text+=it.text;
        lastEnd=it.x+it.w;
      }
      r.text=tidy(text);
      r.x1=Math.min(...r.items.map(i=>i.x));
      r.x2=Math.max(...r.items.map(i=>i.x+i.w));
      r.font=Math.max(...r.items.map(i=>i.font));
    });
    return rows.sort((a,b)=>a.y-b.y||a.x1-b.x1);
  }

  function isHeading(row){return /^\s*\d+\.\s+\S/.test(row.text);}
  function isBullet(row){return /^\s*[•●▪◦*-]\s*/.test(row.text);}
  function hasEquationMark(row){return /[=≈≃≡]/.test(row.text);}
  function looksSentence(text){
    const words=tidy(text).split(/\s+/).filter(Boolean);
    return words.length>18&&!/[+−–×÷*/^∆ΔΣ∑]/.test(text);
  }
  function formulaAnchor(row){
    if(!hasEquationMark(row)||isHeading(row)||isBullet(row))return false;
    if(row.text.length>MAX_TEXT||looksSentence(row.text))return false;
    return true;
  }

  function sectionFor(rows,i){
    let heading=null,headingIndex=-1;
    for(let j=i;j>=0;j--){if(isHeading(rows[j])){heading=rows[j];headingIndex=j;break;}}
    if(!heading)return {title:'Formula',headingIndex:-1};
    return {title:heading.text.replace(/^\s*\d+\.\s*/,''),headingIndex};
  }

  function nearbyLabel(rows,i,headingIndex){
    const anchor=rows[i];
    for(let j=i-1;j>headingIndex;j--){
      const r=rows[j];
      if(anchor.y-r.y>52)break;
      if(isBullet(r)||isHeading(r)||hasEquationMark(r))continue;
      const t=tidy(r.text);
      if(!t||t.length>58||/[.!?]$/.test(t))continue;
      if(/^(CFA Level|Working Version|Dividend \/ Equity Valuation|Free Cash Flow Valuation)$/i.test(t))continue;
      return t;
    }
    return '';
  }

  function groupForAnchor(rows,i){
    const anchor=rows[i];
    const out=[anchor];
    for(let j=0;j<rows.length;j++){
      if(j===i)continue;
      const r=rows[j],dy=Math.abs(r.y-anchor.y);
      if(dy>21)continue;
      if(isHeading(r)||isBullet(r))continue;
      if(hasEquationMark(r))continue;
      const horizontallyRelevant=r.x2>=anchor.x1-55&&r.x1<=anchor.x2+245;
      if(!horizontallyRelevant)continue;
      if(r.text.length>70&&/\s/.test(r.text))continue;
      out.push(r);
    }
    return out.sort((a,b)=>a.y-b.y||a.x1-b.x1);
  }

  function bboxForRows(rows,viewport){
    const items=rows.flatMap(r=>r.items);
    let x1=Math.min(...items.map(i=>i.x));
    let x2=Math.max(...items.map(i=>i.x+i.w));
    let y1=Math.min(...items.map(i=>i.y-i.h));
    let y2=Math.max(...items.map(i=>i.y+i.h*.35));
    const padX=10,padY=7;
    x1=Math.max(0,x1-padX);x2=Math.min(viewport.width,x2+padX);
    y1=Math.max(0,y1-padY);y2=Math.min(viewport.height,y2+padY);
    return {x:x1,y:y1,w:Math.max(8,x2-x1),h:Math.max(8,y2-y1)};
  }

  function cropCanvas(source,bbox){
    const dpr=source.width/(source._cssWidth||source.width);
    const sx=Math.max(0,Math.floor(bbox.x*dpr));
    const sy=Math.max(0,Math.floor(bbox.y*dpr));
    const sw=Math.min(source.width-sx,Math.ceil(bbox.w*dpr));
    const sh=Math.min(source.height-sy,Math.ceil(bbox.h*dpr));
    const out=document.createElement('canvas');
    out.width=Math.max(1,sw);out.height=Math.max(1,sh);
    const ctx=out.getContext('2d',{alpha:false});
    ctx.fillStyle='#fff';ctx.fillRect(0,0,out.width,out.height);
    ctx.drawImage(source,sx,sy,sw,sh,0,0,sw,sh);
    try{return out.toDataURL('image/webp',0.92);}catch(_e){return out.toDataURL('image/png');}
  }

  function fallbackText(group){return tidy(group.map(r=>r.text).join(' '));}

  async function pdfExtractFidelity(file){
    if(!window.pdfjsLib)throw Error('PDF extractor did not load. Refresh and try again.');
    pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
    const out=[];
    const seen=new Set();
    for(let p=1;p<=pdf.numPages;p++){
      $('uploadStatus').textContent=`High-fidelity scan · page ${p} of ${pdf.numPages}…`;
      const page=await pdf.getPage(p);
      const view=page.getViewport({scale:1.55});
      const renderScale=2;
      const renderView=page.getViewport({scale:view.scale*renderScale});
      const canvas=document.createElement('canvas');
      canvas.width=Math.ceil(renderView.width);canvas.height=Math.ceil(renderView.height);
      canvas._cssWidth=view.width;canvas._cssHeight=view.height;
      const ctx=canvas.getContext('2d',{alpha:false});
      ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
      await page.render({canvasContext:ctx,viewport:renderView}).promise;
      const tc=await page.getTextContent();
      const items=mapItems(tc,view);
      const rows=makeRows(items);
      for(let i=0;i<rows.length;i++){
        const row=rows[i];
        if(!formulaAnchor(row))continue;
        const section=sectionFor(rows,i);
        const group=groupForAnchor(rows,i);
        const text=fallbackText(group);
        const key=tidy(section.title+'|'+text).toLowerCase().replace(/\s+/g,'');
        if(seen.has(key))continue;
        seen.add(key);
        const label=nearbyLabel(rows,i,section.headingIndex);
        const prompt=label&&label.toLowerCase()!==section.title.toLowerCase()?`${section.title} — ${label}`:section.title;
        const box=bboxForRows(group,view);
        const image=cropCanvas(canvas,box);
        out.push({front:prompt||`Formula from page ${p}`,back:text||row.text,formulaImage:image,sourcePage:p,selected:true});
      }
    }
    return out;
  }

  function renderExtractedFidelity(){
    const box=$('extractList');
    $('previewCard').style.display=extracted.length?'block':'none';
    $('selectAllBtn').disabled=!extracted.length;
    $('addExtractedBtn').disabled=!extracted.length;
    box.innerHTML=extracted.map((c,i)=>`<div class="extract-item fidelity-extract"><div><input type="checkbox" class="xcheck" data-i="${i}" ${c.selected?'checked':''}></div><div class="fields"><input type="text" class="xfront" data-i="${i}" value="${attrEscape(c.front)}"><div class="fidelity-preview">${c.formulaImage?`<img class="formula-fidelity-img formula-preview-img" src="${attrEscape(c.formulaImage)}" alt="Formula preview">`:`<div class="formula-fidelity-text">${htmlEscape(c.back)}</div>`}</div><div class="fidelity-meta">${c.sourcePage?`Exact PDF rendering · page ${c.sourcePage}`:'Text formula'}</div><details class="fidelity-details"><summary>Extracted text fallback</summary><textarea class="xback" data-i="${i}">${htmlEscape(c.back)}</textarea></details>${c.duplicate?'<div class="duplicate">Possible duplicate already in your deck.</div>':''}</div></div>`).join('');
    document.querySelectorAll('.xcheck').forEach(e=>e.onchange=()=>extracted[+e.dataset.i].selected=e.checked);
    document.querySelectorAll('.xfront').forEach(e=>e.oninput=()=>extracted[+e.dataset.i].front=e.value);
    document.querySelectorAll('.xback').forEach(e=>e.oninput=()=>extracted[+e.dataset.i].back=e.value);
  }

  function markDupFidelity(list){
    const existing=new Set(cards.map(c=>norm(c.answer)));
    return list.map(x=>({...x,duplicate:existing.has(norm(x.back))}));
  }

  $('extractBtn').onclick=async()=>{
    const file=$('uploadFile').files[0];
    if(!file){$('uploadStatus').textContent='Please choose a PDF, TXT or JSON file first.';return;}
    try{
      $('extractBtn').disabled=true;
      $('uploadStatus').textContent='Reading file…';
      const n=file.name.toLowerCase();
      let found;
      if(n.endsWith('.pdf')) found=await pdfExtractFidelity(file);
      else if(n.endsWith('.json')) found=await jsonExtract(file);
      else found=await textExtract(file);
      const seen=new Set();
      found=found.filter(x=>{
        const k=norm(x.back);
        if(!k||seen.has(k))return false;
        seen.add(k);return true;
      });
      extracted=markDupFidelity(found);
      renderExtractedFidelity();
      const d=extracted.filter(x=>x.duplicate).length;
      const exact=extracted.filter(x=>x.formulaImage).length;
      $('uploadStatus').textContent=`Found ${extracted.length} formula candidate${extracted.length===1?'':'s'}${exact?` · ${exact} preserved exactly from the PDF`:''}${d?` · ${d} possible duplicate${d===1?'':'s'}`:''}. Review before adding.`;
    }catch(e){$('uploadStatus').textContent='Could not extract formulas: '+e.message;}
    finally{$('extractBtn').disabled=false;}
  };

  $('selectAllBtn').onclick=()=>{
    const all=extracted.length&&extracted.every(x=>x.selected);
    extracted.forEach(x=>x.selected=!all);
    renderExtractedFidelity();
  };

  $('addExtractedBtn').onclick=()=>{
    const subject=tidy($('uploadSubject').value),topic=tidy($('uploadTopic').value);
    if(!topic){$('uploadStatus').textContent='Please enter a chapter / subtopic before adding formulas.';return;}
    const existing=new Set(cards.map(c=>norm(c.answer)));
    let next=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,added=0,skipped=0;
    const addedCards=[];
    extracted.filter(x=>x.selected).forEach(x=>{
      const n=norm(x.back);
      if(!n||existing.has(n)){skipped++;return;}
      const card={id:next++,question:tidy(x.front)||'Recall the formula?',answer:tidy(x.back),subject,topic,status:null};
      if(x.formulaImage)card[IMG_PROP]=x.formulaImage;
      if(x.sourcePage)card[PAGE_PROP]=x.sourcePage;
      cards.push(card);addedCards.push(card);existing.add(n);added++;
    });
    let fidelityKept=true;
    try{save();}
    catch(e){
      addedCards.forEach(c=>delete c[IMG_PROP]);
      fidelityKept=false;
      try{save();}catch(_e){}
    }
    refresh();
    $('uploadStatus').textContent=`Added ${added} formula${added===1?'':'s'} to ${subject} → ${topic}.${skipped?` Skipped ${skipped} duplicate${skipped===1?'':'s'}.`:''}${!fidelityKept?' Browser storage was full, so the exact-image layer was removed and text fallbacks were kept.':''}`;
    extracted=markDupFidelity(extracted);
    renderExtractedFidelity();
  };

  const help=document.querySelector('#uploadView .file-drop .help');
  if(help)help.textContent='PDFs use high-fidelity extraction: formulas are cropped directly from the rendered page so fractions, sums, subscripts and superscripts keep their original appearance. Review every candidate before adding it.';
  const pill=document.querySelector('#uploadView .topbar .pill');
  if(pill)pill.textContent='High-fidelity formula import';

  window.CFAFormulaFidelity={cardFormulaHtml,applyReviewImage};
  renderLibrary();
  applyReviewImage();
})();

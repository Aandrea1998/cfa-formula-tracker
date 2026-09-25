(function(){
  'use strict';

  const LATEX_PROP='latex';
  const IMG_PROP='formulaImage';
  const PAGE_PROP='sourcePage';
  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const htmlEscape=s=>String(s??'').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  const attrEscape=s=>htmlEscape(s).replace(/"/g,'&quot;');

  function katexHtml(latex,displayMode=true){
    const value=tidy(latex);
    if(!value)return '';
    try{
      if(window.katex){
        return katex.renderToString(value,{displayMode,throwOnError:true,strict:'ignore',trust:false,output:'htmlAndMathml'});
      }
    }catch(_e){}
    return '';
  }

  function validLatex(latex){
    if(!tidy(latex))return false;
    if(!window.katex)return true;
    try{katex.renderToString(latex,{throwOnError:true,strict:'ignore'});return true;}catch(_e){return false;}
  }

  const macroTokens={
    FCFF:'\\mathrm{FCFF}',FCFE:'\\mathrm{FCFE}',CFO:'\\mathrm{CFO}',EBITDA:'\\mathrm{EBITDA}',EBIT:'\\mathrm{EBIT}',
    WACC:'\\mathrm{WACC}',ROE:'\\mathrm{ROE}',EPS:'\\mathrm{EPS}',NCC:'\\mathrm{NCC}',CapEx:'\\mathrm{CapEx}',
    APV:'\\mathrm{APV}',GDP:'\\mathrm{GDP}',DPS:'\\mathrm{DPS}',PV:'\\mathrm{PV}',MV:'\\mathrm{MV}',NI:'\\mathrm{NI}'
  };

  function protectMacros(s){
    const stash=[];
    Object.keys(macroTokens).sort((a,b)=>b.length-a.length).forEach(k=>{
      s=s.replace(new RegExp(`\\b${k}\\b`,'g'),()=>{const id=`§${stash.length}§`;stash.push(macroTokens[k]);return id;});
    });
    return {s,stash};
  }

  function restoreMacros(s,stash){return s.replace(/§(\d+)§/g,(_m,n)=>stash[+n]||'');}

  function inlineToLatex(raw){
    let s=tidy(raw);
    if(!s)return '';
    s=s.replace(/[−–—]/g,'-').replace(/×/g,' \\times ').replace(/÷/g,' \\div ')
      .replace(/≈/g,' \\approx ').replace(/≃/g,' \\simeq ').replace(/≡/g,' \\equiv ')
      .replace(/≥/g,' \\ge ').replace(/≤/g,' \\le ').replace(/→|−→/g,' \\to ')
      .replace(/↑/g,'\\uparrow ').replace(/↓/g,'\\downarrow ')
      .replace(/∞/g,'\\infty ').replace(/[∆Δ]/g,'\\Delta ')
      .replace(/α/g,'\\alpha ').replace(/β/g,'\\beta ').replace(/γ/g,'\\gamma ').replace(/δ/g,'\\delta ')
      .replace(/θ/g,'\\theta ').replace(/λ/g,'\\lambda ').replace(/μ/g,'\\mu ').replace(/σ/g,'\\sigma ')
      .replace(/ρ/g,'\\rho ').replace(/Ψ/g,'\\Psi ');

    s=s.replace(/\bFCFF([01tn])\b/g,'\\mathrm{FCFF}_{$1}')
      .replace(/\bFCFE([01tn])\b/g,'\\mathrm{FCFE}_{$1}')
      .replace(/\bBVt-1\b/g,'BV_{t-1}').replace(/\bBV([01tn])\b/g,'BV_{$1}')
      .replace(/\bRI([01tn])\b/g,'RI_{$1}').replace(/\bCF([01tn])\b/g,'CF_{$1}')
      .replace(/\bD(n\+1)\b/g,'D_{n+1}').replace(/\bD([01tn])\b/g,'D_{$1}')
      .replace(/\bP([01n])\b/g,'P_{$1}').replace(/\bV([01n])\b/g,'V_{$1}')
      .replace(/\bE([01])\b/g,'E_{$1}')
      .replace(/\bg([SL])\b/g,'g_{$1}').replace(/\br([edp])\b/g,'r_{$1}')
      .replace(/\bw([edp])\b/g,'w_{$1}')
      .replace(/\bNIcommon\b/g,'\\mathrm{NI}_{common}')
      .replace(/\bPrefDiv\b/gi,'\\mathrm{PrefDiv}')
      .replace(/\bFCInv\b/g,'\\mathrm{FCInv}').replace(/\bWCInv\b/g,'\\mathrm{WCInv}')
      .replace(/\bDR\b/g,'\\mathrm{DR}');

    s=s.replace(/\)([tn])(?=\s|\(|\+|-|$)/g,')^{$1}')
      .replace(/\)([23])(?=\s|\(|\+|-|$)/g,')^{$1}')
      .replace(/\b([A-Za-z])([23])\b/g,'$1^{$2}');

    const protectedData=protectMacros(s);s=protectedData.s;

    const phrases=['Firm Value','Equity Value','Common Equity Value','Net Borrowing','Net Financing','Net Payments to Debt','Net Payments to Equity',
      'Debt Repayment','New Borrowing','Share Repurchases','Share Issuance','Excess Cash','Interest','Dividends','Sales','Assets','Equity',
      'Profit Margin','Asset Turnover','Financial Leverage','Dividend Yield','Capital Gain Yield','Growth Rate','Required Return','Cash Available'];
    phrases.sort((a,b)=>b.length-a.length).forEach(p=>{s=s.replace(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),m=>`\\text{${m}}`);});

    s=restoreMacros(s,protectedData.stash);
    s=s.replace(/\s*([=+\-<>])\s*/g,' $1 ')
      .replace(/\s*\\times\s*/g,' \\times ')
      .replace(/\s+/g,' ').trim();
    return s;
  }

  function lineItemsLatex(items){
    if(!items||!items.length)return '';
    const text=[...items].sort((a,b)=>a.x-b.x).map(i=>i.text).join(' ');
    return inlineToLatex(text);
  }

  function geometryToLatex(group,anchor){
    const items=group.flatMap(r=>r.items).map(i=>({...i,x1:i.x,x2:i.x+i.w}));
    if(!items.length)return inlineToLatex(anchor.text);
    const baseY=anchor.y;
    const used=new Set();
    const constructs=[];

    const sigma=items.find(it=>/^[XΣ∑]$/.test(tidy(it.text)) && items.some(j=>j!==it&&Math.abs((j.x+j.w/2)-(it.x+it.w/2))<16&&Math.abs(j.y-it.y)>4&&Math.abs(j.y-it.y)<23));
    if(sigma){
      const cx=sigma.x+sigma.w/2;
      const upper=items.filter(j=>j!==sigma&&j.y<sigma.y-4&&Math.abs((j.x+j.w/2)-cx)<19);
      const lower=items.filter(j=>j!==sigma&&j.y>sigma.y+4&&Math.abs((j.x+j.w/2)-cx)<23);
      const up=lineItemsLatex(upper)||'n';
      const lo=lineItemsLatex(lower)||'t=1';
      [sigma,...upper,...lower].forEach(x=>used.add(x.index));
      constructs.push({x1:Math.min(sigma.x,...upper.map(x=>x.x),...lower.map(x=>x.x)),x2:Math.max(sigma.x2,...upper.map(x=>x.x2),...lower.map(x=>x.x2)),latex:`\\sum_{${lo}}^{${up}}`,kind:'sum'});
    }

    let off=items.filter(it=>!used.has(it.index)&&Math.abs(it.y-baseY)>3.2);
    off.sort((a,b)=>a.x1-b.x1||a.y-b.y);
    const comps=[];
    for(const it of off){
      const last=comps[comps.length-1];
      if(!last||it.x1-last.x2>7){comps.push({x1:it.x1,x2:it.x2,items:[it]});}
      else{last.items.push(it);last.x2=Math.max(last.x2,it.x2);}
    }
    for(const comp of comps){
      if(constructs.some(c=>!(comp.x2<c.x1-3||comp.x1>c.x2+3)))continue;
      const above=comp.items.filter(i=>i.y<baseY-3.2);
      const below=comp.items.filter(i=>i.y>baseY+3.2);
      if(above.length&&below.length){
        above.forEach(i=>used.add(i.index));below.forEach(i=>used.add(i.index));
        constructs.push({x1:comp.x1,x2:comp.x2,latex:`\\frac{${lineItemsLatex(above)}}{${lineItemsLatex(below)}}`,kind:'frac'});
      }
    }

    const nodes=[];
    constructs.forEach(c=>nodes.push({x:c.x1,sort:0,latex:c.latex}));
    items.filter(it=>!used.has(it.index)&&Math.abs(it.y-baseY)<=4.5).forEach(it=>nodes.push({x:it.x,sort:1,latex:inlineToLatex(it.text)}));
    nodes.sort((a,b)=>a.x-b.x||a.sort-b.sort);
    let result=nodes.map(n=>n.latex).filter(Boolean).join(' ');
    if(!result||(!/[=<>]/.test(result)&&/[=<>]/.test(anchor.text)))result=inlineToLatex(anchor.text);
    return result.replace(/\s+/g,' ').trim();
  }

  function isHeading(row){return /^\s*\d+\.\s+\S/.test(row.text);}
  function isBullet(row){return /^\s*[•●▪◦*-]\s*/.test(row.text);}
  function hasEquationMark(row){return /[=≈≃≡]/.test(row.text);}
  function looksMathLabel(text){
    const t=tidy(text);
    if(!t)return false;
    if(/[=+−–—×÷*/^<>∑Σ∆Δ]/.test(t))return true;
    if(/^\(?\s*(?:1|r|g|D|P|V|CF|FCFF|FCFE|RI|BV|E|w)[A-Za-z0-9_()+\-\s]*\)?$/i.test(t))return true;
    return false;
  }

  function sectionFor(rows,i){
    let heading=null,headingIndex=-1;
    for(let j=i;j>=0;j--){if(isHeading(rows[j])){heading=rows[j];headingIndex=j;break;}}
    return heading?{title:heading.text.replace(/^\s*\d+\.\s*/,''),headingIndex}:{title:'Formula',headingIndex:-1};
  }

  function nearbyLabel(rows,i,headingIndex){
    const anchor=rows[i];
    for(let j=i-1;j>headingIndex;j--){
      const r=rows[j];
      if(anchor.y-r.y>55)break;
      if(isBullet(r)||isHeading(r)||hasEquationMark(r))continue;
      const t=tidy(r.text);
      if(!t||t.length>64||/[.!?]$/.test(t)||looksMathLabel(t))continue;
      if(/^(CFA Level|Working Version|Dividend \/ Equity Valuation|Free Cash Flow Valuation)$/i.test(t))continue;
      if(t.split(/\s+/).length>6)continue;
      return t;
    }
    return '';
  }

  function groupForAnchor(rows,i){
    const anchor=rows[i],out=[anchor];
    for(let j=0;j<rows.length;j++){
      if(j===i)continue;
      const r=rows[j],dy=Math.abs(r.y-anchor.y);
      if(dy>25)continue;
      if(isHeading(r)||isBullet(r))continue;
      const relevant=r.x2>=anchor.x1-70&&r.x1<=anchor.x2+390;
      if(!relevant)continue;
      if(r.text.length>90&&/\s/.test(r.text)&&!looksMathLabel(r.text))continue;
      out.push(r);
    }
    return out.sort((a,b)=>a.y-b.y||a.x1-b.x1);
  }

  function mapItems(tc,viewport){
    return tc.items.filter(it=>tidy(it.str)).map((it,index)=>{
      const tr=pdfjsLib.Util.transform(viewport.transform,it.transform);
      const font=Math.max(6,Math.hypot(tr[2],tr[3])||Math.abs(tr[3])||10);
      return {index,text:tidy(it.str),x:tr[4],y:tr[5],w:Math.max(1,(it.width||0)*viewport.scale),h:Math.max(font,(it.height||0)*viewport.scale||font),font};
    });
  }

  function makeRows(items){
    const sorted=[...items].sort((a,b)=>a.y-b.y||a.x-b.x),rows=[];
    for(const it of sorted){
      let best=null,bestD=Infinity;
      for(let r=rows.length-1;r>=0;r--){
        const d=Math.abs(rows[r].y-it.y);
        if(d<bestD&&d<=3.4){best=rows[r];bestD=d;}
        if(rows[r].y<it.y-7)break;
      }
      if(!best){best={y:it.y,items:[]};rows.push(best);}
      best.items.push(it);best.y=best.items.reduce((s,x)=>s+x.y,0)/best.items.length;
    }
    rows.forEach(r=>{
      r.items.sort((a,b)=>a.x-b.x);let text='',lastEnd=null;
      for(const it of r.items){if(text&&lastEnd!==null&&it.x-lastEnd>Math.max(2,it.font*.18))text+=' ';text+=it.text;lastEnd=it.x+it.w;}
      r.text=tidy(text);r.x1=Math.min(...r.items.map(i=>i.x));r.x2=Math.max(...r.items.map(i=>i.x+i.w));r.font=Math.max(...r.items.map(i=>i.font));
    });
    return rows.sort((a,b)=>a.y-b.y||a.x1-b.x1);
  }

  function formulaAnchor(row){
    if(isHeading(row)||isBullet(row)||row.text.length<2||row.text.length>190)return false;
    if(hasEquationMark(row))return true;
    const math=(row.text.match(/[+\-−×÷*/^()\[\]<>∆ΔΣ∑αβγδθλμσρΨ]/g)||[]).length;
    return math>=3&&row.text.split(/\s+/).length<=12;
  }

  function fallbackText(group){return tidy(group.map(r=>r.text).join(' '));}

  async function pdfExtractMath(file){
    if(!window.pdfjsLib)throw Error('PDF extractor did not load. Refresh and try again.');
    pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
    const out=[],seen=new Set();
    for(let p=1;p<=pdf.numPages;p++){
      $('uploadStatus').textContent=`Typesetting formulas · page ${p} of ${pdf.numPages}…`;
      const page=await pdf.getPage(p),view=page.getViewport({scale:1.55}),tc=await page.getTextContent();
      const rows=makeRows(mapItems(tc,view));
      for(let i=0;i<rows.length;i++){
        const row=rows[i];if(!formulaAnchor(row))continue;
        const section=sectionFor(rows,i),group=groupForAnchor(rows,i),text=fallbackText(group);
        let latex=geometryToLatex(group,row);
        if(!validLatex(latex))latex=inlineToLatex(row.text);
        if(!validLatex(latex))latex='';
        const key=(section.title+'|'+(latex||text)).toLowerCase().replace(/\s+/g,'');
        if(seen.has(key))continue;seen.add(key);
        const label=nearbyLabel(rows,i,section.headingIndex);
        const prompt=label&&label.toLowerCase()!==section.title.toLowerCase()?`${section.title} — ${label}`:section.title;
        out.push({front:prompt||`Formula from page ${p}`,back:text||row.text,latex,sourcePage:p,selected:true});
      }
    }
    return out;
  }

  function formulaHtml(c,where='library'){
    const latex=c&&c[LATEX_PROP];
    const kh=latex?katexHtml(latex,true):'';
    if(kh)return `<div class="formula-math ${where==='review'?'formula-math-review':'formula-math-library'}">${kh}</div>`;
    if(c&&c[IMG_PROP])return `<img class="formula-fidelity-img ${where==='review'?'formula-review-img':'formula-library-img'}" src="${attrEscape(c[IMG_PROP])}" alt="${attrEscape(c.answer||c.question||'Formula')}" loading="lazy">`;
    return `<span class="formula-fidelity-text">${htmlEscape(c&&c.answer||'')}</span>`;
  }

  function renderExtractedMath(){
    const box=$('extractList');
    $('previewCard').style.display=extracted.length?'block':'none';$('selectAllBtn').disabled=!extracted.length;$('addExtractedBtn').disabled=!extracted.length;
    box.innerHTML=extracted.map((c,i)=>{
      const math=c.latex?katexHtml(c.latex,true):'';
      const preview=math?`<div class="formula-math formula-math-preview">${math}</div>`:`<div class="formula-fidelity-text">${htmlEscape(c.back)}</div>`;
      return `<div class="extract-item fidelity-extract math-extract"><div><input type="checkbox" class="xcheck" data-i="${i}" ${c.selected?'checked':''}></div><div class="fields"><input type="text" class="xfront" data-i="${i}" value="${attrEscape(c.front)}"><div class="math-preview-shell">${preview}</div><div class="fidelity-meta">${c.latex?'Typeset math · scalable · no snapshot':'Text fallback'}${c.sourcePage?` · page ${c.sourcePage}`:''}</div><details class="math-edit"><summary>Edit formula / source</summary><label>LaTeX</label><textarea class="xlatex" data-i="${i}" spellcheck="false">${htmlEscape(c.latex||'')}</textarea><label>Extracted text</label><textarea class="xback" data-i="${i}">${htmlEscape(c.back)}</textarea></details>${c.duplicate?'<div class="duplicate">Possible duplicate already in your deck. Adding it will upgrade the existing card if the new typeset formula is better.</div>':''}</div></div>`;
    }).join('');
    document.querySelectorAll('.xcheck').forEach(e=>e.onchange=()=>extracted[+e.dataset.i].selected=e.checked);
    document.querySelectorAll('.xfront').forEach(e=>e.oninput=()=>extracted[+e.dataset.i].front=e.value);
    document.querySelectorAll('.xback').forEach(e=>e.oninput=()=>extracted[+e.dataset.i].back=e.value);
    document.querySelectorAll('.xlatex').forEach(e=>e.oninput=()=>{extracted[+e.dataset.i].latex=e.value;clearTimeout(e._rt);e._rt=setTimeout(renderExtractedMath,450);});
  }

  function markDupMath(list){const existing=new Set(cards.map(c=>norm(c.answer)));return list.map(x=>({...x,duplicate:existing.has(norm(x.back))}));}

  function renderLibraryMath(){
    const subjects=['All',...TOPICS];
    $('topicTabs').innerHTML=subjects.map(t=>{const n=t==='All'?cards.length:cards.filter(c=>c.subject===t).length;return `<button class="topic-chip ${librarySubject===t?'active':''}" data-subject="${attrEscape(t)}">${htmlEscape(t)} · ${n}</button>`;}).join('');
    document.querySelectorAll('.topic-chip').forEach(b=>b.onclick=()=>{librarySubject=b.dataset.subject;renderLibraryMath()});
    const visible=librarySubject==='All'?cards:cards.filter(c=>c.subject===librarySubject);$('formulaCountPill').textContent=`${visible.length} formula${visible.length===1?'':'s'}`;
    if(!visible.length){$('libraryContent').innerHTML=`<div class="empty">No formulas in <strong>${htmlEscape(librarySubject)}</strong> yet. Use Upload chapter to add some.</div>`;return;}
    const groups={};visible.forEach(c=>{groups[c.subject]??={};groups[c.subject][c.topic]??=[];groups[c.subject][c.topic].push(c)});let html='';
    Object.keys(groups).sort((a,b)=>TOPICS.indexOf(a)-TOPICS.indexOf(b)).forEach(subject=>Object.keys(groups[subject]).sort().forEach(topic=>{const g=groups[subject][topic];html+=`<div class="library-group"><div class="library-head"><div><div class="library-title">${htmlEscape(subject)}</div><div class="library-meta">${htmlEscape(topic)}</div></div><div class="library-meta">${g.length} formula${g.length===1?'':'s'}</div></div><div class="table-wrap"><table class="table"><thead><tr><th>#</th><th>Prompt</th><th>Formula</th><th>Status</th></tr></thead><tbody>${g.map(c=>{const label=c.status==='known'?'Known':c.status==='missed'?'Missed':c.status==='difficult'?'Difficult':'Unreviewed';return `<tr><td>${c.id}</td><td>${htmlEscape(c.question)}</td><td class="formula-cell">${formulaHtml(c,'library')}</td><td><span class="status-dot ${c.status||''}"></span>${label}</td></tr>`;}).join('')}</tbody></table></div></div>`;}));
    $('libraryContent').innerHTML=html;
  }

  function applyReviewMath(){
    try{
      const el=$('answer');if(!el||!reviewIds||!reviewIds.length)return;
      const c=cards.find(x=>x.id===reviewIds[reviewPos]);if(!c||!c[LATEX_PROP])return;
      const marker=`latex:${c[LATEX_PROP]}`;if(el.dataset.mathCard===marker)return;
      el.innerHTML=formulaHtml(c,'review');el.dataset.mathCard=marker;
    }catch(_e){}
  }

  const answer=$('answer');
  if(answer){new MutationObserver(()=>requestAnimationFrame(applyReviewMath)).observe(answer,{childList:true,subtree:true,characterData:true});}

  $('extractBtn').onclick=async()=>{
    const file=$('uploadFile').files[0];if(!file){$('uploadStatus').textContent='Please choose a PDF, TXT or JSON file first.';return;}
    try{
      $('extractBtn').disabled=true;$('uploadStatus').textContent='Reading file…';const n=file.name.toLowerCase();let found;
      if(n.endsWith('.pdf'))found=await pdfExtractMath(file);
      else if(n.endsWith('.json')){found=await jsonExtract(file);found=found.map(x=>({...x,latex:x.latex||inlineToLatex(x.back)}));}
      else{found=await textExtract(file);found=found.map(x=>({...x,latex:inlineToLatex(x.back)}));}
      const seen=new Set();found=found.filter(x=>{const k=norm(x.back);if(!k||seen.has(k))return false;seen.add(k);return true;});
      extracted=markDupMath(found);renderExtractedMath();const d=extracted.filter(x=>x.duplicate).length,m=extracted.filter(x=>x.latex).length;
      $('uploadStatus').textContent=`Found ${extracted.length} formula candidate${extracted.length===1?'':'s'} · ${m} rendered as real math${d?` · ${d} possible duplicate${d===1?'':'s'}`:''}. Review before adding.`;
    }catch(e){$('uploadStatus').textContent='Could not extract formulas: '+e.message;}finally{$('extractBtn').disabled=false;}
  };

  $('selectAllBtn').onclick=()=>{const all=extracted.length&&extracted.every(x=>x.selected);extracted.forEach(x=>x.selected=!all);renderExtractedMath();};

  $('addExtractedBtn').onclick=()=>{
    const subject=tidy($('uploadSubject').value),topic=tidy($('uploadTopic').value);if(!topic){$('uploadStatus').textContent='Please enter a chapter / subtopic before adding formulas.';return;}
    const byAnswer=new Map(cards.map(c=>[norm(c.answer),c]));let next=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,added=0,upgraded=0,skipped=0;
    extracted.filter(x=>x.selected).forEach(x=>{
      const key=norm(x.back);if(!key){skipped++;return;}const old=byAnswer.get(key);
      if(old){
        if(x.latex&&validLatex(x.latex)){old[LATEX_PROP]=tidy(x.latex);delete old[IMG_PROP];if(x.sourcePage)old[PAGE_PROP]=x.sourcePage;upgraded++;}
        else skipped++;
        return;
      }
      const card={id:next++,question:tidy(x.front)||'Recall the formula?',answer:tidy(x.back),subject,topic,status:null};
      if(x.latex&&validLatex(x.latex))card[LATEX_PROP]=tidy(x.latex);if(x.sourcePage)card[PAGE_PROP]=x.sourcePage;
      cards.push(card);byAnswer.set(key,card);added++;
    });
    save();refresh();renderLibraryMath();$('uploadStatus').textContent=`Added ${added} new formula${added===1?'':'s'}${upgraded?` · upgraded ${upgraded} existing formula${upgraded===1?'':'s'} to typeset math`:''} in ${subject} → ${topic}.${skipped?` Skipped ${skipped} duplicate${skipped===1?'':'s'}.`:''}`;
    extracted=markDupMath(extracted);renderExtractedMath();
  };

  renderLibrary=renderLibraryMath;
  const help=document.querySelector('#uploadView .file-drop .help');if(help)help.textContent='PDF formulas are reconstructed as LaTeX and rendered with KaTeX, so fractions, sums, subscripts and superscripts stay sharp and scale with the interface. You can edit the LaTeX before adding.';
  const previewHelp=document.querySelector('#previewCard .help');if(previewHelp)previewHelp.textContent='The main preview is real typeset math, not a PDF snapshot. Open “Edit formula / source” only if you want to adjust the generated LaTeX.';
  const pill=document.querySelector('#uploadView .topbar .pill');if(pill)pill.textContent='Typeset formula import';
  renderLibraryMath();applyReviewMath();
  window.CFAMath={inlineToLatex,geometryToLatex,formulaHtml};
})();

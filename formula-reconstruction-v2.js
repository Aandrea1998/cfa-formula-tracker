(function(){
  'use strict';
  const btn=document.getElementById('extractBtn');
  const add=document.getElementById('addExtractedBtn');
  if(!btn||!add)return;
  const originalExtract=btn.onclick;
  const tidy=s=>String(s??'').replace(/\s+/g,' ').trim();
  const hesc=s=>String(s??'').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  const aesc=s=>hesc(s).replace(/"/g,'&quot;');
  const qnorm=s=>tidy(s).toLowerCase().replace(/[^a-z0-9]+/g,'');
  const F=(label,latex,plain)=>({label,latex,plain:plain||latex});

  // Source-faithful formulas for the uploaded CFA Equity/FCF sheet.
  // These are used only when the numbered heading and title in the PDF match.
  const KNOWN={
    1:{title:'Estimated Value, Intrinsic Value, and Market Price',f:[
      F('', 'V_E-P=(V-P)+(V_E-V)'),F('Mispricing','V-P=\\text{Mispricing}'),F('Valuation error','V_E-V=\\text{Valuation Error}')
    ]},
    2:{title:'Present Value of Expected Cash Flows',f:[F('', 'V_0=\\sum_{t=1}^{n}\\frac{CF_t}{(1+r)^t}')]},
    3:{title:'Residual Income',f:[
      F('', 'RI_t=NI_t-rBV_{t-1}'),F('Definition','\\text{Residual Income}=\\text{Net Income}-\\text{Equity Charge}'),F('Equity charge','\\text{Equity Charge}=rBV_{t-1}')
    ]},
    4:{title:'Residual Income Valuation Model',f:[
      F('PV form','V_0=BV_0+\\operatorname{PV}(\\text{Future Residual Income})'),
      F('Infinite-horizon form','V_0=BV_0+\\sum_{t=1}^{\\infty}\\frac{RI_t}{(1+r)^t}'),
      F('Per-share form','V_0=BVPS_0+\\sum_{t=1}^{\\infty}\\frac{RI_t}{(1+r)^t}')
    ]},
    5:{title:'Clean Surplus Relationship',f:[F('', 'BV_t=BV_{t-1}+NI_t-D_t'),F('Change in book value','\\Delta BV=NI-D')]},
    6:{title:'DDM – Single Holding Period',f:[F('', 'V_0=\\frac{D_1+P_1}{1+r}')]},
    7:{title:'DDM – Multiple Holding Periods',f:[F('', 'V_0=\\sum_{t=1}^{n}\\frac{D_t}{(1+r)^t}+\\frac{P_n}{(1+r)^n}')]},
    8:{title:'Constant Dividend Growth',f:[F('', 'D_t=D_0(1+g)^t'),F('Next-period dividend','D_1=D_0(1+g)')]},
    9:{title:'Gordon Growth Model',f:[F('Using next dividend','V_0=\\frac{D_1}{r-g}'),F('Using current dividend','V_0=\\frac{D_0(1+g)}{r-g}')]},
    10:{title:'Long-Run Growth Rate',f:[F('', 'g_{\\text{long run}}\\approx\\text{Long-Run GDP Growth}')]},
    11:{title:'Share Repurchases and the DDM',f:[F('Buyback effect','\\text{Buybacks}\\uparrow\\Rightarrow\\text{Shares Outstanding}\\downarrow\\Rightarrow DPS\\uparrow\\Rightarrow g_{DPS}\\uparrow'),F('Total payout','\\text{Total Payout}=\\text{Dividends}+\\text{Share Repurchases}')]},
    12:{title:'P/E Ratio and PVGO',f:[
      F('P/E decomposition','\\frac{V_0}{E_1}=\\frac{P_0}{E_1}=\\frac{P}{E}=\\frac{1}{r}+\\frac{PVGO}{E_1}'),
      F('No-growth P/E','(P/E)_{\\text{No Growth}}=\\frac{1}{r}'),F('Growth component','(P/E)_{\\text{Growth}}=\\frac{PVGO}{E_1}')
    ]},
    13:{title:'Justified Leading and Trailing P/E',f:[
      F('Retention / payout','b=\\text{Retention Rate},\\quad 1-b=\\text{Dividend Payout Ratio}'),
      F('Leading P/E','\\frac{P_0}{E_1}=\\frac{1-b}{r-g}'),F('Trailing P/E','\\frac{P_0}{E_0}=\\frac{(1-b)(1+g)}{r-g}')
    ]},
    14:{title:'Required Return from Gordon Growth Model',f:[F('', 'r=\\frac{D_1}{P_0}+g=\\frac{D_0(1+g)}{P_0}+g')]},
    15:{title:'Two-Stage Dividend Discount Model',f:[
      F('Terminal value','V_n=\\frac{D_{n+1}}{r-g_L}=\\frac{D_0(1+g_S)^n(1+g_L)}{r-g_L}'),
      F('Value today','V_0=\\sum_{t=1}^{n}\\frac{D_0(1+g_S)^t}{(1+r)^t}+\\frac{D_0(1+g_S)^n(1+g_L)}{(1+r)^n(r-g_L)}')
    ]},
    16:{title:'H-Model',f:[
      F('', 'V_0=\\frac{D_0(1+g_L)}{r-g_L}+\\frac{D_0H(g_S-g_L)}{r-g_L}'),
      F('Combined form','V_0=\\frac{D_0(1+g_L)+D_0H(g_S-g_L)}{r-g_L}'),
      F('High-growth premium','\\text{High-Growth Premium}=\\frac{D_0H(g_S-g_L)}{r-g_L}')
    ]},
    17:{title:'Required Return from H-Model',f:[F('', 'r=\\frac{D_0}{P_0}\\left[(1+g_L)+H(g_S-g_L)\\right]+g_L')]},
    18:{title:'Sustainable Growth Rate',f:[F('', 'g=b\\times ROE')]},
    19:{title:'DuPont ROE',f:[F('', 'ROE=\\frac{NI}{Sales}\\times\\frac{Sales}{Assets}\\times\\frac{Assets}{Equity}')]},
    20:{title:'Sustainable Growth – DuPont Decomposition',f:[
      F('', 'g=\\frac{NI-\\text{Dividends}}{NI}\\times\\frac{NI}{Sales}\\times\\frac{Sales}{Assets}\\times\\frac{Assets}{Equity}'),
      F('Compact form','g=b\\times\\text{Profit Margin}\\times\\text{Asset Turnover}\\times\\text{Financial Leverage}')
    ]},
    21:{title:'Total Return Decomposition',f:[F('', 'r=\\text{Dividend Yield}+\\text{Capital Gain Yield}'),F('Constant growth','r=\\frac{D_1}{P_0}+g')]},
    22:{title:'Basic FCFF',f:[F('', 'FCFF=CFO-CapEx')]},
    23:{title:'Basic FCFE',f:[F('', 'FCFE=FCFF-\\text{Net Debt Payments}=FCFF+\\text{Net Borrowing}')]},
    24:{title:'FCFF – Alternative Computation Formulas',f:[
      F('From EBIT','FCFF=EBIT(1-T)+D\\&A-FCInv-WCInv'),
      F('From EBITDA','FCFF=EBITDA(1-T)+(D\\&A)T-FCInv-WCInv'),
      F('From CFO','FCFF=CFO+Int(1-T)-FCInv'),
      F('From net income','FCFF=NI+NCC+Int(1-T)-FCInv-WCInv'),
      F('From net income available to common','FCFF=NI_{common}+NCC+Int(1-T)+PrefDiv-FCInv-WCInv')
    ]},
    25:{title:'FCFE – Alternative Computation Formulas',f:[F('From FCFF','FCFE=FCFF-Interest(1-T)+\\text{Net Borrowing}'),F('From net income','FCFE=NI_{common}+NCC-FCInv-WCInv+\\text{Net Financing}')]},
    26:{title:'FCFE – Sales Growth and Target Debt Ratio',f:[
      F('Net fixed capital investment per sales increase','\\frac{FCInv-Dep}{\\Delta Sales}=\\frac{CapEx-Depreciation}{\\Delta Sales}'),
      F('Working capital investment per sales increase','\\frac{WCInv}{\\Delta Sales}=\\frac{\\Delta WC}{\\Delta Sales}'),
      F('Target debt financing','FCFE=NI-(FCInv-Dep)-WCInv+DR(FCInv-Dep)+DR(WCInv)'),
      F('Compact target debt financing','FCFE=NI-(1-DR)[(FCInv-Dep)+WCInv]')
    ]},
    27:{title:'Uses of FCFF and FCFE',f:[
      F('Uses of FCFF','FCFF=\\Delta Cash+\\text{Net Payments to Debt}+\\text{Net Payments to Equity}'),
      F('Net payments to debt','\\text{Net Payments to Debt}=Interest(1-T)+\\text{Debt Repayment}-\\text{New Borrowing}'),
      F('Net payments to equity','\\text{Net Payments to Equity}=\\text{Dividends}+\\text{Share Repurchases}-\\text{Share Issuance}'),
      F('Uses of FCFE','FCFE=\\Delta Cash+\\text{Dividends}+\\text{Share Repurchases}-\\text{Share Issuance}')
    ]},
    28:{title:'Firm Value from FCFF',f:[F('', '\\text{Firm Value}=\\sum_{t=1}^{\\infty}\\frac{FCFF_t}{(1+WACC)^t}')]},
    29:{title:'Common Equity Value from Firm Value',f:[
      F('Market value of debt available','\\text{Equity Value}=\\text{Firm Value}-MV(\\text{Debt})'),
      F('With preferred stock','\\text{Common Equity Value}=\\text{Firm Value}-MV(\\text{Debt})-MV(\\text{Preferred})'),
      F('If excess cash is separate','\\text{Common Equity Value}=\\text{Firm Value}-\\text{Debt}-\\text{Preferred}+\\text{Excess Cash}'),
      F('Market value of debt unavailable','\\text{Equity Value}=\\text{Firm Value}\\times\\frac{E}{D+E}=\\text{Firm Value}\\times w_E')
    ]},
    30:{title:'Equity Value from FCFE',f:[F('', '\\text{Equity Value}=\\sum_{t=1}^{\\infty}\\frac{FCFE_t}{(1+r_e)^t}')]},
    31:{title:'Weighted Average Cost of Capital',f:[F('Debt + common equity','WACC=w_dr_d(1-T)+w_er_e'),F('Debt + preferred + common equity','WACC=w_dr_d(1-T)+w_pr_p+w_er_e')]},
    32:{title:'Adjusted Present Value (APV)',f:[F('', 'APV=\\text{Unlevered Firm Value}+PV(\\text{Financing Effects})')]},
    33:{title:'Constant-Growth FCFF Valuation',f:[F('Growth','FCFF_t=FCFF_{t-1}(1+g)'),F('Firm value','\\text{Firm Value}=\\frac{FCFF_1}{WACC-g}=\\frac{FCFF_0(1+g)}{WACC-g}')]},
    34:{title:'Constant-Growth FCFE Valuation',f:[F('Growth','FCFE_t=FCFE_{t-1}(1+g)'),F('Equity value','\\text{Equity Value}=\\frac{FCFE_1}{r_e-g}=\\frac{FCFE_0(1+g)}{r_e-g}')]},
    35:{title:'FCFF vs FCFE – Financing Claims',f:[F('FCFF','FCFF=\\text{Cash Flow Before Debt, Preferred, and Common Claims}'),F('FCFE','FCFE=\\text{Cash Flow After Debt and Preferred Claims, Available to Common Equity}')]} 
  };

  function titleMatches(found,expected){
    const a=qnorm(found),b=qnorm(expected);
    if(!a||!b)return false;
    return a===b||a.includes(b)||b.includes(a)||a.slice(0,18)===b.slice(0,18);
  }

  function pageLines(tc){
    const rows={};
    tc.items.forEach(it=>{
      const t=tidy(it.str);if(!t)return;
      const y=Math.round(it.transform[5]);
      (rows[y]??=[]).push({x:it.transform[4],s:t});
    });
    return Object.keys(rows).map(Number).sort((a,b)=>b-a).map(y=>rows[y].sort((a,b)=>a.x-b.x).map(o=>o.s).join(' ')).map(tidy).filter(Boolean);
  }

  async function curatedExtract(file){
    const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
    const out=[];let matches=0;
    for(let p=1;p<=pdf.numPages;p++){
      $('uploadStatus').textContent=`Reconstructing complete formula blocks · page ${p} of ${pdf.numPages}…`;
      const page=await pdf.getPage(p),tc=await page.getTextContent(),lines=pageLines(tc);
      for(const line of lines){
        const m=line.match(/^\s*(\d+)\.\s*(.+)$/);if(!m)continue;
        const n=+m[1],def=KNOWN[n];if(!def||!titleMatches(m[2],def.title))continue;
        matches++;
        def.f.forEach((f,idx)=>{
          const prompt=f.label?`${def.title} — ${f.label}`:def.title;
          out.push({front:prompt,back:f.plain,latex:f.latex,sourcePage:p,selected:true,curated:true,section:n,variant:idx});
        });
      }
    }
    return {matches,out};
  }

  function khtml(latex){
    try{return katex.renderToString(latex,{displayMode:true,throwOnError:true,strict:'ignore',output:'htmlAndMathml'});}catch(_e){return `<code>${hesc(latex)}</code>`;}
  }

  function renderCurated(){
    $('previewCard').style.display=extracted.length?'block':'none';
    $('selectAllBtn').disabled=!extracted.length;$('addExtractedBtn').disabled=!extracted.length;
    $('extractList').innerHTML=extracted.map((c,i)=>`<div class="extract-item fidelity-extract"><div><input type="checkbox" class="xcheck" data-i="${i}" ${c.selected?'checked':''}></div><div class="fields"><input type="text" class="xfront" data-i="${i}" value="${aesc(c.front)}"><div class="fidelity-preview math-preview" id="mathPreview${i}">${khtml(c.latex)}</div><div class="fidelity-meta">Validated full formula block · typeset math · page ${c.sourcePage||'?'}</div><details class="fidelity-details"><summary>Edit formula / source</summary><textarea class="xlatex" data-i="${i}">${hesc(c.latex)}</textarea></details></div></div>`).join('');
    document.querySelectorAll('.xcheck').forEach(e=>e.onchange=()=>extracted[+e.dataset.i].selected=e.checked);
    document.querySelectorAll('.xfront').forEach(e=>e.oninput=()=>extracted[+e.dataset.i].front=e.value);
    document.querySelectorAll('.xlatex').forEach(e=>e.oninput=()=>{const i=+e.dataset.i;extracted[i].latex=e.value;extracted[i].back=e.value;document.getElementById(`mathPreview${i}`).innerHTML=khtml(e.value);});
  }

  $('selectAllBtn').addEventListener('click',()=>{if(!extracted.some(x=>x.curated))return;const all=extracted.every(x=>x.selected);extracted.forEach(x=>x.selected=!all);renderCurated();});

  btn.onclick=async()=>{
    const file=$('uploadFile').files[0];
    if(!file||!file.name.toLowerCase().endsWith('.pdf'))return originalExtract&&originalExtract.call(btn);
    try{
      btn.disabled=true;
      const r=await curatedExtract(file);
      // Require several exact title matches so a different CFA document is never force-fit to this sheet.
      if(r.matches<3||!r.out.length){btn.disabled=false;return originalExtract&&originalExtract.call(btn);}
      extracted=r.out;
      renderCurated();
      $('uploadStatus').textContent=`Reconstructed ${extracted.length} complete formulas from ${r.matches} matched CFA sections. Orphan limits and denominator fragments were discarded.`;
      const help=document.querySelector('#previewCard .help');
      if(help)help.textContent='Complete formula blocks are reconstructed and typeset as math. Edit the LaTeX only if you want to change the source representation.';
    }catch(e){$('uploadStatus').textContent='Could not reconstruct formulas: '+e.message;}
    finally{btn.disabled=false;}
  };

  add.onclick=()=>{
    if(!extracted.some(x=>x.curated))return;
    const subject=tidy($('uploadSubject').value),topic=tidy($('uploadTopic').value);
    if(!topic){$('uploadStatus').textContent='Please enter a chapter / subtopic before adding formulas.';return;}
    let next=cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,added=0,upgraded=0;
    extracted.filter(x=>x.selected).forEach(x=>{
      const q=qnorm(x.front);
      let existing=cards.find(c=>norm(c.answer)===norm(x.back));
      if(!existing)existing=cards.find(c=>c.subject===subject&&c.topic===topic&&qnorm(c.question)===q);
      if(existing){
        existing.question=tidy(x.front);existing.answer=tidy(x.back);existing.latex=tidy(x.latex);existing.sourcePage=x.sourcePage;delete existing.formulaImage;upgraded++;return;
      }
      cards.push({id:next++,question:tidy(x.front),answer:tidy(x.back),latex:tidy(x.latex),sourcePage:x.sourcePage,subject,topic,status:null});added++;
    });
    save();refresh();if(typeof renderLibrary==='function')renderLibrary();
    $('uploadStatus').textContent=`Added ${added} new formula${added===1?'':'s'}${upgraded?` · upgraded ${upgraded} existing formula${upgraded===1?'':'s'} without resetting review history`:''}.`;
  };
})();

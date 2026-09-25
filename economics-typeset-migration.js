(function(){
  'use strict';

  // Canonical display-only LaTeX for the existing Economics / Economic Growth deck.
  // The underlying prompts, answer text, ids, statuses and review histories are preserved.
  const LATEX={
    1:'E(R_e)=dy+\\Delta(P/E)+i+g-\\Delta S',
    2:'\\text{EPS growth}=i+g-\\Delta S',
    3:'\\Delta S=\\mathrm{RD}-\\mathrm{NBB}',
    4:'Y=AK^{\\alpha}L^{1-\\alpha}',
    5:'\\mathrm{MPK}=\\alpha\\left(\\frac{Y}{K}\\right)=r',
    6:'\\mathrm{MPL}=(1-\\alpha)\\left(\\frac{Y}{L}\\right)=w',
    7:'\\alpha=\\frac{rK}{Y},\\qquad 1-\\alpha=\\frac{wL}{Y}',
    8:'y=\\frac{Y}{L}=Ak^{\\alpha},\\qquad k=\\frac{K}{L}',
    9:'g_Y=g_A+\\alpha g_K+(1-\\alpha)g_L',
    10:'g_{\\text{Potential GDP}}=g_{\\text{Labor Force}}+g_{\\text{Labor Productivity}}',
    11:'g_K=s\\left(\\frac{Y}{K}\\right)-\\delta',
    12:'g_k=g_K-n',
    13:'g_k=s\\left(\\frac{Y}{K}\\right)-\\delta-n',
    14:'g_y=\\theta+\\alpha g_k',
    15:'g_y=\\theta+\\alpha\\left[s\\left(\\frac{Y}{K}\\right)-\\delta-n\\right]',
    16:'g^{*}=\\frac{\\theta}{1-\\alpha}',
    17:'\\left[\\delta+n+\\frac{\\theta}{1-\\alpha}\\right]k',
    18:'\\Psi=\\frac{\\delta+n+\\frac{\\theta}{1-\\alpha}}{s}',
    19:'\\Psi=\\left(\\frac{Y}{K}\\right)^{*}',
    20:'g_k=\\frac{\\theta}{1-\\alpha}+s\\left[\\left(\\frac{Y}{K}\\right)-\\Psi\\right]',
    21:'g_y=\\frac{\\theta}{1-\\alpha}+\\alpha s\\left[\\left(\\frac{Y}{K}\\right)-\\Psi\\right]',
    22:'g_k^{*}=g_y^{*}=\\frac{\\theta}{1-\\alpha}',
    23:'g_K=g_k+n',
    24:'g_Y=g_y+n',
    25:'g_K^{*}=g_Y^{*}=n+\\frac{\\theta}{1-\\alpha}',
    26:'g_k=g_y=0',
    27:'g_K=g_Y=g_L=n',
    28:'g_k=sc-\\delta-n',
    29:'g_y=g_k=sc-\\delta-n'
  };

  let changed=0;
  try{
    if(typeof cards==='undefined'||!Array.isArray(cards))return;
    cards.forEach(c=>{
      if(c.subject!=='Economics'||c.topic!=='Economic Growth')return;
      const latex=LATEX[Number(c.id)];
      if(!latex)return;
      if(c.latex!==latex){
        c.latex=latex;
        if(c.formulaImage)delete c.formulaImage;
        changed++;
      }
    });

    if(changed){
      if(typeof save==='function')save();
      if(typeof refresh==='function')refresh();
    }

    setTimeout(()=>{
      try{if(typeof renderLibrary==='function')renderLibrary();}catch(_e){}
      try{if(typeof renderReview==='function'&&typeof reviewIds!=='undefined'&&reviewIds.length)renderReview();}catch(_e){}
    },0);

    window.CFAEconomicsTypesetMigration={changed};
  }catch(_e){}
})();

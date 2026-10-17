(function(){
  'use strict';
  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Financial Statement Analysis';
  let changed=0,added=0;

  function migratePrompt(oldQuestion,newQuestion){
    const oldCard=cards.find(c=>c.subject===SUBJECT&&c.question===oldQuestion);
    const newCard=cards.find(c=>c.subject===SUBJECT&&c.question===newQuestion);
    if(!oldCard)return;
    if(newCard&&newCard!==oldCard){
      if((!Array.isArray(newCard.history)||!newCard.history.length)&&Array.isArray(oldCard.history)&&oldCard.history.length){
        newCard.history=oldCard.history;
      }
      if(!newCard.status&&oldCard.status)newCard.status=oldCard.status;
      const oldIndex=cards.indexOf(oldCard);
      if(oldIndex>=0)cards.splice(oldIndex,1);
    }else{
      oldCard.question=newQuestion;
    }
    changed=1;
  }

  migratePrompt('Diluted EPS — Unvested RSUs and Treasury Stock Method','Unvested RSUs — Incremental Shares & Assumed Repurchases');
  migratePrompt('Equity Method vs Consolidation — ROE','ROE Comparison — Equity Method vs Consolidation (Same Ownership Interest)');
  migratePrompt('Temporal Method — FX Effect on Inventory & COGS','FIFO vs LIFO — FX Impact on Inventory & COGS');

  const optionExerciseQuestion='Exercise of Options — Journal Entry';
  const optionExerciseLatex='\\begin{aligned}\\text{Dr Cash}&=\\text{Options Exercised}\\times\\text{Strike Price}\\\\\\text{Dr SBC Reserve}&=\\text{Options Exercised}\\times\\text{Grant-Date FV}\\\\\\text{Cr Common Stock / APIC}&=\\text{Cash}+\\text{Reserve Transfer}\\end{aligned}';
  const optionExerciseAnswer='On exercise: debit cash for strike proceeds, debit the share-based compensation reserve, and credit common stock/APIC for the total.';
  let optionExerciseCard=cards.find(c=>c.subject===SUBJECT&&c.question===optionExerciseQuestion);
  if(!optionExerciseCard){
    cards.push({
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:optionExerciseQuestion,
      answer:optionExerciseAnswer,
      latex:optionExerciseLatex,
      subject:SUBJECT,
      topic:'Share-Based Compensation',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }else{
    const updates={
      answer:optionExerciseAnswer,
      latex:optionExerciseLatex,
      topic:'Share-Based Compensation'
    };
    for(const [k,v] of Object.entries(updates)){
      if(optionExerciseCard[k]!==v){optionExerciseCard[k]=v;changed=1;}
    }
  }


  const pensionFundedStatusQuestion='Pension Funded Status';
  const pensionFundedStatusLatex='\\text{Funded Status}=\\text{Fair Value of Plan Assets}-\\text{Pension Obligation}';
  const pensionFundedStatusAnswer='Funded status = fair value of plan assets − pension obligation.';
  let pensionFundedStatusCard=cards.find(c=>c.subject===SUBJECT&&c.question===pensionFundedStatusQuestion);
  if(!pensionFundedStatusCard){
    cards.push({
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:pensionFundedStatusQuestion,
      answer:pensionFundedStatusAnswer,
      latex:pensionFundedStatusLatex,
      subject:SUBJECT,
      topic:'Employee Compensation',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }else{
    const updates={
      answer:pensionFundedStatusAnswer,
      latex:pensionFundedStatusLatex,
      topic:'Employee Compensation'
    };
    for(const [k,v] of Object.entries(updates)){
      if(pensionFundedStatusCard[k]!==v){pensionFundedStatusCard[k]=v;changed=1;}
    }
  }


  const dboNetInterestQuestion='DBO — Net Interest on Net Pension Asset/Liability';
  const dboNetInterestLatex='\\text{Net Interest}=\\text{Beginning Net Pension Asset/Liability}\\times\\text{Discount Rate}';
  const dboNetInterestAnswer='For defined benefit pension accounting, net interest equals the beginning net pension asset or liability multiplied by the discount rate.';
  let dboNetInterestCard=cards.find(c=>c.subject===SUBJECT&&c.question===dboNetInterestQuestion);
  if(!dboNetInterestCard){
    cards.push({
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:dboNetInterestQuestion,
      answer:dboNetInterestAnswer,
      latex:dboNetInterestLatex,
      subject:SUBJECT,
      topic:'Employee Compensation',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }else{
    const updates={
      answer:dboNetInterestAnswer,
      latex:dboNetInterestLatex,
      topic:'Employee Compensation'
    };
    for(const [k,v] of Object.entries(updates)){
      if(dboNetInterestCard[k]!==v){dboNetInterestCard[k]=v;changed=1;}
    }
  }


  const expectedReturnPlanAssetsQuestion='Expected Return on Plan Assets — IFRS vs US GAAP';
  const expectedReturnPlanAssetsLatex='\\begin{aligned}\\text{IFRS: Expected Return on Plan Assets}&=\\text{Discount Rate}\\\\\\text{US GAAP: Expected Return on Plan Assets}&=\\text{Management Expected Return}\\end{aligned}';
  const expectedReturnPlanAssetsAnswer='IFRS uses the discount rate. US GAAP uses management’s expected return on plan assets.';
  let expectedReturnPlanAssetsCard=cards.find(c=>c.subject===SUBJECT&&c.question===expectedReturnPlanAssetsQuestion);
  if(!expectedReturnPlanAssetsCard){
    cards.push({
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:expectedReturnPlanAssetsQuestion,
      answer:expectedReturnPlanAssetsAnswer,
      latex:expectedReturnPlanAssetsLatex,
      subject:SUBJECT,
      topic:'Employee Compensation',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }else{
    const updates={
      answer:expectedReturnPlanAssetsAnswer,
      latex:expectedReturnPlanAssetsLatex,
      topic:'Employee Compensation'
    };
    for(const [k,v] of Object.entries(updates)){
      if(expectedReturnPlanAssetsCard[k]!==v){expectedReturnPlanAssetsCard[k]=v;changed=1;}
    }
  }


  const ifrsPensionOCIQuestion='IFRS Pensions — OCI Remeasurements';
  const ifrsPensionOCILatex='\\begin{aligned}\\text{Actuarial Gain/Loss}&\\rightarrow\\text{OCI}\\\\\\text{Actual Return}-\\text{Expected Return}&\\rightarrow\\text{OCI}\\end{aligned}';
  const ifrsPensionOCIAnswer='Under IFRS, actuarial gains/losses and the difference between actual and expected return on plan assets are recognized in OCI.';
  let ifrsPensionOCICard=cards.find(c=>c.subject===SUBJECT&&c.question===ifrsPensionOCIQuestion);
  if(!ifrsPensionOCICard){
    cards.push({
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:ifrsPensionOCIQuestion,
      answer:ifrsPensionOCIAnswer,
      latex:ifrsPensionOCILatex,
      subject:SUBJECT,
      topic:'Employee Compensation',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }else{
    const updates={
      answer:ifrsPensionOCIAnswer,
      latex:ifrsPensionOCILatex,
      topic:'Employee Compensation'
    };
    for(const [k,v] of Object.entries(updates)){
      if(ifrsPensionOCICard[k]!==v){ifrsPensionOCICard[k]=v;changed=1;}
    }
  }


  const ifrsPensionISQuestion='IFRS Pensions — Income Statement Components';
  const ifrsPensionISLatex='\\begin{aligned}\\text{Current Service Cost}&\\rightarrow\\text{IS: Operating Expense}\\\\\\text{Past Service Cost}&\\rightarrow\\text{IS: Operating Expense}\\\\\\text{Interest on Pension Liability}&\\rightarrow\\text{IS: Non-operating Expense}\\\\\\text{Expected Income on Plan Assets}&\\rightarrow\\text{IS: Non-operating Income}\\end{aligned}';
  const ifrsPensionISAnswer='Under IFRS, service costs are operating. Interest on the pension liability is non-operating expense, while expected income on plan assets is non-operating income.';
  let ifrsPensionISCard=cards.find(c=>c.subject===SUBJECT&&c.question===ifrsPensionISQuestion);
  if(!ifrsPensionISCard){
    cards.push({
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:ifrsPensionISQuestion,
      answer:ifrsPensionISAnswer,
      latex:ifrsPensionISLatex,
      subject:SUBJECT,
      topic:'Employee Compensation',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }else{
    const updates={
      answer:ifrsPensionISAnswer,
      latex:ifrsPensionISLatex,
      topic:'Employee Compensation'
    };
    for(const [k,v] of Object.entries(updates)){
      if(ifrsPensionISCard[k]!==v){ifrsPensionISCard[k]=v;changed=1;}
    }
  }


  const pensionIFRSGAAPQuestion='Pensions — Past Service Cost & Actuarial Gains/Losses';
  const pensionIFRSGAAPLatex='\\begin{aligned}\\text{Past Service Cost: IFRS}&\\rightarrow\\text{Immediate P\\&L}\\\\\\text{Past Service Cost: US GAAP}&\\rightarrow\\text{OCI initially, then amortized}\\\\\\text{Actuarial Gains/Losses: IFRS}&\\rightarrow\\text{OCI immediately}\\\\\\text{Actuarial Gains/Losses: US GAAP}&\\rightarrow\\text{OCI initially, then amortized}\\end{aligned}';
  const pensionIFRSGAAPAnswer='IFRS recognizes past service cost immediately in P&L and actuarial gains/losses immediately in OCI. Under US GAAP, both are initially recognized in OCI and then amortized.';
  let pensionIFRSGAAPCard=cards.find(c=>c.subject===SUBJECT&&c.question===pensionIFRSGAAPQuestion);
  if(!pensionIFRSGAAPCard){
    cards.push({
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:pensionIFRSGAAPQuestion,
      answer:pensionIFRSGAAPAnswer,
      latex:pensionIFRSGAAPLatex,
      subject:SUBJECT,
      topic:'Employee Compensation',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }else{
    const updates={
      answer:pensionIFRSGAAPAnswer,
      latex:pensionIFRSGAAPLatex,
      topic:'Employee Compensation'
    };
    for(const [k,v] of Object.entries(updates)){
      if(pensionIFRSGAAPCard[k]!==v){pensionIFRSGAAPCard[k]=v;changed=1;}
    }
  }


  const fxExposureQuestion='FX Exposure — Importer vs Exporter';
  const fxExposureLatex='\\begin{aligned}\\text{Importer: Foreign Currency}\\uparrow&\\Rightarrow\\text{Payment Cost}\\uparrow\\Rightarrow\\text{Loss}\\\\\\text{Exporter: Foreign Currency}\\downarrow&\\Rightarrow\\text{Converted Proceeds}\\downarrow\\Rightarrow\\text{Loss}\\end{aligned}';
  const fxExposureAnswer='Importer loses when the foreign currency strengthens. Exporter loses when the foreign currency weakens.';
  let fxExposureCard=cards.find(c=>c.subject===SUBJECT&&c.question===fxExposureQuestion);
  if(!fxExposureCard){
    cards.push({
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:fxExposureQuestion,
      answer:fxExposureAnswer,
      latex:fxExposureLatex,
      subject:SUBJECT,
      topic:'Multinational Operations',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }else{
    const updates={
      answer:fxExposureAnswer,
      latex:fxExposureLatex,
      topic:'Multinational Operations'
    };
    for(const [k,v] of Object.entries(updates)){
      if(fxExposureCard[k]!==v){fxExposureCard[k]=v;changed=1;}
    }
  }


  const currentMethodREQuestion='Retained Earnings — Current Method Translation';
  const currentMethodRELatex='\\begin{aligned}\\text{Ending RE}&=\\text{Prior translated RE}\\\\&\\quad+\\text{Translated NI}\\\\&\\quad-\\text{Translated Dividends}\\end{aligned}';
  const currentMethodREAnswer='Ending RE = prior translated RE + translated NI - translated dividends.';
  if(!cards.some(card=>card.subject===SUBJECT&&card.question===currentMethodREQuestion)){
    cards.push({
      id:cards.reduce((m,card)=>Math.max(m,+card.id||0),0)+1,
      question:currentMethodREQuestion,
      answer:currentMethodREAnswer,
      latex:currentMethodRELatex,
      subject:SUBJECT,
      topic:'Multinational Operations',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }



  const currentRateRulesQuestion='Current Rate Method — Translation Rates & CTA';
  const currentRateRulesLatex='\\begin{aligned}\\text{Assets/Liabilities}&\\rightarrow\\text{Current Rate}\\\\\\text{Common Stock/APIC}&\\rightarrow\\text{Historical Rate}\\\\\\text{Revenue/Expenses}&\\rightarrow\\text{Average Rate}\\\\\\text{Dividends}&\\rightarrow\\text{Historical Rate}\\\\\\text{Translation Difference}&\\rightarrow\\text{OCI}\\end{aligned}';
  const currentRateRulesAnswer='Current method: assets/liabilities use current rate; common stock/APIC and dividends use historical rates; revenue/expenses use average rate; translation difference goes to OCI.';
  if(!cards.some(card=>card.subject===SUBJECT&&card.question===currentRateRulesQuestion)){
    cards.push({
      id:cards.reduce((m,card)=>Math.max(m,+card.id||0),0)+1,
      question:currentRateRulesQuestion,
      answer:currentRateRulesAnswer,
      latex:currentRateRulesLatex,
      subject:SUBJECT,
      topic:'Multinational Operations',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }


  const temporalRatesQuestion='Temporal Method — Translation Rates';
  const temporalRatesLatex='\\begin{aligned}\\text{Monetary A/L}&\\rightarrow\\text{Current Rate}\\\\\\text{Non-monetary @ Hist. Cost}&\\rightarrow\\text{Historical Rate}\\\\\\text{Non-monetary @ Current Value}&\\rightarrow\\text{Rate at Valuation Date}\\\\\\text{Stockholders\' Equity}&\\rightarrow\\text{Historical Rate}\\\\\\text{Revenue/Expenses}&\\rightarrow\\text{Transaction / Average Rate}\\\\\\text{COGS, D\\&A, Amortization}&\\rightarrow\\text{Rate of Related Asset}\\end{aligned}';
  const temporalRatesAnswer='Temporal method: monetary items use current rates; historical-cost non-monetary items and equity use historical rates; current-value non-monetary items use the valuation-date rate; revenue/expenses use transaction or average rates; COGS, D&A, and amortization use the rate of the related asset.';
  if(!cards.some(card=>card.subject===SUBJECT&&card.question===temporalRatesQuestion)){
    cards.push({
      id:cards.reduce((m,card)=>Math.max(m,+card.id||0),0)+1,
      question:temporalRatesQuestion,
      answer:temporalRatesAnswer,
      latex:temporalRatesLatex,
      subject:SUBJECT,
      topic:'Multinational Operations',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }


  const temporalFXInventoryQuestion='FIFO vs LIFO — FX Impact on Inventory & COGS';
  const temporalFXInventoryLatex='\\begin{aligned}\\text{FIFO, FC}\\uparrow&\\Rightarrow\\text{Ending Inv.}\\uparrow,\\;\\text{COGS}\\downarrow\\\\\\text{FIFO, FC}\\downarrow&\\Rightarrow\\text{Ending Inv.}\\downarrow,\\;\\text{COGS}\\uparrow\\\\\\text{LIFO, FC}\\uparrow&\\Rightarrow\\text{Ending Inv.}\\downarrow,\\;\\text{COGS}\\uparrow\\\\\\text{LIFO, FC}\\downarrow&\\Rightarrow\\text{Ending Inv.}\\uparrow,\\;\\text{COGS}\\downarrow\\end{aligned}';
  const temporalFXInventoryAnswer='FIFO uses more recent inventory layers; LIFO uses older inventory layers. FC appreciation raises amounts translated at more recent/higher FX rates; FC depreciation reverses the effect.';
  if(!cards.some(card=>card.subject===SUBJECT&&card.question===temporalFXInventoryQuestion)){
    cards.push({
      id:cards.reduce((m,card)=>Math.max(m,+card.id||0),0)+1,
      question:temporalFXInventoryQuestion,
      answer:temporalFXInventoryAnswer,
      latex:temporalFXInventoryLatex,
      subject:SUBJECT,
      topic:'Multinational Operations',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }


  const ias29RestatementQuestion='IAS 29 — Hyperinflation Restatement Factors';
  const ias29RestatementLatex='\\begin{aligned}\\text{Monetary A/L}&\\rightarrow\\text{No Restatement}\\\\\\text{Non-monetary @ Hist. Cost}&\\rightarrow\\frac{GPI_{Closing}}{GPI_{Acquisition}}\\\\\\text{Non-monetary @ Revalued Amount}&\\rightarrow\\frac{GPI_{Closing}}{GPI_{Revaluation}}\\\\\\text{Stockholders\' Equity}&\\rightarrow\\frac{GPI_{Closing}}{GPI_{Beginning/Contribution}}\\\\\\text{Income Statement}&\\rightarrow\\frac{GPI_{Closing}}{GPI_{Average}}\\\\\\text{Net Monetary Gain/Loss}&\\rightarrow\\text{Net Income}\\end{aligned}';
  const ias29RestatementAnswer='IAS 29: restate non-monetary items, equity, and income-statement items into closing purchasing power. Monetary items are not restated; the resulting purchasing-power gain/loss is recognized in net income.';
  if(!cards.some(card=>card.subject===SUBJECT&&card.question===ias29RestatementQuestion)){
    cards.push({
      id:cards.reduce((m,card)=>Math.max(m,+card.id||0),0)+1,
      question:ias29RestatementQuestion,
      answer:ias29RestatementAnswer,
      latex:ias29RestatementLatex,
      subject:SUBJECT,
      topic:'Multinational Operations',
      status:null,
      history:[]
    });
    added++;
    changed=1;
  }


  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }

  window.CFAAddedFSACards={added,changed};
})();

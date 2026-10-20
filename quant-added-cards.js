(function(){
  'use strict';
  if(typeof cards==='undefined'||!Array.isArray(cards))return;

  const SUBJECT='Quantitative Methods';
  const question='Multiple Linear Regression — Core Assumptions';
  const latex='\\begin{aligned}1.&\\ \\text{Linearity}\\\\2.&\\ \\text{Homoskedasticity: constant residual variance}\\\\3.&\\ \\text{Independent errors: residuals uncorrelated}\\\\4.&\\ \\text{Normality: residuals normally distributed}\\\\5.&\\ \\text{Independent variables: non-random + no exact linear relation}\\end{aligned}';
  const answer='Multiple linear regression assumptions: linearity; homoskedastic residuals; independent/uncorrelated errors; normally distributed residuals; independent variables are non-random and have no exact linear relationship with one another.';

  let changed=0;
  let card=cards.find(c=>c.subject===SUBJECT&&c.question===question);
  if(!card){
    card={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question,
      answer,
      latex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(card);
    changed=1;
  }else{
    if(card.answer!==answer){card.answer=answer;changed=1;}
    if(card.latex!==latex){card.latex=latex;changed=1;}
    if(card.topic!=='Multiple Linear Regression'){card.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(card.history)){card.history=[];changed=1;}
  }


  const adjustedR2Question='Adjusted R² — Formula & Adding a Variable';
  const adjustedR2Latex='\\begin{aligned}\\bar R^2&=1-\\left[\\frac{n-1}{n-k-1}(1-R^2)\\right]\\\\k\\ge1&\\Rightarrow R^2>\\bar R^2\\\\|t|>1&\\Rightarrow \\bar R^2\\uparrow\\\\|t|<1&\\Rightarrow \\bar R^2\\downarrow\\end{aligned}';
  const adjustedR2Answer='Adjusted R² = 1 − [(n−1)/(n−k−1)](1−R²). With at least one regressor, R² > adjusted R². When adding a variable, |t| > 1 increases adjusted R²; |t| < 1 decreases it. Adjusted R² can be negative, while R² cannot be below zero.';

  let adjustedR2Card=cards.find(c=>c.subject===SUBJECT&&c.question===adjustedR2Question);
  if(!adjustedR2Card){
    adjustedR2Card={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:adjustedR2Question,
      answer:adjustedR2Answer,
      latex:adjustedR2Latex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(adjustedR2Card);
    changed=1;
  }else{
    if(adjustedR2Card.answer!==adjustedR2Answer){adjustedR2Card.answer=adjustedR2Answer;changed=1;}
    if(adjustedR2Card.latex!==adjustedR2Latex){adjustedR2Card.latex=adjustedR2Latex;changed=1;}
    if(adjustedR2Card.topic!=='Multiple Linear Regression'){adjustedR2Card.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(adjustedR2Card.history)){adjustedR2Card.history=[];changed=1;}
  }


  const r2Question='R² — Goodness of Fit';
  const r2Latex='\\begin{aligned}R^2&=\\frac{SSR}{SST}\\\\&=\\frac{\\sum_{i=1}^{n}(\\hat Y_i-\\bar Y)^2}{\\sum_{i=1}^{n}(Y_i-\\bar Y)^2}\\end{aligned}';
  const r2Answer='R² measures goodness of fit: the proportion of total variation in Y explained by the regression. R² = SSR/SST = Σ(Ŷᵢ−Ȳ)² / Σ(Yᵢ−Ȳ)².';
  let r2Card=cards.find(c=>c.subject===SUBJECT&&c.question===r2Question);
  if(!r2Card){
    r2Card={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:r2Question,
      answer:r2Answer,
      latex:r2Latex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(r2Card);
    changed=1;
  }else{
    if(r2Card.answer!==r2Answer){r2Card.answer=r2Answer;changed=1;}
    if(r2Card.latex!==r2Latex){r2Card.latex=r2Latex;changed=1;}
    if(r2Card.topic!=='Multiple Linear Regression'){r2Card.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(r2Card.history)){r2Card.history=[];changed=1;}
  }

  const fStatQuestion='F-Statistic — Overall Model Significance';
  const fStatLatex='\\begin{aligned}F&=\\frac{MSR}{MSE}\\\\&=\\frac{SSR/k}{SSE/(n-k-1)}\\\\&=\\frac{R^2/k}{(1-R^2)/(n-k-1)}\\end{aligned}';
  const fStatAnswer='The F-statistic tests whether the regression is useful overall: H₀: β₁ = β₂ = … = βₖ = 0. F = MSR/MSE = (SSR/k)/(SSE/(n−k−1)) = (R²/k)/[(1−R²)/(n−k−1)].';
  let fStatCard=cards.find(c=>c.subject===SUBJECT&&c.question===fStatQuestion);
  if(!fStatCard){
    fStatCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:fStatQuestion,
      answer:fStatAnswer,
      latex:fStatLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(fStatCard);
    changed=1;
  }else{
    if(fStatCard.answer!==fStatAnswer){fStatCard.answer=fStatAnswer;changed=1;}
    if(fStatCard.latex!==fStatLatex){fStatCard.latex=fStatLatex;changed=1;}
    if(fStatCard.topic!=='Multiple Linear Regression'){fStatCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(fStatCard.history)){fStatCard.history=[];changed=1;}
  }


  const aicBicQuestion='AIC vs BIC — Model Selection';
  const aicBicLatex='\\begin{aligned}\\mathrm{AIC}&\\rightarrow\\text{Prediction purposes}\\\\\\mathrm{BIC}&\\rightarrow\\text{Best goodness of fit}\\\\\\text{Choose}&\\rightarrow\\text{Lower relative value}\\\\\\text{Absolute value}&\\rightarrow\\text{Meaningless alone}\\end{aligned}';
  const aicBicAnswer='AIC is preferred for prediction purposes; BIC is preferred when best goodness of fit is desired. Compare relative values across candidate models with the same dependent variable; lower is preferred. Absolute AIC/BIC values alone are not meaningful.';
  let aicBicCard=cards.find(c=>c.subject===SUBJECT&&c.question===aicBicQuestion);
  if(!aicBicCard){
    aicBicCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:aicBicQuestion,
      answer:aicBicAnswer,
      latex:aicBicLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(aicBicCard);
    changed=1;
  }else{
    if(aicBicCard.answer!==aicBicAnswer){aicBicCard.answer=aicBicAnswer;changed=1;}
    if(aicBicCard.latex!==aicBicLatex){aicBicCard.latex=aicBicLatex;changed=1;}
    if(aicBicCard.topic!=='Multiple Linear Regression'){aicBicCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(aicBicCard.history)){aicBicCard.history=[];changed=1;}
  }


  const restrictedFQuestion='F-Test — Restricted vs Unrestricted Model';
  const restrictedFLatex='\\begin{aligned}F&=\\frac{(SSE_R-SSE_U)/q}{SSE_U/(n-k-1)}\\\\q&=\\text{number of restrictions (variables omitted in the restricted model)}\\end{aligned}';
  const restrictedFAnswer='Use the restricted-vs-unrestricted F-test for joint restrictions: F = [(SSE_R − SSE_U)/q] / [SSE_U/(n−k−1)]. Here q is the number of restrictions, i.e. the number of variables omitted from the restricted model relative to the unrestricted model.';
  let restrictedFCard=cards.find(c=>c.subject===SUBJECT&&c.question===restrictedFQuestion);
  if(!restrictedFCard){
    restrictedFCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:restrictedFQuestion,
      answer:restrictedFAnswer,
      latex:restrictedFLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(restrictedFCard);
    changed=1;
  }else{
    if(restrictedFCard.answer!==restrictedFAnswer){restrictedFCard.answer=restrictedFAnswer;changed=1;}
    if(restrictedFCard.latex!==restrictedFLatex){restrictedFCard.latex=restrictedFLatex;changed=1;}
    if(restrictedFCard.topic!=='Multiple Linear Regression'){restrictedFCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(restrictedFCard.history)){restrictedFCard.history=[];changed=1;}
  }


  const modelSpecQuestion='Proper Regression Model Specification — Principles';
  const modelSpecLatex='\\begin{aligned}1.&\\ \\text{Grounded in economic reasoning}\\\\2.&\\ \\text{Parsimonious}\\\\3.&\\ \\text{Performs well out of sample}\\\\4.&\\ \\text{Appropriate functional form}\\\\5.&\\ \\text{Satisfies regression assumptions}\\end{aligned}';
  const modelSpecAnswer='Grounded in economic reasoning; parsimonious; performs well out of sample; appropriate functional form; satisfies regression assumptions.';
  let modelSpecCard=cards.find(c=>c.subject===SUBJECT&&c.question===modelSpecQuestion);
  if(!modelSpecCard){
    modelSpecCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:modelSpecQuestion,
      answer:modelSpecAnswer,
      latex:modelSpecLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(modelSpecCard);
    changed=1;
  }else{
    if(modelSpecCard.answer!==modelSpecAnswer){modelSpecCard.answer=modelSpecAnswer;changed=1;}
    if(modelSpecCard.latex!==modelSpecLatex){modelSpecCard.latex=modelSpecLatex;changed=1;}
    if(modelSpecCard.topic!=='Multiple Linear Regression'){modelSpecCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(modelSpecCard.history)){modelSpecCard.history=[];changed=1;}
  }


  const functionalFormQuestion='Regression Functional Form — Misspecifications';
  const functionalFormLatex='\\begin{aligned}1.&\\ \\text{Omitted variables}\\\\2.&\\ \\text{Inappropriate form}\\\\3.&\\ \\text{Variable scaling}\\\\4.&\\ \\text{Data pooling}\\end{aligned}';
  const functionalFormAnswer='Omitted variables; inappropriate form; variable scaling; data pooling.';
  let functionalFormCard=cards.find(c=>c.subject===SUBJECT&&c.question===functionalFormQuestion);
  if(!functionalFormCard){
    functionalFormCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:functionalFormQuestion,
      answer:functionalFormAnswer,
      latex:functionalFormLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(functionalFormCard);
    changed=1;
  }else{
    if(functionalFormCard.answer!==functionalFormAnswer){functionalFormCard.answer=functionalFormAnswer;changed=1;}
    if(functionalFormCard.latex!==functionalFormLatex){functionalFormCard.latex=functionalFormLatex;changed=1;}
    if(functionalFormCard.topic!=='Multiple Linear Regression'){functionalFormCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(functionalFormCard.history)){functionalFormCard.history=[];changed=1;}
  }


  const bpQuestion='Breusch–Pagan Test — Conditional Heteroskedasticity';
  const bpLatex='\\begin{aligned}\\chi^2_{BP,k}&=nR^2\\\\H_0&:\\text{No conditional heteroskedasticity}\\\\H_a&:\\text{At least one }a_j\\neq0\\\\&\\text{Right-tailed test}\\end{aligned}';
  const bpAnswer='Breusch–Pagan: regress squared residuals on the regressors, then use χ² = nR². H₀: no conditional heteroskedasticity; Hₐ: at least one coefficient ≠ 0. Right-tailed test.';
  let bpCard=cards.find(c=>c.subject===SUBJECT&&c.question===bpQuestion);
  if(!bpCard){
    bpCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:bpQuestion,
      answer:bpAnswer,
      latex:bpLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(bpCard);
    changed=1;
  }else{
    if(bpCard.answer!==bpAnswer){bpCard.answer=bpAnswer;changed=1;}
    if(bpCard.latex!==bpLatex){bpCard.latex=bpLatex;changed=1;}
    if(bpCard.topic!=='Multiple Linear Regression'){bpCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(bpCard.history)){bpCard.history=[];changed=1;}
  }


  const serialCorrQuestion='Serial Correlation — Impact on Coefficients & Standard Errors';
  const serialCorrLatex='\\begin{aligned}\\text{No lagged }Y&:\\quad \\beta\\text{ estimates valid},\\ SE\\text{ invalid}\\\\\\text{Lagged }Y&:\\quad \\beta\\text{ estimates invalid},\\ SE\\text{ invalid}\\end{aligned}';
  const serialCorrAnswer='With serial correlation: if no lagged dependent variable is included, coefficient estimates remain valid but standard errors are invalid. If a lagged dependent variable is included, both coefficient estimates and standard errors are invalid.';
  let serialCorrCard=cards.find(c=>c.subject===SUBJECT&&c.question===serialCorrQuestion);
  if(!serialCorrCard){
    serialCorrCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:serialCorrQuestion,
      answer:serialCorrAnswer,
      latex:serialCorrLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(serialCorrCard);
    changed=1;
  }else{
    if(serialCorrCard.answer!==serialCorrAnswer){serialCorrCard.answer=serialCorrAnswer;changed=1;}
    if(serialCorrCard.latex!==serialCorrLatex){serialCorrCard.latex=serialCorrLatex;changed=1;}
    if(serialCorrCard.topic!=='Multiple Linear Regression'){serialCorrCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(serialCorrCard.history)){serialCorrCard.history=[];changed=1;}
  }


  const dwBgQuestion='Serial Correlation — Durbin–Watson vs Breusch–Godfrey';
  const dwBgLatex='\\begin{aligned}\\mathrm{DW}\\approx2&\\Rightarrow\\text{No serial correlation}\\\\\\mathrm{DW}<2&\\Rightarrow\\text{Positive serial correlation}\\\\\\mathrm{DW}>2&\\Rightarrow\\text{Negative serial correlation}\\\\\\mathrm{DW}&:\\ \\text{No lagged }Y\\text{ / first-order only}\\\\\\mathrm{BG}&:\\ \\text{Low statistic + high }p\\text{-value preferred}\\end{aligned}';
  const dwBgAnswer='DW ≈ 2: no serial correlation; DW < 2: positive serial correlation; DW > 2: negative serial correlation. DW: no lagged Y / first-order only. BG: low statistic + high p-value preferred.';
  let dwBgCard=cards.find(c=>c.subject===SUBJECT&&c.question===dwBgQuestion);
  if(!dwBgCard){
    dwBgCard=cards.find(c=>c.subject===SUBJECT&&c.question==='Serial Correlation Tests — DW vs BG');
    if(dwBgCard){dwBgCard.question=dwBgQuestion;changed=1;}
  }
  if(!dwBgCard){
    dwBgCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:dwBgQuestion,
      answer:dwBgAnswer,
      latex:dwBgLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(dwBgCard);
    changed=1;
  }else{
    if(dwBgCard.answer!==dwBgAnswer){dwBgCard.answer=dwBgAnswer;changed=1;}
    if(dwBgCard.latex!==dwBgLatex){dwBgCard.latex=dwBgLatex;changed=1;}
    if(dwBgCard.topic!=='Multiple Linear Regression'){dwBgCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(dwBgCard.history)){dwBgCard.history=[];changed=1;}
  }


  const vifQuestion='VIF — Multicollinearity';
  const vifLatex='\\begin{aligned}VIF_j&=\\frac{1}{1-R_j^2}\\\\VIF=1&\\Rightarrow\\text{No multicollinearity}\\\\VIF>5&\\Rightarrow\\text{Investigate}\\\\VIF>10&\\Rightarrow\\text{Serious multicollinearity}\\end{aligned}';
  const vifAnswer='VIF_j = 1/(1−R_j²). VIF = 1 means no multicollinearity; VIF > 5 warrants investigation; VIF > 10 indicates serious multicollinearity.';
  let vifCard=cards.find(c=>c.subject===SUBJECT&&c.question===vifQuestion);
  if(!vifCard){
    vifCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:vifQuestion,
      answer:vifAnswer,
      latex:vifLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(vifCard);
    changed=1;
  }else{
    if(vifCard.answer!==vifAnswer){vifCard.answer=vifAnswer;changed=1;}
    if(vifCard.latex!==vifLatex){vifCard.latex=vifLatex;changed=1;}
    if(vifCard.topic!=='Multiple Linear Regression'){vifCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(vifCard.history)){vifCard.history=[];changed=1;}
  }


  const highLeverageQuestion='High Leverage — Influential Point Rule';
  const highLeverageLatex='\\begin{aligned}h_{ii}&>\\frac{3(k+1)}{n}\\\\&\\Rightarrow\\text{Potentially influential / high leverage point}\\end{aligned}';
  const highLeverageAnswer='A point is potentially influential (high leverage) if h_ii > 3(k+1)/n.';
  let highLeverageCard=cards.find(c=>c.subject===SUBJECT&&c.question===highLeverageQuestion);
  if(!highLeverageCard){
    highLeverageCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:highLeverageQuestion,
      answer:highLeverageAnswer,
      latex:highLeverageLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(highLeverageCard);
    changed=1;
  }else{
    if(highLeverageCard.answer!==highLeverageAnswer){highLeverageCard.answer=highLeverageAnswer;changed=1;}
    if(highLeverageCard.latex!==highLeverageLatex){highLeverageCard.latex=highLeverageLatex;changed=1;}
    if(highLeverageCard.topic!=='Multiple Linear Regression'){highLeverageCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(highLeverageCard.history)){highLeverageCard.history=[];changed=1;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
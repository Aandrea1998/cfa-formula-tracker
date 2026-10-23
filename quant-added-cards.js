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


  const studentizedQuestion='Studentized Residuals — Outlier Rule';
  const studentizedLatex='\\begin{aligned}|t_i^*|&>3\\Rightarrow\\text{Flag as outlier}\\\\|t_i^*|&>t_{crit}(n-k-2)\\Rightarrow\\text{Potentially influential outlier}\\end{aligned}';
  const studentizedAnswer='Studentized residual rule: |t_i*| > 3 flags an observation as an outlier. If |t_i*| exceeds the critical t-value with n−k−2 degrees of freedom, flag it as potentially influential.';
  let studentizedCard=cards.find(c=>c.subject===SUBJECT&&c.question===studentizedQuestion);
  if(!studentizedCard){
    studentizedCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:studentizedQuestion,
      answer:studentizedAnswer,
      latex:studentizedLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(studentizedCard);
    changed=1;
  }else{
    if(studentizedCard.answer!==studentizedAnswer){studentizedCard.answer=studentizedAnswer;changed=1;}
    if(studentizedCard.latex!==studentizedLatex){studentizedCard.latex=studentizedLatex;changed=1;}
    if(studentizedCard.topic!=='Multiple Linear Regression'){studentizedCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(studentizedCard.history)){studentizedCard.history=[];changed=1;}
  }


  const logitQuestion='Logistic Regression — Log-Odds & Probability';
  const logitLatex='\\begin{aligned}\\ln\\left(\\frac{P}{1-P}\\right)&=b_0+b_1X_1+\\cdots+b_kX_k\\\\P&=\\frac{1}{1+\\exp[-(b_0+b_1X_1+\\cdots+b_kX_k)]}\\end{aligned}';
  const logitAnswer='Logit: ln[P/(1−P)] = b₀ + b₁X₁ + … + bₖXₖ. Event probability: P = 1 / {1 + exp[−(b₀ + b₁X₁ + … + bₖXₖ)]}.';
  let logitCard=cards.find(c=>c.subject===SUBJECT&&c.question===logitQuestion);
  if(!logitCard){
    logitCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:logitQuestion,
      answer:logitAnswer,
      latex:logitLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(logitCard);
    changed=1;
  }else{
    if(logitCard.answer!==logitAnswer){logitCard.answer=logitAnswer;changed=1;}
    if(logitCard.latex!==logitLatex){logitCard.latex=logitLatex;changed=1;}
    if(logitCard.topic!=='Multiple Linear Regression'){logitCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(logitCard.history)){logitCard.history=[];changed=1;}
  }


  const arResidualQuestion='AR Model — Residual Autocorrelation Test';
  const arResidualLatex='\\begin{aligned}SE(\\hat\\rho_k)&\\approx\\frac{1}{\\sqrt{n}}\\\\t_k&=\\frac{\\hat\\rho_k}{SE(\\hat\\rho_k)}\\\\|t_k|>t_{crit}&\\Rightarrow\\text{Significant residual autocorrelation}\\\\|t_k|\\le t_{crit}&\\Rightarrow\\text{No significant residual autocorrelation}\\end{aligned}';
  const arResidualAnswer='For each lag k in an AR model: SE(ρ̂_k) ≈ 1/√n and t_k = ρ̂_k/SE(ρ̂_k). Compare |t_k| with the critical t-value. Significant residual autocorrelation suggests model misspecification.';
  let arResidualCard=cards.find(c=>c.subject===SUBJECT&&c.question===arResidualQuestion);
  if(!arResidualCard){
    arResidualCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:arResidualQuestion,
      answer:arResidualAnswer,
      latex:arResidualLatex,
      subject:SUBJECT,
      topic:'Time Series Analysis',
      status:null,
      history:[]
    };
    cards.push(arResidualCard);
    changed=1;
  }else{
    if(arResidualCard.answer!==arResidualAnswer){arResidualCard.answer=arResidualAnswer;changed=1;}
    if(arResidualCard.latex!==arResidualLatex){arResidualCard.latex=arResidualLatex;changed=1;}
    if(arResidualCard.topic!=='Time Series Analysis'){arResidualCard.topic='Time Series Analysis';changed=1;}
    if(!Array.isArray(arResidualCard.history)){arResidualCard.history=[];changed=1;}
  }


  const meanRevQuestion='AR(1) — Mean-Reverting Level';
  const meanRevLatex='\\begin{aligned}x_{t+1}&=b_0+b_1x_t\\\\x^*&=\\frac{b_0}{1-b_1}\\\\x_t>x^*&\\Rightarrow\\text{Tends to fall}\\\\x_t<x^*&\\Rightarrow\\text{Tends to rise}\\end{aligned}';
  const meanRevAnswer='For AR(1), x_{t+1}=b₀+b₁x_t. The mean-reverting level is x* = b₀/(1−b₁). Above x* the series tends to fall; below x* it tends to rise.';
  let meanRevCard=cards.find(c=>c.subject===SUBJECT&&c.question===meanRevQuestion);
  if(!meanRevCard){
    meanRevCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:meanRevQuestion,
      answer:meanRevAnswer,
      latex:meanRevLatex,
      subject:SUBJECT,
      topic:'Time Series Analysis',
      status:null,
      history:[]
    };
    cards.push(meanRevCard);
    changed=1;
  }else{
    if(meanRevCard.answer!==meanRevAnswer){meanRevCard.answer=meanRevAnswer;changed=1;}
    if(meanRevCard.latex!==meanRevLatex){meanRevCard.latex=meanRevLatex;changed=1;}
    if(meanRevCard.topic!=='Time Series Analysis'){meanRevCard.topic='Time Series Analysis';changed=1;}
    if(!Array.isArray(meanRevCard.history)){meanRevCard.history=[];changed=1;}
  }


  const rmseQuestion='RMSE — Out-of-Sample Forecast Accuracy';
  const rmseLatex='\\begin{aligned}RMSE&=\\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}(Y_i-\\hat Y_i)^2}\\\\\\text{Lower RMSE}&\\Rightarrow\\text{More accurate forecast}\\end{aligned}';
  const rmseAnswer='RMSE = sqrt[(1/n)Σ(Yᵢ−Ŷᵢ)²]. It measures out-of-sample forecast error; lower RMSE means better forecasting accuracy.';
  let rmseCard=cards.find(c=>c.subject===SUBJECT&&c.question===rmseQuestion);
  if(!rmseCard){
    rmseCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:rmseQuestion,
      answer:rmseAnswer,
      latex:rmseLatex,
      subject:SUBJECT,
      topic:'Time Series Analysis',
      status:null,
      history:[]
    };
    cards.push(rmseCard);
    changed=1;
  }else{
    if(rmseCard.answer!==rmseAnswer){rmseCard.answer=rmseAnswer;changed=1;}
    if(rmseCard.latex!==rmseLatex){rmseCard.latex=rmseLatex;changed=1;}
    if(rmseCard.topic!=='Time Series Analysis'){rmseCard.topic='Time Series Analysis';changed=1;}
    if(!Array.isArray(rmseCard.history)){rmseCard.history=[];changed=1;}
  }


  const dfQuestion='Dickey–Fuller Test — Unit Root';
  const dfLatex='\\begin{aligned}\\Delta x_t&=b_0+\\gamma_1x_{t-1}+\\varepsilon_t\\\\\\gamma_1&=b_1-1\\\\H_0:\\gamma_1=0&\\Leftrightarrow b_1=1\\Rightarrow\\text{Unit root / nonstationary}\\\\H_a:\\gamma_1<0&\\Leftrightarrow b_1<1\\Rightarrow\\text{Stationary}\\\\t_{DF}<CV_{DF}&\\Rightarrow\\text{Reject }H_0\\end{aligned}';
  const dfAnswer='Dickey–Fuller unit-root test: Δx_t = b₀ + γ₁x_{t−1} + ε_t, with γ₁ = b₁−1. H₀: γ₁=0 (b₁=1) ⇒ unit root/nonstationary. Hₐ: γ₁<0 ⇒ stationary. Reject H₀ when the DF test statistic is more negative than the Dickey–Fuller critical value.';
  let dfCard=cards.find(c=>c.subject===SUBJECT&&c.question===dfQuestion);
  if(!dfCard){
    dfCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:dfQuestion,
      answer:dfAnswer,
      latex:dfLatex,
      subject:SUBJECT,
      topic:'Time Series Analysis',
      status:null,
      history:[]
    };
    cards.push(dfCard);
    changed=1;
  }else{
    if(dfCard.answer!==dfAnswer){dfCard.answer=dfAnswer;changed=1;}
    if(dfCard.latex!==dfLatex){dfCard.latex=dfLatex;changed=1;}
    if(dfCard.topic!=='Time Series Analysis'){dfCard.topic='Time Series Analysis';changed=1;}
    if(!Array.isArray(dfCard.history)){dfCard.history=[];changed=1;}
  }


  const maqQuestion='MA(q) Model — Formula';
  const maqLatex='\\begin{aligned}y_t&=\\mu+\\varepsilon_t+\\theta_1\\varepsilon_{t-1}+\\theta_2\\varepsilon_{t-2}+\\cdots+\\theta_q\\varepsilon_{t-q}\\\\q&=\\text{number of past shocks included}\\end{aligned}';
  const maqAnswer='MA(q): y_t = μ + ε_t + θ₁ε_{t−1} + … + θ_qε_{t−q}. Current value depends on the mean, today’s shock, and q past shocks weighted by θ.';
  let maqCard=cards.find(c=>c.subject===SUBJECT&&c.question===maqQuestion);
  if(!maqCard){
    maqCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:maqQuestion,
      answer:maqAnswer,
      latex:maqLatex,
      subject:SUBJECT,
      topic:'Time Series Analysis',
      status:null,
      history:[]
    };
    cards.push(maqCard);
    changed=1;
  }else{
    if(maqCard.answer!==maqAnswer){maqCard.answer=maqAnswer;changed=1;}
    if(maqCard.latex!==maqLatex){maqCard.latex=maqLatex;changed=1;}
    if(maqCard.topic!=='Time Series Analysis'){maqCard.topic='Time Series Analysis';changed=1;}
    if(!Array.isArray(maqCard.history)){maqCard.history=[];changed=1;}
  }


  const forecastErrorQuestion='Forecast Error > Regression Standard Error — Sources';
  const forecastErrorLatex='\\begin{aligned}\\text{Forecast error larger than regression SE}\\\\\\Rightarrow\\text{Model error and/or Sampling error}\\end{aligned}';
  const forecastErrorAnswer='If the realized forecast error is larger than the regression standard error, possible sources include model error and sampling error.';
  let forecastErrorCard=cards.find(c=>c.subject===SUBJECT&&c.question===forecastErrorQuestion);
  if(!forecastErrorCard){
    forecastErrorCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:forecastErrorQuestion,
      answer:forecastErrorAnswer,
      latex:forecastErrorLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(forecastErrorCard);
    changed=1;
  }else{
    if(forecastErrorCard.answer!==forecastErrorAnswer){forecastErrorCard.answer=forecastErrorAnswer;changed=1;}
    if(forecastErrorCard.latex!==forecastErrorLatex){forecastErrorCard.latex=forecastErrorLatex;changed=1;}
    if(forecastErrorCard.topic!=='Multiple Linear Regression'){forecastErrorCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(forecastErrorCard.history)){forecastErrorCard.history=[];changed=1;}
  }


  const multicollinearitySolutionsQuestion='Multicollinearity — Possible Solutions';
  const multicollinearitySolutionsLatex='\\begin{aligned}1.&\\ \\text{Remove one or more correlated regressors}\\\\2.&\\ \\text{Use a different proxy}\\\\3.&\\ \\text{Increase sample size}\\end{aligned}';
  const multicollinearitySolutionsAnswer='Possible remedies for multicollinearity: exclude one or more correlated explanatory variables, use a different proxy for a variable, or increase the sample size.';
  let multicollinearitySolutionsCard=cards.find(c=>c.subject===SUBJECT&&c.question===multicollinearitySolutionsQuestion);
  if(!multicollinearitySolutionsCard){
    multicollinearitySolutionsCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:multicollinearitySolutionsQuestion,
      answer:multicollinearitySolutionsAnswer,
      latex:multicollinearitySolutionsLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(multicollinearitySolutionsCard);
    changed=1;
  }else{
    if(multicollinearitySolutionsCard.answer!==multicollinearitySolutionsAnswer){multicollinearitySolutionsCard.answer=multicollinearitySolutionsAnswer;changed=1;}
    if(multicollinearitySolutionsCard.latex!==multicollinearitySolutionsLatex){multicollinearitySolutionsCard.latex=multicollinearitySolutionsLatex;changed=1;}
    if(multicollinearitySolutionsCard.topic!=='Multiple Linear Regression'){multicollinearitySolutionsCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(multicollinearitySolutionsCard.history)){multicollinearitySolutionsCard.history=[];changed=1;}
  }


  const typeErrorsQuestion='Hypothesis Testing — Type I vs Type II Error';
  const typeErrorsLatex='\\begin{aligned}\\text{Type I error }(\\alpha)&:\\quad\\text{Reject a true }H_0\\\\\\text{Type II error }(\\beta)&:\\quad\\text{Fail to reject a false }H_0\\end{aligned}';
  const typeErrorsAnswer='Type I (α): reject H₀ when H₀ is true = false positive. Type II (β): fail to reject H₀ when H₀ is false = false negative.';
  let typeErrorsCard=cards.find(c=>c.subject===SUBJECT&&c.question===typeErrorsQuestion);
  if(!typeErrorsCard){
    typeErrorsCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:typeErrorsQuestion,
      answer:typeErrorsAnswer,
      latex:typeErrorsLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(typeErrorsCard);
    changed=1;
  }else{
    if(typeErrorsCard.answer!==typeErrorsAnswer){typeErrorsCard.answer=typeErrorsAnswer;changed=1;}
    if(typeErrorsCard.latex!==typeErrorsLatex){typeErrorsCard.latex=typeErrorsLatex;changed=1;}
    if(typeErrorsCard.topic!=='Multiple Linear Regression'){typeErrorsCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(typeErrorsCard.history)){typeErrorsCard.history=[];changed=1;}
  }


  const logitInterpretationQuestion='Logistic Regression — Intercept & Slope Interpretation';
  const logitInterpretationLatex='\\begin{aligned}\\beta_0&=\\log(\\text{odds})\\quad\\text{when }X_1=\\cdots=X_k=0\\\\\\beta_j&=\\text{change in log-odds for a 1-unit increase in }X_j\\\\&\\quad\\text{holding all other variables constant}\\end{aligned}';
  const logitInterpretationAnswer='Intercept β₀: log-odds of the event when all independent variables equal 0. Slope βⱼ: change in log-odds for a 1-unit increase in Xⱼ, holding all other variables constant.';
  let logitInterpretationCard=cards.find(c=>c.subject===SUBJECT&&c.question===logitInterpretationQuestion);
  if(!logitInterpretationCard){
    logitInterpretationCard={
      id:cards.reduce((m,c)=>Math.max(m,+c.id||0),0)+1,
      question:logitInterpretationQuestion,
      answer:logitInterpretationAnswer,
      latex:logitInterpretationLatex,
      subject:SUBJECT,
      topic:'Multiple Linear Regression',
      status:null,
      history:[]
    };
    cards.push(logitInterpretationCard);
    changed=1;
  }else{
    if(logitInterpretationCard.answer!==logitInterpretationAnswer){logitInterpretationCard.answer=logitInterpretationAnswer;changed=1;}
    if(logitInterpretationCard.latex!==logitInterpretationLatex){logitInterpretationCard.latex=logitInterpretationLatex;changed=1;}
    if(logitInterpretationCard.topic!=='Multiple Linear Regression'){logitInterpretationCard.topic='Multiple Linear Regression';changed=1;}
    if(!Array.isArray(logitInterpretationCard.history)){logitInterpretationCard.history=[];changed=1;}
  }

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
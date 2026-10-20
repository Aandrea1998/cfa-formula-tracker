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

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
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

  if(changed){
    try{if(typeof save==='function')save();}catch(_e){}
  }
})();
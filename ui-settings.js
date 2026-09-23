(function(){
  const THEME_KEY='cfa_ui_theme';
  const DENSITY_KEY='cfa_ui_density';
  let theme=localStorage.getItem(THEME_KEY)||'dark';
  let density=localStorage.getItem(DENSITY_KEY)||'comfortable';

  function apply(){
    document.body.classList.toggle('theme-light',theme==='light');
    document.body.classList.toggle('compact-mode',density==='compact');
    document.querySelectorAll('[data-ui-theme]').forEach(b=>{
      b.textContent=theme==='light'?'☀ Light':'☾ Dark';
      b.title='Switch between light and dark theme';
      b.setAttribute('aria-label',`Theme: ${theme}. Click to switch.`);
    });
    document.querySelectorAll('[data-ui-density]').forEach(b=>{
      b.textContent=density==='compact'?'▦ Compact':'▤ Normal';
      b.title='Switch between normal and compact layout';
      b.setAttribute('aria-label',`Layout density: ${density}. Click to switch.`);
    });
  }

  function toggleTheme(){
    theme=theme==='light'?'dark':'light';
    localStorage.setItem(THEME_KEY,theme);
    apply();
  }
  function toggleDensity(){
    density=density==='compact'?'comfortable':'compact';
    localStorage.setItem(DENSITY_KEY,density);
    apply();
  }
  function controls(cls){
    const box=document.createElement('div');
    box.className=cls;
    if(cls==='ui-settings'){
      const label=document.createElement('div');
      label.className='ui-settings-label';
      label.textContent='Display';
      box.appendChild(label);
    }
    const row=document.createElement('div');
    row.className='ui-settings-row';
    const themeBtn=document.createElement('button');
    themeBtn.className='ui-setting-btn';
    themeBtn.dataset.uiTheme='1';
    themeBtn.onclick=toggleTheme;
    const densityBtn=document.createElement('button');
    densityBtn.className='ui-setting-btn';
    densityBtn.dataset.uiDensity='1';
    densityBtn.onclick=toggleDensity;
    row.append(themeBtn,densityBtn);
    box.appendChild(row);
    return box;
  }

  const sidebar=document.querySelector('.sidebar');
  const footer=sidebar&&sidebar.querySelector('.footer-note');
  if(sidebar){
    const box=controls('ui-settings');
    footer?sidebar.insertBefore(box,footer):sidebar.appendChild(box);
  }
  document.body.appendChild(controls('ui-mobile-settings'));
  apply();
})();

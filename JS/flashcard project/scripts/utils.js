export function addThemeActionListener(){
  document.addEventListener('click', (event) => {
    if (event.target.closest('.js-theme-button')){
      console.log(document.documentElement.className);
      document.documentElement.classList.toggle('dark');
      if (localStorage.theme==='dark') { localStorage.theme = ''; }
      else { localStorage.theme = 'dark'; }
      
      
    }
  });
}

export function checkSystemPreferences(){
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
}
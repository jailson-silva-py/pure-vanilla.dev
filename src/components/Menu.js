import { changeMenuState } from "/contraints/customEvents.js";

export class Menu extends HTMLElement {
  iconMoon = null;
  iconSun = null;
  darkMode = true;
  openMenu = false;

  constructor() {
    super();
    this.innerHTML = `
        <nav>
        <ul class="menu">
        <li>
            <div class="flex-col profile-name-content">
            <span>Dev Jailson S.</span>
            <div class="profile-name-description center-center">
            <span>Full Stack</span>
            </div>
            </div>
        </li>

        <li class="item-btns-menu-container">
            <!--Botão com ícone sun / moon aqui -->
            <button>
            <div id="icon-menu">
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
            </div>
            </button>
            <ul class="hidden dropdown-menu">
            <li><btn-goto-view text="Introdução" goto="introduction"></btn-goto-view></li>
            <li><btn-goto-view text="Projetos" goto="projects"></btn-goto-view></li>
            <li><btn-goto-view text="Stack" goto="stack"></btn-goto-view></li>
            <li><btn-goto-view text="Contato" goto="contact"></btn-goto-view></li>
            <li><btn-goto-view text="Curiosidades" goto="curiosities"></btn-goto-view></li>
            </ul>
        </li>
        </ul>
        </nav>
        `
        //Verificação de tema correto e alteração nos elementos de acordo com.
        const darkModeStorage = localStorage.getItem("darkMode");
        console.log(darkModeStorage)
        const darkModeValue = darkModeStorage ? JSON.parse(darkModeStorage):null;
        if (darkModeValue === null) {
          console.log("Não há darkMode value");
          localStorage.setItem("darkMode", JSON.stringify(this.darkMode));
        }
        this.darkMode = darkModeValue;
        const incorrectMode = this.darkMode ? "light-mode" : "dark-mode";
        const isIncorrectModeTheme = document.documentElement.classList.contains(incorrectMode);
        if (isIncorrectModeTheme) {
          const correctMode = this.darkMode ? "dark-mode":"light-mode";
          document.documentElement.classList.replace(incorrectMode, correctMode);
        }
        console.log(this.darkMode, darkModeValue)
        

    /**handle para realizar a animação de abertura e fechadura do menu @param isOpenAnimation */
    const handleAnimationMenu = (isOpenAnimation) => {

      const lines = Array.from(this.querySelectorAll(".line-1, .line-2, .line-3"));
      if (lines.length <= 0) {
        console.error("Linhas não achadas no array!");
      }
      const animations = [{transform:"translate(0, 7px) rotate(45deg)" }];
      const animationsVisibility = [{opacity:0, display:"block"}]
      const animateOptions = {duration:500, fill:"both", easing:"ease-in"};
    
      if (isOpenAnimation) {
      lines[0].animate(animations, animateOptions);
      animations[0].transform = "translate(0, -7px) rotate(-45deg)";
      lines[1].animate(animationsVisibility, animateOptions)
      lines[2].animate(animations, animateOptions);
      return
    }
      animations[0] = {left:"0", top:"0", position:"static", transform:"translate(0) rotate(0)"}
      animationsVisibility[0] = {display:"block", opacity:1}
      lines[0].animate(animations, animateOptions);
      lines[1].animate(animationsVisibility, animateOptions)
      lines[2].animate(animations, animateOptions);

  }

    const moonSvg = '<svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>'
    const sunSvg = '<svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun preview-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
    const domParser = new DOMParser();
    this.iconMoon = domParser.parseFromString(moonSvg, "image/svg+xml").documentElement;
    this.iconSun = domParser.parseFromString(sunSvg, "image/svg+xml").documentElement;

    const buttonDarkLight = document.createElement("button");
    const buttonMenu = this.querySelector("button:has(#icon-menu)");
    console.log(buttonMenu)
    buttonDarkLight.appendChild(this.darkMode ? this.iconMoon : this.iconSun);
    const adjacentButton = document.querySelector(".item-btns-menu-container > button");
    adjacentButton.insertAdjacentElement("beforebegin", buttonDarkLight);


    buttonDarkLight.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.darkMode) {
  
        try {
          buttonDarkLight.replaceChild(this.iconSun, this.iconMoon);
          this.darkMode = false;
          document.documentElement.classList.replace("dark-mode", "light-mode");
          localStorage.setItem("darkMode", JSON.stringify(this.darkMode))

        } catch(e) {
          console.error("Erro ao trocar a class 'dark-mode' por 'light-mode' ", e);
        }
        return
      }

      try {
          buttonDarkLight.replaceChild(this.iconMoon, this.iconSun);
          this.darkMode = true;
          document.documentElement.classList.replace("light-mode", "dark-mode");
          localStorage.setItem("darkMode", JSON.stringify(this.darkMode))

        } catch(e) {
          console.error("Erro ao trocar a class 'dark-mode' por 'light-mode' ", e);
      }

    })


    const dropdownMenu = this.querySelector(".dropdown-menu");

    buttonMenu.addEventListener("click", (e) => {
  
      e.preventDefault();
      const eventChangeMenu = new CustomEvent(changeMenuState, {bubbles:true, cancelable:true});
      this.dispatchEvent(eventChangeMenu);

    })


    document.addEventListener(changeMenuState, (e) => {
      e.preventDefault();
      if (!this.openMenu) {
        handleAnimationMenu(true);
        this.openMenu = true;
        dropdownMenu.classList.remove("hidden");
        return
      }
  
      handleAnimationMenu(false);
      this.openMenu = false;
      dropdownMenu.classList.add("hidden");

    })

  }
}
import { changeMenuState } from "/contraints/customEvents.js";

export class BtnGoToInView extends HTMLElement {
  button = null;
  constructor() {
    super();
    const text = this.getAttribute("text");
    this.button = document.createElement("button");
    this.button.textContent = text;
    this.appendChild(this.button);

  }

  connectedCallback() {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    if (!dropdownMenu) {
      console.error("O dropdown menu não foi encontrado, veja se está utilizando a classe correta ou está presente no DOM!");
      return
    }
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      const isNotAboutPage = !location.href.endsWith("/about.html");
      if (isNotAboutPage) {
        location.replace("/about.html");
        return
        
      }
      const goTo = this.getAttribute("goto");
      const goToElement = document.querySelector(`#${goTo}`);
      const buttonGoToElement = document.querySelector(`li:has(#${goTo}) button`);
      
      //Verificar se o elemento não tá oculto para aí sim poder clicar nele.
      const isHiddenGoTo = goToElement.classList.contains("hidden");
      if (isHiddenGoTo) {
        buttonGoToElement.click();
      }
      goToElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
      const changeMenuEvent = new CustomEvent(changeMenuState, {cancelable:true, bubbles:true});
      this.dispatchEvent(changeMenuEvent);

    })
  }

}
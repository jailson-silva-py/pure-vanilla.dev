import { changeBuildLogs, changeDisabledBuildLog } from "/contraints/customEvents.js";

export class DeployPanel extends HTMLElement {

  isLoading = false;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="deploy-panel-container">
      <div class="deploy-panel-header">
        <div class="icon-text-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="very-small-icon"><path d="M15 6a9 9 0 0 0-9 9V3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/></svg>
        <span>master</span>
      </div>
      <div class="icon-text-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="small-icon"><circle cx="12" cy="12" r="3"/><line x1="3" x2="9" y1="12" y2="12"/><line x1="15" x2="21" y1="12" y2="12"/></svg>
        <span>2o43a1</span>
        <span class="deploy-commit-title" lang="en">realease: add full-stack dev(me)</span>
      </div>
      </div>
      
      <div class="deploy-preview-content">
        <div class="icon-text-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="small-icon"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
          <span>No preview </span>
        </div>
      </div>
      <button class="btn-deploy">
        <span>Deploy</span>
      </button>
    </div>
        `
    const button = document.querySelector(".btn-deploy");
    if (!button) {
      console.error("Botão de deploy não encontrado! Verifique se a classe está correta ou se está presente no DOM!");
      return;
    }

    const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader preview-icon"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>`
    const domParser = new DOMParser();
    const svg = domParser.parseFromString(svgText, "image/svg+xml").documentElement;
    svg.classList.add("animate-spin");
    button.addEventListener("click", (e) => {

      e.preventDefault();
      const span = button.querySelector("span");
      if (!span) {
        console.error("Span com que contém o texto 'Deploy não encontrado. Verifique se está no DOM'");
        return
      }
      if (!this.isLoading) {

        button.classList.add("disabled");
        button.replaceChild(svg, span);
        setTimeout(() => {
          this.isLoading = false;
          button.replaceChild(span, svg);
          button.classList.remove("disabled");
          navigation.navigate("/about.html", {history:"replace"});
        }, 12000)
        this.isLoading = true;
        const btnBuildLOgs = document.querySelector("#build-log-btn");
        if (!btnBuildLOgs) {
          console.error("Botão build logs da seção logs não encontrado, impossível navegar para...");
          return;
        }
        const activateBuildLogEvent = new CustomEvent(changeDisabledBuildLog, {bubbles:true, cancelable:true});

        this.dispatchEvent(activateBuildLogEvent)
        btnBuildLOgs.click()
      }
      

    })

  }

}
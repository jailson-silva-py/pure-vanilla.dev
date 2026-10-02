import { getDateFormater } from "/src/utils/dateFormatter.js";
import { buildLogs } from "/constraints/deployLogs.js";
import { changeBuildLogs, changeDisabledBuildLog } from "/constraints/customEvents.js";

export class BuildLogs extends HTMLElement {

  arrowSvg = null;
  isOpen = false; 
  isDisabled = true;

  constructor() {
    super();
    const svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right preview-icon"><path d="m9 18 6-6-6-6"/></svg>'
    const domParser = new DOMParser();
    const svg = domParser.parseFromString(svgString, "image/svg+xml");
    this.svg = svg.documentElement;

    this.innerHTML = `
        <ul id="build-logs-container">
        <li>
        <button id="build-log-btn" class="icon-text-container hook-button disabled">
        ${this.svg.outerHTML}
        <span>Build Logs</span>
        </button>
        <div id="build-log-content" class="hidden">
        </div>
        </li>
        <li>
        <button id="deployment-summary-btn" class="icon-text-container hook-button disabled">
        ${this.svg.outerHTML}
        <span>Deployment Sumary</span>
        </button>
        </li>
        <li>
        <button id="deployment-checks-btn" class="icon-text-container hook-button disabled">
        ${this.svg.outerHTML}
        <span>Deployment Checks</span>
        </button>
        </li>
        <li>
        <button id="assigning-custom-domains-btn" class="icon-text-container hook-button disabled">
        ${this.svg.outerHTML}
        <span>Assigning Custom Domains</span>
        </button>
        </li>
        </ul>
        `
  }

  connectedCallback() {

    const buttonElements = document.querySelectorAll(".icon-text-container.hook-button");
    const buttons = buttonElements ? Array.from(buttonElements) : null

    if (!buttons) {
      console.error("Os botões do build não foram encontrados. Verifique se a classe está correta ou se está presente no DOM");
      return
    }


      const button = this.querySelector("#build-log-btn");
      const svg = button.querySelector("svg");
      if (!svg) {
        console.error("Ícone arrow não encontrado dentro do botão.")
        return
      }

      button.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isDisabled) return;
        const changeBuildLogsEvent = new CustomEvent(changeBuildLogs, {bubbles:true, cancelable:true})
        if (!this.isOpen) {
          svg.classList.add("rotate-90");
          this.isOpen = true;
          e.target.dispatchEvent(changeBuildLogsEvent);
          return
        }
        svg.classList.remove("rotate-90")
        this.isOpen = false;
        e.target.dispatchEvent(changeBuildLogsEvent);

      })

    

    const buildLogContent = document.querySelector("#build-log-content");

    if (!buildLogContent) {
      console.error("O content do build log não foi encotrado, verifique se o id está correto ou se está presente no DOM");
      return;
    }
      async function typeLogs() {
        const sleep = (ms) =>  new Promise((resolve, _) => setTimeout(resolve, ms));
        for (let i = 0; i < buildLogs.length; i++) {
          const currObj =  buildLogs[i];
          const p = document.createElement("p");
          p.classList.add(currObj.type);
          const currText = currObj.text;
          buildLogContent.appendChild(p);
          p.textContent = getDateFormater()+" "
          for (let l = 0; l < currText.length; l++) {
            const currC = currText[l];
            p.textContent += currC;
            await sleep(10);
          }
    
          if (currObj.type === "error") {
            await sleep(500);
          }
        }
     

    }

    document.addEventListener(changeDisabledBuildLog, () => {
      this.isDisabled = !this.isDisabled;
      const hasClassDisabled = button.classList.contains("disabled");
      if (this.isDisabled) {
        if (hasClassDisabled) return;
        button.classList.add("disabled");
        return
      }
      if (!hasClassDisabled) return;
      button.classList.remove("disabled");
      

    })


    document.addEventListener(changeBuildLogs, (e) => {
      e.preventDefault();
      if (this.isOpen) {
        buildLogContent.classList.remove("hidden");
        if (!buildLogContent.innerHTML.trim()) {
          typeLogs();
        }
        return;
      }
      buildLogContent.classList.add("hidden");

    })
  
  }


}

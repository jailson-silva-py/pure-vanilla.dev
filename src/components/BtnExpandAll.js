import { folderChange, foldersMaximizeAll, foldersMinimizeAll } from "/contraints/customEvents.js";

export class BtnExpandAll extends HTMLElement {

  constructor() {
    super();
    const button = document.createElement("button");
    button.classList.add("btn-expand-all", "hook-button");
    button.textContent = "Expand all"
    this.innerHTML= ``;
    this.appendChild(button)
    
    let maximizeAll = true;

    document.addEventListener(folderChange, (e) => {

      const {isOpenedFolders} = e.detail;
      const maximizedAll = isOpenedFolders.every(v => v.isOpen);
   
      if (maximizedAll) {
        maximizeAll = false;
        button.textContent = "Minimize all";
        return
      }

      maximizeAll = true;
      button.textContent = "Expand all";

    })
  
    button.addEventListener("click", (e) => {
      e.preventDefault();

      if (maximizeAll) {
        const maximizeAllEvent = new CustomEvent(foldersMaximizeAll, {bubbles:true, composed:true});
        this.dispatchEvent(maximizeAllEvent);
        maximizeAll = false;
        button.textContent = "Minimize all";
        return;
      }
      const minimizeAllEvent = new CustomEvent(foldersMinimizeAll, {bubbles:true});
      this.dispatchEvent(minimizeAllEvent);
      maximizeAll = true;
      button.textContent = "Expand all";

    })
  }

}
export class BtnExpandAll extends HTMLElement {

  constructor() {
    super();
    let isExpandable = true;
    this.innerHTML = `
      <button class="btn-expand-all hook-button">${isExpandable ? "Expand all": "Minimize-all"}</button>
    `
    
    this.addEventListener("click", (e) => {
      e.preventDefault()
      const listFolders = document.querySelectorAll(".hook-button");

      let indexExpandAll = -1;
      for (let i = 0;i < listFolders.length; i++) {
        const el = listFolders[i];
        const container = el.parentElement;
        const folderContent = container.querySelector(".folder-content");
        if (!el) continue;
        if (el.classList.contains("btn-expand-all")) {
          indexExpandAll = i;
          continue
        };
        if (!folderContent) continue;
        isExpandable ? folderContent.classList.remove("hidden"):folderContent.classList.add("hidden");
        }
      const BtnExpandAll = listFolders[indexExpandAll];
      if (!BtnExpandAll) {
        console.error("Expand-all não encontrado")
        return
      }
      if (isExpandable) {
        BtnExpandAll.innerText = "Minimize all";
      } else {
        BtnExpandAll.innerText = "Expand all";
      }
      isExpandable = !isExpandable;
      console.log(isExpandable)
    })
  }

}
import { folderChange, foldersMaximizeAll, foldersMinimizeAll } from "/contraints/customEvents.js";

export class Folders extends HTMLElement {
  _folders = [];
  isOpenedFolders = [];
  openFolderSvg = null;
  folderSvg = null;
  arrowSvg = null;
  constructor() {
    super();
    this.innerHTML = `
      <ul class="folders-content"></ul>
      `
    const domParser = new DOMParser();
    const arrowSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right preview-icon"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>`
    const folderSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder preview-icon"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`
    const openFolderSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-open preview-icon"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>`
    const folderSvg = domParser.parseFromString(folderSvgString, "image/svg+xml").documentElement;
    const openFolderSvg = domParser.parseFromString(openFolderSvgString, "image/svg+xml").documentElement;
    const arrowSvg = domParser.parseFromString(arrowSvgString, "image/svg+xml").documentElement;
    folderSvg.setAttribute("id", "folder-svg");
    openFolderSvg.setAttribute("id", "open-folder-svg")
    this.arrowSvg = arrowSvg;
    this.openFolderSvg = openFolderSvg;
    this.folderSvg = folderSvg;
  }

  get folders() {
    return this._folders
  }

  set folders(value) {
    if (Array.isArray(value)) {
      this._folders = value;
    }
  }

  getOpenedFolder(tag) {
      const result = this.isOpenedFolders.find(thisValue => thisValue.tag === tag);
      return result
  }
  /***@param {String} tag  A tag alvo da alteração no array  @param {boolean} isOpenValue O novo valor pro isOpen do alvo*/
  setIsOpenedFolder(tag, isOpenValue) {
    this.isOpenedFolders.forEach((thisValue) => {
      if (thisValue.tag !== tag) return;
      thisValue.isOpen = isOpenValue;
    })
  }

  /*** Seta o isOpen de todas as 'pastas' para o valor desejado.
   * @param {boolean} state O estado do 'isOpen' a ser setado.
   */
  setStateAllOpenedFolders (state) {
    this.isOpenedFolders.forEach((thisState) => {
      thisState.isOpen = state;
    })
  }

  static get observedAttributes() {

    return ["folders-json"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "folders-json" && newValue) {
      try {
        this._folders = JSON.parse(newValue);

        this.render();
      } catch (e) {
        console.error("Erro ao transformar a string em JSON: ", e);
      }
    }

  }

  render() {
    const ul = this.querySelector(".folders-content");
    if (!ul) {
      console.error("Elemento folders container não encontrado!");
      return
    }

    /** 
      * @param {HTMLButtonElement} button O botão que aciona o evento de abrir e fechar a pasta
      * @param {boolean} condition Se verdadeiro 'abre' a pasta e se falso 'fecha' 
      * @param {String} tag A tag do elemento que vai ser 'aberto' ou 'fechado' (um Web Component)
      *  */
    const handleChangeFolder = (button, condition, tag) => {
      if (condition) {
        const folderSvg = button.querySelector("#folder-svg");
        if (!folderSvg) return;
        button.replaceChild(this.openFolderSvg.cloneNode(true), folderSvg);
        const customTag = this.querySelector(`${tag} > .folder-content`);
        customTag.classList.remove("hidden");
      } else {
        const openFolderSvg = button.querySelector("#open-folder-svg");
        if(!openFolderSvg) return
        button.replaceChild(this.folderSvg.cloneNode(true), openFolderSvg);
        if (tag) {
          const customTag = this.querySelector(`${tag} > .folder-content`);
          customTag.classList.add("hidden");
        }
      }
    }
    //Relaciona e renderiza cada nome com a tag customizada passada para content
    this.folders.map(({ name, contentTags: contentTag }) => {


      const folderChangeEvent = new CustomEvent(folderChange, { bubbles: true, detail: { tag: contentTag, isOpenedFolders: this.isOpenedFolders } });

      const li = document.createElement("li");
      const button = document.createElement("button");
      const titleFolder = document.createElement("span");

      titleFolder.textContent = name;
      titleFolder.classList.add("folder-title");
      button.classList.add("icon-text-container", "hook-button");
      li.appendChild(button)
      this.isOpenedFolders.push({ isOpen:false, tag: contentTag, button });
      if (contentTag) {
        const customTagContent = document.createElement(contentTag);
        const folderContentElement = customTagContent
        folderChangeEvent.detail.folderContentElement = folderContentElement;
        li.appendChild(customTagContent);
      }
      ul.appendChild(li);
      button.appendChild(this.arrowSvg.cloneNode(true));
      button.appendChild(this.folderSvg.cloneNode(true));
      button.appendChild(titleFolder);


      button.addEventListener('click', (e) => {

        e.preventDefault();
        this.dispatchEvent(folderChangeEvent);

      })

      //Executa quando uma pasta é clickada (porque o onclick aciona) serve pra escutar em outros elementos também.
      this.addEventListener(folderChange, (e) => {

        if (e.detail.tag !== contentTag) return;
        const isOpen = this.getOpenedFolder(contentTag).isOpen;
            this.setIsOpenedFolder(contentTag, !isOpen);
        folderChangeEvent.detail.isOpenedFolders = this.isOpenedFolders;
        handleChangeFolder(button, !isOpen, contentTag);
   

      })
    })

    document.addEventListener(foldersMinimizeAll, (e) => {
   
      this.isOpenedFolders.map((isOpenedFolder) => {

        handleChangeFolder(isOpenedFolder.button, false, isOpenedFolder.tag);
        this.setStateAllOpenedFolders(false);
      
      })
      
    })

    document.addEventListener(foldersMaximizeAll, (e) => {
  
      this.isOpenedFolders.map((isOpenedFolder) => {

        handleChangeFolder(isOpenedFolder.button, true, isOpenedFolder.tag);
        this.setStateAllOpenedFolders(true);
   
      })
    })

  }
}
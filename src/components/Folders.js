export class Folders extends HTMLElement {
    _folders = []
    constructor() {
      super();
      this.innerHTML  = `
      <ul class="folders-content"></ul>
      `
    }

    get folders() {
      return this._folders
    }

    set folders(value) {
      if (Array.isArray(value)) {
        this._folders = value;
      }
    }

    static get observedAttributes() {
  
      return ["folders-json"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "folders-json" && newValue) {
        try {
          this._folders = JSON.parse(newValue);
      
          this.render();
        } catch(e) {
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
    
      const domParser = new DOMParser();
      const arrowSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right preview-icon"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>`
      const folderSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder preview-icon"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`
      const openFolderSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-open preview-icon"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>`
      this.folders.map(({name, contentTags}) => {
  
        const li = document.createElement("li");
        const button = document.createElement("button");
        const titleFolders = document.createElement("span");
        const folderSvg = domParser.parseFromString(folderSvgString, "image/svg+xml").documentElement;
        const openFolderSvg = domParser.parseFromString(openFolderSvgString, "image/svg+xml").documentElement;
        const arrowSvg = domParser.parseFromString(arrowSvgString, "image/svg+xml").documentElement;

        titleFolders.textContent = name;
        titleFolders.classList.add("folder-title");
        button.classList.add("icon-text-container", "hook-button");
      
     

        li.appendChild(button);
        if (contentTags) {
          const customTagContent = document.createElement(contentTags);
          li.appendChild(customTagContent);
        }
        ul.appendChild(li);
        button.appendChild(arrowSvg);
        button.appendChild(folderSvg);
        button.appendChild(titleFolders);

        let isOpen = false;

        button.addEventListener('click', (e) => {
          e.preventDefault();
       
          if (!isOpen) {
            button.replaceChild(openFolderSvg, folderSvg);
            if (contentTags) {
            const customTag = this.querySelector(`${contentTags} > .folder-content`);
              customTag.classList.remove("hidden");
            }
            isOpen = true;
          } else {
            
            button.replaceChild(folderSvg, openFolderSvg);
            if (contentTags) {
              const customTag = this.querySelector(`${contentTags} > .folder-content`);
              customTag.classList.add("hidden");
            }
            isOpen = false;
          }
    
        })
        
       
      })

    }


}
export class StackComponent extends HTMLElement {
    description = "";
    constructor() {
        super();
        const children = Array.from(this.childNodes);
        const container = document.createElement("div")
        container.classList.add("stack-item");
        const containerTitle = document.createElement("div")

        containerTitle.classList.add("icon-text-container");
        children.forEach((child) => {
            containerTitle.appendChild(child);
        })
        container.appendChild(containerTitle);
        this.appendChild(container);
    }

    connectedCallback() {
        
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = new String(value);
    }

    static get observedAttributes() {
        return ["description"];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if (name=="description" && newValue) {
            try {
            this.description = newValue;
            this.render();
            } catch(e) {
              console.error("Ocorreu um erro ao setar description", e);
            }
        }
    }

    render() {

      const el = this.querySelector(".stack-item");
      if (!el) return;
      const span = document.createElement("span");
      span.classList.add("stack-item-description");
      span.innerText = this.description;
      el.appendChild(span);
      
    }
}

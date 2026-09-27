export class BuildLogs extends HTMLElement {
    _items = [];
    constructor() {
        super();
        this.innerHTML = `
        <ul id="build-logs-container">
        <slot><slot>
        </ul>
        `
    }


    get items() {
      return this._items;
    }

    set items(value) {
      if (Array.isArray(value)) {
        this._items = value;
        this.render();
      }
    }

    static get observedAttributes() {
      console.log("get atributes")
      return ["items-json"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log("attribute change")
      if (name === "items-json" && newValue) {
        console.log("dentro da callback")
        try {
        this._items = JSON.parse(newValue);
        this.render();
        } catch {
          console.error("Erro ao desestruturar o json do componente")
          console.log(this._items)
          console.log(JSON.parse(newValue));
        }
      }
    }

    render() {
      const ul = this.querySelector("#build-logs-container");

      if (!ul) {
        console.error("A lista não foi encontrada");
        return;
      }

      this.items.map(item => {

        const li = document.createElement("li");
        const button = document.createElement("button");
        button.classList.add("icon-text-container", "hook-button");
        const svg = document.createElement("svg");
        const span = document.createElement("span");
      
        span.textContent = item
         
        svg.setHTMLUnsafe('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right preview-icon"><path d="m9 18 6-6-6-6"/></svg>')
        button.appendChild(svg);
        button.appendChild(span);
        
        button.addEventListener("click",(e) =>  {
          e.preventDefault();
          console.log("no on click")
          const isRotate = svg.classList.contains("rotate-90") 
          if (!isRotate) {
            svg.classList.add("rotate-90");
            return
          }
          svg.classList.remove("rotate-90")
          
        })

        button.addEventListener("auxclick",(e) =>  {
          e.preventDefault();
          console.log("no mouse leave")
          const isRotate = svg.classList.contains("rotate-90") 
          if (!isRotate) {
            return
          }
          svg.classList.remove("rotate-90")
        })
      
        li.appendChild(button);
        ul.appendChild(li);
        
      })
     
        
      // const html = this._items.map(item => `
      //   <li>
      //   <button class="icon-text-container build-logs-button">
      //   
      //   <span>${item}</span>
      //   <button>
      //   </li>
      //   `).join('');
      // console.log(html)
      // ul.innerHTML = html;
    }
}
 
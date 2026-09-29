export class ProjectItemComponent extends HTMLElement {

  _itemTitle = "";
  _urlVideo = "";
  _urlDemo = "";
  _urlGithub = "";

  constructor() {

    super();
    this.innerHTML = `
        <li class="project-item">
        </li>
        `
  }

  get title() {
    return this._itemTitle;
  }
  set title(newValue) {
    this._itemTitle = new String(newValue);
  }
  get urlVideo() {
    return this._urlVideo;
  }
  set urlVideo(newValue) {
    this._urlVideo = new String(newValue);
  }

  get urlGithub() {
    return this._urlGithub;
  }
  set urlGithub(value) {
    this._urlGithub = new String(value)
  }

  get urlDemo() {
    return this._urlDemo;
  }
  set urlDemo(value) {
    this._urlDemo= new String(value)
  }

  static get observedAttributes() {
    return ["title", "url-video", "url-github", "url-demo"];
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue) {
      try {
        switch(name) {
          case "title":
            this.title = newValue;
            break;
          case "url-video":
            this.urlVideo = newValue;
            break;
          case "url-github":
            this.urlGithub = newValue;
            break;
          case "url-demo":
            this.urlDemo = newValue; 
            break;
        }
      }
      catch (e) {
        console.error("Erro ao setar o atributo: ", name, " ", e);
      }
    }

  }

  render() {

    const el = this.querySelector(".project-item");
    if (!el) return;
    const spanTitle = document.createElement("span");
    spanTitle.classList.add("project-item-title");
    spanTitle.textContent = this.title;

    const video = document.createElement("video");
    video.setAttribute("loading", "lazy");
    video.setAttribute("autoplay", true);
    video.setAttribute("playsinline", true);
    video.setAttribute("muted", true);
    video.setAttribute("nofullscreen", true);
    video.setAttribute("loop", true);

    const source = document.createElement("source");
    source.setAttribute("src", this.urlVideo);

    const linkDemo = document.createElement("a");
    linkDemo.setAttribute("href", this.urlDemo);
    linkDemo.textContent = this.urlDemo;

    const textDemo = document.createElement("span");
    const linkGithub = document.createElement("a");
    linkGithub.setAttribute("href", this.urlGithub);
    linkGithub.textContent = this.urlGithub;


    const divLinks = document.createElement("div");
    divLinks.classList.add("project-item-links-content")


    divLinks.append(linkGithub);
    divLinks.append(linkDemo);
    el.prepend(spanTitle);
    video.appendChild(source);
    el.appendChild(video);
    el.append(divLinks);

    
    el.innerHTML = `
    <span>${this.title}</span>
    <video playsinline muted nofullscreen loop loading="lazy" autoplay>
    <source src="${this.urlVideo}"></source>
    </video>
    <!--Isso é porque alguns projetos não tem demo por enquanto -->
    <div>
    <div>
    <span>Repositório: </span>
    <a href="${this.urlGithub}">${this.urlGithub}</a>
    </div>
    ${this.urlDemo ?`<div>
    <span>Demo: </span>
    <a href="${this.urlDemo}">${this.urlDemo}</a>
    </div>`:""}
    </div>
    `
    





  }

}
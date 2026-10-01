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
    this._urlDemo = new String(value)
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
        switch (name) {
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
    ${this.urlDemo ? `<div>
    <span>Demo: </span>
    <a href="${this.urlDemo}">${this.urlDemo}</a>
    </div>`: ""}
    </div>
    `






  }

}
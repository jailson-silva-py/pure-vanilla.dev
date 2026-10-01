export class ProjectsContent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div id="projects" class="folder-content hidden">
        <div>
        <h4>Veja sua evolução</h4>
        <p>Em ordem decrescente:</p>
        </div>
        <ul class="project-content">
        <project-item url-video="/public/kanban-app-video.mp4" title="Krux | Kanban com Drag and Drop, Optimistic Update, persistência..."
        url-demo="https://kanban-app-ten-beta.vercel.app/" url-github="https://github.com/jailson-silva-py/kanban-app"></project-item>
        <project-item url-video="/public/entervip-shop.mp4" title="Entervip Shop | Fase Inicial de um  E-commerce com caching agressivo usando a sintaxe 'use cache' recém criada do Next.js naquele momento..."
        url-github="https://github.com/jailson-silva-py/entervip-shop"></project-item>
        <project-item url-video="/public/next-note.mp4" title="Next Note | Um bloco de notas com IA integrada para tirar as dúvidas do usuário. Modo dark/light, personalização de imagem de perfil ..."
        url-demo="https://next-note-gcjx.vercel.app/" url-github="https://github.com/jailson-silva-py/next-note"></project-item>
        </ul>
        <p></p>
        </div>
        `
    }
}

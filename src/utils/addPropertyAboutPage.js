const foldersArray = [
   {name:"Introducao", contentTags:"introducao-content"},
   {name:"Projetos", contentTags:"projects-content"},
   {name:"Stack", contentTags:"stack-content"},
   {name:"Contato", contentTags:"contact-content"},
   {name:"Curiosidades", contentTags:"curiosities-content"}
]

const folders = document.querySelector("folders-list");

folders.setAttribute("folders-json", JSON.stringify(foldersArray));

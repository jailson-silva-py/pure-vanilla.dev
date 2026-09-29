import { DeployPanel } from "./DeployPanel.js";
import { Menu } from "./Menu.js";
import { BuildLogs } from "./BuildLogs.js";
import { Folders } from "./Folders.js";
import { IntroducaoContent } from "./IntroductionContent.js";
import { ContactContent } from "./ContactContent.js";
import { Curiosities } from "./CuriositiesContent.js";
import { StackContent } from "./StackContent.js";
import { ProjectsContent } from "./ProjectsContent.js";
import { StackComponent } from "./StackComponent.js";
import { ProjectItemComponent } from "./ProjectItemComponent.js";
import { BtnExpandAll } from "./BtnExpandAll.js";

customElements.define("p-menu", Menu);
customElements.define("deploy-panel", DeployPanel);
customElements.define("build-logs", BuildLogs)
customElements.define("folders-list", Folders);
customElements.define("introducao-content", IntroducaoContent);
customElements.define("projects-content", ProjectsContent);
customElements.define("project-item", ProjectItemComponent);
customElements.define("stack-content", StackContent);
customElements.define("stack-item", StackComponent);
customElements.define("contact-content", ContactContent);
customElements.define("curiosities-content", Curiosities);
customElements.define("btn-expand-all", BtnExpandAll);


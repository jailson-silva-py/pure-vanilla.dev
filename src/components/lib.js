import { DeployPanel } from "./DeployPanel.js";
import { Menu } from "./Menu.js";
import { BuildLogs } from "./BuildLogs.js";
import { Folders } from "./Folders.js";

customElements.define("p-menu", Menu);
customElements.define("deploy-panel", DeployPanel);
customElements.define("build-logs", BuildLogs)
customElements.define("folders-list", Folders);
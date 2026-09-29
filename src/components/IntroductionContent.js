export class IntroducaoContent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="folder-content hidden">
        <div>
         <h4>Jailson  S. Pereira.</h4>
         <p>Desenvolvedor full-stack.</p>
        </div>
        <h4>Quem ele não é:</h4>
        <ol class="introduction-about-me-content">
        <li>Não é aquele que cola solução sem entender o porque funcina.</li>
        <li>Não é o fã de "best pratices" que são na verdade piores práticas disfarçadas de padrões da indústria.</li>
        <li>Não é quem entrega código ruim porque "o prazo tava apertado".</li>
        <li>Não é alguém que usa framework pra tudo (inclusive problemas simples) apenas para pesar no bundle.</li>
        <li>Não é uma pessoa que fica satisfeita com o conhecimento estagnado.</li>
        <li>Não é o dev que faz um sistema pra quebrar as 2h da madrugada.</li>
        </ol    >
        <p>Pergunte-me o que sei que direi-vos o que não sabe. (2026, Pereira, Jailson S.)</p>
        </div>
        `
    }
}

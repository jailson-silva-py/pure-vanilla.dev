export class IntroducaoContent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div id="introduction" class="folder-content hidden">
        <div>
         <h4>Jailson  S. Pereira.</h4>
         <p>Desenvolvedor full-stack.</p>
        </div>
        <h4>Quem ele não é:</h4>
        <ul class="introduction-about-me-content">
        <li><p>Não é aquele que cola solução sem entender o porque funciona.</p></li>
        <li><p>Não é o fã de "best pratices" que são na verdade piores práticas disfarçadas de padrões da indústria.</p></li>
        <li><p>Não é quem entrega código ruim porque "o prazo tava apertado".</p></li>
        <li><p>Não é alguém que usa framework pra tudo (inclusive problemas simples) apenas para pesar no bundle.</p></li>
        <li><p>Não é uma pessoa que fica satisfeita com o conhecimento estagnado.</p></li>
        <li><p>Não é o dev que faz um sistema pra quebrar as 2h da madrugada.</p></li>
        </ul>
        <p>Pergunte-me o que sei que direi-vos o que não sabe. (2026, Pereira, Jailson S.)</p>
        </div>
        `
    }
}

export class Curiosities extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="folder-content hidden">
            <ol class="curiosities-content">
            <li>
            <p>Odeia código ruim e mal documentado.</p>
            </li>
            <li>
            <p>Repudia o uso de framework modinha sendo usado pra tudo quando há alternativa melhores.</p>
            </li>
            <li>
            <p>Fica empolgado em fazer qualquer coisa que envolva Rust.</p>
            </li>
            <li>
            <p>Sempre propaga a paz e a salvação no ato de codar.(Obs: Ele uma vez disse que sua mão esquerda é a salvação e a direita é a Paz).</p>
            </li>
            <li>
            <p>Aprendizado tendecioso ao <del>masoquismo</del>? Ás vezes ele fica empolgado de mais resolvendo um problema complexo ou contruindo alguma maluquisse com documentação insuficiente.</p>
            </li>
            <li>
            <p>Ele se sente desconfortável em implementar "soluções" sem entender completamente o que foi feito.</p>
            </li>
            </ol>
            <p>Deve ser delicioso criar um CRUD em linguagem esotérica. (2026, Pereira, Jailson S.)</p>
        </div>
        `
    }
}

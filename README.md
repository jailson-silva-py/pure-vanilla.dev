# Portfólio em Vanilla JS

> Zero dependências. Só JavaScript, CSS, HTML e um sonho.

Um portfólio construído do zero, sem frameworks, sem bibliotecas e sem build step. Tudo é organizado em **Web Components**, e a comunicação entre eles acontece por **CustomEvents**, o que dá uma reatividade simples sem precisar de nenhuma lib de estado.

## Filosofia

- **Zero dependências:** o que está no repositório é tudo o que roda.
- **Component First:** cada pedaço da interface é um Web Component isolado e reutilizável.
- **Mobile First:** os estilos nascem para telas pequenas e crescem para telas maiores.
- **Visual minimalista:** uma interface limpa e pouco agressiva aos olhos.

A ordem de prioridade no desenvolvimento é: **Component First → Mobile First → Desktop First**.

## Como funciona a reatividade

Os componentes não se conhecem diretamente. Eles emitem e escutam `CustomEvent`s, cujos nomes ficam centralizados em `constraints/`. Isso mantém o acoplamento baixo: um componente pode ser removido ou trocado sem quebrar os outros.

```js
// emitindo
document.dispatchEvent(new CustomEvent(eventExample, { detail: { valor: 1 } }));

// escutando
document.addEventListener(eventExample, (e) => {
  console.log(e.detail.valor);
});
```

## Estrutura do projeto

```
.
├── src/              # Todo o JavaScript da aplicação (exceto constraints)
├── constraints/      # Strings fixas (nomes de eventos) e dados estáticos grandes
├── components/       # Os componentes criados (no lib.js fica só a definição das tags)
├── public/           # Assets (imagens, fontes, ícones)
├── index.html        # Página inicial
├── about.html        # Apresentação pessoal como desenvolvedor
├── global.css        # Resets, estilos base das tags e variáveis CSS
├── custom.css        # Estilos de classes e IDs específicos
├── keyframes.css     # Todas as animações (@keyframes)
├── responsivity.css  # Media queries (mobile/desktop)
└── utils.css         # Utilitários de interação (ex.: .hidden)
```

## Rodando localmente

Como não há dependências, não existe `npm install`. Basta servir a pasta com qualquer servidor estático:

```bash
npx serve .
# ou
python3 -m http.server 3000
```

> Abrir o `index.html` direto pelo navegador pode falhar se você usar ES Modules, então prefira um servidor local.

## Stack

- JavaScript (Web Components + CustomEvent)
- HTML
- CSS
- A mente de Jailson S.

## Autor

**Jailson S.**
# LinuxDeck — landing page

Exercício de front-end desenvolvido com **HTML, CSS e JavaScript puros**, O conteúdo, os elementos gráficos e a implementação foram adaptados para o LinuxDeck.

## Como visualizar

Abra `index.html` no navegador. Não é necessário instalar dependências ou executar o servidor LinuxDeck.

## O que foi praticado

- HTML semântico, SVG e perguntas frequentes com `details` e `summary`.
- CSS responsivo com Grid, Flexbox, gradientes e uma tecla 3D feita com CSS.
- JavaScript para menu mobile, troca de workspaces e feedback de interação.
- Acessibilidade: foco visível, navegação por teclado, avisos acessíveis e respeito à preferência por movimento reduzido.

## Estrutura

```text
index.html    Estrutura da página
style.css     Estilos e responsividade
script.js     Interações demonstrativas
favicon.svg   Ícone do projeto
```

**Os botões de download não possuem links nem baixam arquivos.** O painel é uma simulação com dados fictícios: não abre aplicativos, não reproduz áudio e não monitora o computador. A página não utiliza APIs, bibliotecas, fontes externas ou ferramentas de build.


## Padrão visual

- Tipografia mínima de **16px (1rem)**, inclusive nos rótulos da demonstração e no celular. Escala: 16, 24, 32, 40, 48, 56, 64 e 96px.
- Margens, paddings e gaps usam os tokens `--space-*`, em múltiplos de **8px**. Bordas, sombras e detalhes ópticos das ilustrações não são espaçamentos de layout.
- Cores, raios e transições ficam definidos em `:root`.
- Hovers usam cor e borda, sem deslocar ou ampliar os elementos.
- O menu passa para o formato móvel quando não há espaço para os links em tamanho legível. O CTA mantém conteúdo centralizado nos dois formatos.

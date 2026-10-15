# CYDAK — Base web reutilizável

Base independente em HTML e CSS, inspirada em https://cydak.com.br/.
Sem framework, build ou instalação de pacotes. JavaScript mínimo para alternância de tema e menu lateral. Abra index.html no navegador.

## Arquivos
- index.html: vitrine responsiva com navegação, hero, cartões, cores, botões, campos e explicação expansível.
- assets/css/cydak.css: tema e componentes com prefixo cy-.
- starter.html: ponto de partida mínimo para novos projetos.

## Reutilização
1. Copie esta pasta para o novo projeto.
2. Use starter.html como página inicial ou copie os componentes de index.html.
3. Mantenha o link para assets/css/cydak.css no head.
4. Personalize os tokens em :root para cores, fontes, largura e bordas.
5. Adicione regras específicas em outro CSS carregado depois do tema.

## Identidade
- Azul principal: #004693. Use com texto branco.
- Laranja: #F4A220. Use com texto escuro (#142b47); evite texto branco sobre laranja.
- Títulos: Days One, peso 400, família confirmada no site de referência.
- Texto e controles: Poppins, pesos 400/500/600/700.
- Marca CYDAK DEV: ícone <C> e assinatura em elementos separados, todos em Days One local. Fundo branco preserva o azul nos dois temas.

## Componentes
- Layout: cy-container, cy-section, cy-grid, cy-split.
- Conteúdo: cy-card, cy-eyebrow, cy-muted, cy-note.
- Ações: cy-button, cy-button--accent, cy-button--outline.
- Campos: cy-field e cy-input; use sempre label associado ao controle.
- Navegação: cy-header, cy-nav, cy-footer e cy-skip.

A demonstração usa links reais para seções e details/summary nativo. Os campos não enviam dados.
O layout muda para uma coluna em telas de até 800 px e respeita preferência por movimento reduzido.

## Fontes e uso offline
O CSS carrega Days One e Poppins pelo Google Fonts, exigindo acesso à internet e realizando uma requisição ao Google.
Sem conexão, o navegador usa sans-serif. Para aplicações offline, obtenha as fontes de uma distribuição oficial, preserve as licenças e substitua o @import por @font-face com arquivos locais.

## Escopo
Não inclui backend, autenticação, persistência ou integração com sistemas existentes.
Os textos são demonstrativos e devem ser adaptados ao novo projeto. Não há dependência do MES_CYDAK.

## Temas e nova marca
O script assets/js/theme.js fica no head antes do CSS. Segue o sistema até a escolha manual, salva em localStorage (cydak-theme) e sincroniza abas. Sem armazenamento, mantém a escolha na página; sem JavaScript, acompanha o sistema via CSS.
A fonte Days One é local (assets/brand/days-one.font); Poppins continua dependendo do Google Fonts. A cy-brand usa dois SVGs independentes em assets/brand: icone-c.svg em cy-brand__icon e cydak-dev.svg em cy-brand__logo. Ambos incorporam a fonte Days One e têm tamanho e fundo branco próprios. A seção Estrutura exibe os dois arquivos, links para visualizar/baixar e um exemplo de montagem.

## Menu lateral

O index.html e o starter.html usam navegação inspirada no MES_CYDAK: fundo azul profundo, ícones, grupos e destaque ciano no item ativo.
- assets/css/sidebar.css: layout lateral e estilos responsivos.
- assets/js/sidebar.js: recolhimento, seleção por âncora e navegação em telas pequenas.
- Desktop: largura de 250 px, recolhível para 60 px; a preferência fica em localStorage (cydak-sidebar-collapsed).
- Celular (até 640 px): menu acima do conteúdo, inicialmente recolhido. Fecha ao navegar ou pressionar Escape.
- Componentes abre um submenu; no modo compacto, abre também a barra lateral.
- Sem JavaScript, os links e submenus continuam acessíveis com o menu expandido.

Para reutilizar, copie a estrutura cy-app, cy-sidebar e cy-app__content do starter.html e mantenha os dois arquivos CSS e os dois scripts. Personalize os links e seus ícones SVG; os destinos devem existir na página. O seletor de tema fica no rodapé do menu.

## Personalização de aparência

O botão Aparência no rodapé do menu abre um painel com seis paletas (CYDAK, Índigo, Esmeralda, Céu, Rosa e Grafite) e cinco linguagens visuais (CYDAK original, Tecnológico, Minimalista, Industrial e Editorial). As escolhas são aplicadas imediatamente e persistidas em `cydak-appearance` no localStorage, independentemente do modo claro/escuro. Restaurar padrão CYDAK recupera a paleta #004693 e o estilo original, mantendo o modo claro/escuro escolhido.

Inclua `assets/js/appearance.js` no head e `assets/css/appearance.css` e `assets/css/visual-styles.css`, nessa ordem, depois dos outros estilos. As duas páginas já incluem os arquivos. O painel usa dialog nativo, com fechamento por Escape e retorno de foco ao botão de abertura. Sem JavaScript, o botão fica oculto e a base continua acessível. Sem armazenamento, a personalização vale na página atual.

As paletas alteram menu, ações principais, links e hero; o logotipo, o destaque laranja e a amostra institucional mantêm a identidade CYDAK. Cada linguagem altera tipografia, fundos, menu, cartões, campos e ações, mantendo a estrutura. Tecnológico usa grade e painéis luminosos; Minimalista usa superfícies neutras; Industrial usa sinalização e linhas robustas; Editorial usa títulos serifados e linhas finas. O seletor exibe miniaturas dessas composições. Preferências antigas Suave e Compacto migram para Editorial e Minimalista, respectivamente. Inspiração visual: https://tailwindcss.com/; não há dependência do framework Tailwind.

## Dashboard demonstrativo

Depois das seções de apresentação, Estrutura, Identidade e Componentes, o `index.html` inclui uma seção Dashboard, acessível pelo menu lateral, com produção total, atingimento da meta, qualidade e refugo. O seletor Manhã/Tarde/Noite atualiza indicadores e gráficos de linhas, barras e pizza com dados fictícios consistentes entre si.

Os gráficos são SVG, sem bibliotecas ou requisições externas, e acompanham as paletas e os cinco estilos. As tabelas expansíveis apresentam os valores de linhas/barras; a legenda da pizza apresenta quantidades e percentuais. Não há conexão com equipamentos, atualização em tempo real ou armazenamento de dados operacionais.

Arquivos: `assets/js/dashboard.js` (dados e renderização) e `assets/css/dashboard.css` (layout e gráficos). Para reutilizar, copie a seção `data-dashboard` e vincule esses arquivos depois dos estilos e scripts existentes. O `starter.html` permanece como ponto de partida mínimo.

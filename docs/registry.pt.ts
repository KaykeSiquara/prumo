export type DocPt = { name: string; summary: string; props?: Record<string, string>; keyboard?: string[][]; a11y?: string[]; do?: string[]; dont?: string[] };

export const pt: Record<string, DocPt> = {
  "button": {
    "name": "Button",
    "summary": "Dispara uma ação. Um primário por tela, e perigo só para ações que destroem dados.",
    "props": {
      "variant": "Peso visual. Mantenha uma ação primária por tela.",
      "size": "A altura segue os tokens de controle e a densidade.",
      "loading": "Mostra um indicador, mantém o rótulo para leitores de tela e a largura estável, e ignora cliques.",
      "iconStart / iconEnd": "Ícones decorativos ao redor do rótulo.",
      "label (IconButton)": "Obrigatório. O nome acessível de um botão só com ícone."
    },
    "keyboard": [
      [
        "Enter, Espaço",
        "Aciona o botão"
      ]
    ],
    "a11y": [
      "O carregamento define aria-busy e aria-disabled, mas mantém o botão focável, para o foco não se perder no meio da ação.",
      "O IconButton não pode ser usado sem rótulo: a tipagem exige.",
      "Botões desabilitados são pulados pelo Tab. Prefira explicar ao lado por que a ação não está disponível."
    ],
    "do": [
      "Escreva a ação como verbo: “Salvar documento”, não “OK”.",
      "Reserve o perigo para ações que destroem dados."
    ],
    "dont": [
      "Usar botão primário para todas as ações da tela.",
      "Colorir o botão pelo contexto: uma ação dentro de um bloco de glosa não é perigosa por isso."
    ]
  },
  "field": {
    "name": "Field",
    "summary": "Envolve um controle com rótulo visível, dica opcional e erro, e liga os três entre si.",
    "props": {
      "label": "Sempre renderizado; hideLabel o mantém só para leitores de tela.",
      "description": "Dica exibida abaixo do rótulo.",
      "error": "Marca o controle como inválido e o descreve.",
      "required": "Adiciona o atributo required nativo e uma marcação visual.",
      "disabled": "Desabilita o controle dentro dele."
    },
    "a11y": [
      "O rótulo é um <label for> de verdade. A dica e o erro chegam ao controle por aria-describedby, o erro primeiro.",
      "O erro tem um símbolo além da cor, e o símbolo fica oculto para leitores de tela."
    ],
    "do": [
      "Diga como corrigir: “precisa de 14 dígitos”, não “inválido”."
    ],
    "dont": [
      "Usar o placeholder no lugar do rótulo."
    ]
  },
  "text-input": {
    "name": "TextInput e TextArea",
    "summary": "Entrada de texto de uma ou várias linhas, com ícone inicial opcional e estado de carregamento.",
    "props": {
      "size": "Altura.",
      "iconStart": "Ícone inicial decorativo.",
      "loading": "Mostra um indicador e define aria-busy.",
      "invalid": "Sobrepõe o estado de erro do Field."
    },
    "a11y": [
      "A fonte tem 16 px, para o iOS não dar zoom ao focar.",
      "O placeholder passa de 4,5:1, mas nunca substitui o rótulo."
    ]
  },
  "select": {
    "name": "Select",
    "summary": "Um select nativo, estilizado. Nativo significa que o teclado e os seletores do celular funcionam como as pessoas esperam.",
    "props": {
      "size": "Altura.",
      "invalid": "Sobrepõe o estado de erro do Field."
    },
    "keyboard": [
      [
        "Setas",
        "Percorrem as opções"
      ],
      [
        "Digite uma letra",
        "Pula para uma opção correspondente"
      ]
    ],
    "a11y": [
      "É um <select> de verdade, então não há nada a reimplementar para teclado ou leitor de tela."
    ]
  },
  "checkbox": {
    "name": "Checkbox",
    "summary": "Uma escolha binária, ou um estado misto quando parte dos itens filhos está selecionada.",
    "props": {
      "label": "Obrigatório, renderizado como um rótulo de verdade.",
      "description": "Detalhe extra, ligado por aria-describedby.",
      "indeterminate": "O estado misto, para o pai de itens parcialmente selecionados."
    },
    "keyboard": [
      [
        "Espaço",
        "Marca ou desmarca"
      ]
    ],
    "a11y": [
      "O input nativo é mantido e estilizado, então continua na árvore de acessibilidade com os estados marcado e misto."
    ]
  },
  "radio-group": {
    "name": "RadioGroup",
    "summary": "Uma escolha entre poucas opções visíveis.",
    "props": {
      "legend": "Nomeia o grupo.",
      "options": "Valor, rótulo, descrição opcional e desabilitado.",
      "value / defaultValue": "Controlado ou não controlado.",
      "orientation": "Só o layout."
    },
    "keyboard": [
      [
        "Setas",
        "Movem e selecionam dentro do grupo"
      ],
      [
        "Tab",
        "Sai do grupo"
      ]
    ],
    "a11y": [
      "Um fieldset com legend, então o grupo é anunciado com o seu nome."
    ]
  },
  "switch": {
    "name": "Switch",
    "summary": "Liga ou desliga uma configuração na hora, sem botão de salvar.",
    "props": {
      "label": "Obrigatório.",
      "checked / defaultChecked": "Controlado ou não controlado.",
      "onCheckedChange": "Chamado a cada troca."
    },
    "keyboard": [
      [
        "Espaço, Enter",
        "Troca o estado"
      ]
    ],
    "a11y": [
      "role=switch com aria-checked. Use um Checkbox quando a mudança só vale depois de salvar um formulário."
    ]
  },
  "alert": {
    "name": "Alert",
    "summary": "Uma mensagem que fica na página até a situação mudar.",
    "props": {
      "tone": "Ícone e cor.",
      "title": "A mensagem em uma linha.",
      "action": "Um botão que resolve a situação.",
      "live": "Anuncia o alerta quando ele aparece."
    },
    "a11y": [
      "Alertas estáticos não são regiões vivas. Use live só quando o alerta surge depois de uma ação, para ser anunciado uma vez."
    ]
  },
  "badge": {
    "name": "Badge",
    "summary": "Um rótulo curto de estado.",
    "props": {
      "tone": "Cor.",
      "icon": "Um símbolo, para o estado nunca depender só da cor."
    },
    "a11y": [
      "Combine o tom com um símbolo e uma palavra. Quem não distingue verde de vermelho, ou imprime em preto e branco, continua lendo o estado."
    ]
  },
  "progress": {
    "name": "Progress, Spinner e Skeleton",
    "summary": "Progress para quantidades conhecidas, spinner para esperas curtas, skeleton para um layout que está chegando.",
    "props": {
      "value": "Omita para uma barra indeterminada.",
      "label": "Obrigatório: nomeia a barra de progresso.",
      "showValue": "Escreve a porcentagem.",
      "label (Spinner)": "Com rótulo, é anunciado; sem rótulo, é decorativo."
    },
    "a11y": [
      "O Progress usa role=progressbar com o valor. Skeletons ficam ocultos para tecnologia assistiva; combine com um Spinner com rótulo ou com texto."
    ]
  },
  "toast": {
    "name": "Toast",
    "summary": "Uma confirmação breve depois de uma ação, com um desfazer opcional.",
    "props": {
      "message": "O que aconteceu, no passado.",
      "tone": "Ícone.",
      "action": "Uma única ação, como Desfazer.",
      "duration": "Milissegundos até sair."
    },
    "a11y": [
      "Todos os toasts compartilham uma única região viva educada, então cada mensagem é anunciada uma vez e nunca interrompe.",
      "Nunca deixe o único caminho para algo importante num toast: ele some."
    ]
  },
  "dialog": {
    "name": "Dialog e ConfirmDialog",
    "summary": "Uma tarefa focada sobre a página. O ConfirmDialog pergunta antes de uma ação irreversível.",
    "props": {
      "title": "Obrigatório, vira o nome acessível.",
      "description": "Vira a descrição acessível.",
      "trigger": "O elemento que abre o diálogo.",
      "open / onOpenChange": "Modo controlado.",
      "size": "Largura.",
      "tone (Confirm)": "Estilo do botão de confirmar."
    },
    "keyboard": [
      [
        "Tab, Shift+Tab",
        "Circulam só dentro do diálogo"
      ],
      [
        "Esc",
        "Fecha e devolve o foco a quem abriu"
      ]
    ],
    "a11y": [
      "O foco entra ao abrir e volta para quem abriu ao fechar.",
      "O ConfirmDialog usa role=alertdialog.",
      "Fica na camada de modal, acima de headers fixos e abaixo dos toasts."
    ]
  },
  "sheet": {
    "name": "Sheet",
    "summary": "Um painel lateral para detalhes e tarefas secundárias, mantendo a página no contexto.",
    "props": {
      "side": "Lado de onde desliza.",
      "title": "Obrigatório."
    },
    "keyboard": [
      [
        "Esc",
        "Fecha e devolve o foco"
      ]
    ],
    "a11y": [
      "O mesmo contrato de foco do Dialog."
    ]
  },
  "popover": {
    "name": "Popover",
    "summary": "Conteúdo interativo pequeno, ancorado a um gatilho.",
    "props": {
      "trigger": "Obrigatório.",
      "label": "Nomeia o popover.",
      "align": "Alinhamento em relação ao gatilho."
    },
    "keyboard": [
      [
        "Esc",
        "Fecha"
      ],
      [
        "Tab",
        "Percorre o conteúdo"
      ]
    ],
    "a11y": [
      "Use um Dialog quando a tarefa pede toda a atenção da pessoa."
    ]
  },
  "tooltip": {
    "name": "Tooltip",
    "summary": "Um rótulo curto que aparece no hover e no foco pelo teclado.",
    "props": {
      "content": "Texto simples, uma linha.",
      "side": "Posição."
    },
    "keyboard": [
      [
        "Tab",
        "Focar o gatilho mostra o tooltip"
      ],
      [
        "Esc",
        "Esconde"
      ]
    ],
    "a11y": [
      "O tooltip complementa, nunca é o nome acessível: dê um rótulo aos botões de ícone também.",
      "Fica na camada mais alta."
    ]
  },
  "menu": {
    "name": "Menu",
    "summary": "Uma lista de ações atrás de um botão.",
    "props": {
      "trigger": "Obrigatório.",
      "label": "Nomeia o menu.",
      "tone (MenuItem)": "Para itens destrutivos.",
      "shortcut (MenuItem)": "Exibido, não associado a tecla."
    },
    "keyboard": [
      [
        "Enter, Espaço, ↓",
        "Abre o menu"
      ],
      [
        "↑ ↓",
        "Movem entre os itens"
      ],
      [
        "Home, End",
        "Primeiro e último item"
      ],
      [
        "Esc",
        "Fecha e devolve o foco"
      ]
    ],
    "a11y": [
      "Menus são para ações. Para navegar, use links; para escolher um valor, use um Select."
    ]
  },
  "tabs": {
    "name": "Tabs",
    "summary": "Alterna entre visões do mesmo conteúdo.",
    "props": {
      "label": "Nomeia a lista de abas.",
      "defaultValue / value": "Aba selecionada."
    },
    "keyboard": [
      [
        "← →",
        "Movem entre as abas"
      ],
      [
        "Home, End",
        "Primeira e última aba"
      ],
      [
        "Tab",
        "Entra no painel"
      ]
    ],
    "a11y": [
      "As abas seguem o padrão ARIA com ativação automática; abas desabilitadas são puladas pelas setas."
    ]
  },
  "breadcrumb": {
    "name": "Breadcrumb",
    "summary": "Mostra onde uma página fica e leva de volta pela hierarquia.",
    "props": {
      "items": "O último item é a página atual."
    },
    "a11y": [
      "Um marco nav com nome próprio; a página atual tem aria-current=page."
    ]
  },
  "pagination": {
    "name": "Pagination",
    "summary": "Percorre as páginas de uma lista longa, com as páginas ao redor da atual.",
    "props": {
      "page / pages": "Página atual e total.",
      "onPageChange": "Obrigatório.",
      "pageLabel": "Nome acessível de cada botão de página, para tradução."
    },
    "a11y": [
      "A página atual tem aria-current=page. Anterior e Próxima ficam desabilitados nas pontas, não somem, para o layout nunca pular."
    ]
  },
  "link": {
    "name": "Link",
    "summary": "Navegação no meio do texto. Links externos avisam.",
    "props": {
      "external": "Abre em nova aba e avisa leitores de tela.",
      "externalLabel": "Para tradução."
    },
    "a11y": [
      "Links têm sublinhado no texto corrido; a cor não é o único sinal."
    ]
  },
  "table": {
    "name": "Table",
    "summary": "Dados tabulares densos com cabeçalhos ordenáveis. Abaixo de 675 px da própria largura, as linhas viram cartões.",
    "props": {
      "caption": "Obrigatório. Diga como a tabela está ordenada.",
      "density": "Altura das linhas.",
      "stackBelow": "As linhas viram cartões quando o contêiner é estreito.",
      "sort (Th)": "Torna o cabeçalho ordenável; só o ativo recebe aria-sort.",
      "label (Td)": "Exibido antes do valor no modo cartão."
    },
    "keyboard": [
      [
        "Tab",
        "Chega a cada botão de ordenação"
      ],
      [
        "Enter, Espaço",
        "Ordena por aquela coluna"
      ]
    ],
    "a11y": [
      "Os botões de ordenação ficam dentro dos cabeçalhos; aria-sort só vai na coluna que está ordenada.",
      "A troca para cartões é uma container query: a tabela responde à largura que recebeu, não à da janela."
    ]
  },
  "card": {
    "name": "Card",
    "summary": "Agrupa conteúdo relacionado, com título e ações opcionais.",
    "props": {
      "title": "Vira um título.",
      "headingLevel": "Mantenha a hierarquia de títulos em ordem.",
      "actions": "Botões no cabeçalho.",
      "padded": "Desligue para tabelas."
    },
    "a11y": [
      "Com título, o cartão é uma seção nomeada pelo título."
    ]
  },
  "stat": {
    "name": "Stat",
    "summary": "Um número-chave com rótulo e variação.",
    "props": {
      "label": "",
      "value": "",
      "delta": "Escreva a variação em palavras.",
      "trend": "Adiciona uma seta decorativa e cor."
    },
    "a11y": [
      "A seta fica oculta para leitores de tela; o texto da variação carrega o significado."
    ]
  },
  "avatar": {
    "name": "Avatar",
    "summary": "Uma pessoa, por foto ou iniciais.",
    "props": {
      "name": "Obrigatório, vira o nome acessível.",
      "src": "Foto opcional.",
      "size": ""
    },
    "a11y": [
      "role=img com o nome da pessoa; as iniciais são decorativas."
    ]
  },
  "empty-state": {
    "name": "EmptyState",
    "summary": "Explica por que não há nada aqui e o que fazer em seguida.",
    "props": {
      "title": "",
      "action": "Normalmente a saída, como limpar os filtros."
    },
    "a11y": [
      "Diga por que está vazio e ofereça o próximo passo."
    ]
  },
  "kbd": {
    "name": "Kbd",
    "summary": "Uma tecla ou atalho.",
    "a11y": [
      "Renderiza o elemento nativo <kbd>."
    ]
  },
  "stack": {
    "name": "Stack",
    "summary": "Organiza os filhos em linha ou coluna, com um espaçamento da escala.",
    "props": {
      "direction": "",
      "gap": "Um degrau da escala de espaçamento.",
      "align / justify": "",
      "wrap": ""
    }
  },
  "visually-hidden": {
    "name": "VisuallyHidden",
    "summary": "Texto só para leitores de tela.",
    "a11y": [
      "Use para completar uma abreviação visual, nunca para esconder de quem enxerga algo que os outros recebem."
    ]
  }
};

export const groupsPt: Record<string, string> = { Actions: "Ações", Forms: "Formulários", Feedback: "Feedback", Overlays: "Sobrepostos", Navigation: "Navegação", "Data display": "Exibição de dados", Layout: "Layout" };

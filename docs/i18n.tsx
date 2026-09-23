import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link as RouterLink } from "react-router";

export type Lang = "en" | "pt";

const en = {
  skip: "Skip to content", openNav: "Open navigation", closeNav: "Close navigation", docsNav: "Documentation", compact: "Compact", theme: "Theme", light: "Light", dark: "Dark", system: "System",
  langButton: "PT", langLabel: "Ler em português", start: "Start", introduction: "Introduction", foundations: "Foundations", dismiss: "Dismiss",
  showCode: "Show code", hideCode: "Hide code", copyCode: "Copy code", copied: "Code copied.", copyFailed: "Copy failed. Select the code and copy it by hand.", sourceOf: "{name} source",
  sevenStates: "The seven states", stDefault: "Default", stHover: "Hover", stFocus: "Focus", stActive: "Active", stDisabled: "Disabled", stLoading: "Loading", stError: "Error",
  naButtonError: "A button has no error state. The field or the alert next to it carries the error.", naInputActive: "Typing is the active state, and it looks like focus.",
  naSelectActive: "The native picker takes over while it is open.", naSelectLoading: "Load the options before showing the select, or disable it with a hint.",
  naCheckLoading: "A choice is instant. If saving takes time, show it on the form, not the box.", naCheckError: "Errors belong to the group or the form, through Field.",
  naSwitchLoading: "Switches apply at once; if the change can fail, roll it back and say so in a toast.", naSwitchError: "Same: the toast explains the failure.",
  sSave: "Save", sAmount: "Amount", sPeriod: "Period", sMarch: "March", sPaid: "Paid", sAlerts: "Alerts",
  noProps: "No props beyond the element's own attributes.", props: "Props", prop: "Prop", type: "Type", default: "Default", description: "Description",
  keyboard: "Keyboard", keys: "Keys", whatHappens: "What happens", examples: "Examples", states: "States", statesIntro: "The seven states of the contract, forced so they can be seen side by side. The samples here are not interactive.",
  accessibility: "Accessibility", usage: "Usage", do: "Do", dont: "Don't", importLabel: "Import",
  notFound: "Not found", notFoundTitle: "Page not found", notFoundEmpty: "Nothing lives at this address", notFoundBody: "It may have moved, or it never existed.", backHome: "Back to the introduction",
  fColor: "Color", fTypography: "Typography", fSpacing: "Spacing and layout", fElevation: "Elevation and motion", fLayers: "Layers", fAccessibility: "Accessibility",
  eyebrowDs: "Design system", homeLead: "A design system measured before it is claimed. OKLCH tokens, a seven-state contract for every control, and accessible React components built on Radix UI.",
  statComponents: "Components", statComponentsNote: "{n} documentation pages", statColors: "Color tokens", statColorsNote: "{n} semantic, per theme", statPairs: "Contrast pairs", statPairsNote: "{n} pairs in two themes, all tested",
  principles: "Principles",
  p1t: "Measured before it is claimed", p1d: "Every color pair the system documents is checked against WCAG 2.1 in both themes by a test that fails the build. If it cannot be measured, it is not claimed.",
  p2t: "Seven states, every control", p2d: "Default, hover, focus, active, disabled, loading and error, designed and documented for each control, including the ones that do not apply and why.",
  p3t: "Color is never the only signal", p3d: "States carry a symbol and a word. Someone who cannot tell green from red, or who prints in black and white, still reads them.",
  p4t: "The keyboard is not a fallback", p4d: "Focus is always visible, overlays trap and return it, and every component page lists its keys.",
  startTitle: "Start", installLabel: "Install and use", codeComment: "Amount", codeHint: "Use a period for the cents.", codeSave: "Save document",
  tailwindNote: "Using Tailwind CSS v4? Import `@kaykesiquara/prumo/tailwind.css` after Tailwind and the tokens become utilities such as `bg-surface` and `text-danger-text`. The raw tokens are in `tokens.json`, in the W3C Design Tokens format.",
  themesTitle: "Themes", themesBody: "Light and dark follow the system by default. Set `data-pr-theme=\"light\"` or `\"dark\"` on any element to force one, and `data-pr-density=\"compact\"` for denser controls.",
  next: "Where to go next", nextColor: "[Color](/foundations/color): the palette, the semantic tokens and every contrast pair, measured live.", nextA11y: "[Accessibility](/foundations/accessibility): the contract every component keeps.", nextButton: "[Button](/components/button): a component page, with its seven states.",
  colorLead: "Colors are written in OKLCH, so a step in lightness looks like the same step on every hue. Neutrals carry a little chroma on hue 266, which keeps grey from looking dirty next to the brand.",
  allInGamut: "All 58 colors fit the sRGB gamut", someOutGamut: "Some colors fall outside sRGB", pairsPass: "{n} of {total} contrast pairs pass",
  palette: "Palette", paletteBody: "A color written outside the gamut is clamped by the browser, so the color that ships is not the one that was measured. Every step here was fitted to sRGB before it was written down.", scaleOf: "{name} scale",
  semantic: "Semantic tokens", semanticBody: "Components never use the palette directly. They use these names, and each theme maps them to a step of the palette.", semanticCaption: "Semantic tokens and the palette step each theme uses", token: "Token", lightCol: "Light", darkCol: "Dark",
  contrast: "Contrast", contrastBody: "Each pair below is computed from the tokens as this page renders, with the same function the test suite uses. Text needs 4.5:1; control borders, focus rings and indicators need 3:1.",
  contrastCaption: "Contrast of every documented pair, in both themes", foreground: "Foreground", background: "Background", minimum: "Minimum",
  distance: "Telling states apart", distanceBody: "Contrast answers whether text can be read. It does not answer whether two status colors can be told apart, which is what matters when a warning sits next to an error in a dense table. That is a distance in OKLab. No standard sets a pass mark for it, so it is shown as a measurement: use it to compare a palette before and after a change.",
  distanceCaption: "OKLab distance between the solid status colors", pair: "Pair",
  typeLead: "One family, the system stack, so text renders at once and looks native on every platform. Sizes are in rem, so they follow the reader's browser setting.", scale: "Scale", typeSample: "Financial reporting on time",
  weightLeading: "Weight and leading", leadingTight: "Line height {k}, used for headings.", leadingSnug: "Line height {k}, used for titles and dense UI.", leadingNormal: "Line height {k}, used for body text.",
  spacingLead: "A 4 px grid. Controls come in three heights, and a compact density lowers them all at once.", space: "Space", radius: "Radius", controlHeight: "Control height",
  controlBody: "Turn on Compact at the top of the page to see these change: 32, 40 and 48 px become 28, 32 and 40.", breakpoints: "Breakpoints",
  breakpointsBody: "Five bands, from a small phone to a large desktop. Components prefer container queries: the table becomes cards below 675 px of its own width, wherever it is placed.",
  width: "Width", typicalScreen: "Typical screen", bp0: "Small phone", bp1: "Large phone and small tablet", bp2: "Tablet and small laptop", bp3: "Laptop", bp4: "Large desktop",
  elevLead: "Three shadows and three durations. Shadows are stronger in the dark theme, where a soft shadow would disappear.", shadow: "Shadow", motion: "Motion",
  motionBody: "Motion explains a change of place, it does not decorate. With reduced motion on, every animation in the system drops to an instant.", moveSquares: "Move the squares", moveBack: "Move back",
  easing: "Easing: `standard` is `{standard}` for small changes, `emphasized` is `{emphasized}` for things that enter the screen.",
  layersLead: "Stacking is a vocabulary, not a number picked on the day. Each layer has a name, and a component asks for its layer by name.", theScale: "The scale", layersList: "Layers, from top to bottom",
  whyOrder: "Why these, in this order", why1: "A toast sits above a modal, because a confirmation can arrive while a dialog is open and must still be seen.", why2: "A tooltip sits above everything, because it describes whatever it points at, including a toast.", why3: "Menus sit below sticky headers, so a menu opened in the content scrolls under the header instead of covering it.",
  zmenu: "Menus, popovers and selects", zsticky: "Sticky headers", zbackdrop: "Overlay behind a modal", zmodal: "Dialogs and sheets", ztoast: "Notifications, above any modal", ztooltip: "Tooltips, above everything",
  a11yLead: "Accessibility is part of each component's contract, and the contract is tested. This page lists what every component promises.", sevenTitle: "The seven states",
  sevenBody: "Every control is designed in seven states: default, hover, focus, active, disabled, loading and error. When a state does not apply, the component page says so and says why, so the gap is a decision and not an oversight. See [Button](/components/button).",
  focus: "Focus", focusBody: "The focus ring uses its own token, checked at 3:1 against the page and the surface in both themes.", focusOk: "Focus ring passes 3:1 everywhere", focusBad: "Focus ring fails somewhere",
  keeps: "What every component keeps", k1: "A visible label, tied to the control. Placeholders never stand in for labels.", k2: "Errors say how to fix the problem, carry a symbol as well as color, and reach the control through `aria-describedby`.",
  k3: "Overlays move focus in, keep Tab inside, close on Esc and give focus back to what opened them.", k4: "Icon-only buttons cannot be written without a label: the types require it.", k5: "One polite live region for confirmations, so each is announced once.",
  k6: "Reduced motion turns every animation into an instant.", k7: "Text inputs use 16 px, so iOS does not zoom on focus.",
  tested: "How it is tested", t1: "Contrast: every documented pair, in both themes, fails the build below its minimum. So does any color outside sRGB.", t2: "Behavior: tests are written against roles, accessible names and the keyboard, never against class names.", t3: "axe: every documentation page, a page with every component, and an open dialog are checked for WCAG 2.1 A and AA.",
  exVariants: "Variants", exSizes: "Sizes", exLoading: "Loading", exIconOnly: "Icon only", exWithHint: "With a hint", exWithError: "With an error", exBasic: "Basic", exGroup: "Group", exWithDescription: "With a description",
  exTones: "Tones", exWithAction: "With an action", exStatus: "Status", exDeterminate: "Determinate", exConfirm: "Confirmation", exSortable: "Sortable", exGrid: "Grid",
};
export type Key = keyof typeof en;

const pt: Record<Key, string> = {
  skip: "Pular para o conteúdo", openNav: "Abrir navegação", closeNav: "Fechar navegação", docsNav: "Documentação", compact: "Compacta", theme: "Tema", light: "Claro", dark: "Escuro", system: "Sistema",
  langButton: "EN", langLabel: "Read in English", start: "Início", introduction: "Introdução", foundations: "Fundamentos", dismiss: "Dispensar",
  showCode: "Mostrar código", hideCode: "Ocultar código", copyCode: "Copiar código", copied: "Código copiado.", copyFailed: "Não foi possível copiar. Selecione o código e copie à mão.", sourceOf: "Código de {name}",
  sevenStates: "Os sete estados", stDefault: "Padrão", stHover: "Hover", stFocus: "Foco", stActive: "Ativo", stDisabled: "Desabilitado", stLoading: "Carregando", stError: "Erro",
  naButtonError: "Um botão não tem estado de erro. O campo ou o alerta ao lado carrega o erro.", naInputActive: "Digitar é o estado ativo, e ele tem a aparência do foco.",
  naSelectActive: "O seletor nativo assume enquanto está aberto.", naSelectLoading: "Carregue as opções antes de mostrar o select, ou desabilite com uma dica.",
  naCheckLoading: "Uma escolha é instantânea. Se salvar demora, mostre isso no formulário, não na caixa.", naCheckError: "O erro pertence ao grupo ou ao formulário, pelo Field.",
  naSwitchLoading: "O switch aplica na hora; se a mudança pode falhar, desfaça e avise num toast.", naSwitchError: "O mesmo: o toast explica a falha.",
  sSave: "Salvar", sAmount: "Valor", sPeriod: "Período", sMarch: "Março", sPaid: "Pago", sAlerts: "Alertas",
  noProps: "Nenhuma propriedade além dos atributos do próprio elemento.", props: "Propriedades", prop: "Propriedade", type: "Tipo", default: "Padrão", description: "Descrição",
  keyboard: "Teclado", keys: "Teclas", whatHappens: "O que acontece", examples: "Exemplos", states: "Estados", statesIntro: "Os sete estados do contrato, forçados para aparecerem lado a lado. Estas amostras não são interativas.",
  accessibility: "Acessibilidade", usage: "Uso", do: "Faça", dont: "Evite", importLabel: "Importação",
  notFound: "Não encontrada", notFoundTitle: "Página não encontrada", notFoundEmpty: "Não há nada neste endereço", notFoundBody: "Ele pode ter mudado ou nunca ter existido.", backHome: "Voltar para a introdução",
  fColor: "Cor", fTypography: "Tipografia", fSpacing: "Espaçamento e layout", fElevation: "Elevação e movimento", fLayers: "Camadas", fAccessibility: "Acessibilidade",
  eyebrowDs: "Design system", homeLead: "Um design system medido antes de afirmado. Tokens em OKLCH, um contrato de sete estados para cada controle e componentes React acessíveis construídos sobre o Radix UI.",
  statComponents: "Componentes", statComponentsNote: "{n} páginas de documentação", statColors: "Tokens de cor", statColorsNote: "{n} semânticos, por tema", statPairs: "Pares de contraste", statPairsNote: "{n} pares em dois temas, todos testados",
  principles: "Princípios",
  p1t: "Medido antes de afirmado", p1d: "Todo par de cores que o sistema documenta é conferido contra a WCAG 2.1 nos dois temas por um teste que derruba o build. Se não pode ser medido, não é afirmado.",
  p2t: "Sete estados, todo controle", p2d: "Padrão, hover, foco, ativo, desabilitado, carregando e erro, desenhados e documentados para cada controle, inclusive os que não se aplicam, e por quê.",
  p3t: "Cor nunca é o único sinal", p3d: "Os estados têm símbolo e palavra. Quem não distingue verde de vermelho, ou imprime em preto e branco, continua lendo.",
  p4t: "O teclado não é plano B", p4d: "O foco está sempre visível, os sobrepostos prendem e devolvem o foco, e cada página de componente lista as suas teclas.",
  startTitle: "Começar", installLabel: "Instalar e usar", codeComment: "Valor", codeHint: "Use vírgula para os centavos.", codeSave: "Salvar documento",
  tailwindNote: "Usa Tailwind CSS v4? Importe `@kaykesiquara/prumo/tailwind.css` depois do Tailwind e os tokens viram utilitários como `bg-surface` e `text-danger-text`. Os tokens brutos estão no `tokens.json`, no formato W3C Design Tokens.",
  themesTitle: "Temas", themesBody: "Claro e escuro seguem o sistema por padrão. Use `data-pr-theme=\"light\"` ou `\"dark\"` em qualquer elemento para forçar um, e `data-pr-density=\"compact\"` para controles mais densos.",
  next: "Por onde seguir", nextColor: "[Cor](/foundations/color): a paleta, os tokens semânticos e cada par de contraste, medidos ao vivo.", nextA11y: "[Acessibilidade](/foundations/accessibility): o contrato que todo componente cumpre.", nextButton: "[Button](/components/button): uma página de componente, com os sete estados.",
  colorLead: "As cores são escritas em OKLCH, então um degrau de luminosidade parece o mesmo degrau em qualquer matiz. Os neutros têm um pouco de croma na matiz 266, o que evita que o cinza pareça sujo ao lado da marca.",
  allInGamut: "As 58 cores cabem no gamut sRGB", someOutGamut: "Algumas cores ficam fora do sRGB", pairsPass: "{n} de {total} pares de contraste passam",
  palette: "Paleta", paletteBody: "Uma cor escrita fora do gamut é recortada pelo navegador, então a cor que vai para a tela não é a que foi medida. Cada degrau aqui foi ajustado ao sRGB antes de ser escrito.", scaleOf: "Escala {name}",
  semantic: "Tokens semânticos", semanticBody: "Os componentes nunca usam a paleta diretamente. Eles usam estes nomes, e cada tema os liga a um degrau da paleta.", semanticCaption: "Tokens semânticos e o degrau da paleta que cada tema usa", token: "Token", lightCol: "Claro", darkCol: "Escuro",
  contrast: "Contraste", contrastBody: "Cada par abaixo é calculado a partir dos tokens enquanto a página renderiza, com a mesma função que os testes usam. Texto precisa de 4,5:1; bordas de controle, anéis de foco e indicadores precisam de 3:1.",
  contrastCaption: "Contraste de cada par documentado, nos dois temas", foreground: "Frente", background: "Fundo", minimum: "Mínimo",
  distance: "Distinguir os estados", distanceBody: "Contraste responde se o texto pode ser lido. Ele não responde se duas cores de estado podem ser distinguidas, que é o que importa quando um aviso fica ao lado de um erro numa tabela densa. Isso é uma distância em OKLab. Nenhuma norma define um valor mínimo para ela, então ela aparece como medida: use para comparar uma paleta antes e depois de uma mudança.",
  distanceCaption: "Distância em OKLab entre as cores sólidas de estado", pair: "Par",
  typeLead: "Uma família, a do sistema, então o texto aparece na hora e parece nativo em qualquer plataforma. Os tamanhos são em rem, então acompanham a configuração do navegador de quem lê.", scale: "Escala", typeSample: "Prestação de contas em dia",
  weightLeading: "Peso e entrelinha", leadingTight: "Entrelinha {k}, usada em títulos.", leadingSnug: "Entrelinha {k}, usada em subtítulos e interface densa.", leadingNormal: "Entrelinha {k}, usada no texto corrido.",
  spacingLead: "Uma grade de 4 px. Os controles têm três alturas, e a densidade compacta reduz todas de uma vez.", space: "Espaçamento", radius: "Raio", controlHeight: "Altura de controle",
  controlBody: "Ligue Compacta no topo da página para ver a mudança: 32, 40 e 48 px viram 28, 32 e 40.", breakpoints: "Faixas de tela",
  breakpointsBody: "Cinco faixas, do celular pequeno ao desktop grande. Os componentes preferem container queries: a tabela vira cartões abaixo de 675 px da própria largura, onde quer que esteja.",
  width: "Largura", typicalScreen: "Tela típica", bp0: "Celular pequeno", bp1: "Celular grande e tablet pequeno", bp2: "Tablet e notebook pequeno", bp3: "Notebook", bp4: "Desktop grande",
  elevLead: "Três sombras e três durações. As sombras são mais fortes no tema escuro, onde uma sombra suave desapareceria.", shadow: "Sombra", motion: "Movimento",
  motionBody: "O movimento explica uma mudança de lugar, não decora. Com o movimento reduzido ligado, toda animação do sistema vira instantânea.", moveSquares: "Mover os quadrados", moveBack: "Voltar",
  easing: "Aceleração: `standard` é `{standard}` para mudanças pequenas, `emphasized` é `{emphasized}` para o que entra na tela.",
  layersLead: "Empilhamento é um vocabulário, não um número escolhido no dia. Cada camada tem um nome, e o componente pede a sua camada pelo nome.", theScale: "A escala", layersList: "Camadas, de cima para baixo",
  whyOrder: "Por que estas, nesta ordem", why1: "O toast fica acima do modal, porque uma confirmação pode chegar com um diálogo aberto e ainda precisa ser vista.", why2: "O tooltip fica acima de tudo, porque descreve o que aponta, inclusive um toast.", why3: "Os menus ficam abaixo dos headers fixos, então um menu aberto no conteúdo passa por baixo do header em vez de cobri-lo.",
  zmenu: "Menus, popovers e selects", zsticky: "Headers fixos", zbackdrop: "Fundo atrás de um modal", zmodal: "Diálogos e painéis laterais", ztoast: "Notificações, acima de qualquer modal", ztooltip: "Tooltips, acima de tudo",
  a11yLead: "Acessibilidade faz parte do contrato de cada componente, e o contrato é testado. Esta página lista o que todo componente promete.", sevenTitle: "Os sete estados",
  sevenBody: "Todo controle é desenhado em sete estados: padrão, hover, foco, ativo, desabilitado, carregando e erro. Quando um estado não se aplica, a página do componente diz e explica, então a lacuna é uma decisão, não um esquecimento. Veja o [Button](/components/button).",
  focus: "Foco", focusBody: "O anel de foco usa um token próprio, conferido em 3:1 contra a página e a superfície nos dois temas.", focusOk: "O anel de foco passa de 3:1 em todo lugar", focusBad: "O anel de foco falha em algum lugar",
  keeps: "O que todo componente cumpre", k1: "Um rótulo visível, ligado ao controle. O placeholder nunca substitui o rótulo.", k2: "Os erros dizem como corrigir, têm símbolo além da cor e chegam ao controle por `aria-describedby`.",
  k3: "Os sobrepostos levam o foco para dentro, mantêm o Tab lá, fecham no Esc e devolvem o foco para quem abriu.", k4: "Botões só com ícone não podem ser escritos sem rótulo: a tipagem exige.", k5: "Uma única região viva educada para confirmações, então cada uma é anunciada uma vez.",
  k6: "O movimento reduzido torna toda animação instantânea.", k7: "Os campos de texto usam 16 px, para o iOS não dar zoom ao focar.",
  tested: "Como é testado", t1: "Contraste: cada par documentado, nos dois temas, derruba o build abaixo do mínimo. O mesmo vale para qualquer cor fora do sRGB.", t2: "Comportamento: os testes são escritos sobre papéis, nomes acessíveis e teclado, nunca sobre classes CSS.", t3: "axe: cada página da documentação, uma página com todos os componentes e um diálogo aberto são conferidos contra a WCAG 2.1 A e AA.",
  exVariants: "Variantes", exSizes: "Tamanhos", exLoading: "Carregando", exIconOnly: "Só ícone", exWithHint: "Com dica", exWithError: "Com erro", exBasic: "Básico", exGroup: "Grupo", exWithDescription: "Com descrição",
  exTones: "Tons", exWithAction: "Com ação", exStatus: "Estados", exDeterminate: "Determinado", exConfirm: "Confirmação", exSortable: "Ordenável", exGrid: "Grade",
};

export const DICT = { en, pt };
const STORE = "prumo:lang";

function initial(): Lang {
  try {
    const saved = localStorage.getItem(STORE);
    if (saved === "en" || saved === "pt") return saved;
  } catch { return "en"; }
  return typeof navigator !== "undefined" && /^pt\b/i.test(navigator.language) ? "pt" : "en";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: Key, vars?: Record<string, string | number>) => string };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children, lang: forced }: { children: ReactNode; lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(() => forced ?? initial());
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    try { localStorage.setItem(STORE, lang); } catch { return; }
  }, [lang]);
  const value = useMemo<Ctx>(() => ({
    lang, setLang,
    t: (key, vars) => Object.entries(vars ?? {}).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), DICT[lang][key] ?? key),
  }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang needs LangProvider");
  return ctx;
}

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("`")) return <code key={i}>{p.slice(1, -1)}</code>;
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
        if (m) return <RouterLink key={i} className="pr-link" to={m[2]}>{m[1]}</RouterLink>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

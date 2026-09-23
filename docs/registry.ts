export type PropDoc = { name: string; type: string; default: string; description: string };
export type Doc = { slug: string; name: string; group: string; summary: string; exports: string[]; examples: string[]; props: PropDoc[]; keyboard: string[][]; a11y: string[]; states: null | "button" | "input" | "select" | "checkbox" | "switch"; do: string[]; dont: string[] };

export const docs: Doc[] = [
  {
    "slug": "button",
    "name": "Button",
    "group": "Actions",
    "summary": "Triggers an action. One primary per view, danger only for actions that destroy data.",
    "exports": [
      "Button",
      "IconButton"
    ],
    "examples": [
      "Variants",
      "Sizes",
      "Loading",
      "IconOnly"
    ],
    "props": [
      {
        "name": "variant",
        "type": "\"primary\" | \"secondary\" | \"ghost\" | \"danger\"",
        "default": "\"secondary\"",
        "description": "Visual weight. Keep one primary action per view."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\"",
        "description": "Height follows the control tokens and the density."
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a spinner, keeps the label for screen readers and the width steady, and ignores clicks."
      },
      {
        "name": "iconStart / iconEnd",
        "type": "ReactNode",
        "default": "",
        "description": "Decorative icons around the label."
      },
      {
        "name": "label (IconButton)",
        "type": "string",
        "default": "",
        "description": "Required. The accessible name of an icon-only button."
      }
    ],
    "keyboard": [
      [
        "Enter, Space",
        "Activates the button"
      ]
    ],
    "a11y": [
      "Loading sets aria-busy and aria-disabled but keeps the button focusable, so focus is not lost mid-action.",
      "IconButton cannot be used without a label: the type system requires it.",
      "Disabled buttons are skipped by Tab. Prefer explaining why an action is unavailable next to it."
    ],
    "states": "button",
    "do": [
      "Write the action as a verb: “Save document”, not “OK”.",
      "Reserve danger for actions that destroy data."
    ],
    "dont": [
      "Use a primary button for every action on the screen.",
      "Color a button by the context it sits in: an action inside a rejection block is not dangerous."
    ]
  },
  {
    "slug": "field",
    "name": "Field",
    "group": "Forms",
    "summary": "Wraps a control with a visible label, an optional hint and an error, and wires them together.",
    "exports": [
      "Field",
      "useField"
    ],
    "examples": [
      "WithHint",
      "WithError"
    ],
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "",
        "description": "Always rendered; hideLabel keeps it for screen readers only."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "default": "",
        "description": "Hint shown below the label."
      },
      {
        "name": "error",
        "type": "ReactNode",
        "default": "",
        "description": "Marks the control invalid and describes it."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Adds the native required attribute and a visual marker."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the control inside."
      }
    ],
    "keyboard": [],
    "a11y": [
      "The label is a real <label for>. The hint and the error reach the control through aria-describedby, error first.",
      "The error carries a symbol as well as color, and the symbol is hidden from screen readers."
    ],
    "states": null,
    "do": [
      "Say how to fix it: “needs 14 digits”, not “invalid”."
    ],
    "dont": [
      "Use the placeholder as the label."
    ]
  },
  {
    "slug": "text-input",
    "name": "TextInput and TextArea",
    "group": "Forms",
    "summary": "Single and multi-line text entry, with an optional leading icon and a loading state.",
    "exports": [
      "TextInput",
      "TextArea"
    ],
    "examples": [
      "Basic",
      "Loading"
    ],
    "props": [
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\"",
        "description": "Height."
      },
      {
        "name": "iconStart",
        "type": "ReactNode",
        "default": "",
        "description": "Decorative leading icon."
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a spinner and sets aria-busy."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "",
        "description": "Overrides the Field error state."
      }
    ],
    "keyboard": [],
    "a11y": [
      "Font size is 16 px so iOS does not zoom on focus.",
      "The placeholder meets 4.5:1, but it never replaces the label."
    ],
    "states": "input",
    "do": [],
    "dont": []
  },
  {
    "slug": "select",
    "name": "Select",
    "group": "Forms",
    "summary": "A native select, styled. Native means the keyboard and the mobile pickers work as people expect.",
    "exports": [
      "Select"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\"",
        "description": "Height."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "",
        "description": "Overrides the Field error state."
      }
    ],
    "keyboard": [
      [
        "Arrow keys",
        "Move through options"
      ],
      [
        "Type a letter",
        "Jumps to a matching option"
      ]
    ],
    "a11y": [
      "It is a real <select>, so there is nothing to re-implement for keyboards or screen readers."
    ],
    "states": "select",
    "do": [],
    "dont": []
  },
  {
    "slug": "checkbox",
    "name": "Checkbox",
    "group": "Forms",
    "summary": "A binary choice, or a mixed state when some children are selected.",
    "exports": [
      "Checkbox"
    ],
    "examples": [
      "Group",
      "WithDescription"
    ],
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "",
        "description": "Required, rendered as a real label."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "default": "",
        "description": "Extra detail, tied with aria-describedby."
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "The mixed state for a parent of partially selected items."
      }
    ],
    "keyboard": [
      [
        "Space",
        "Toggles the checkbox"
      ]
    ],
    "a11y": [
      "The native input is kept and restyled, so it stays in the accessibility tree with its checked and mixed states."
    ],
    "states": "checkbox",
    "do": [],
    "dont": []
  },
  {
    "slug": "radio-group",
    "name": "RadioGroup",
    "group": "Forms",
    "summary": "One choice among a few visible options.",
    "exports": [
      "RadioGroup"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "legend",
        "type": "ReactNode",
        "default": "",
        "description": "Names the group."
      },
      {
        "name": "options",
        "type": "RadioOption[]",
        "default": "",
        "description": "Value, label, optional description and disabled."
      },
      {
        "name": "value / defaultValue",
        "type": "string",
        "default": "",
        "description": "Controlled or uncontrolled."
      },
      {
        "name": "orientation",
        "type": "\"vertical\" | \"horizontal\"",
        "default": "\"vertical\"",
        "description": "Layout only."
      }
    ],
    "keyboard": [
      [
        "Arrow keys",
        "Move and select within the group"
      ],
      [
        "Tab",
        "Leaves the group"
      ]
    ],
    "a11y": [
      "A fieldset with a legend, so the group is announced with its name."
    ],
    "states": "checkbox",
    "do": [],
    "dont": []
  },
  {
    "slug": "switch",
    "name": "Switch",
    "group": "Forms",
    "summary": "Turns a setting on or off immediately, with no save button.",
    "exports": [
      "Switch"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "",
        "description": "Required."
      },
      {
        "name": "checked / defaultChecked",
        "type": "boolean",
        "default": "",
        "description": "Controlled or uncontrolled."
      },
      {
        "name": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "default": "",
        "description": "Called on every flip."
      }
    ],
    "keyboard": [
      [
        "Space, Enter",
        "Flips the switch"
      ]
    ],
    "a11y": [
      "role=switch with aria-checked. Use a Checkbox instead when the change only applies after saving a form."
    ],
    "states": "switch",
    "do": [],
    "dont": []
  },
  {
    "slug": "alert",
    "name": "Alert",
    "group": "Feedback",
    "summary": "A message that stays on the page until the situation changes.",
    "exports": [
      "Alert"
    ],
    "examples": [
      "Tones",
      "WithAction"
    ],
    "props": [
      {
        "name": "tone",
        "type": "\"info\" | \"success\" | \"warning\" | \"danger\"",
        "default": "\"info\"",
        "description": "Icon and color."
      },
      {
        "name": "title",
        "type": "ReactNode",
        "default": "",
        "description": "The message in one line."
      },
      {
        "name": "action",
        "type": "ReactNode",
        "default": "",
        "description": "A button that resolves the situation."
      },
      {
        "name": "live",
        "type": "boolean",
        "default": "false",
        "description": "Announces the alert when it appears."
      }
    ],
    "keyboard": [],
    "a11y": [
      "Static alerts are not live regions. Set live only when the alert appears after an action, so it is announced once."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "badge",
    "name": "Badge",
    "group": "Feedback",
    "summary": "A short status label.",
    "exports": [
      "Badge"
    ],
    "examples": [
      "Status"
    ],
    "props": [
      {
        "name": "tone",
        "type": "\"neutral\" | \"accent\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
        "default": "\"neutral\"",
        "description": "Color."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "default": "",
        "description": "A symbol, so the state never depends on color alone."
      }
    ],
    "keyboard": [],
    "a11y": [
      "Pair tone with a symbol and a word. Someone who cannot tell green from red, or who prints in black and white, still reads the state."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "progress",
    "name": "Progress, Spinner and Skeleton",
    "group": "Feedback",
    "summary": "Progress for known amounts, a spinner for short waits, skeletons for layout that is on its way.",
    "exports": [
      "Progress",
      "Spinner",
      "Skeleton"
    ],
    "examples": [
      "Determinate",
      "Loading"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "default": "",
        "description": "Omit it for an indeterminate bar."
      },
      {
        "name": "label",
        "type": "string",
        "default": "",
        "description": "Required: names the progress bar."
      },
      {
        "name": "showValue",
        "type": "boolean",
        "default": "false",
        "description": "Prints the percentage."
      },
      {
        "name": "label (Spinner)",
        "type": "string",
        "default": "",
        "description": "With a label it is announced; without one it is decorative."
      }
    ],
    "keyboard": [],
    "a11y": [
      "Progress uses role=progressbar with its value. Skeletons are hidden from assistive technology; pair them with a labelled Spinner or text."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "toast",
    "name": "Toast",
    "group": "Feedback",
    "summary": "A brief confirmation after an action, with an optional undo.",
    "exports": [
      "ToastProvider",
      "useToast"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "message",
        "type": "ReactNode",
        "default": "",
        "description": "What happened, in past tense."
      },
      {
        "name": "tone",
        "type": "\"neutral\" | \"success\" | \"danger\"",
        "default": "\"neutral\"",
        "description": "Icon."
      },
      {
        "name": "action",
        "type": "{ label, onClick }",
        "default": "",
        "description": "A single action, such as Undo."
      },
      {
        "name": "duration",
        "type": "number",
        "default": "5000",
        "description": "Milliseconds before it leaves."
      }
    ],
    "keyboard": [],
    "a11y": [
      "All toasts share one polite live region, so each message is announced once and never interrupts.",
      "Never put the only path to something important in a toast: it disappears."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "dialog",
    "name": "Dialog and ConfirmDialog",
    "group": "Overlays",
    "summary": "A focused task on top of the page. ConfirmDialog asks before an irreversible action.",
    "exports": [
      "Dialog",
      "ConfirmDialog",
      "DialogClose"
    ],
    "examples": [
      "Basic",
      "Confirm"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "default": "",
        "description": "Required, becomes the accessible name."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "default": "",
        "description": "Becomes the accessible description."
      },
      {
        "name": "trigger",
        "type": "ReactNode",
        "default": "",
        "description": "The element that opens it."
      },
      {
        "name": "open / onOpenChange",
        "type": "",
        "default": "",
        "description": "Controlled mode."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\"",
        "description": "Width."
      },
      {
        "name": "tone (Confirm)",
        "type": "\"primary\" | \"danger\"",
        "default": "\"primary\"",
        "description": "Style of the confirm button."
      }
    ],
    "keyboard": [
      [
        "Tab, Shift+Tab",
        "Cycles through the dialog only"
      ],
      [
        "Esc",
        "Closes and returns focus to the trigger"
      ]
    ],
    "a11y": [
      "Focus moves in on open and returns to the trigger on close.",
      "ConfirmDialog uses role=alertdialog.",
      "It sits on the modal layer, above sticky headers and below toasts."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "sheet",
    "name": "Sheet",
    "group": "Overlays",
    "summary": "A side panel for details and secondary tasks, keeping the page in context.",
    "exports": [
      "Sheet"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "side",
        "type": "\"left\" | \"right\"",
        "default": "\"right\"",
        "description": "Edge it slides from."
      },
      {
        "name": "title",
        "type": "ReactNode",
        "default": "",
        "description": "Required."
      }
    ],
    "keyboard": [
      [
        "Esc",
        "Closes and returns focus"
      ]
    ],
    "a11y": [
      "Same focus contract as Dialog."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "popover",
    "name": "Popover",
    "group": "Overlays",
    "summary": "Small interactive content anchored to a trigger.",
    "exports": [
      "Popover"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "trigger",
        "type": "ReactNode",
        "default": "",
        "description": "Required."
      },
      {
        "name": "label",
        "type": "string",
        "default": "",
        "description": "Names the popover."
      },
      {
        "name": "align",
        "type": "\"start\" | \"center\" | \"end\"",
        "default": "\"center\"",
        "description": "Alignment to the trigger."
      }
    ],
    "keyboard": [
      [
        "Esc",
        "Closes"
      ],
      [
        "Tab",
        "Moves through its content"
      ]
    ],
    "a11y": [
      "Use a Dialog instead when the task needs the whole attention of the person."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "tooltip",
    "name": "Tooltip",
    "group": "Overlays",
    "summary": "A short label that appears on hover and on keyboard focus.",
    "exports": [
      "Tooltip"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "default": "",
        "description": "Plain text, one line."
      },
      {
        "name": "side",
        "type": "\"top\" | \"right\" | \"bottom\" | \"left\"",
        "default": "\"top\"",
        "description": "Placement."
      }
    ],
    "keyboard": [
      [
        "Tab",
        "Focusing the trigger shows the tooltip"
      ],
      [
        "Esc",
        "Hides it"
      ]
    ],
    "a11y": [
      "A tooltip is a supplement, never the accessible name: give icon buttons a label as well.",
      "It sits on the highest layer."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "menu",
    "name": "Menu",
    "group": "Overlays",
    "summary": "A list of actions behind a button.",
    "exports": [
      "Menu",
      "MenuItem",
      "MenuLabel",
      "MenuSeparator"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "trigger",
        "type": "ReactNode",
        "default": "",
        "description": "Required."
      },
      {
        "name": "label",
        "type": "string",
        "default": "",
        "description": "Names the menu."
      },
      {
        "name": "tone (MenuItem)",
        "type": "\"danger\"",
        "default": "",
        "description": "For destructive items."
      },
      {
        "name": "shortcut (MenuItem)",
        "type": "string",
        "default": "",
        "description": "Shown, not bound."
      }
    ],
    "keyboard": [
      [
        "Enter, Space, ↓",
        "Opens the menu"
      ],
      [
        "↑ ↓",
        "Moves between items"
      ],
      [
        "Home, End",
        "First and last item"
      ],
      [
        "Esc",
        "Closes and returns focus"
      ]
    ],
    "a11y": [
      "Menus are for actions. For navigation, use links; for picking a value, use a Select."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "tabs",
    "name": "Tabs",
    "group": "Navigation",
    "summary": "Switches between views of the same content.",
    "exports": [
      "Tabs",
      "TabList",
      "Tab",
      "TabPanel"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "",
        "description": "Names the tab list."
      },
      {
        "name": "defaultValue / value",
        "type": "string",
        "default": "",
        "description": "Selected tab."
      }
    ],
    "keyboard": [
      [
        "← →",
        "Moves between tabs"
      ],
      [
        "Home, End",
        "First and last tab"
      ],
      [
        "Tab",
        "Moves into the panel"
      ]
    ],
    "a11y": [
      "Tabs follow the ARIA pattern with automatic activation; disabled tabs are skipped by the arrows."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "breadcrumb",
    "name": "Breadcrumb",
    "group": "Navigation",
    "summary": "Shows where a page sits and links back up the hierarchy.",
    "exports": [
      "Breadcrumb"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "items",
        "type": "{ label, href? }[]",
        "default": "",
        "description": "The last item is the current page."
      }
    ],
    "keyboard": [],
    "a11y": [
      "A nav landmark with its own name; the current page carries aria-current=page."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "pagination",
    "name": "Pagination",
    "group": "Navigation",
    "summary": "Moves through pages of a long list, with the pages around the current one.",
    "exports": [
      "Pagination",
      "pageWindow"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "page / pages",
        "type": "number",
        "default": "",
        "description": "Current page and total."
      },
      {
        "name": "onPageChange",
        "type": "(page: number) => void",
        "default": "",
        "description": "Required."
      },
      {
        "name": "pageLabel",
        "type": "(page: number) => string",
        "default": "",
        "description": "Accessible name for each page button, for translation."
      }
    ],
    "keyboard": [],
    "a11y": [
      "The current page carries aria-current=page. Previous and Next are disabled at the ends, not hidden, so the layout never jumps."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "link",
    "name": "Link",
    "group": "Navigation",
    "summary": "Inline navigation. External links say so.",
    "exports": [
      "Link"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "external",
        "type": "boolean",
        "default": "false",
        "description": "Opens in a new tab and tells screen readers."
      },
      {
        "name": "externalLabel",
        "type": "string",
        "default": "\"opens in a new tab\"",
        "description": "For translation."
      }
    ],
    "keyboard": [],
    "a11y": [
      "Links are underlined in body text; color is not the only cue."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "table",
    "name": "Table",
    "group": "Data display",
    "summary": "Dense tabular data with sortable headers. Below 675 px of its own width, rows turn into cards.",
    "exports": [
      "Table",
      "Th",
      "Td"
    ],
    "examples": [
      "Sortable"
    ],
    "props": [
      {
        "name": "caption",
        "type": "ReactNode",
        "default": "",
        "description": "Required. Say how the table is sorted."
      },
      {
        "name": "density",
        "type": "\"comfortable\" | \"compact\"",
        "default": "\"comfortable\"",
        "description": "Row height."
      },
      {
        "name": "stackBelow",
        "type": "boolean",
        "default": "true",
        "description": "Rows become cards when the container is narrow."
      },
      {
        "name": "sort (Th)",
        "type": "\"ascending\" | \"descending\" | false",
        "default": "",
        "description": "Makes the header sortable; only the active one gets aria-sort."
      },
      {
        "name": "label (Td)",
        "type": "string",
        "default": "",
        "description": "Shown before the value in card mode."
      }
    ],
    "keyboard": [
      [
        "Tab",
        "Reaches each sort button"
      ],
      [
        "Enter, Space",
        "Sorts by that column"
      ]
    ],
    "a11y": [
      "Sort buttons live inside the headers; aria-sort is only set on the column that is sorted.",
      "The switch to cards is a container query: the table responds to the width it was given, not to the window."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "card",
    "name": "Card",
    "group": "Data display",
    "summary": "Groups related content with an optional title and actions.",
    "exports": [
      "Card"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "default": "",
        "description": "Becomes a heading."
      },
      {
        "name": "headingLevel",
        "type": "2 | 3 | 4",
        "default": "2",
        "description": "Keep the outline in order."
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "default": "",
        "description": "Buttons in the header."
      },
      {
        "name": "padded",
        "type": "boolean",
        "default": "true",
        "description": "Turn off for tables."
      }
    ],
    "keyboard": [],
    "a11y": [
      "With a title, the card is a section named by its heading."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "stat",
    "name": "Stat",
    "group": "Data display",
    "summary": "A key number with its label and change.",
    "exports": [
      "Stat"
    ],
    "examples": [
      "Grid"
    ],
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "",
        "description": ""
      },
      {
        "name": "value",
        "type": "ReactNode",
        "default": "",
        "description": ""
      },
      {
        "name": "delta",
        "type": "ReactNode",
        "default": "",
        "description": "Write the change in words."
      },
      {
        "name": "trend",
        "type": "\"up\" | \"down\" | \"flat\"",
        "default": "",
        "description": "Adds a decorative arrow and color."
      }
    ],
    "keyboard": [],
    "a11y": [
      "The arrow is hidden from screen readers; the delta text carries the meaning."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "avatar",
    "name": "Avatar",
    "group": "Data display",
    "summary": "A person, by photo or initials.",
    "exports": [
      "Avatar"
    ],
    "examples": [
      "Sizes"
    ],
    "props": [
      {
        "name": "name",
        "type": "string",
        "default": "",
        "description": "Required, becomes the accessible name."
      },
      {
        "name": "src",
        "type": "string",
        "default": "",
        "description": "Optional photo."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\"",
        "description": ""
      }
    ],
    "keyboard": [],
    "a11y": [
      "role=img named after the person; the initials are decorative."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "empty-state",
    "name": "EmptyState",
    "group": "Data display",
    "summary": "Explains why there is nothing here and what to do next.",
    "exports": [
      "EmptyState"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "default": "",
        "description": ""
      },
      {
        "name": "action",
        "type": "ReactNode",
        "default": "",
        "description": "Usually the way out, such as clearing filters."
      }
    ],
    "keyboard": [],
    "a11y": [
      "Say why it is empty and offer the next step."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "kbd",
    "name": "Kbd",
    "group": "Data display",
    "summary": "A key or shortcut.",
    "exports": [
      "Kbd"
    ],
    "examples": [
      "Basic"
    ],
    "props": [],
    "keyboard": [],
    "a11y": [
      "Renders the native <kbd> element."
    ],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "stack",
    "name": "Stack",
    "group": "Layout",
    "summary": "Lays children out in a row or a column with a gap from the spacing scale.",
    "exports": [
      "Stack"
    ],
    "examples": [
      "Basic"
    ],
    "props": [
      {
        "name": "direction",
        "type": "\"row\" | \"column\"",
        "default": "\"column\"",
        "description": ""
      },
      {
        "name": "gap",
        "type": "0–12",
        "default": "4",
        "description": "A step of the spacing scale."
      },
      {
        "name": "align / justify",
        "type": "CSS",
        "default": "",
        "description": ""
      },
      {
        "name": "wrap",
        "type": "boolean",
        "default": "false",
        "description": ""
      }
    ],
    "keyboard": [],
    "a11y": [],
    "states": null,
    "do": [],
    "dont": []
  },
  {
    "slug": "visually-hidden",
    "name": "VisuallyHidden",
    "group": "Layout",
    "summary": "Text for screen readers only.",
    "exports": [
      "VisuallyHidden"
    ],
    "examples": [
      "Basic"
    ],
    "props": [],
    "keyboard": [],
    "a11y": [
      "Use it to complete a visual shorthand, never to hide content from sighted people that others get."
    ],
    "states": null,
    "do": [],
    "dont": []
  }
];

export const groups = ["Actions", "Forms", "Feedback", "Overlays", "Navigation", "Data display", "Layout"];

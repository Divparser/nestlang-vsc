const vscode = require('vscode');

const TYPES = [
  'string', 'number', 'boolean', 'url', 'datetime',
  'object', 'array', 'array:string', 'array:number',
  'array:boolean', 'array:url', 'array:object'
];

function activate(context) {

  // Intellisense — autocomplete types inside parentheses
  const typeCompletion = vscode.languages.registerCompletionItemProvider(
    'nestlang',
    {
      provideCompletionItems(document, position) {
        const lineText = document.lineAt(position).text;
        const beforeCursor = lineText.substring(0, position.character);

        // Only trigger inside parentheses
        if (!beforeCursor.includes('(')) return;

        return TYPES.map(type => {
          const item = new vscode.CompletionItem(type, vscode.CompletionItemKind.TypeParameter);
          item.detail = `Nestlang type: ${type}`;
          item.documentation = getTypeDoc(type);
          return item;
        });
      }
    },
    '(' // trigger character
  );

  // Intellisense — autocomplete datetime patterns
  const datetimeCompletion = vscode.languages.registerCompletionItemProvider(
    'nestlang',
    {
      provideCompletionItems(document, position) {
        const lineText = document.lineAt(position).text;
        const beforeCursor = lineText.substring(0, position.character);

        if (!beforeCursor.includes('datetime:')) return;

        const patterns = [
          { label: 'Y-M-D', detail: '2026-05-12' },
          { label: 'D-M-Y', detail: '12-05-2026' },
          { label: 'M-D-Y', detail: '05-12-2026' },
          { label: 'Y/M/D', detail: '2026/05/12' },
          { label: 'D/M/Y', detail: '12/05/2026' },
        ];

        return patterns.map(p => {
          const item = new vscode.CompletionItem(p.label, vscode.CompletionItemKind.Value);
          item.detail = `Format: ${p.detail}`;
          return item;
        });
      }
    },
    ':' // trigger character
  );

  // Hover documentation
  const hoverProvider = vscode.languages.registerHoverProvider('nestlang', {
    provideHover(document, position) {
      const wordRange = document.getWordRangeAtPosition(position, /[a-z]+(?::[a-z]+)?/);
      if (!wordRange) return;

      const word = document.getText(wordRange);
      const doc = getTypeDoc(word);
      if (!doc) return;

      return new vscode.Hover(new vscode.MarkdownString(doc));
    }
  });

  context.subscriptions.push(typeCompletion, datetimeCompletion, hoverProvider);
}

function getTypeDoc(type) {
  const docs = {
    'string': '**string** — Any text value.\n\nExample: `"Widget Pro"`',
    'number': '**number** — Integer or decimal value.\n\nExample: `49.99`',
    'boolean': '**boolean** — True or false value.\n\nExample: `true`',
    'url': '**url** — A URL string.\n\nExample: `"https://example.com/product"`',
    'datetime': '**datetime** — Date and time value. Optionally format with `datetime:Y-M-D`.',
    'object': '**object** — A nested object with child fields defined by indented `-` fields.',
    'array': '**array** — A list of strings by default.',
    'array:string': '**array:string** — A list of string values.',
    'array:number': '**array:number** — A list of numeric values.',
    'array:boolean': '**array:boolean** — A list of boolean values.',
    'array:url': '**array:url** — A list of URL strings.',
    'array:object': '**array:object** — A list of objects. Define child fields using indented `-` fields below.',
  };
  return docs[type] || null;
}

function deactivate() {}

module.exports = { activate, deactivate };

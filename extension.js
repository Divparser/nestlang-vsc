const vscode = require('vscode');

// Autocomplete only ever suggests the current preferred names — "string" and
// "url" still parse fine (see getTypeDoc's docs map below, which keeps
// entries for both so hovering existing usages still shows something), they
// just aren't offered for new fields.
const TYPES = [
  'text', 'link', 'number', 'boolean', 'date',
  'object', 'array', 'array:text', 'array:link', 'array:number',
  'array:boolean', 'array:date', 'array:object'
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

        if (!beforeCursor.includes('date:') && !beforeCursor.includes('datetime:')) return;

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
    'text': '**text** — Visible text content. The default when a field has no type and no children.\n\nExample: `"Widget Pro"`',
    'string': '**string** — Alias for `text`, kept for older schemas. Prefer `text` for new fields.\n\nExample: `"Widget Pro"`',
    'link': '**link** — An `<a>` element\'s `href`, instead of its visible text. Use this for any URL/link field.\n\nExample: `"https://example.com/product"`',
    'url': '**url** — Older name for `link`, kept for older schemas. Prefer `link` for new fields.\n\nExample: `"https://example.com/product"`',
    'number': '**number** — Integer or decimal value.\n\nExample: `49.99`',
    'boolean': '**boolean** — True or false value.\n\nExample: `true`',
    'date': '**date** — Date and time value. Optionally format with `date:Y-M-D`.',
    'datetime': '**datetime** — Alias for `date`, kept for older schemas. Optionally format with `datetime:Y-M-D`.',
    'object': '**object** — A nested object with child fields defined by indented `-` fields.',
    'array': '**array** — A list of objects by default (same as `array:object`) when it has child fields, otherwise a list of text values.',
    'array:text': '**array:text** — A list of text values.',
    'array:string': '**array:string** — Alias for `array:text`, kept for older schemas.',
    'array:link': '**array:link** — A list of link (`href`) values.',
    'array:url': '**array:url** — Alias for `array:link`, kept for older schemas.',
    'array:number': '**array:number** — A list of numeric values.',
    'array:boolean': '**array:boolean** — A list of boolean values.',
    'array:date': '**array:date** — A list of date values.',
    'array:object': '**array:object** — A list of objects. Define child fields using indented `-` fields below.',
  };
  return docs[type] || null;
}

function deactivate() {}

module.exports = { activate, deactivate };

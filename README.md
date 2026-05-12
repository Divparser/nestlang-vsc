# Nestlang for VS Code

Official VS Code extension for [Nestlang](https://divparser.com/docs?p=Nestlang) — the typed schema language for [DivParser](https://divparser.com).

## Features

- **Syntax highlighting** — field names, descriptions, types and comments all distinctly colored
- **Intellisense** — autocomplete all Nestlang types as you type
- **Hover documentation** — hover over any type to see what it does and an example
- **Snippets** — common schema templates for listings, detail pages, pagination and more
- **Auto-indentation** — automatically indents after `(array:object)` and `(object)` declarations
- **Auto-closing** — parentheses close automatically

## Snippets

| Prefix | Description |
|---|---|
| `nsl-listing` | Listing page schema |
| `nsl-detail` | Detail page schema |
| `nsl-full` | Full page schema with pagination |
| `nsl-field` | Single field |
| `nsl-child` | Child field |
| `nsl-pagination` | Pagination block |
| `nsl-comment` | Comment |

## Nestlang Syntax

```nsl
# Schema for a product listing page

products: all products on the page (array:object)
  -name: Product name (string)
  -price: Product price (number)
  -in_stock: Whether the product is available (boolean)
  -images: Product image URLs (array:url)
  -variants: Available variants (array:object)
    -size: Size label (string)
    -available: Whether this variant is in stock (boolean)

pagination: pagination info (object)
  -current_page: Current page number (number)
  -total_pages: Total number of pages (number)
  -next_url: Next page URL (url)
```

## Supported Types

| Type | Description |
|---|---|
| `string` | Any text value |
| `number` | Integer or decimal |
| `boolean` | True or false |
| `url` | A URL string |
| `datetime` | Date/time value |
| `datetime:Y-M-D` | Date with custom format |
| `object` | Nested object with child fields |
| `array` | List of strings (default) |
| `array:string` | List of strings |
| `array:number` | List of numbers |
| `array:boolean` | List of booleans |
| `array:url` | List of URLs |
| `array:object` | List of objects with child fields |

## Links

- [DivParser](https://divparser.com)
- [Nestlang Documentation](https://divparser.com/docs?p=Nestlang)
- [Report an Issue](https://github.com/divparser/nestlang-vscode/issues)

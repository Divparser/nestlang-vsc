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
  -name: Product name (text)
  -url: Product page link (link)
  -price: Product price (number)
  -in_stock: Whether the product is available (boolean)
  -images: Product image URLs (array:link)
  -variants: Available variants (array:object)
    -size: Size label (text)
    -available: Whether this variant is in stock (boolean)

pagination: pagination info (object)
  -current_page: Current page number (number)
  -total_pages: Total number of pages (number)
  -next_url: Next page URL (link)
```

## Supported Types

| Type | Description |
|---|---|
| `text` | Visible text content (default for a field with no type and no children) |
| `string` | Alias for `text`, kept for older schemas — prefer `text` |
| `link` | An `<a>` element's `href`, instead of its visible text — use for any URL field |
| `number` | Integer or decimal |
| `boolean` | True or false |
| `date` | Date/time value |
| `date:Y-M-D` | Date with a custom format |
| `datetime` | Alias for `date`, kept for older schemas — prefer `date` |
| `object` | Nested object with child fields |
| `array` | List of objects if it has child fields, otherwise a list of text values |
| `array:text` | List of text values |
| `array:link` | List of links |
| `array:number` | List of numbers |
| `array:boolean` | List of booleans |
| `array:date` | List of dates |
| `array:object` | List of objects with child fields |

`string`, `url`, and `datetime` still work — every existing schema keeps validating and extracting
exactly as before — the table above just reflects the names new schemas should use.

## Links

- [DivParser](https://divparser.com)
- [Nestlang Documentation](https://divparser.com/docs?p=Nestlang)
- [Report an Issue](https://github.com/divparser/nestlang-vscode/issues)

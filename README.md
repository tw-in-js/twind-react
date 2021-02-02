# @twind/content

A [Twind](https://twind.dev) extension that provides a [CSS content property](https://developer.mozilla.org/en-US/docs/Web/CSS/content) directive.

[![MIT License](https://flat.badgen.net/github/license/tw-in-js/twind-content)](https://github.com/tw-in-js/twind-content/blob/main/LICENSE)
[![Latest Release](https://flat.badgen.net/npm/v/@twind/content?icon=npm&label&cache=10800&color=blue)](https://www.npmjs.com/package/@twind/content)
[![Github](https://flat.badgen.net/badge/icon/tw-in-js%2Ftwind-content?icon=github&label)](https://github.com/tw-in-js/twind-content)
[![Module Size](https://flat.badgen.net/badgesize/brotli/https:/unpkg.com/@twind/content/content.js?icon=jsdelivr&label&color=blue&cache=10800)](https://unpkg.com/@twind/content/content.js 'brotli module size')
[![Typescript](https://flat.badgen.net/badge/icon/included?icon=typescript&label)](https://unpkg.com/browse/@twind/content/content.d.ts)

## Installation

Install from npm:

```sh
# Using npm
npm install @twind/content

# Using Yarn
yarn add @twind/content
```

## Usage as Directive

> ❗ Values must be adhere to [CSS content property syntax](https://developer.mozilla.org/en-us/docs/Web/CSS/content).

```js
import { content } from '@twind/content'

tw`${content('"✅"')}`
// => .tw-xxxx { content: "✅" }

tw`before::${content('"✅"')}`
// => .tw-xxxx::before { content: "✅" }

tw`before::${content('attr(data-content)')}`
// => .tw-xxxx::before { content: attr(data-content) }

tw`after::${content('" (" attr(href) " )"')}`
// => .tw-xxxx::after { content: " (" attr(href) " )" }
```

## Usage as Plugin

Add to plugins of your setup call:

```js
import { content } from '@twind/content'

setup({
  plugins: {
    content,
  },
  // Optional: define content value aliases
  theme: {
    content: {
      check: '"✅"',
    },
  },
})
```

The following patterns are tried in order:

1. `content-<theme>` with `{ theme: { content: { key: value } } }`

```js
tw`before::content-check` // with { theme: { content: { check: '"✅"' } } }
// => .before\:\:content-check::before { content: "✅"; }
```

2. `content-(known value)`

List of [known values](https://developer.mozilla.org/en-us/docs/Web/CSS/content#syntax):

- `open-quote`
- `close-quote`
- `no-open-quote`
- `no-close-quote`
- `normal`
- `none`
- `inherit`
- `initial`
- `unset`

```js
tw`before::content-open-quote`
// => .before\:\:content-open-quote::before { content: open-quote; }
```

3. `content[-(attr|data|counter|var)-value]`

```js
tw`content`
// => .content { content: attr(data-content); }

tw`before::content`
// => .before\:\:content::before { content: attr(data-content); }

tw`before::content-data-before`
// => .before\:\:content-data-before::before { content: attr(data-before); }

tw`before::content-attr-href`
// => .before\:\:content-attr-href::before { content: attr(href); }

tw`before::content-counter-chapter_counter`
// => .before\:\:content-attr-data-before::before { content: counter(chapter_counter); }

tw`before::content-var-before`
// => .before\:\:content-var-before-before::before { content: var(--before); }
```

4. `content-<value>` using `JSON.stringify`

```js
tw`before::content-✅`
// => .before\:\:content-✅::before { content: "✅"; }
```

## FAQs

**Why is this not part of [Twind](https://twind.dev)?** There is not a official Tailwindcss `content` specification. By not adding it to Twind we prevent future incompatibilities.

## Prior Work

- https://github.com/croutonn/tailwindcss-pseudo-elements
- https://github.com/sgrowe/tailwind-pseudo-elements

## License

[MIT](https://github.com/tw-in-js/content/blob/main/LICENSE)

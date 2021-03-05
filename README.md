# @twind/react

A [Twind](https://twind.dev) styled API inspired by [stitches](https://stitches.dev).

[![MIT License](https://flat.badgen.net/github/license/tw-in-js/twind-react)](https://github.com/tw-in-js/twind-react/blob/main/LICENSE)
[![Latest Release](https://flat.badgen.net/npm/v/@twind/react?icon=npm&label&cache=10800&color=blue)](https://www.npmjs.com/package/@twind/react)
[![Github](https://flat.badgen.net/badge/icon/tw-in-js%2Ftwind-react?icon=github&label)](https://github.com/tw-in-js/twind-react)
[![Module Size](https://flat.badgen.net/badgesize/brotli/https:/unpkg.com/@twind/react/react.js?icon=jsdelivr&label&color=blue&cache=10800)](https://unpkg.com/@twind/react/react.js 'brotli module size')
[![Typescript](https://flat.badgen.net/badge/icon/included?icon=typescript&label)](https://unpkg.com/browse/@twind/react/react.d.ts)

> THIS IS AN ALPHA RELEASE. Expect dragons...

## Installation

Install from npm:

```sh
# Using npm
npm install @twind/react

# Using Yarn
yarn add @twind/react
```

## Usage

> Please see [twind/style](https://twind.dev/docs/modules/twind_style.html) for config examples.

```jsx
const Button = styled('button', {
  base: 'text-base',
  variants: {
    size: {
      sm: `text-sm`,
      lg: `text-lg`,
    },
  },
})

<Button>Click Me</Button>
<Button size="lg">Click Me</Button>
```

## License

[MIT](https://github.com/tw-in-js/react/blob/main/LICENSE)

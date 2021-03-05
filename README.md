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

[![Try this example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/twind-react-styled-90y9n?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark)

```jsx
import { styled } from "@twind/react"

const Box = styled()

const Button = styled("button", {
  base: `
    appearance-none border-none bg-transparent
    rounded-full px-2.5
  `,

  variants: {
    size: {
      sm: `text-sm h-6`,
      md: `text-base h-9`,
    },

    variant: {
      gray: `
        bg-gray-500
        hover:bg-gray-600
      `,
      primary: `
        text-white bg-purple-500
        hover:bg-purple-600
      `,
    },
    outlined: {
      true: `bg-transparent ring-1`,
    },
  },

  defaults: {
    variant: "gray",
    size: "sm",
  },

  matches: [
    {
      variant: "gray",
      outlined: true,
      use: `ring-gray-500`,
    },
    {
      variant: "primary",
      outlined: true,
      use: `text-purple-500 ring-gray-500 hover:text-white`,
    },
  ],
})

<Box tw="m-2.5 flex flex-wrap" css={{ gap: "20px" }}>
  <Button>Button</Button>
  <Button variant="gray">Gray Button</Button>
  <Button variant="primary">Primary Button</Button>
  <Button variant="gray" outlined>
    Outlined Gray Button
  </Button>
  <Button variant="primary" outlined>
    Outlined Primary Button
  </Button>
  <Button variant="primary" outlined size={{ initial: "sm", lg: "md" }}>
    Responsive Primary Button
  </Button>
</Box>
```

## License

[MIT](https://github.com/tw-in-js/react/blob/main/LICENSE)

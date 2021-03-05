import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import type { Instance } from 'twind'
import type { VirtualSheet } from 'twind/sheets'

import * as React from 'react'
import { renderToStaticMarkup as render } from 'react-dom/server'
import { virtualSheet } from 'twind/sheets'
import { create, styled } from '.'

const test = suite<{
  sheet: VirtualSheet
  tw: Instance['tw']
  styled: typeof styled
}>('@twind/react')

test.before((context) => {
  context.sheet = virtualSheet()
  const { tw } = create({
    sheet: context.sheet,
    mode: 'strict',
    preflight: false,
    prefix: false,
  })
  context.tw = tw
  context.styled = styled.bind(tw) as typeof styled
})

test.after.each(({ sheet }) => {
  sheet.reset()
})

test('styled', ({ sheet, styled }) => {
  const Button = styled('button', {
    variants: {
      size: {
        sm: `text-sm`,
        lg: `text-lg`,
      },
    },
  })

  assert.equal(sheet.target, [])

  const markup = render(
    <Button size="lg" class="x" type="button">
      Click Me
    </Button>,
  )

  assert.is(markup, '<button type="button" class="tw-xz6gsm tw-jo04kc x">Click Me</button>')

  assert.equal(sheet.target, ['.tw-xz6gsm{font-size:1.125rem;line-height:1.75rem}'])
  // const ExtendedButton = styled(Button, {
  //   variants: {
  //     rounded: {
  //       true: `rounded-full`,
  //     },
  //   },
  // })

  // ExtendedButton({ as: 'button',  })
})

test.run()

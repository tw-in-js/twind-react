import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import type { Instance } from 'twind'
import type { VirtualSheet } from 'twind/sheets'

import { create } from 'twind'
import { virtualSheet } from 'twind/sheets'
import { content } from '.'

const test = suite<{
  sheet: VirtualSheet
  tw: Instance['tw']
}>('@twind/aspect-ratio')

test.before((context) => {
  context.sheet = virtualSheet()
  const { tw } = create({
    sheet: context.sheet,
    mode: 'strict',
    preflight: false,
    prefix: false,
    plugins: { content },
    theme: {
      content: {
        check: '"✅"',
      },
    },
  })
  context.tw = tw
})

test.after.each(({ sheet }) => {
  sheet.reset()
})

test('using directive', ({ tw, sheet }) => {
  assert.is(tw(content('"✅"')), 'tw-1c01avf')
  assert.equal(sheet.target, ['.tw-1c01avf{content:"✅"}'])

  sheet.reset()

  assert.is(tw(content('check')), 'tw-1c01avf')
  assert.equal(sheet.target, ['.tw-1c01avf{content:"✅"}'])

  sheet.reset()

  assert.is(tw(content('none')), 'tw-1clylz7')
  assert.equal(sheet.target, ['.tw-1clylz7{content:none}'])

  sheet.reset()

  assert.is(tw(content('attr(data-content)')), 'tw-1oh105a')
  assert.equal(sheet.target, ['.tw-1oh105a{content:attr(data-content)}'])

  sheet.reset()

  assert.is(tw(content('" (" attr(href) " )"')), 'tw-jtctmm')
  assert.equal(sheet.target, ['.tw-jtctmm{content:" (" attr(href) " )"}'])
})

test('using plugin', ({ tw, sheet }) => {
  assert.is(tw`content-check`, 'content-check')
  assert.equal(sheet.target, ['.content-check{content:"✅"}'])

  sheet.reset()

  assert.is(tw`content-open-quote`, 'content-open-quote')
  assert.equal(sheet.target, ['.content-open-quote{content:open-quote}'])

  sheet.reset()

  assert.is(tw`content`, 'content')
  assert.equal(sheet.target, ['.content{content:attr(data-content)}'])

  sheet.reset()

  assert.is(tw`content-data-before`, 'content-data-before')
  assert.equal(sheet.target, ['.content-data-before{content:attr(data-before)}'])

  sheet.reset()

  assert.is(tw`content-attr-href`, 'content-attr-href')
  assert.equal(sheet.target, ['.content-attr-href{content:attr(href)}'])

  sheet.reset()

  assert.is(tw`content-counter-chapter-counter`, 'content-counter-chapter-counter')
  assert.equal(sheet.target, ['.content-counter-chapter-counter{content:counter(chapter-counter)}'])

  sheet.reset()

  assert.is(tw`content-var-before`, 'content-var-before')
  assert.equal(sheet.target, ['.content-var-before{content:var(--var-before)}'])

  sheet.reset()

  assert.is(tw`content-✅`, 'content-✅')
  assert.equal(sheet.target, ['.content-✅{content:"✅"}'])
})

test.run()

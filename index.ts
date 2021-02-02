import type { Context, CSSRules, ThemeSection, Directive, MaybeThunk } from 'twind'
import { directive } from 'twind'

declare module 'twind' {
  interface Theme {
    content?: ThemeSection<string>
  }
}

export interface Content {
  (value: string): Directive<CSSRules>
  (parts: string[], context: Context): CSSRules
}

const KNOWN_VALUES = new Set([
  'open-quote',
  'close-quote',
  'no-open-quote',
  'no-close-quote',
  'normal',
  'none',
  'inherit',
  'initial',
  'unset',
])

const join = (parts: string[]): string => parts.join('-')

const stringify = (parts: string[]): string => {
  switch (parts[0]) {
    case 'data':
      return `attr(${join(parts)})`
    case 'attr':
    case 'counter':
      return `${parts[0]}(${join(parts.slice(1))})`
    case 'var':
      return `var(--${join(parts)})`
    case undefined:
      return `attr(data-content)`
    default:
      return JSON.stringify(join(parts))
  }
}

const content$ = (parts: string | string[], { theme }: Context): CSSRules => {
  const value = Array.isArray(parts) ? join(parts) : parts

  return {
    content:
      (value && theme('content', [value], '')) ||
      (KNOWN_VALUES.has(value) && value) ||
      (Array.isArray(parts) ? stringify(parts) : value),
  }
}

export const content = ((
  value: string | string[],
  context: Context,
): CSSRules | Directive<CSSRules> =>
  Array.isArray(value) ? content$(value, context) : directive(content$, value)) as Content

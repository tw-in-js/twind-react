import * as React from 'react'

import type { PolymorphicPropsWithRef } from 'react-polymorphic-types'

import type { TW, StyleConfig, StyleProps } from 'twind/style'

import isPropValid from '@emotion/is-prop-valid'
import { style, tw as defaultTW } from 'twind/style'

export * from 'twind/style'

export interface ShouldForwardProp {
  (prop: string, defaultValidatorFn: (prop: string) => boolean): boolean
}

export interface StyledOptions {
  shouldForwardProp?: ShouldForwardProp
}

export interface StyledComponent<Variants, Tag extends React.ElementType> {
  <T extends React.ElementType = Tag>(
    props: PolymorphicPropsWithRef<StyleProps<Variants>, T>,
  ): React.ReactElement<any, any> | null

  // defaultProps?: Partial<P>;
  // displayName?: string;

  /**
   * CSS Selector associated with the current component.
   *
   * ```js
   * const button = style({
   *   base: {
   *     color: "DarkSlateGray"
   *   }
   * })
   *
   * const article = style({
   *   base: {
   *     [button]: { boxShadow: "0 0 0 5px" }
   *   }
   * })
   * ```
   */
  toString(): string

  /**
   * CSS Class associated with the current component.
   *
   * ```js
   * const button = style({
   *   base: {
   *     color: "DarkSlateGray"
   *   }
   * })
   *
   * <div className={button.className} />
   * ```
   */
  readonly className: string

  /**
   * CSS Selector associated with the current component.
   *
   * ```js
   * const button = style({
   *   base: {
   *     color: "DarkSlateGray"
   *   }
   * })
   *
   * const Card = styled({
   *   base: {
   *     [Button.selector]: { boxShadow: "0 0 0 5px" }
   *   }
   * })
   * ```
   */
  readonly selector: string
}

export function styled<Variants, BaseVariants, Tag extends React.ElementType>(
  this: TW | null | undefined | void,
  base: StyledComponent<BaseVariants, Tag>,
  config?: StyledOptions & StyleConfig<Variants, BaseVariants>,
): StyledComponent<BaseVariants & Variants, Tag> & string

export function styled<Variants, Tag extends React.ElementType = 'div'>(
  this: TW | null | undefined | void,
  tag?: Tag,
  config?: StyledOptions & StyleConfig<Variants>,
): StyledComponent<Variants, Tag> & string

export function styled<Tag extends React.ElementType, Variants>(
  this: TW | null | undefined | void,
  tag: Tag = 'div' as Tag,
  { shouldForwardProp = isPropValid, ...config }: StyledOptions & StyleConfig<Variants> = {},
) {
  const tw = this || defaultTW

  const component = style(config)

  const validateProp = (prop: string): boolean => shouldForwardProp(prop, isPropValid)

  const filterProps = (props: any): any =>
    Object.keys(props)
      .filter(validateProp)
      .reduce(($props, key) => {
        if (key != 'class') {
          $props[key] = props[key]
        }
        return $props
      }, {} as any)

  const sc = React.forwardRef(
    <T extends React.ElementType = Tag>(
      { as = (tag as unknown) as T, ...props }: PolymorphicPropsWithRef<StyleProps<Variants>, T>,
      ref: React.ForwardedRef<any>,
    ) =>
      React.createElement(as, {
        ...(typeof as == 'string' ? filterProps(props) : props),
        ref,
        className: tw(component((typeof as == 'string' ? { ...props, as } : props) as any)),
      }),
  )

  return Object.defineProperties(sc, Object.getOwnPropertyDescriptors(component))
}

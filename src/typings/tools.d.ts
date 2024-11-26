declare global {
  /**    * Any type of async function    */
  type AnyPromiseFunction<T extends any[] = any[], R = void> = (...arg: T) => PromiseLike<R>

  /**    * Ordinary functions of any type    */

  type AnyNormalFunction<T extends any[] = any[], R = void> = (...arg: T) => R

  /**    * function of any type    */

  type AnyFunction<T extends any[] = any[], R = void> =
    | AnyNormalFunction<T, R>
    | AnyPromiseFunction<T, R>
  type MaybeArray<T> = T | T[]

  /**    * T | null    */

  type Nullable<T> = T | null

  /**    * String type object    */

  type Recordable<T> = Record<string, T>
  type PartialRecord<K extends keyof any, T> = { [P in K]?: T }
  type RecordNullable<T> = { [P in keyof T]?: Nullable<T[P]> }

  /**    * String type object (read-only)    */

  interface ReadonlyRecordable<T = any> {
    readonly [key: string]: T
  }

  interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T
  }

  type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null
}
export {}

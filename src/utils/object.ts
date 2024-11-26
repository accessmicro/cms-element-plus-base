import { isObject } from './typeof'
import { cloneDeep } from 'lodash-unified'

export function deepMerge<T = unknown>(source: any = {}, target: any = {}): T {
  const src = cloneDeep(source)
  let key: string
  for (key in target) {
    src[key] =
      isObject(src[key]) && src[key] !== null
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key])
  }
  return src
}

export function getNestedValue(obj: object | string, path: string) {
  return path.split('.').reduce((acc: any, part) => (isObject(acc) ? acc?.[part] : acc), obj)
}

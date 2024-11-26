import type { ThemeItemType } from '@/models'

export enum LocalesEnum {
  vi = 'vi',
  en = 'en'
}

export enum LOCAL_STORAGE {
  lang = 'lang',
  theme = 'theme'
}

export const THEME: ThemeItemType[] = [
  {
    primary: '#002b55',
    success: '#519a79',
    warning: '#ffaa71',
    danger: '#af6671',
    info: '#b6a4a4',
    error: '#f56c6c',
    name: 'default'
  },
  {
    primary: '#763053',
    success: '#a5a58d',
    warning: '#f7b32b',
    danger: '#f76c6c',
    info: '#e1dfdf',
    error: '#f56c6c',
    name: 'retro'
  },
  {
    primary: '#49297e',
    success: '#00db96',
    warning: '#fdfb76',
    danger: '#e10086',
    info: '#90dcff',
    error: '#f56c6c',
    name: 'classic'
  }
]

export const SIZE_SCREEN = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280
}

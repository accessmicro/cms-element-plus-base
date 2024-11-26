import type { LocalesEnum } from '@/constants'
import en from '@/assets/lang/en.json'
import type { HexColor, ThemeType } from '@klweb/theme-chalk'

export type MessageSchemaType = typeof en
export type LocalesType = keyof typeof LocalesEnum
export type ThemeItemType = Partial<Record<ThemeType | 'name', HexColor>>

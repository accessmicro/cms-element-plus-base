import { createI18n } from 'vue-i18n'
import vi from './vi.json'
import en from './en.json'
import { LocalesEnum } from '@/constants'
import type { LocalesType, MessageSchemaType } from '@/models'

const curLang = localStorage.getItem('lang') || LocalesEnum.en
localStorage.setItem('lang', curLang)

export default createI18n<MessageSchemaType, LocalesType, false>({
  legacy: false,
  locale: curLang,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en,
    vi
  }
})

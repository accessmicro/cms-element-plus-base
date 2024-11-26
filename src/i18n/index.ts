import { createI18n } from 'vue-i18n'
import { LocalesEnum } from '@/constants'
import en from '@/assets/lang/en.json'
import vi from '@/assets/lang/vi.json'
import type { LocalesType, MessageSchemaType } from '@/models'

const curLang = localStorage.getItem('lang') || LocalesEnum.en
localStorage.setItem('lang', curLang)

export default createI18n<MessageSchemaType, LocalesType, false>({
  legacy: false,
  locale: curLang,
  fallbackLocale: LocalesEnum.en,
  globalInjection: true,
  messages: {
    en,
    vi
  }
})

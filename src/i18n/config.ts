import i18n from '@/i18n'
import type { LocalesType, MessageSchemaType } from '@/models'
import type { ComposerTranslation } from 'vue-i18n'

const {
  t,
  d,
  n,
  ...otherI18nConfig
}: typeof i18n.global & {
  t: ComposerTranslation<
    {
      vi: MessageSchemaType
      en: MessageSchemaType
    },
    LocalesType
  >
} = i18n.global
export { t, d, n, otherI18nConfig }

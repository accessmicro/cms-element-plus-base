import { t } from '@/i18n/config'
import {
  ElLoading,
  ElNotification,
  type LoadingOptions,
  type NotificationOptions
} from 'element-plus'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      isOpenMenuDrawer: false,
      collapsedMenu: false,
      theme: 'light'
    }
  },
  getters: {},
  actions: {
    toggleMenuDrawer(value?: boolean) {
      if (typeof value === 'boolean') {
        this.isOpenMenuDrawer = value
      } else {
        this.isOpenMenuDrawer = !this.isOpenMenuDrawer
      }
    },
    toggleCollapsedMenu(value?: any) {
      if (typeof value === 'boolean') {
        this.collapsedMenu = value
      } else {
        this.collapsedMenu = !this.collapsedMenu
      }
    },
    showNotification(options: Partial<NotificationOptions>) {
      return ElNotification({
        ...options,
        duration: 3000,
        zIndex: 3000
      })
    },
    showLoading(options: LoadingOptions) {
      return ElLoading.service({
        ...options,
        text: options.text !== undefined ? options.text : t('common.loading'),
        customClass: `system-loading-mask ${options.customClass || ''}`
      })
    }
  }
})

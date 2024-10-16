import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const openMenuDrawer = ref(false)
  const collapsedMenu = ref(false)
  const theme = ref('light')

  // recover theme data
  if (localStorage.getItem('theme')) {
    theme.value = localStorage.getItem('theme') as string
  }
  function togleMenu(value?: any) {
    if (typeof value === 'boolean') {
      openMenuDrawer.value = value
    } else {
      openMenuDrawer.value = !openMenuDrawer.value
    }
  }
  function togleCollapsedMenu(value?: any) {
    if (typeof value === 'boolean') {
      collapsedMenu.value = value
    } else {
      collapsedMenu.value = !collapsedMenu.value
    }
  }

  return { openMenuDrawer, togleMenu, togleCollapsedMenu, collapsedMenu, theme }
})

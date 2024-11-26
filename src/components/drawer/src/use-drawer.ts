import { tryOnUnmounted } from '@vueuse/core'
import { isEqual, isFunction } from 'lodash-unified'
import {
  computed,
  getCurrentInstance,
  nextTick,
  reactive,
  ref,
  toRaw,
  unref,
  watchEffect
} from 'vue'

import type {
  BaseDrawerProps,
  DrawerInstance,
  ReturnMethods,
  UseDrawerInnerReturnType,
  UseDrawerReturnType
} from './types'

const dataTransferRef = reactive<any>({})
const visibleData = reactive<{ [key: number]: boolean }>({})

export function useDrawer(): UseDrawerReturnType {
  if (!getCurrentInstance()) {
    throw new Error('useDrawer() can only be used inside setup() or functional components!')
  }
  const drawer = ref<DrawerInstance | null>(null)
  const loaded = ref<Nullable<boolean>>(false)
  const uid = ref<string>('')

  function register(drawerInstance: DrawerInstance, uuid: string): void {
    tryOnUnmounted(() => {
      drawer.value = null
      loaded.value = null
      dataTransferRef[unref(uid)] = null
    })
    if (unref(loaded) && drawerInstance === unref(drawer)) {
      return
    }
    uid.value = uuid
    drawer.value = drawerInstance
    loaded.value = true
  }
  const getInstance = () => {
    const instance = unref(drawer)
    if (!instance) {
      throw new Error('useDrawer instance is undefined!')
    }
    return instance
  }
  const methods: ReturnMethods = {
    setDrawerProps: (props: Partial<BaseDrawerProps>): void => {
      getInstance()?.setDrawerProps(props)
    },
    getShow: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),
    openDrawer: <T = any>(show = true, data?: T, openOnSet = true): void => {
      getInstance()?.setDrawerProps({ modelValue: show })
      if (!data) return
      if (openOnSet) {
        dataTransferRef[unref(uid)] = null
        dataTransferRef[unref(uid)] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uid)]), toRaw(data))
      if (!equal) {
        dataTransferRef[unref(uid)] = toRaw(data)
      }
    },
    closeDrawer: () => {
      getInstance()?.setDrawerProps({ modelValue: false })
    }
  }
  return [register, methods]
}
export const useDrawerInner = (callbackFn?: AnyFunction): UseDrawerInnerReturnType => {
  const drawerInstanceRef = ref<Nullable<DrawerInstance>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<string>('')
  if (!getCurrentInstance()) {
    throw new Error('useDrawerInner() can only be used inside setup() or functional components!')
  }
  const getInstance = () => {
    const instance = unref(drawerInstanceRef)
    if (!instance) {
      throw new Error('useDrawerInner instance is undefined!')
    }
    return instance
  }
  const register = (modalInstance: DrawerInstance, uuid: string) => {
    tryOnUnmounted(() => {
      drawerInstanceRef.value = null
    })
    uidRef.value = uuid
    drawerInstanceRef.value = modalInstance
    currentInstance?.emit('register', modalInstance, uuid)
  }
  watchEffect(() => {
    const data = dataTransferRef[unref(uidRef)]
    if (!data) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data)
    })
  })
  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setDrawerProps({ loading })
      },
      getShow: computed((): boolean => {
        return visibleData[~~unref(uidRef)]
      }),
      closeDrawer: () => {
        getInstance()?.setDrawerProps({ modelValue: false })
      },
      setDrawerProps: (props: Partial<BaseDrawerProps>) => {
        getInstance()?.setDrawerProps(props)
      }
    }
  ]
}

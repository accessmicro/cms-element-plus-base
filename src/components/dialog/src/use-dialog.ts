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
  BaseDialogProps,
  DialogInstance,
  ReturnMethods,
  UseDialogInnerReturnType,
  UseDialogReturnType
} from './types'

const dataTransferRef = reactive<any>({})
const visibleData = reactive<{ [key: number]: boolean }>({})

export function useDialog(): UseDialogReturnType {
  if (!getCurrentInstance()) {
    throw new Error('useDialog() can only be used inside setup() or functional components!')
  }
  const dialog = ref<DialogInstance | null>(null)
  const loaded = ref<Nullable<boolean>>(false)
  const uid = ref<string>('')

  function register(dialogInstance: DialogInstance, uuid: string): void {
    tryOnUnmounted(() => {
      dialog.value = null
      loaded.value = null
      dataTransferRef[unref(uid)] = null
    })
    if (unref(loaded) && dialogInstance === unref(dialog)) {
      return
    }
    uid.value = uuid
    dialog.value = dialogInstance
    loaded.value = true
  }
  const getInstance = () => {
    const instance = unref(dialog)
    if (!instance) {
      throw new Error('useDialog instance is undefined!')
    }
    return instance
  }
  const methods: ReturnMethods = {
    setDialogProps: (props: Partial<BaseDialogProps>): void => {
      getInstance()?.setDialogProps(props)
    },
    getShow: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),
    openDialog: <T = any>(show = true, data?: T, openOnSet = true): void => {
      getInstance()?.setDialogProps({ modelValue: show })
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
    closeDialog: () => {
      getInstance()?.setDialogProps({ modelValue: false })
    }
  }
  return [register, methods]
}
export const useDialogInner = (callbackFn?: AnyFunction): UseDialogInnerReturnType => {
  const dialogInstanceRef = ref<Nullable<DialogInstance>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<string>('')
  if (!getCurrentInstance()) {
    throw new Error('useDialogInner() can only be used inside setup() or functional components!')
  }
  const getInstance = () => {
    const instance = unref(dialogInstanceRef)
    if (!instance) {
      throw new Error('useDialogInner instance is undefined!')
    }
    return instance
  }
  const register = (modalInstance: DialogInstance, uuid: string) => {
    tryOnUnmounted(() => {
      dialogInstanceRef.value = null
    })
    uidRef.value = uuid
    dialogInstanceRef.value = modalInstance
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
        getInstance()?.setDialogProps({ loading })
      },
      getShow: computed((): boolean => {
        return visibleData[~~unref(uidRef)]
      }),
      closeDialog: () => {
        getInstance()?.setDialogProps({ modelValue: false })
      },
      setDialogProps: (props: Partial<BaseDialogProps>) => {
        getInstance()?.setDialogProps(props)
      }
    }
  ]
}

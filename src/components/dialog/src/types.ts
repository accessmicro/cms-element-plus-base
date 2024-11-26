import type { DialogProps } from 'element-plus'
import type { ComputedRef } from 'vue'

export interface DialogInstance {
  setDialogProps: (props: Partial<BaseDialogProps>) => void
}
export type RegisterFn = (dialogInstance: DialogInstance, uid: string) => void

export interface ReturnMethods extends DialogInstance {
  openDialog: <T = any>(show?: boolean, data?: T, openOnSet?: boolean) => void
  closeDialog: () => void
  getShow?: ComputedRef<boolean>
}

export interface ReturnInnerMethods extends DialogInstance {
  closeDialog: () => void
  changeLoading: (loading: boolean) => void
  getShow?: ComputedRef<boolean>
}

export type UseDialogReturnType = [RegisterFn, ReturnMethods]

export type UseDialogInnerReturnType = [RegisterFn, ReturnInnerMethods]

export interface BaseDialogProps extends DialogProps {
  loading?: boolean
  title: string
}

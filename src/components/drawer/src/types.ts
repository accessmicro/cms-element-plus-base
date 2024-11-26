import type { DrawerProps } from 'element-plus'
import type { ComputedRef } from 'vue'

export interface DrawerInstance {
  setDrawerProps: (props: Partial<BaseDrawerProps>) => void
}
export type RegisterFn = (drawerInstance: DrawerInstance, uid: string) => void

export interface ReturnMethods extends DrawerInstance {
  openDrawer: <T = any>(show?: boolean, data?: T, openOnSet?: boolean) => void
  closeDrawer: () => void
  getShow?: ComputedRef<boolean>
}

export interface ReturnInnerMethods extends DrawerInstance {
  closeDrawer: () => void
  changeLoading: (loading: boolean) => void
  getShow?: ComputedRef<boolean>
}

export type UseDrawerReturnType = [RegisterFn, ReturnMethods]

export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods]

export interface BaseDrawerProps extends DrawerProps {
  loading?: boolean
  hiddenOverlay?: boolean
  resizable?: boolean
  isOverlay?: boolean
  minWidth?: number
  isDefaultFooter?: boolean
}

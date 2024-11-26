import type { BaseDrawerProps } from '@/components/drawer/src/types'
import { drawerProps } from 'element-plus'

export const basicProps: Partial<Record<keyof BaseDrawerProps, any>> = {
  ...drawerProps,
  title: { type: String, default: '' },
  loading: { type: Boolean },
  resizable: { type: Boolean, default: true },
  hiddenOverlay: { type: Boolean, default: false },
  closeOnClickModal: { type: Boolean, default: false },
  width: { type: Number, default: 600 },
  minWidth: { type: Number, default: 500 },
  isDefaultFooter: { type: Boolean, default: false }
}

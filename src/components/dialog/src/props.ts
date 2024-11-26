import { dialogProps } from 'element-plus'

export const basicProps = {
  ...dialogProps,
  title: { type: String, default: '' },
  loading: { type: Boolean }
}

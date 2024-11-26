import {
  useDebounceFn,
  useElementBounding,
  useElementSize,
  useWindowSize,
  watchArray
} from '@vueuse/core'
import { computed, type ComputedRef, nextTick, type Ref, ref, unref, watch, watchEffect } from 'vue'
import { onMountedOrActivated } from '../component'

export function useContentHeight(
  flag: ComputedRef<Boolean>,
  anchorRef: Ref,
  subtractHeightRefs: Ref[],
  subtractSpaceRefs: Ref[],
  downwardClass = '',
  offsetHeight = 0
) {
  const contentHeight = ref<number>(0)
  const { height: winHeight } = useWindowSize()

  function getEl(element: any): Nullable<HTMLDivElement> {
    if (element == null) {
      return null
    }
    return (element instanceof HTMLDivElement ? element : element.$el) as HTMLDivElement
  }
  function calcSubtractSpace(
    element: Element | null | undefined,
    direction: 'all' | 'top' | 'bottom' = 'all'
  ): number {
    function numberPx(px: string) {
      return Number(px.replace(/[^\d]/g, ''))
    }
    let subtractHeight = 0
    const ZERO_PX = '0px'
    if (element) {
      const cssStyle = getComputedStyle(element)
      const marginTop = numberPx(cssStyle?.marginTop ?? ZERO_PX)
      const marginBottom = numberPx(cssStyle?.marginBottom ?? ZERO_PX)
      const paddingTop = numberPx(cssStyle?.paddingTop ?? ZERO_PX)
      const paddingBottom = numberPx(cssStyle?.paddingBottom ?? ZERO_PX)
      if (direction === 'all') {
        subtractHeight += marginTop
        subtractHeight += marginBottom
        subtractHeight += paddingTop
        subtractHeight += paddingBottom
      } else if (direction === 'top') {
        subtractHeight += marginTop
        subtractHeight += paddingTop
      } else {
        subtractHeight += marginBottom
        subtractHeight += paddingBottom
      }
    }
    return subtractHeight
  }
  async function calcContentHeight() {
    if (!flag.value) return
    const anchorEl = getEl(unref(anchorRef))
    if (!anchorEl) return
    const { top } = useElementBounding(anchorEl)
    const bottomIncludeBody = unref(winHeight) - unref(top)
    let subtractHeight = 0
    subtractHeightRefs.forEach((item) => {
      subtractHeight += getEl(unref(item))?.offsetHeight ?? 0
    })
    let subtractSpaceHeight = calcSubtractSpace(anchorEl) ?? 0
    subtractSpaceRefs.forEach((item) => {
      subtractSpaceHeight += calcSubtractSpace(getEl(unref(item)))
    })

    let downwardHeight = 0
    function downward(element: Element | null, downwardClass: string) {
      if (element && downwardClass) {
        const headEl = element.querySelector(downwardClass) as HTMLElement
        downwardHeight += headEl?.offsetHeight ?? 0
      }
    }
    downward(anchorEl, downwardClass)
    const height =
      bottomIncludeBody - subtractHeight - subtractSpaceHeight - downwardHeight - offsetHeight
    contentHeight.value = height
  }
  const debouncedFn = useDebounceFn(() => {
    calcContentHeight()
  }, 100)
  window.addEventListener('resize', debouncedFn)
  onMountedOrActivated(() => {
    nextTick(() => {
      calcContentHeight()
    })
  })

  const elementSizes = computed(() => {
    return subtractHeightRefs.map((item) => useElementSize(item))
  })
  watch(
    elementSizes,
    () => {
      calcContentHeight()
    },
    {
      deep: true
    }
  )
  return { contentHeight }
}

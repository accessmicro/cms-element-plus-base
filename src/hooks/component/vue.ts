import { nextTick, onActivated, onMounted } from 'vue'

function onMountedOrActivated(hook: AnyFunction) {
  let mounted: boolean

  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })

  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}

export { onMountedOrActivated }

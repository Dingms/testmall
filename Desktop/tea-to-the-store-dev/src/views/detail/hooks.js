import { ref, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from '@/utils/tools'

export const useScrollStickyTabHook = () => {
  const stickyTab = ref(false)

  // 默认事件时间有点的短，可以更改一下
  const scrollFn = debounce(() => {
    stickyTab.value = document.documentElement.scrollTop >= 60
  }, 100)

  onMounted(() => {
    // 绑定
    window.addEventListener('scroll', scrollFn)
  })
  onBeforeUnmount(() => {
    // 销毁
    window.removeEventListener('scroll', scrollFn)
  })
  return stickyTab
}
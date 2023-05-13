// 公共函数库

export const outActionName = name => {
    return name.split('_')[0] + '/' + name
  }
  
  // 防抖
  export function debounce(func, delay = 300) {
    let timer
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
  
  // 节流
  export function throttle(func, delay = 300) {
    let lastTime = 0
    return function (...args) {
      const now = Date.now()
      if (now - lastTime >= delay) {
        func.apply(this, args)
        lastTime = now
      }
    }
  }
  
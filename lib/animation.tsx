export const fadeIn = async (element: HTMLDivElement, duration: number) => {
  let opacity = 0
  const start = performance.now()
  let timeStamp = start
  while (opacity < 1) {
    opacity = (timeStamp - start) / duration
    element.style.opacity = opacity.toString()
    timeStamp = await new Promise(resolve => requestAnimationFrame(resolve))
  }
  element.style.opacity = '1'
}

export const fadeOut = async (element: HTMLDivElement, duration: number) => {
  let opacity = 1
  const start = performance.now()
  let timeStamp = start
  while (opacity > 0) {
    const easing = (timeStamp - start) / duration
    opacity = 1 - easing
    element.style.opacity = opacity.toString()
    timeStamp = await new Promise(resolve => requestAnimationFrame(resolve))
  }
  element.style.opacity = '0'
}

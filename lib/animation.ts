export const fadeIn = async (element: HTMLDivElement, duration: number) => {
  let opacity = 0
  const start = performance.now()
  while (opacity < 1) {
    element.style.opacity = opacity.toString()
    const timeStamp = await new Promise<number>(resolve => requestAnimationFrame(resolve))
    opacity = (timeStamp - start) / duration
  }
  element.style.opacity = '1'
}

export const fadeOut = async (element: HTMLDivElement, duration: number) => {
  let opacity = 1
  const start = performance.now()
  while (opacity > 0) {
    element.style.opacity = opacity.toString()
    const timeStamp = await new Promise<number>(resolve => requestAnimationFrame(resolve))
    const easing = (timeStamp - start) / duration
    opacity = 1 - easing
  }
  element.style.opacity = '0'
}

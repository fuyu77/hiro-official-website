export const fadeIn = async (element: HTMLDivElement) => {
  let opacity = 0.1
  while (opacity < 1) {
    element.style.opacity = opacity.toString()
    element.style.filter = `alpha(opacity=${opacity * 100})`
    opacity += opacity * 0.1
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

export const fadeOut = async (element: HTMLDivElement) => {
  let opacity = 1
  while (opacity > 0.1) {
    element.style.opacity = opacity.toString()
    element.style.filter = `alpha(opacity=${opacity * 100})`
    opacity -= opacity * 0.1
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  element.style.opacity = '0'
  element.style.filter = 'alpha(opacity=0)'
}

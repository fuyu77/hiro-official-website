export const fadeIn = async (element: HTMLDivElement) => {
  return await new Promise(resolve => {
    let opacity = 0.1
    const interval = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(interval)
        resolve('success')
      }
      element.style.opacity = opacity.toString()
      element.style.filter = `alpha(opacity=${opacity * 100})`
      opacity += opacity * 0.1
    }, 100)
  })
}

export const fadeOut = async (element: HTMLDivElement) => {
  return await new Promise(resolve => {
    let opacity = 1
    const interval = setInterval(() => {
      if (opacity <= 0.1) {
        element.style.opacity = '0'
        element.style.filter = 'alpha(opacity=0)'
        clearInterval(interval)
        resolve('success')
      }
      element.style.opacity = opacity.toString()
      element.style.filter = `alpha(opacity=${opacity * 100})`
      opacity -= opacity * 0.1
    }, 100)
  })
}

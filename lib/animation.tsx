export const fadeIn = async (element: HTMLDivElement) => {
  return await new Promise(resolve => {
    let op = 0.1
    const interval2 = setInterval(() => {
      if (op >= 1) {
        clearInterval(interval2)
        setTimeout(resolve, 3 * 1000, 'success')
      }
      element.style.opacity = op.toString()
      element.style.filter = `alpha(opacity=${op * 100})`
      op += op * 0.1
    }, 100)
  })
}

export const fadeOut = async (element: HTMLDivElement) => {
  return await new Promise(resolve => {
    let op = 1
    const interval = setInterval(() => {
      if (op <= 0.1) {
        clearInterval(interval)
        element.style.opacity = '0'
        element.style.filter = 'alpha(opacity=0)'
        resolve('success')
      }
      element.style.opacity = op.toString()
      element.style.filter = `alpha(opacity=${op * 100})`
      op -= op * 0.1
    }, 100)
  })
}

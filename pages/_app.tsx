import '../styles/global.scss'
import type { AppProps } from 'next/app'

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App

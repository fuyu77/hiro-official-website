import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import Layout, { siteTitle } from '../components/layout'
import styles from './index.module.scss'
import { getTankasData } from '../lib/tanka'
import { GetStaticProps } from 'next'
import { fadeIn, fadeOut } from '../lib/animation'

interface Props {
  allTankasData: {
    title: string
    source: string
  }[]
}

const Home: React.FC<Props> = ({ allTankasData }) => {
  const tankaInput = useRef<HTMLDivElement>(null)
  const [tanka, setTanka] = useState(allTankasData[0].title)
  const [source, setSource] = useState(allTankasData[0].source)

  useEffect(() => {
    const switchTankas = async () => {
      if (tankaInput.current === null) return
      for (const tanka of allTankasData.slice(1)) {
        await new Promise(resolve => setTimeout(resolve, 3000))
        await fadeOut(tankaInput.current, 2000)
        setTanka(tanka.title)
        setSource(tanka.source)
        await fadeIn(tankaInput.current, 2000)
      }
    }
    switchTankas().catch(e => console.log(e.message))
  }, [])

  return (
    <Layout activeTab="">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={`${styles.tankaWrapper} is-size-6`} ref={tankaInput}>
        <div className={styles.tankaItem} >
          {tanka}
        </div>
        <div className={styles.tankaItem} >
          {source}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allTankasData = await getTankasData()
  return {
    props: {
      allTankasData
    }
  }
}

export default Home

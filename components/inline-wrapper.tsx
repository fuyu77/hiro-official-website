import styles from './inline-wrapper.module.scss'

interface Props {
  children: React.ReactNode
}

const InlineWrapper = ({ children }: Props): React.ReactElement => {
  return <div className={styles.wrapper}>{children}</div>
}

export default InlineWrapper

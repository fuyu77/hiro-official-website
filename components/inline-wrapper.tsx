import styles from './inline-wrapper.module.scss'

const InlineWrapper: React.FC = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default InlineWrapper

import styles from './inline-item.module.scss'

const InlineItem: React.FC = ({ children }) => {
  return <div className={styles.item}>{children}</div>
}

export default InlineItem

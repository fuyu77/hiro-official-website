import styles from './inline-item.module.scss'

const InlineItem: React.FC<{ number: number }> = ({ children, number }) => {
  return (
    <div className={number === 1 ? styles.one : styles.two}>{children}</div>
  )
}

export default InlineItem

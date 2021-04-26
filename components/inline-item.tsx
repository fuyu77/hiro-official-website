import styles from './inline-item.module.scss'

const InlineItem: React.FC<{ itemWidth?: string }> = ({
  children,
  itemWidth
}) => {
  return (
    <div className={itemWidth === '100%' ? styles.full : styles.half}>
      {children}
    </div>
  )
}

export default InlineItem

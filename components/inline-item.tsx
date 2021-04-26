import styles from './inline-item.module.scss'

const InlineItem: React.FC<{ itemWidth?: string }> = ({
  children,
  itemWidth
}) => {
  return (
    <div className={itemWidth === 'full' ? styles.full : styles.half}>
      {children}
    </div>
  )
}

export default InlineItem

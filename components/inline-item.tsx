import styles from './inline-item.module.scss'

interface Props {
  itemWidth?: string
  children: React.ReactNode
}

const InlineItem = ({ itemWidth, children }: Props): React.ReactElement => {
  return <div className={itemWidth === 'full' ? styles.full : styles.half}>{children}</div>
}

export default InlineItem

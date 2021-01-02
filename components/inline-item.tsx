import styles from './inline-item.module.scss'

export default function InlineItem ({
  children
}: {
  children: React.ReactNode
}) {
  return <div className={styles.item}>{children}</div>
}

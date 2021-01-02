import styles from './inline-wrapper.module.scss'

export default function InlineWrapper ({
  children
}: {
  children: React.ReactNode
}) {
  return <div className={styles.wrapper}>{children}</div>
}

import styles from './inline-item.module.css';

interface Props {
  readonly children: React.ReactNode;
}

function InlineItem({ children }: Props): React.ReactElement {
  return <div className={styles.item}>{children}</div>;
}

export default InlineItem;

import styles from './inline-item.module.scss';

interface Props {
  readonly itemWidth?: string;
  readonly children: React.ReactNode;
}

function InlineItem({ itemWidth, children }: Props): React.ReactElement {
  return <div className={itemWidth === 'full' ? styles.full : styles.half}>{children}</div>;
}

export default InlineItem;

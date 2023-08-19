import styles from './inline-wrapper.module.scss';

interface Props {
  readonly children: React.ReactNode;
}

function InlineWrapper({ children }: Props): React.ReactElement {
  return <div className={styles.wrapper}>{children}</div>;
}

export default InlineWrapper;

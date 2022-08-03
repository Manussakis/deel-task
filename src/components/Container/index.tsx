import { ContainerProps } from './types';

import styles from './styles.module.css';

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

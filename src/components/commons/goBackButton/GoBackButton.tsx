import React from 'react';
import { Flex } from '../../../utils/layout';
import { LeftOutlined } from '@ant-design/icons';
import styles from './goBackButton.module.css';
interface IGoBackButtonProps {
  text?: string;
  className?: string;
  goBackButton?: () => void;
}

const GoBackButton: React.FC<IGoBackButtonProps> = ({
  text,
  className,
  goBackButton,
}) => {
  return (
    <Flex className={`${className} ${styles.container}`} onClick={goBackButton}>
      <div className={styles.circle}>
        <LeftOutlined />
      </div>
      <div className={styles.text}>{text || 'Volver'}</div>
    </Flex>
  );
};

export default GoBackButton;

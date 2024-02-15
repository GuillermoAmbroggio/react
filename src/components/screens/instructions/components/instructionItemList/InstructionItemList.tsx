import React from 'react';
import { Flex } from '../../../../../utils/layout';
import styles from './instructionItemList.module.css';

interface IInstructionItemListProps {
  rule: string;
}

const InstructionItemList: React.FC<IInstructionItemListProps> = ({ rule }) => {
  return (
    <Flex className={styles.containerItem}>
      <div className={styles.point}>*</div>
      <div>{rule}</div>
    </Flex>
  );
};

export default InstructionItemList;

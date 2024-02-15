import { Button, Tag } from 'antd';
import React from 'react';
import {
  statusFixture,
  StatusFixture,
} from '../../../../../types/fixture.types';
import { Column, Flex } from '../../../../../utils/layout';

import styles from './itemList.module.css';

type TItemTicket = {
  status: StatusFixture;
  name: string;
  onSelected: () => void;
  isSelected?: boolean;
};

export const colorStatusFixture: { [key in StatusFixture]: string } = {
  inProgress: 'green',
  toStart: '#f9ba15',
  finished: '#d6d3d3',
  created: '#9b9b9b',
};

const ItemList: React.FC<TItemTicket> = ({
  name,
  status,
  onSelected,
  isSelected,
}) => {
  return (
    <Flex
      className={`${styles.containerItemTicket} ${
        isSelected ? styles.selectedItem : ''
      }`}
    >
      <Flex className={styles.leftItemTicket}>
        <Flex className={styles.nameText}>
          <p className={`${styles.boldText}`}>{name}</p>
        </Flex>

        <Tag color={colorStatusFixture[status]} className={styles.boldText}>
          {statusFixture[status]}
        </Tag>
      </Flex>
      <Column>
        <Button type='text' onClick={onSelected}>
          Seleccionar
        </Button>
      </Column>
    </Flex>
  );
};

export default ItemList;

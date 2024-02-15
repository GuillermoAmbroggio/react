import React from 'react';
import { Flex } from '../../../../../../../utils/layout';
import styles from './resultHeaderTable.module.css';

const ResultHeaderTable: React.FC = () => {
  return (
    <Flex justifyContent={'center'} className={styles.containerHeader}>
      <p className={styles.puesto}>PUESTO</p>
      <p className={styles.ticket}>TICKET</p>
      <p className={styles.user}>USUARIO</p>
      <p className={styles.points}>PUNTOS</p>
      <span className={styles.showTicket} />
    </Flex>
  );
};

export default ResultHeaderTable;

import React from 'react';
import { Flex } from '../../../../../utils/layout';
import styles from './ticketHeader.module.css';

type TicketHeader = {
  displayPoints?: boolean;
};
const TicketHeader: React.FC<TicketHeader> = ({ displayPoints }) => {
  return (
    <Flex className={`${styles.container}`}>
      <p className={styles.containerTeam}>LOCAL</p>
      <p className={styles.containerVs}>EMPATE</p>
      <p className={styles.containerTeam}>VISITANTE</p>
      {displayPoints ? <p className={styles.containerPoints}>PUNTOS</p> : null}
      <p className={styles.containerStatus}>ESTADO</p>
    </Flex>
  );
};

export default TicketHeader;

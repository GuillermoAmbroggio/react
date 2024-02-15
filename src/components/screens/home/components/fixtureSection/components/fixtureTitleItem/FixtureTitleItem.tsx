import React from 'react';
import { Column } from '../../../../../../../utils/layout';
import styles from './fixtureTitleItem.module.css';

const FixtureTitleItem: React.FC = () => {
  return (
    <div className={styles.containerFixtureItem}>
      <div className={styles.containerTeam}>LOCAL</div>
      <Column alignItems='center' className={styles.containerVs}>
        EMPATE
      </Column>
      <div className={styles.containerTeam}>VISITANTE</div>
      <div className={styles.containerStatus}>ESTADO</div>
    </div>
  );
};

export default FixtureTitleItem;

import React from 'react';
import useWriting from '../../../copywriting/useWriting';
import { Column } from '../../../utils/layout';
import BannerSection from '../../../utils/layout/components/bannerSection/BannerSection';
import InstructionItemList from './components/instructionItemList/InstructionItemList';
import styles from './instructions.module.css';

const Instructions: React.FC = () => {
  const writing = useWriting();

  return (
    <Column style={{ flex: 1 }}>
      <BannerSection nameSection={writing.instructions.title} />
      <div className={styles.container}>
        <Column className={styles.containerList}>
          <p className={styles.titleRule}>Reglas Generales</p>
          {writing.instructions.rules.general.map((r, i) => (
            <InstructionItemList rule={r} key={`rule-${i}`} />
          ))}
        </Column>
      </div>
    </Column>
  );
};

export default Instructions;

import { Modal } from 'antd';
import React from 'react';
import { StatusFixture } from '../../../types/fixture.types';
import { Column } from '../../../utils/layout';

import ItemList from './components/itemList/ItemList';
import styles from './homeModal.module.css';

export type FixtureListResponse = {
  name: string;
  id: number;
  status: StatusFixture;
};

interface IModalProps {
  open?: boolean;
  onClose?: () => void;
  onChangeFixture: (fixtureId: number) => void;
  fixtureIdSelected?: number;
  fixtures?: FixtureListResponse[];
}

const FixtureListModal: React.FC<IModalProps> = ({
  open,
  onClose,
  onChangeFixture,
  fixtureIdSelected,
  fixtures,
}) => {
  const onSelectedItem = (id: number) => {
    onChangeFixture(id);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      className={styles.modal}
      closeIcon={<div className={styles.closeIcon}>X</div>}
    >
      <Column className={styles.content}>
        <p className={styles.modalTitle}>Lista de Fixtures</p>
        {fixtures?.map((t) => (
          <ItemList
            key={t.id}
            status={t.status}
            name={t.name}
            onSelected={() => onSelectedItem(t.id)}
            isSelected={fixtureIdSelected === t.id}
          />
        ))}
        {!fixtures?.length ? (
          <p className={styles.emptyText}>
            El Torneo no tiene fixture cargados
          </p>
        ) : null}
      </Column>
    </Modal>
  );
};

export default FixtureListModal;

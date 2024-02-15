import { Modal } from 'antd';
import React from 'react';
import { capitalizeFirstLetter } from '../../../utils';
import { Column } from '../../../utils/layout';
import { useGetTournamentsName } from '../../serverStore/queries';
import ItemList from './components/itemList/ItemList';
import styles from './homeModal.module.css';

interface IModalProps {
  open?: boolean;
  onClose?: () => void;
  onChangeTournament: (tournamentId: number) => void;
  tournamentIdSelected?: number;
}

const TournamentsListModal: React.FC<IModalProps> = ({
  open,
  onClose,
  onChangeTournament,
  tournamentIdSelected,
}) => {
  const { data: tournamentsData } = useGetTournamentsName();

  const onSelectedItem = (id: number) => {
    onChangeTournament(id);
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
        <p className={styles.modalTitle}>Lista de Torneos</p>
        {tournamentsData?.map((t) => (
          <ItemList
            key={t.id}
            status={t.status}
            name={capitalizeFirstLetter(t.name) || t.name}
            onSelected={() => onSelectedItem(t.id)}
            isSelected={tournamentIdSelected === t.id}
          />
        ))}
      </Column>
    </Modal>
  );
};

export default TournamentsListModal;

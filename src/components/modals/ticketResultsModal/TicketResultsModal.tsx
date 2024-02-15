import { Modal } from 'antd';
import React from 'react';
import { Column } from '../../../utils/layout';
import TicketComponent from '../../commons/ticketComponent/TicketComponent';
import styles from './ticketResultsModal.module.css';

interface ITicketResultsModalProps {
  open?: boolean;
  onClose?: () => void;
  ticketId: number;
}

const TicketResultsModal: React.FC<ITicketResultsModalProps> = ({
  open,
  onClose,
  ticketId,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      className={styles.modal}
      closeIcon={<div className={styles.closeIcon}>X</div>}
    >
      <Column className={styles.content}>
        <TicketComponent ticketId={ticketId} displayPoints />
      </Column>
    </Modal>
  );
};

export default TicketResultsModal;

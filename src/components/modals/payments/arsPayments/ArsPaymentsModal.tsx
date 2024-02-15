import { Modal } from 'antd';
import React from 'react';
import styles from './arsPaymentsModal.module.css';
import transferLogo from '../../../../assets/transferLogo.png';
import mpLogo from '../../../../assets/mpLogo.png';
import MpSection from './components/mpSection/MpSection';
import { PaymentTicket } from '../../../screens/confirmTicket/ConfirmTicket';
import { PaymentMethodProps } from '../../../../types/ticket.types';
import { Column, Flex } from '../../../../utils/layout';
import { CustomTooltip } from '../../../commons';
import TransferSection from './components/transferSection/TransferSection';
import {
  useGetMercadopago,
  useTrustedUser,
} from '../../../serverStore/queries';

interface ArsPaymentsModal {
  open?: boolean;
  onClose?: () => void;
  onChangePayment: (p: PaymentTicket) => void;
  onConfirmTicket: () => void;
  payment: PaymentTicket;
  createTicketLoading: boolean;
  fixturePrice?: number;
  fixtureId: number;
}

const ArsPaymentsModal: React.FC<ArsPaymentsModal> = ({
  open,
  onClose,
  onChangePayment,
  onConfirmTicket,
  payment,
  createTicketLoading,
  fixturePrice,
  fixtureId,
}) => {
  const { data: mpPreferences, isLoading: mpPreferencesLoading } =
    useGetMercadopago(fixtureId);
  const { data: trustedUser, isLoading: loadingTrustedUser } = useTrustedUser();

  const mpUrl = mpPreferences?.url;
  const handleChangePayment = (p: PaymentMethodProps) => {
    onChangePayment({ paymentMethod: p, paymentId: '' });
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
        <p className={styles.title}>Seleccionar Metodo de Pago</p>
        <div className={styles.lineDivider} />

        <Flex className={styles.images}>
          <div
            className={` ${payment.paymentMethod === 'mp' ? styles.containerImgSelected : styles.containerImg}`}
            onClick={() => handleChangePayment('mp')}
          >
            <img src={mpLogo} className={styles.img} />
          </div>
          <CustomTooltip title='Restringido' disabled={trustedUser}>
            <div
              className={` ${payment.paymentMethod === 'transfer' ? styles.containerImgSelected : styles.containerImg} ${!trustedUser ? `${styles.transferDisabled}` : ''} `}
              onClick={() => {
                trustedUser && handleChangePayment('transfer');
              }}
            >
              <img src={transferLogo} className={styles.img} />
            </div>
          </CustomTooltip>
        </Flex>
        <div className={styles.lineDivider} />
        {payment.paymentMethod === 'mp' ? (
          <MpSection
            mpUrl={mpUrl}
            fixturePrice={fixturePrice}
            mpLoading={mpPreferencesLoading}
          />
        ) : null}
        {payment.paymentMethod === 'transfer' && trustedUser ? (
          <TransferSection
            onChangePayment={onChangePayment}
            payment={payment}
            onConfirmTicket={onConfirmTicket}
            createTicketLoading={createTicketLoading}
            loadingTrustedUser={loadingTrustedUser}
            fixturePrice={fixturePrice}
          />
        ) : null}
      </Column>
    </Modal>
  );
};

export default ArsPaymentsModal;

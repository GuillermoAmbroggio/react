import { Modal } from 'antd';
import React, { useState } from 'react';
import { Column, Flex } from '../../../utils/layout';
import styles from './usdPaymentsModal.module.css';
import binanceLogo from '../../../assets/binanceLogo.png';
import paypalLogo from '../../../assets/paypalLogo.png';
import BinanceSection from './components/binanceSection/BinanceSection';
import { CustomTooltip } from '../../commons';
import { PaymentMethodProps } from '../../../types/ticket.types';
import { PaymentTicket } from '../../screens/confirmTicket/ConfirmTicket';

interface UsdPaymentsModal {
  open?: boolean;
  onClose?: () => void;
  onChangePayment: (p: PaymentTicket) => void;
  onConfirmTicket: () => void;
  payment: PaymentTicket;
  createTicketLoading: boolean;
  fixturePrice?: number;
}

const UsdPaymentsModal: React.FC<UsdPaymentsModal> = ({
  open,
  onClose,
  onChangePayment,
  onConfirmTicket,
  payment,
  createTicketLoading,
  fixturePrice,
}) => {
  const [paymentSelected, setPaymentSelected] =
    useState<PaymentMethodProps>('binance');

  const handleChangePayment = (p: PaymentMethodProps) => {
    setPaymentSelected(p);
    onChangePayment({ paymentMethod: paymentSelected, paymentId: '' });
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
            className={` ${paymentSelected === 'binance' ? styles.containerImgSelected : styles.containerImg}`}
            onClick={() => handleChangePayment('binance')}
          >
            <img src={binanceLogo} className={styles.img} />
          </div>
          <CustomTooltip title='Proximamente'>
            <div
              className={` ${paymentSelected === 'paypal' ? styles.containerImgSelected : styles.containerImg} ${styles.paypalDisabled}`}
            >
              <img src={paypalLogo} className={styles.img} />
            </div>
          </CustomTooltip>
        </Flex>
        <div className={styles.lineDivider} />
        {paymentSelected === 'binance' ? (
          <BinanceSection
            onChangePayment={onChangePayment}
            payment={payment}
            onConfirmTicket={onConfirmTicket}
            createTicketLoading={createTicketLoading}
            fixturePrice={fixturePrice}
          />
        ) : null}
      </Column>
    </Modal>
  );
};

export default UsdPaymentsModal;

import React from 'react';
import styles from './transferSection.module.css';
import { Column, Flex } from '../../../../../../utils/layout';
import { PaymentTicket } from '../../../../../screens/confirmTicket/ConfirmTicket';
import { formatPrice } from '../../../../../../utils';
import { Button, Input } from 'antd';
import { SpinerScreen } from '../../../../../commons';

type BinanceSection = {
  payment: PaymentTicket;
  onChangePayment: (p: PaymentTicket) => void;
  onConfirmTicket: () => void;
  createTicketLoading: boolean;
  fixturePrice?: number;
  loadingTrustedUser: boolean;
};
const TransferSection: React.FC<BinanceSection> = ({
  fixturePrice,
  payment,
  onChangePayment,
  createTicketLoading,
  onConfirmTicket,
  loadingTrustedUser,
}) => {
  const onFinish = () => {
    onConfirmTicket();
  };

  if (loadingTrustedUser) {
    return (
      <SpinerScreen
        style={{ width: '700px', height: '500px', flex: undefined }}
      />
    );
  }
  return (
    <Column className={styles.container}>
      <p className={styles.title}>Transferencia</p>
      <Column className={styles.bankData}>
        <p className={styles.idBinance}>ALIAS: fixtuwin</p>
        <p className={styles.idBinance}>CVU: 0000076500000003083899</p>
      </Column>

      <Flex className={styles.transferForm}>
        <Column>
          <p className={styles.label}>* Titular de la Cuenta: </p>
          <Input
            placeholder='Ingresar Nombre Completo'
            value={payment.paymentId}
            className={styles.input}
            onChange={(e) =>
              onChangePayment({ ...payment, paymentId: e.target.value })
            }
          />
        </Column>
        <Button
          loading={createTicketLoading}
          type='primary'
          htmlType='submit'
          disabled={!payment.paymentId}
          onClick={onFinish}
          className={styles.buttonNotif}
        >
          Notificar Pago
        </Button>
      </Flex>

      <Column className={styles.bodyText}>
        <Flex className={styles.subTitleInstructions}>
          <p className={styles.boldtext}>¿Como Hacerlo?</p>
        </Flex>
        <p>
          1- Ingresa a tu aplicacion de banco o billetera virtual y selecciona
          transferir dinero.
        </p>
        <p>2- Puedes pegar el Alias/Cvu o ingresarlos manualmente.</p>
        <p>
          3- Ingresa el monto exacto de
          <strong>{formatPrice(fixturePrice)}</strong> y Selecciona Enviar.
        </p>
        <p>
          4- Una vez realizado el pago Ingresa el nombre desde la cuenta que
          transferiste y pegarlo en el input.
        </p>
        <p>
          5- Haz click en el boton Notificar Pago y listo ya estaras
          participando de la fecha luego de verificar tu pago.
        </p>
        <p className={styles.importantText}>
          IMPORTANTE: El monto debe ser exacto{' '}
          <strong>{formatPrice(fixturePrice)}</strong> para que el pago sea
          valido y tenes tiempo hasta 5 minutos antes de que inicie el primer
          partido de la fecha. De lo contrario tu ticket sera descartado.
        </p>
      </Column>
    </Column>
  );
};

export default TransferSection;

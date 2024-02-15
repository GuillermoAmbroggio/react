import React from 'react';
import { Column, Flex } from '../../../../../utils/layout';
import qrBinanceLiber from '../../../../../assets/qrBinanceLiber.png';
import styles from './binanceSection.module.css';
import { Button, Input } from 'antd';
import { PaymentTicket } from '../../../../screens/confirmTicket/ConfirmTicket';
import { formatPrice } from '../../../../../utils';

type BinanceSection = {
  payment: PaymentTicket;
  onChangePayment: (p: PaymentTicket) => void;
  onConfirmTicket: () => void;
  createTicketLoading: boolean;
  fixturePrice?: number;
};
const BinanceSection: React.FC<BinanceSection> = ({
  payment,
  onChangePayment,
  onConfirmTicket,
  createTicketLoading,
  fixturePrice,
}) => {
  const onFinish = () => {
    onConfirmTicket();
  };

  return (
    <Column className={styles.container}>
      <p className={styles.title}>Binance Pay</p>
      <img src={qrBinanceLiber} className={styles.imgQr} />
      <p className={styles.idBinance}>ID de Binance: 94375229</p>

      <Flex className={styles.binanceForm}>
        <Column>
          <p className={styles.label}>* Orden ID: </p>
          <Input
            placeholder='Ingresar Orden ID'
            value={payment.paymentId}
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
          style={{ color: 'black', marginTop: 21 }}
          onClick={onFinish}
        >
          Verificar Pago
        </Button>
      </Flex>

      <Column className={styles.bodyText}>
        <p className={styles.titleInstructions}>¿Como Hacerlo?</p>
        <Flex className={styles.subTitleInstructions}>
          <p className={styles.boldtext}>Con el codigo QR</p>
          <a
            className={styles.steps}
            href='https://www.binance.com/es-LA/support/faq/c%C3%B3mo-enviar-criptomonedas-a-una-persona-a-trav%C3%A9s-de-binance-pay-b3fa3ae045b9429084203c3a4ff1362f'
            target={'_blank'}
            rel='noreferrer'
          >
            (Ver paso a paso)
          </a>
        </Flex>
        <p>
          1- Ingresa a la App de Binance. Toca el escáner de códigos QR en la
          página de inicio.
        </p>
        <p>
          2- Verifica los detalles del pago despues de escanear el codigo y
          confirma.
        </p>
        <p>
          3- Una vez realizado el pago copiar el Order Id y pegarlo en el input
          debajo del QR.
        </p>
        <p>
          4- Haz click en el boton Verificar Pago y listo ya estaras
          participando de la fecha.
        </p>
        <Flex
          className={`${styles.subTitleInstructions} ${styles.lastSubTitle}`}
        >
          <p className={styles.boldtext}>Con el ID de Binance</p>
          <a
            className={styles.steps}
            href='https://www.binance.com/es/support/faq/c%C3%B3mo-realizar-un-pago-a-un-comercio-con-binance-pay-a-trav%C3%A9s-de-un-c%C3%B3digo-qr-3771bb743ee54151a2d255641d902b67'
            target={'_blank'}
            rel='noreferrer'
          >
            (Ver paso a paso)
          </a>
        </Flex>

        <p>1- Ingresa a la App de Binance. Ve a -PAY- y presiona -Enviar-.</p>
        <p>
          2- Puedes pegar el ID de Binance o ingresarlos manualmente. Selecciona
          -Continuar-.
        </p>
        <p>
          3- Ingresa el monto exacto de{' '}
          <strong>{formatPrice(fixturePrice)}</strong> y Selecciona -Continuar-.
        </p>
        <p>
          4- Una vez realizado el pago copiar el Order Id y pegarlo en el input
          debajo del QR.
        </p>
        <p>
          5- Haz click en el boton Verificar Pago y listo ya estaras
          participando de la fecha.
        </p>
        <p className={styles.importantText}>
          IMPORTANTE: La moneda debe ser si o si <strong>USDT</strong> y el
          monto debe ser exacto <strong>{formatPrice(fixturePrice)}</strong>{' '}
          para que el pago sea valido.
        </p>
      </Column>
    </Column>
  );
};

export default BinanceSection;

import React from 'react';
import styles from './mpSection.module.css';
import { Column, Flex } from '../../../../../../utils/layout';
import mercadoPagoIcono from '../../../../../../assets/mercadoPagoIcono.png';
import { formatPrice } from '../../../../../../utils';
import { SpinerScreen } from '../../../../../commons';

type MpSection = {
  mpUrl?: string;
  fixturePrice?: number;
  mpLoading?: boolean;
};

const MpSection: React.FC<MpSection> = ({ mpUrl, fixturePrice, mpLoading }) => {
  if (mpLoading) {
    return (
      <SpinerScreen
        style={{ width: '700px', height: '500px', flex: undefined }}
      />
    );
  }
  return (
    <Column className={styles.container}>
      <p className={styles.title}>Mercado Pago</p>
      <a href={mpUrl}>
        <img src={mercadoPagoIcono} className={styles.img} />
      </a>

      <Column className={styles.bodyText}>
        <Flex className={styles.subTitleInstructions}>
          <p className={styles.boldtext}>¿Como Hacerlo?</p>
        </Flex>
        <p>
          1- Presiona sobre el icono de Mercado Pago. Seras redirigido a la
          aplicacion de Mercado Pago.
        </p>
        <p>
          2- Elegi el metodo que mas comodo te quede. Podes optar por Tarjetas
          de Credito, Debito o con Dinero en tu cuenta.
        </p>
        <p>
          3- Una vez realizado el pago seras redireccionado nuevante a esta
          seccion y listo ya estaras participando de la fecha.
        </p>
        <p className={styles.importantText}>
          IMPORTANTE: El valor total a pagar con este metodo es{' '}
          <strong>{formatPrice(fixturePrice)}</strong> del valor del ticket mas
          5% de comision de la plataforma.
        </p>
      </Column>
    </Column>
  );
};

export default MpSection;

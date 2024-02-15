import { Alert, Button, Checkbox, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatPrice, rulesForm } from '../../../utils';
import { Column, Flex } from '../../../utils/layout';
import { WinnersData } from '../../../utils/winners/winners';
import useClientStore from '../../clientStore/useClientStore';
import { CustomTooltip } from '../../commons';
import { useClaimPrize } from '../../serverStore/mutations';
import styles from './winModal.module.css';

export type StorageClaimPrizeModal = {
  [key: string]: boolean; //fecha 2: true
};

export type ClaimPriceForm = {
  cvu: string;
  bankName: string;
  dni: string;
  name: string;
};

export type ClaimedPrize = {
  fixtureId: number;
  tournamentId: number;
};

type StorageSendedForm = {
  [key: string]: boolean; //fecha 2: true
};

interface IWinModalProps {
  open?: boolean;
  onClose?: () => void;
  winners: WinnersData;
}

const WinModal: React.FC<IWinModalProps> = ({ open, onClose, winners }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [checked, setChecked] = useState(false);
  const { loggedUser, dispatch } = useClientStore();
  const [prizeForm] = Form.useForm<ClaimPriceForm>();
  const rules = rulesForm();
  const {
    mutate: sendEmail,
    isPending,
    isSuccess: sendFormSuccess,
    isError: sendFormError,
  } = useClaimPrize();

  const userWiner = winners.info.find((u) => u.email === loggedUser?.email);
  const isMultipleWinners = winners.info.length > 1;

  const onFinish = (values: any) => {
    sendEmail(values);
  };

  const handleButton = () => {
    if (checked) {
      const fixtuName = winners.fixture.fixtureName;
      const setStorage = { [fixtuName]: true };
      localStorage.setItem('claimedPrize', JSON.stringify(setStorage));
    }
    onClose && onClose();
  };

  useEffect(() => {
    const storageSendedForm = localStorage.getItem('sendedForm');
    const storageSendedFormParse: StorageSendedForm | undefined =
      storageSendedForm ? JSON.parse(storageSendedForm) : undefined;
    if (
      storageSendedFormParse &&
      storageSendedFormParse[winners?.fixture.fixtureName]
    ) {
      return setShowAlert(true);
    }

    if (sendFormSuccess) {
      setShowAlert(true);
      const fixtuName = winners.fixture.fixtureName;
      const setStorage = { [fixtuName]: true };
      localStorage.setItem('sendedForm', JSON.stringify(setStorage));
    }
    if (sendFormError) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: 'Error',
          description:
            'No se pudo enviar el formulario, porfavor intentelo nuevamente mas tarde.',
          status: 'error',
        },
      });
    }
  }, [sendFormSuccess, sendFormError]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      className={styles.modal}
      closeIcon={<div className={styles.closeIcon}>X</div>}
    >
      <Column className={styles.content}>
        <p className={styles.title}>¡Felicidades, {loggedUser?.name}!</p>
        {isMultipleWinners ? (
          <p className={styles.text}>
            Fuiste uno de los {winners.info.length} mejores de la fecha con tu
            ticket #{userWiner?.ticketId}, compartiras el premio total de
            {formatPrice(winners.prize)}. Por favor completa el formulario para
            poder recibir tu parte de{' '}
            {formatPrice(winners.prize / winners.info.length)}.
          </p>
        ) : (
          <p className={styles.text}>
            Fuiste el que mas puntos sumo con tu ticket #{userWiner?.ticketId},
            ganaste el premio total de {formatPrice(winners.prize)}. Para
            recibir tu premio por favor completa el formulario:
          </p>
        )}

        {showAlert ? (
          <Alert
            message={
              'El formulario se envió correctamente. En las proximas 48hs vas a recibir el premio en tu cuenta, gracias por participar!'
            }
            type='success'
            showIcon
            className={styles.alert}
          />
        ) : (
          <Form
            layout={'vertical'}
            form={prizeForm}
            onFinish={onFinish}
            name='prizeForm'
          >
            <Form.Item
              name='cvu'
              rules={rules.required}
              label={
                <label className={styles.label}>Ingresa Alias o Cbu/Cvu</label>
              }
            >
              <Input placeholder='Numero de cvu/cbu' />
            </Form.Item>
            <Form.Item
              name='bankName'
              rules={rules.required}
              label={
                <label className={styles.label}>
                  Ingresa el nombre del Banco/Billetera
                </label>
              }
            >
              <Input placeholder='Ej: MercadoPago, Galicia..' />
            </Form.Item>
            <Form.Item
              name='dni'
              rules={rules.required}
              label={<label className={styles.label}>Ingresa tu dni</label>}
            >
              <Input placeholder='Numero de dni' />
            </Form.Item>
            <Form.Item
              name='name'
              rules={rules.required}
              label={
                <label className={styles.label}>
                  Ingresa tu nombre completo
                </label>
              }
            >
              <Input placeholder='Ej: Jonh Doe' />
            </Form.Item>

            <Button
              loading={isPending}
              type='primary'
              htmlType='submit'
              style={{ width: '100%' }}
            >
              Enviar Datos
            </Button>
            <p className={styles.textWaring}>
              El premio se te acreditara en las proximas 48hs de recibir tus
              datos.
            </p>
          </Form>
        )}

        {showAlert ? (
          <>
            <Flex
              className={styles.checkbox}
              onClick={() => setChecked(!checked)}
            >
              <Checkbox disabled={!showAlert} checked={checked} />
              <CustomTooltip
                disabled={showAlert}
                title='Completa y envia el formulario para cerrar definitivamente'
              >
                <p>No volver a mostrar</p>
              </CustomTooltip>
            </Flex>
            <Button
              loading={isPending}
              type='dashed'
              htmlType='submit'
              style={{ width: '100%' }}
              onClick={handleButton}
            >
              Aceptar y Cerrar
            </Button>
          </>
        ) : null}
      </Column>
    </Modal>
  );
};

export default WinModal;

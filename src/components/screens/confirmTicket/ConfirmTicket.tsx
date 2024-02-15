import { Alert, Button, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useWriting from '../../../copywriting/useWriting';
import {
  BodyTicket,
  PaymentMethodProps,
  TicketAttributes,
} from '../../../types/ticket.types';
import { handleErrorReponse } from '../../../utils';
import encryptData from '../../../utils/hooks/encryptData';
import { Column } from '../../../utils/layout';
import useClientStore from '../../clientStore/useClientStore';
import TicketComponent from '../../commons/ticketComponent/TicketComponent';
import { AuthModal } from '../../modals';
import { AuthType } from '../../modals/auth/AuthModal';
import ArsPaymentsModal from '../../modals/payments/arsPayments/ArsPaymentsModal';
import UsdPaymentsModal from '../../modals/usdPayments/UsdPaymentsModal';
import { useCreateTicket } from '../../serverStore/mutations';
import { useGetFixture } from '../../serverStore/queries';
import HeaderWithTitle from './components/headerWithTitle/HeaderWithTitle';
import styles from './confirmTicket.module.css';

const { REACT_APP_CREATE_TICKET_SECRET } = process.env;

export type PaymentTicket = {
  paymentMethod: PaymentMethodProps;
  paymentId: string;
};

const ConfirmTicket: React.FC = () => {
  const writing = useWriting();
  const { dispatch } = useClientStore();
  const { loggedUser } = useClientStore();
  const navigate = useNavigate();

  const {
    mutate,
    data: newTicket,
    isSuccess: succesCreateTciket,
    isPending: createTicketLoading,
  } = useCreateTicket();

  const [authModal, setAuthModal] = useState<{
    open?: boolean;
    authType?: AuthType;
  }>({});
  const [usdPaymentsModal, setUsdPaymentsModal] = useState(false);
  const [arsPaymentsModal, setArsPaymentsModal] = useState(false);

  const [payment, setPayment] = useState<PaymentTicket>({
    paymentMethod: 'mp',
    paymentId: '',
  });

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('payment_id') || undefined;
  const fixtureIdSearchParams = searchParams.get('fixtureId')
    ? Number(searchParams.get('fixtureId'))
    : undefined;
  const fixtureId: number | undefined =
    location.state?.fixtureId || fixtureIdSearchParams;
  const { data: fixtureData } = useGetFixture({ fixtureId });

  const storedTicketResultJSON = localStorage.getItem('ticketResult');
  const ticketResultData: TicketAttributes | undefined = storedTicketResultJSON
    ? JSON.parse(storedTicketResultJSON)
    : newTicket;

  const isInternational =
    ticketResultData?.fixture?.tournament?.country === 'international';

  const handleAuthOpen = (authType?: AuthType) => {
    setAuthModal({ open: true, authType });
  };

  const handleAuthClose = () => {
    setAuthModal({ open: false });
  };
  const handleUsdPaymentsClose = () => {
    setPayment({ paymentId: '', paymentMethod: 'binance' });
    setUsdPaymentsModal(false);
  };
  const handleUsdPaymentsOpen = () => {
    setPayment({ paymentId: '', paymentMethod: 'binance' });
    setUsdPaymentsModal(true);
  };
  const handleArsPaymentsClose = () => {
    setPayment({ paymentId: '', paymentMethod: 'mp' });
    setArsPaymentsModal(false);
  };
  const handleArsPaymentsOpen = () => {
    setPayment({ paymentId: '', paymentMethod: 'mp' });
    setArsPaymentsModal(true);
  };

  const handleChangePayment = (p: {
    paymentMethod: PaymentMethodProps;
    paymentId: string;
  }) => {
    setPayment(p);
  };
  const handleConfirmTicket = () => {
    const body: BodyTicket = {
      paymentMethod: payment.paymentMethod,
      paymentId: payment.paymentId,
      fixtureId: ticketResultData?.fixtureId,
      predictions: ticketResultData?.predictions || [],
      createTicketSecret: REACT_APP_CREATE_TICKET_SECRET || '',
    };
    const encryptingData = encryptData(body);
    mutate(
      {
        ticket: encryptingData,
      },

      {
        onSuccess: () => {
          if (isInternational) {
            handleUsdPaymentsClose();
          } else {
            handleArsPaymentsClose();
          }
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              message: writing.confirmResults.success.description,
              status: 'success',
            },
          });
        },
        onError: (e) => {
          const error = handleErrorReponse(e);
          let errorText: string | undefined = undefined;
          if (error == 40 || error == 25) {
            errorText = 'El ID de la Orden no es valido';
          }
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              message: writing.confirmResults.error.title,
              description: errorText,
              status: 'error',
            },
          });
        },
      },
    );
  };

  useEffect(() => {
    if (paymentId) {
      const body: BodyTicket = {
        paymentMethod: 'mp',
        fixtureId: ticketResultData?.fixtureId,
        predictions: ticketResultData?.predictions || [],
        paymentId,
        createTicketSecret: REACT_APP_CREATE_TICKET_SECRET || '',
      };
      const encryptingData = encryptData(body);
      mutate({
        ticket: encryptingData,
      });
      searchParams.delete('payment_id');
    }
  }, [paymentId]);

  return (
    <div>
      <div className={styles.backgroundImg} />
      <HeaderWithTitle
        title={
          succesCreateTciket
            ? writing.confirmResults.success.title
            : writing.confirmResults.title
        }
        goBackButton={() => {
          navigate('/');
        }}
      />
      <Column className={styles.content}>
        <p className={styles.description}>
          {succesCreateTciket ? (
            <Alert
              message={writing.confirmResults.success.description}
              type='success'
              showIcon
              closable
            />
          ) : (
            <Alert
              message={writing.confirmResults.description}
              type='warning'
              showIcon
            />
          )}
        </p>
        {!loggedUser ? (
          <Alert
            message={writing.confirmResults.alert.description}
            type='warning'
            showIcon
            closable
          />
        ) : null}
        {ticketResultData ? (
          <Column className={styles.containerTicket}>
            <TicketComponent
              ticketStorageData={ticketResultData}
              fixtureId={fixtureId || newTicket?.fixtureId}
            />

            {loggedUser && !succesCreateTciket ? (
              <>
                <Popconfirm
                  title='Confirmar tus resultados'
                  description='Revisa bien tus resultados, una vez confirmado el ticket no podras modificarlo.'
                  okText='Confirmar'
                  cancelText='Cancelar'
                  onConfirm={() => {
                    if (isInternational) {
                      handleUsdPaymentsOpen();
                    } else {
                      handleArsPaymentsOpen();
                    }
                  }}
                >
                  <Button
                    loading={createTicketLoading}
                    type='primary'
                    className={styles.button}
                  >
                    {writing.confirmResults.button}
                  </Button>
                </Popconfirm>
              </>
            ) : null}

            {/* BOTONES PARA LOGUEAR REGISTRAR USUARIO */}
            {!loggedUser ? (
              <Column>
                <Button
                  type='primary'
                  className={styles.button}
                  onClick={() => handleAuthOpen('login')}
                >
                  {writing.user.login.title}
                </Button>
                <Button
                  type='link'
                  className={styles.button}
                  onClick={() => handleAuthOpen('register')}
                >
                  {writing.user.register.title}
                </Button>

                {authModal.authType && authModal.open ? (
                  <AuthModal
                    open={authModal.open}
                    authType={authModal.authType}
                    handleClose={handleAuthClose}
                  />
                ) : null}
              </Column>
            ) : null}
          </Column>
        ) : (
          <div>No hay predicciones</div>
        )}
      </Column>
      {usdPaymentsModal ? (
        <UsdPaymentsModal
          open={usdPaymentsModal}
          onClose={handleUsdPaymentsClose}
          onChangePayment={handleChangePayment}
          onConfirmTicket={handleConfirmTicket}
          payment={payment}
          createTicketLoading={createTicketLoading}
          fixturePrice={fixtureData?.price}
        />
      ) : null}

      {arsPaymentsModal && fixtureData?.id ? (
        <ArsPaymentsModal
          open={arsPaymentsModal}
          onClose={handleArsPaymentsClose}
          onChangePayment={handleChangePayment}
          onConfirmTicket={handleConfirmTicket}
          payment={payment}
          createTicketLoading={createTicketLoading}
          fixturePrice={fixtureData?.price}
          fixtureId={fixtureData?.id}
        />
      ) : null}
    </div>
  );
};

export default ConfirmTicket;

import { Button, Checkbox, Modal } from 'antd';
import React, { useState } from 'react';
import { capitalizeFirstLetter, formatPrice } from '../../../utils';
import { Column, Flex } from '../../../utils/layout';
import { WinnersData } from '../../../utils/winners/winners';
import styles from './fixtureFinished.module.css';
import winnerImage from '../../../assets/winner.png';
import CupIcon from '../../../assets/CupIcon';
import TicketResultsModal from '../ticketResultsModal/TicketResultsModal';

export type StorageShowModalWinner = {
  [key: string]: boolean;
};

export type ShowedModalWinner = {
  fixtureId: number;
  tournamentId: number;
  userId: number;
};

interface IWinModalProps {
  open?: boolean;
  onClose?: () => void;
  winners: WinnersData;
}

const FixtureFinished: React.FC<IWinModalProps> = ({
  open,
  onClose,
  winners,
}) => {
  const [resultTicketOpen, setResultTicketOpen] = useState<{
    open: boolean;
    ticketId?: number;
  }>({ open: false });
  const [checked, setChecked] = useState(false);
  const isMultipleWinners = winners.info.length > 1;

  const handleButton = () => {
    if (checked) {
      const fixtuName = winners.fixture.fixtureName;
      const setStorage = { [fixtuName]: true };
      localStorage.setItem('showWinnerModal', JSON.stringify(setStorage));
    }
    onClose && onClose();
  };

  const handleShowTicket = (ticketId: number) => {
    setResultTicketOpen({ open: true, ticketId });
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
        <p className={styles.tournamenttext}>
          {capitalizeFirstLetter(winners.torunament.tournamentName)}
        </p>
        <p className={styles.title}>
          Resultados de la {capitalizeFirstLetter(winners.fixture.fixtureName)}
        </p>

        <p className={styles.subtitle}>
          La fecha ha llegado a su fin.{' '}
          {isMultipleWinners
            ? 'Los ganadores de la fecha fueron:'
            : 'El ganador de la fecha fue:'}
        </p>

        {winners.info.map((w) => (
          <p key={w.email} className={styles.winerText}>
            <CupIcon /> <span className={styles.bold}>{w.userName}</span> con el{' '}
            <span
              className={`${styles.bold} ${styles.tickettext}`}
              onClick={() => handleShowTicket(w.ticketId)}
            >
              Ticket #{w.ticketId}
            </span>
          </p>
        ))}

        {isMultipleWinners ? (
          <p className={styles.prizetext}>
            Sumaron un total de {winners.fixture.resultPoints} puntos y se
            ganaron el premio total de{' '}
            <span className={styles.bold}>
              {formatPrice(winners.prize / winners.info.length)}
            </span>{' '}
            cada uno.
          </p>
        ) : (
          <p className={styles.prizetext}>
            Sumó un total de 8 puntos y se gano el premio total de{' '}
            <span className={styles.bold}>{formatPrice(winners.prize)}</span>.
          </p>
        )}

        <img src={winnerImage} className={styles.img} />
        <p className={styles.resttext}>
          Agradecemos a todos los jugadores por su participación. Esperamos
          verlos nuevamente en la próxima fecha.{' '}
          {isMultipleWinners
            ? '¡Felicidades a los ganadores!'
            : '¡Felicidades al ganador!'}
        </p>
        <p className={styles.infotext}>
          Para ver mas resultados de la fecha puedes presionar sobre el nombre
          de la fecha actual y seleccionar la fecha deseada. Debajo del ticket
          encontraras la tabla de resultados
        </p>
        <Flex className={styles.checkbox} onClick={() => setChecked(!checked)}>
          <Checkbox checked={checked} />

          <p>No volver a mostrar</p>
        </Flex>
        <Button
          type='dashed'
          htmlType='submit'
          onClick={handleButton}
          className={styles.button}
        >
          Aceptar y Cerrar
        </Button>
        {resultTicketOpen.open && resultTicketOpen.ticketId ? (
          <TicketResultsModal
            open={resultTicketOpen.open}
            onClose={() => setResultTicketOpen({ open: false })}
            ticketId={resultTicketOpen.ticketId}
          />
        ) : null}
      </Column>
    </Modal>
  );
};

export default FixtureFinished;

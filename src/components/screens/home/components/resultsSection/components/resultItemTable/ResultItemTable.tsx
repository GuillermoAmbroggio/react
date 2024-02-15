import React, { useState } from 'react';
import { Column, Flex } from '../../../../../../../utils/layout';
import styles from './resultItemTable.module.css';
import { TicketAttributes } from '../../../../../../../types/ticket.types';
import { TicketResultsModal } from '../../../../../../modals';
import useClientStore from '../../../../../../clientStore/useClientStore';
import { CustomTooltip } from '../../../../../../commons';
import { TopTickets } from '../../../../../../../types/fixture.types';

interface IResultItemTableProps {
  ticket: TicketAttributes;
  isFixtureValidDate?: boolean;
  topTickets?: TopTickets;
  position: number;
  isFirstPosition?: boolean;
  isSecondPosition?: boolean;
  isThirdPosition?: boolean;
}

const ResultItemTable: React.FC<IResultItemTableProps> = ({
  ticket,
  position,
  isFixtureValidDate,
  isFirstPosition,
  isSecondPosition,
  isThirdPosition,
}) => {
  const { loggedUser } = useClientStore();
  const [openResultTicketModal, setOpenResultTicketModal] = useState(false);

  const isTop = isFirstPosition || isSecondPosition || isThirdPosition;

  const enabledShow =
    loggedUser &&
    (loggedUser?.userType === 'administrator' ||
      !isFixtureValidDate ||
      loggedUser?.id === ticket.user?.id);

  const titleTooltip = !loggedUser
    ? 'Inicia sesion para ver'
    : 'El fixture todavia no comenzó';

  return (
    <Flex style={{ gap: 4 }} className={styles.container}>
      <Flex
        className={`${styles.puesto} ${
          isFirstPosition ? styles.firstPosition : ''
        } ${isSecondPosition ? styles.secondPosition : ''} ${
          isThirdPosition ? styles.thirdPosition : ''
        }`}
      >
        {position}
        {isTop ? (
          <i
            className={`fas fa-medal ${isFirstPosition ? styles.gold : ''} ${
              isSecondPosition ? styles.silver : ''
            }  ${isThirdPosition ? styles.bronze : ''}`}
          />
        ) : null}
      </Flex>
      <p
        className={`${styles.ticket} ${
          isFirstPosition ? styles.firstPosition : ''
        } ${isSecondPosition ? styles.secondPosition : ''}  ${
          isThirdPosition ? styles.thirdPosition : ''
        }`}
      >
        {`#${ticket.id}`}
      </p>
      <Column
        className={`${styles.user} ${
          isFirstPosition ? styles.firstPosition : ''
        } ${isSecondPosition ? styles.secondPosition : ''}  ${
          isThirdPosition ? styles.thirdPosition : ''
        }`}
      >
        <p
          className={styles.textName}
        >{`${ticket.user?.name} ${ticket.user?.lastname}`}</p>
      </Column>
      <Column
        className={`${styles.points} ${
          isFirstPosition ? styles.firstPosition : ''
        } ${isSecondPosition ? styles.secondPosition : ''}  ${
          isThirdPosition ? styles.thirdPosition : ''
        }`}
      >
        {ticket.resultPoints || '0'}
      </Column>
      {ticket.paymentStatus === 'pending' &&
      ticket.user?.id === loggedUser?.id ? (
        <CustomTooltip
          title={<p className={styles.alertIcon}>Pendiente de Pago</p>}
        >
          <div
            className={`${styles.showTicket} ${styles.pending} `}
            onClick={() => (enabledShow ? setOpenResultTicketModal(true) : '')}
          >
            <i className={`fas fa-exclamation-circle ${styles.alertIcon}`} />
            <p>Ver Ticket</p>
          </div>
        </CustomTooltip>
      ) : (
        <CustomTooltip title={titleTooltip} disabled={enabledShow}>
          <div
            className={`${styles.showTicket} ${
              !enabledShow ? styles.showTicketDisabled : null
            }`}
            onClick={() => (enabledShow ? setOpenResultTicketModal(true) : '')}
          >
            <i style={{ fontSize: 16 }} className='fas fa-caret-right' />
            <p>Ver Ticket</p>
          </div>
        </CustomTooltip>
      )}

      {ticket?.id ? (
        <TicketResultsModal
          open={openResultTicketModal}
          onClose={() => setOpenResultTicketModal(false)}
          ticketId={ticket.id}
        />
      ) : null}
    </Flex>
  );
};

export default ResultItemTable;

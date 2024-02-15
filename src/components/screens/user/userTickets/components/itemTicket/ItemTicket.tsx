import { Tag } from 'antd';
import React, { useState } from 'react';
import { statusFixture } from '../../../../../../types/fixture.types';
import { TicketAttributes } from '../../../../../../types/ticket.types';
import { capitalizeFirstLetter } from '../../../../../../utils';
import { Flex } from '../../../../../../utils/layout';
import { CustomTooltip } from '../../../../../commons';
import { TicketResultsModal } from '../../../../../modals';
import { colorStatusFixture } from '../../../../../modals/home/components/itemList/ItemList';
import styles from './itemTicket.module.css';

type TItemTicket = {
  ticket: TicketAttributes;
};

const ItemTicket: React.FC<TItemTicket> = ({ ticket }) => {
  const [openResultTicketModal, setOpenResultTicketModal] = useState(false);
  const { fixture } = ticket;
  return (
    <Flex className={styles.containerItemTicket}>
      <Flex className={styles.leftItemTicket}>
        <Flex className={styles.ticketContainer}>
          <p className={`${styles.boldText} ${styles.ticketText}`}>Ticket</p>
          <p>{`#${ticket.id}`}</p>
        </Flex>
        <Flex className={styles.fixturename}>
          <p className={styles.boldText}>
            {capitalizeFirstLetter(fixture?.name)}
          </p>
        </Flex>
        {fixture?.status ? (
          <Tag
            color={colorStatusFixture[fixture.status]}
            className={styles.boldText}
          >
            {statusFixture[fixture.status]}
          </Tag>
        ) : null}

        {ticket.paymentStatus === 'pending' ? (
          <CustomTooltip
            title={<p className={styles.alertIcon}>Pendiente de Pago</p>}
          >
            <i className={`fas fa-exclamation-circle ${styles.alertIcon}`} />
          </CustomTooltip>
        ) : ticket.resultPoints ? (
          <Flex gap={4}>
            <p>{ticket.resultPoints}</p>
            <p>Pt{ticket.resultPoints > 1 ? 's' : ''}</p>
          </Flex>
        ) : (
          '-'
        )}
      </Flex>

      <span
        className={styles.containerButton}
        onClick={() => setOpenResultTicketModal(true)}
      >
        Ver Ticket
      </span>

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

export default ItemTicket;

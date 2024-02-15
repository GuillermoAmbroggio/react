import { Alert } from 'antd';
import React, { useMemo } from 'react';
import CupIcon from '../../../assets/CupIcon';
import { PredictionAttributes } from '../../../types/prediction.types';
import { TicketAttributes } from '../../../types/ticket.types';
import { Column, Flex } from '../../../utils/layout';
import { useGetTicket } from '../../serverStore/queries';
import MatchItem from './components/MatchItem';
import TicketHeader from './components/ticketHeader/TicketHeader';
import styles from './ticketComponent.module.css';

interface ITicketComponentProps {
  ticketId?: number;
  displayPoints?: boolean;
  ticketStorageData?: TicketAttributes;
  fixtureId?: number; //Solamente recibira este valor cuando el usuario venga desde confirmar ticket y se usara para comparar si los datos guardados en el storage son coincidentes con este fixtureId
}

const TicketComponent: React.FC<ITicketComponentProps> = ({
  ticketId,
  displayPoints,
  ticketStorageData,
  fixtureId,
}) => {
  const { data: ticketResult } = ticketId
    ? useGetTicket(ticketId)
    : { data: null };
  const predictions: PredictionAttributes[] | undefined = useMemo(() => {
    if (ticketResult?.predictions) return ticketResult?.predictions;
    if (
      ticketStorageData &&
      fixtureId &&
      ticketStorageData?.fixtureId === fixtureId
    )
      return ticketStorageData?.predictions;
    return undefined;
  }, [ticketId, ticketStorageData, fixtureId, ticketResult]);

  const fixture = ticketResult?.fixture || ticketStorageData?.fixture;

  return (
    <Column>
      {ticketResult?.paymentStatus === 'pending' ? (
        <Column className={styles.containerInfo}>
          <Alert
            message={
              <p>
                Ticket pendiente de pago. Si ya realizaste la transferencia
                podes ignorar este mensaje
              </p>
            }
            type='warning'
            showIcon
            closable
          />

          <Alert
            closable
            message={
              <>
                <p className={styles.infoText}>
                  Si todavia no realizaste el pago tenes tiempo hasta el inicio
                  del primer partido, de lo contrario el ticket sera descartado.
                </p>
                <Flex className={styles.bankName}>
                  <p className={styles.idBinance}>ALIAS: fixtuwin</p>/
                  <p className={styles.idBinance}>
                    CVU: 0000076500000003083899
                  </p>
                </Flex>
              </>
            }
            type='info'
            showIcon
          />
        </Column>
      ) : null}
      <Column className={styles.tableHeader}>
        <Column className={styles.titleHeaderText}>
          <Flex style={{ gap: 8 }}>
            <CupIcon size={'1rem'} />
            <p className={styles.tournamentName}>
              {fixture?.tournament?.name?.toUpperCase()}
            </p>
            <CupIcon size={'1rem'} />
          </Flex>
          <p>{fixture?.name?.toUpperCase()}</p>
        </Column>

        <div className={styles.dividerHeader} />
        <TicketHeader displayPoints={displayPoints} />
      </Column>
      <Column className={styles.tableContent}>
        {predictions?.length
          ? predictions.map((p, i) => (
              <Column key={`tc-${i}`}>
                <MatchItem prediction={p} displayPoints={displayPoints} />
                {i !== predictions.length - 1 ? (
                  <div className={styles.dividerContent} />
                ) : null}
              </Column>
            ))
          : null}
      </Column>
    </Column>
  );
};

export default TicketComponent;

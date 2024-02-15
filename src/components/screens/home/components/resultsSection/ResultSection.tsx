import React, { useState } from 'react';
import { FixtureAttributes } from '../../../../../types/fixture.types';
import { TicketAttributes } from '../../../../../types/ticket.types';
import { validateStartDate } from '../../../../../utils/hooks/handleDate';
import { Column, Flex } from '../../../../../utils/layout';
import TableTicketResultsModal from '../../../../modals/tableTicketsResults/TableTicketResultsModal';
import ResultHeaderTable from './components/resultHeaderTable/ResultHeaderTable';
import ResultItemTable from './components/resultItemTable/ResultItemTable';
import styles from './resultSection.module.css';

type TResultSection = {
  fixture: FixtureAttributes | undefined;
};

export type GroupedTickets = {
  firstTickets: TicketAttributes[];
  secondTickets: TicketAttributes[];
  thirdTickets: TicketAttributes[];
  restTickets: TicketAttributes[];
};

const ResultSection: React.FC<TResultSection> = ({ fixture }) => {
  const [openTableModal, setOpenTableModal] = useState(false);
  const tickets = fixture?.tickets;
  const isFixtureValidDate = validateStartDate(fixture?.startDate);

  const groupedTickets: GroupedTickets | undefined = tickets?.reduce(
    (acc, ticket) => {
      if (fixture?.topTickets) {
        if (ticket?.id && fixture.topTickets[1].includes(ticket?.id)) {
          acc.firstTickets.push(ticket);
        } else if (ticket?.id && fixture.topTickets[2].includes(ticket?.id)) {
          acc.secondTickets.push(ticket);
        } else if (ticket?.id && fixture.topTickets[3].includes(ticket?.id)) {
          acc.thirdTickets.push(ticket);
        } else {
          acc.restTickets.push(ticket);
        }
      } else {
        acc.restTickets.push(ticket);
      }
      return acc;
    },
    {
      firstTickets: [],
      secondTickets: [],
      thirdTickets: [],
      restTickets: [],
    } as GroupedTickets,
  );

  const handleCloseTableModal = () => {
    setOpenTableModal(false);
  };

  const handleOpenTableModal = () => {
    setOpenTableModal(true);
  };

  const restInitialIndex = fixture?.topTickets ? 4 : 1;

  return (
    <Column alignItems={'center'} className={styles.containerResultSection}>
      <ResultHeaderTable />
      <Column style={{ gap: 4 }} className={styles.containerItemsTable}>
        {groupedTickets?.firstTickets?.map((t, i) => (
          <ResultItemTable
            key={`tick-${1}-${i}`}
            ticket={{ ...t, fixture: fixture }}
            position={1}
            isFixtureValidDate={isFixtureValidDate}
            isFirstPosition
          />
        ))}
        {groupedTickets?.secondTickets?.map((t, i) => (
          <ResultItemTable
            key={`tick-${i}-${2}`}
            ticket={{ ...t, fixture: fixture }}
            position={2}
            isFixtureValidDate={isFixtureValidDate}
            isSecondPosition
          />
        ))}
        {groupedTickets?.thirdTickets?.map((t, i) => (
          <ResultItemTable
            key={`tick-${i}-${3}`}
            ticket={{ ...t, fixture: fixture }}
            position={3}
            isFixtureValidDate={isFixtureValidDate}
            isThirdPosition
          />
        ))}

        {groupedTickets?.restTickets?.map((t, i) => (
          <ResultItemTable
            key={`tick-${i + restInitialIndex}`}
            ticket={{ ...t, fixture: fixture }}
            position={i + restInitialIndex}
            isFixtureValidDate={isFixtureValidDate}
          />
        ))}
        {fixture?.totalTickets && fixture.totalTickets > 10 ? (
          <Flex className={styles.totalTickets}>
            <p>{fixture?.totalTickets} Tickets Totales</p>
            <p>-</p>
            <p
              className={styles.showMoreTickets}
              onClick={handleOpenTableModal}
            >
              Ver mas
            </p>
          </Flex>
        ) : null}
      </Column>

      {openTableModal && fixture?.id ? (
        <TableTicketResultsModal
          fixtureId={fixture.id}
          isFixtureValidDate={isFixtureValidDate}
          onClose={handleCloseTableModal}
          open={openTableModal}
        />
      ) : null}
    </Column>
  );
};

export default ResultSection;

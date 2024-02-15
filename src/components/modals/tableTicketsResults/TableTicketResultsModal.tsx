import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { TopTickets } from '../../../types/fixture.types';
import { Column } from '../../../utils/layout';
import { SpinerScreen } from '../../commons';
import Pagination from '../../commons/pagination/Pagination';
import ResultHeaderTable from '../../screens/home/components/resultsSection/components/resultHeaderTable/ResultHeaderTable';
import ResultItemTable from '../../screens/home/components/resultsSection/components/resultItemTable/ResultItemTable';
import { GroupedTickets } from '../../screens/home/components/resultsSection/ResultSection';
import { useGetAllTickets } from '../../serverStore/queries';
import styles from './tableTicketResultsModal.module.css';

interface TableTicketResultsModal {
  open?: boolean;
  onClose?: () => void;
  fixtureId: number;
  isFixtureValidDate: boolean;
  topTickets?: TopTickets;
}

const TableTicketResultsModal: React.FC<TableTicketResultsModal> = ({
  open,
  onClose,
  fixtureId,
  isFixtureValidDate,
  topTickets,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 15;
  const { data, isLoading, refetch } = useGetAllTickets({
    page: String(currentPage),
    resultsPerPage: String(resultsPerPage),
    fixtureId: String(fixtureId),
  });
  const tickets = data?.results;

  const groupedTickets: GroupedTickets | undefined = tickets?.reduce(
    (acc, ticket) => {
      if (topTickets && currentPage === 1) {
        if (ticket?.id && topTickets[1].includes(ticket?.id)) {
          acc.firstTickets.push(ticket);
        } else if (ticket?.id && topTickets[2].includes(ticket?.id)) {
          acc.secondTickets.push(ticket);
        } else if (ticket?.id && topTickets[3].includes(ticket?.id)) {
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
  const restInitialIndex = topTickets ? 4 : 1;

  const onChangePagination = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      className={styles.modal}
      closeIcon={<div className={styles.closeIcon}>X</div>}
    >
      <Column className={styles.content}>
        {isLoading ? (
          <SpinerScreen
            style={{ width: '500px', height: '600px', flex: undefined }}
          />
        ) : (
          <>
            <ResultHeaderTable />
            {tickets?.length &&
              tickets.map((t, i) => (
                <ResultItemTable
                  key={`ticket-t-${i}`}
                  ticket={t}
                  position={i}
                  isFixtureValidDate={isFixtureValidDate}
                />
              ))}

            {groupedTickets?.firstTickets?.map((t, i) => (
              <ResultItemTable
                key={`tick-${1}-${i}`}
                ticket={t}
                position={1}
                isFixtureValidDate={isFixtureValidDate}
                isFirstPosition
              />
            ))}
            {groupedTickets?.secondTickets?.map((t, i) => (
              <ResultItemTable
                key={`tick-${i}-${2}`}
                ticket={t}
                position={2}
                isFixtureValidDate={isFixtureValidDate}
                isSecondPosition
              />
            ))}
            {groupedTickets?.thirdTickets?.map((t, i) => (
              <ResultItemTable
                key={`tick-${i}-${3}`}
                ticket={t}
                position={3}
                isFixtureValidDate={isFixtureValidDate}
                isThirdPosition
              />
            ))}

            {groupedTickets?.restTickets?.map((t, i) => (
              <ResultItemTable
                key={`tick-${i + restInitialIndex}`}
                ticket={t}
                position={i + restInitialIndex}
                isFixtureValidDate={isFixtureValidDate}
              />
            ))}
            {data && data?.count > resultsPerPage ? (
              <div className={styles.containerPagination}>
                <Pagination
                  onPageChange={onChangePagination}
                  current={currentPage}
                  total={data?.count}
                  itemsPerPage={resultsPerPage}
                />
              </div>
            ) : null}
          </>
        )}
      </Column>
    </Modal>
  );
};

export default TableTicketResultsModal;

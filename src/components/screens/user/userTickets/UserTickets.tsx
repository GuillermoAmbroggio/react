import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import useWriting from '../../../../copywriting/useWriting';
import { Column } from '../../../../utils/layout';
import BannerSection from '../../../../utils/layout/components/bannerSection/BannerSection';
import { SpinerScreen } from '../../../commons';
import { useGetTickets } from '../../../serverStore/queries';
import ItemTicket from './components/itemTicket/ItemTicket';
import styles from './userTickets.module.css';

const UserTickets: React.FC = () => {
  const writing = useWriting();
  const [pagination, setPagination] = useState(1);

  const { data, refetch, isLoading } = useGetTickets({
    page: String(pagination),
  });
  const ticketResults = data?.results;

  const handlePagination = (page: number) => {
    setPagination(page);
  };

  useEffect(() => {
    refetch();
  }, [pagination]);

  /* TODO: Por ahora solo mostrar todos los tickets que tiene el usuario (del api vienen ordenados por fecha de compra).
   Despues en el futuro agregar inputs de Tournament que pueda elegir el torneo y ahi input de Fixtures para que elija 
   tambien la fecha y mandar al back que solo busque los tickets de ese usuario para este torno y para esa fecha */
  return (
    <Column style={{ flex: 1 }}>
      <BannerSection nameSection={writing.userTickets.title} />
      {isLoading ? (
        <SpinerScreen />
      ) : (
        <>
          {data && ticketResults?.length ? (
            <>
              <Column className={styles.container}>
                <Column className={styles.containerListItems}>
                  {ticketResults?.map((t, i) => (
                    <ItemTicket key={`t-u-${i}`} ticket={t} />
                  ))}
                </Column>
                {data?.count > 10 ? (
                  <Pagination
                    defaultCurrent={pagination}
                    total={data.count}
                    onChange={handlePagination}
                    style={{ paddingBottom: 24 }}
                  />
                ) : null}
              </Column>
            </>
          ) : (
            <div className={styles.container}>
              <p className={styles.textNoData}>No se encontraron tickets..</p>
            </div>
          )}
        </>
      )}
    </Column>
  );
};

export default UserTickets;

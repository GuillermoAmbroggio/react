import React, { useEffect, useState } from 'react';
import styles from './fixtureSection.module.css';
import CupIcon from '../../../../../assets/CupIcon';
import FixtureItem from './components/fixtureItem/FixtureItem';
import FixtureTitleItem from './components/fixtureTitleItem/FixtureTitleItem';
import { Column } from '../../../../../utils/layout';
import { Button } from 'antd';
import useWriting from '../../../../../copywriting/useWriting';
import useClientStore from '../../../../clientStore/useClientStore';
import { useNavigate } from 'react-router-dom';
import { FixtureAttributes } from '../../../../../types/fixture.types';
import { TicketAttributes } from '../../../../../types/ticket.types';
import { PredictionAttributes } from '../../../../../types/prediction.types';
import { formatPrice } from '../../../../../utils';
import { FixtureListModal, TournamentsListModal } from '../../../../modals';
import { TournamentWithFixtureName } from '../../../../../types/tournament.types';
import { CustomTooltip } from '../../../../commons';
import { validateStartDate } from '../../../../../utils/hooks/handleDate';

type TFixtureSection = {
  fixture?: FixtureAttributes;
  onChangeTournament: (tournamentId: number) => void;
  onChangeFixture: (fixtureId: number) => void;
  tournament?: TournamentWithFixtureName;
};

const getInitialPredictions = (
  ticketStoragetData?: TicketAttributes,
  fixture?: FixtureAttributes,
) => {
  if (
    ticketStoragetData?.predictions &&
    ticketStoragetData?.fixtureId === fixture?.id &&
    ticketStoragetData?.fixture?.name === fixture?.name
  ) {
    const newPred = fixture?.matches?.map((m) => {
      const pred = ticketStoragetData.predictions?.find(
        (p) => p.matchId === m.id,
      );
      if (pred) {
        return {
          match: m,
          matchId: m.id,
          predictionLocalTeam: pred.predictionLocalTeam,
          predictionVisitingTeam: pred.predictionVisitingTeam,
        };
      } else {
        return {
          match: m,
          matchId: m.id,
          predictionLocalTeam: undefined,
          predictionVisitingTeam: undefined,
        };
      }
    });
    return newPred || ticketStoragetData.predictions;
  }
  if (fixture?.matches?.length) {
    return fixture.matches.map((m) => {
      return {
        match: m,
        matchId: m.id,
        predictionLocalTeam: undefined,
        predictionVisitingTeam: undefined,
      };
    });
  }
  return [];
};

const FixtureSection: React.FC<TFixtureSection> = ({
  fixture,
  onChangeTournament,
  onChangeFixture,
  tournament,
}) => {
  const writing = useWriting();
  const navigate = useNavigate();
  const { dispatch } = useClientStore();
  const [openTournamentsListModal, setOpenTournamentsListModal] =
    useState(false);
  const [openFixturesListModal, setOpenFixturesListModal] = useState(false);

  const [predictions, setPredictions] = useState<PredictionAttributes[]>([]);

  const isFixtureValidDate = validateStartDate(fixture?.startDate);

  const handleFixtureItemClick = (
    id: number,
    pred: 'local' | 'visitor' | 'tie',
  ) => {
    setPredictions(
      predictions.map((p) => {
        if (p.match?.id === id) {
          return {
            ...p,
            predictionLocalTeam: pred === 'local' ? 1 : 0,
            predictionVisitingTeam: pred === 'visitor' ? 1 : 0,
          };
        } else {
          return p;
        }
      }),
    );
  };
  const handleConfirmResults = () => {
    const isSomePronosticNull = predictions.some(
      (p) => p.predictionLocalTeam == null || p.predictionVisitingTeam == null,
    );
    if (isSomePronosticNull) {
      return dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: writing.home.alertResultsError.title,
          description: writing.home.alertResultsError.description,
          status: 'error',
        },
      });
    }
    const ticketResult = JSON.stringify({
      fixtureId: fixture?.id,
      predictions,
      fixture: {
        id: fixture?.id,
        name: fixture?.name,
        tournament: {
          name: fixture?.tournament.name,
          country: fixture?.tournament.country,
        },
      },
    });
    localStorage.setItem('ticketResult', ticketResult);
    navigate('/confirm-ticket', { state: { fixtureId: fixture?.id } });
  };

  const handleOpenFixtureList = () => {
    setOpenFixturesListModal(true);
  };

  useEffect(() => {
    if (!isFixtureValidDate) {
      localStorage.removeItem('ticketResult');
    }
  }, [isFixtureValidDate]);

  useEffect(() => {
    const storedTicketResultJSON = localStorage.getItem('ticketResult');
    const ticketStoragetData: TicketAttributes | undefined =
      storedTicketResultJSON ? JSON.parse(storedTicketResultJSON) : null;
    setPredictions(getInitialPredictions(ticketStoragetData, fixture));
  }, [fixture?.id]);

  return (
    <div className={styles.containerFixtureSection}>
      <div className={styles.backgroundImg} />
      <Column className={styles.content}>
        <CustomTooltip title='Presiona para cambiar de torneo'>
          <div
            className={styles.tournamentText}
            onClick={() => setOpenTournamentsListModal(true)}
          >
            <CupIcon />
            <p className={styles.tournamentName}>
              {tournament
                ? tournament.name?.toUpperCase()
                : 'Seleccionar Torneo'}
            </p>
            <CupIcon />
          </div>
        </CustomTooltip>
        {fixture ? (
          <>
            <div className={styles.fixtureContainer}>
              <CustomTooltip title='Presiona para cambiar de fixture'>
                <p
                  className={styles.fixturesText}
                  onClick={handleOpenFixtureList}
                >
                  {fixture?.name?.toUpperCase()}
                </p>
              </CustomTooltip>
              |
              <CustomTooltip
                title={
                  'El premio acumulado total se define cuando inicie la fecha'
                }
                disabled={!isFixtureValidDate}
              >
                <div className={styles.prizeContainer}>
                  <p className={styles.prizeText}>
                    Premio {isFixtureValidDate ? 'parcial' : 'total'}
                  </p>
                  <p className={styles.prizeAmount}>
                    {formatPrice(
                      (fixture?.price || 0) *
                        (fixture?.totalTickets || 0) *
                        0.9,
                    )}
                  </p>
                </div>
              </CustomTooltip>
            </div>

            <Column className={styles.containerTable}>
              <FixtureTitleItem />
              <Column className={styles.containerFixtures}>
                {predictions?.length
                  ? predictions.map((p, i) => (
                      <FixtureItem
                        key={`pred-${i}`}
                        prediction={p}
                        handleFixtureItemClick={handleFixtureItemClick}
                        isFixtureValidDate={isFixtureValidDate}
                      />
                    ))
                  : null}
              </Column>
              {isFixtureValidDate ? (
                <Button
                  type='primary'
                  htmlType='submit'
                  className={styles.buttonConfirm}
                  onClick={handleConfirmResults}
                >
                  {writing.home.fixtureSection.buttonBuy}
                </Button>
              ) : null}
            </Column>
          </>
        ) : (
          <div className={styles.fixtureContainer}>
            <p className={styles.fixturesText} onClick={handleOpenFixtureList}>
              Seleccionar Fixture
            </p>
          </div>
        )}
      </Column>
      <TournamentsListModal
        open={openTournamentsListModal}
        onClose={() => setOpenTournamentsListModal(false)}
        onChangeTournament={onChangeTournament}
        tournamentIdSelected={tournament?.id}
      />
      <FixtureListModal
        open={openFixturesListModal}
        onClose={() => setOpenFixturesListModal(false)}
        onChangeFixture={onChangeFixture}
        fixtureIdSelected={fixture?.id}
        fixtures={tournament?.fixture}
      />
    </div>
  );
};

export default FixtureSection;

import React, { useEffect, useState } from 'react';
import { SpinerScreen } from '../../commons';
import { useGetFixture, useGetTournament } from '../../serverStore/queries';
import FixtureSection from './components/fixtureSection/FixtureSection';
import ResultSection from './components/resultsSection/ResultSection';
import { WinModal } from '../../modals';
import { StorageClaimPrizeModal } from '../../modals/winModal/WinModal';
import useClientStore from '../../clientStore/useClientStore';
import winners, { WinnersData } from '../../../utils/winners/winners';
import FixtureFinished, {
  StorageShowModalWinner,
} from '../../modals/fixtureFinished/FixtureFinished';

const Home: React.FC = () => {
  const [tournamentId, setTournamentId] = useState<number | undefined>(
    undefined,
  );
  const [fixtureId, setFixtureId] = useState<number | undefined>(undefined);
  const {
    data: tournamentData,
    isLoading: loadingGetTournament,
    refetch: refetchTournamentGet,
  } = useGetTournament(tournamentId);
  const {
    data: fixtureData,
    isLoading: loadingGetFixtures,
    refetch: refetchGetFixture,
  } = useGetFixture({ tournamentId: tournamentData?.id, fixtureId });

  const { loggedUser } = useClientStore();

  const [fixtureFinishedOpen, setFixtureFinishedOpen] = useState<{
    open: boolean;
    winners?: WinnersData;
  }>({ open: false });

  const [winModalOpen, setWinModalOpen] = useState<{
    open: boolean;
    winners?: WinnersData;
  }>({ open: false });

  const isLoading = loadingGetTournament || loadingGetFixtures;

  const onChangeTournament = (tournamentId: number) => {
    setTournamentId(tournamentId);
    setFixtureId(undefined);
  };

  const onChangeFixture = (fixtureId: number) => {
    setFixtureId(fixtureId);
  };

  /** Cuando cambia el torneo busca el ultimo fixture por comenzar del mismo */
  useEffect(() => {
    if (tournamentData?.id) {
      refetchGetFixture();
    }
  }, [tournamentData?.id]);

  /** Maneja el cambio de torneo */
  useEffect(() => {
    if (tournamentId) {
      refetchTournamentGet();
    }
  }, [tournamentId]);

  /** Maneja el cambio de fixture */
  useEffect(() => {
    refetchGetFixture();
  }, [fixtureId]);

  /** Muestra o no el modal del formulario para el usuario que gano */
  useEffect(() => {
    const storageClaimedPrize = localStorage.getItem('claimedPrize');
    const storageClaimPrizeParse: StorageClaimPrizeModal | undefined =
      storageClaimedPrize ? JSON.parse(storageClaimedPrize) : undefined;
    const findWinners = winners?.find(
      (w) =>
        w.nextFixtureName === fixtureData?.name ||
        w.nextFixtureName === 'lastFixture', //Uso este para mostrar el ultimo ganador de la ultima fecha
    );
    const isThisUserWin = findWinners?.info.find(
      (u) => u.email === loggedUser?.email,
    );
    if (
      findWinners &&
      (!storageClaimPrizeParse ||
        !storageClaimPrizeParse[findWinners?.fixture.fixtureName]) &&
      isThisUserWin
    ) {
      setWinModalOpen({ open: true, winners: findWinners });
    }
  }, [winners, loggedUser, tournamentData?.id, fixtureData?.id]);

  /** Muestra el o los ganadores de la fecha anterior */
  useEffect(() => {
    const storageShowWinnerModal = localStorage.getItem('showWinnerModal');
    const storageShowWinnerModalParse: StorageShowModalWinner | undefined =
      storageShowWinnerModal ? JSON.parse(storageShowWinnerModal) : undefined;
    const findWinners = winners?.find(
      (w) =>
        w.nextFixtureName === fixtureData?.name ||
        w.nextFixtureName === 'lastFixture', //Uso este para mostrar el ultimo ganador de la ultima fecha
    );

    if (
      findWinners &&
      (!storageShowWinnerModalParse ||
        !storageShowWinnerModalParse[findWinners?.fixture.fixtureName]) &&
      (fixtureData?.status === 'toStart' ||
        fixtureData?.status === 'inProgress' ||
        findWinners.nextFixtureName === 'lastFixture')
    ) {
      setFixtureFinishedOpen({ open: true, winners: findWinners });
    }
  }, [winners, fixtureData?.name]);

  if (isLoading)
    return (
      <SpinerScreen
        style={{
          position: 'absolute',
          top: -90,
          bottom: 0,
          height: undefined,
        }}
      />
    );
  return (
    <div>
      <FixtureSection
        fixture={fixtureData}
        onChangeTournament={onChangeTournament}
        tournament={tournamentData}
        onChangeFixture={onChangeFixture}
      />
      {fixtureData?.tickets?.length ? (
        <ResultSection fixture={fixtureData} />
      ) : null}

      {winModalOpen.open && winModalOpen.winners ? (
        <WinModal
          open={winModalOpen.open}
          winners={winModalOpen.winners}
          onClose={() => setWinModalOpen({ open: false })}
        />
      ) : null}

      {fixtureFinishedOpen.open && fixtureFinishedOpen.winners ? (
        <FixtureFinished
          open={fixtureFinishedOpen.open}
          winners={fixtureFinishedOpen.winners}
          onClose={() => setFixtureFinishedOpen({ open: false })}
        />
      ) : null}
    </div>
  );
};

export default Home;

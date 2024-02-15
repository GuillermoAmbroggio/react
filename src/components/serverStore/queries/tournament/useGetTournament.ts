import { useQuery } from '@tanstack/react-query';
import { TournamentWithFixtureName } from '../../../../types/tournament.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

const getTournament = async (
  tournamentId?: number,
): Promise<TournamentWithFixtureName> => {
  const response: TournamentWithFixtureName = await axiosFetch(
    `/tournament/id/${tournamentId || ''}`,
  );
  return response;
};

export default function useGetTournament(tournamentId?: number) {
  return useQuery({
    queryKey: [`tournament-${tournamentId || 'last'}`],
    queryFn: () => getTournament(tournamentId),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
  });
}

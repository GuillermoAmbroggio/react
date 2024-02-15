import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import {
  ResponsePaginatedTournaments,
  TournamentAttributes,
} from '../../../../types/tournament.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type Params = { body: TournamentAttributes; tournamentId: number };
type PutEditTournamentProps = (params: {
  body: TournamentAttributes;
  tournamentId: number;
}) => Promise<any>;

const putEditTournament: PutEditTournamentProps = async (params) => {
  return await axiosFetch(`/tournament/${params.tournamentId}`, {
    method: 'PUT',
    data: params.body,
  }).then((response) => {
    return response;
  });
};

const useEditTournament: (
  tournamentId?: number,
) => UseMutationResult<TournamentAttributes, any, Params, unknown> = (
  tournamentId?: number,
) => {
  const serverStore = useQueryClient();
  return useMutation({
    mutationFn: putEditTournament,
    onSuccess: async (dataEdited) => {
      const dataCache = serverStore.getQueryData(['tournaments']) as
        | ResponsePaginatedTournaments
        | undefined;

      if (dataCache && dataCache.results.length) {
        const results = dataCache.results;
        const dataEditIndex = results.findIndex((r) => r.id === tournamentId);
        if (dataEditIndex !== -1) {
          results[dataEditIndex] = dataEdited;
        }
        serverStore.setQueryData(['tournaments'], { ...dataCache, results });
      }

      serverStore.invalidateQueries({
        queryKey: [`tournament-${tournamentId ?? ''}`],
      });
    },
  });
};

export default useEditTournament;

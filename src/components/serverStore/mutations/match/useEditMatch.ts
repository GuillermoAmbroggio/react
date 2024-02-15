import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {
  MatchAttributes,
  ResponsePaginatedMatches,
} from '../../../../types/match.types';

import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type Params = { body: MatchAttributes; matchId: number };
type PutEditMatchProps = (params: {
  body: MatchAttributes;
  matchId: number;
}) => Promise<any>;

const putEditFixture: PutEditMatchProps = async (params) => {
  return await axiosFetch(`/match/${params.matchId}`, {
    method: 'PUT',
    data: params.body,
  }).then((response) => {
    return response;
  });
};

const useEditMatch: (
  matchId?: number,
) => UseMutationResult<MatchAttributes, any, Params, unknown> = (
  matchId?: number,
) => {
  const serverStore = useQueryClient();
  return useMutation({
    mutationFn: putEditFixture,
    onSuccess: async (dataEdited) => {
      const dataCache = serverStore.getQueryData(['matches']) as
        | ResponsePaginatedMatches
        | undefined;

      if (dataCache && dataCache.results.length) {
        const results = dataCache.results;
        const dataEditIndex = results.findIndex((r) => r.id === matchId);
        if (dataEditIndex !== -1) {
          results[dataEditIndex] = dataEdited;
        }
        serverStore.setQueryData(['matches'], { ...dataCache, results });
      }
      serverStore.invalidateQueries({ queryKey: [`match-${matchId ?? ''}`] });
    },
  });
};

export default useEditMatch;

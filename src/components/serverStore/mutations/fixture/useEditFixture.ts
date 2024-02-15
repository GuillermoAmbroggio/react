import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {
  FixtureAttributes,
  ResponsePaginatedFixtures,
} from '../../../../types/fixture.types';

import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type Params = { body: FixtureAttributes; fixtureId: number };
type PutEditFixtureProps = (params: {
  body: FixtureAttributes;
  fixtureId: number;
}) => Promise<any>;

const putEditFixture: PutEditFixtureProps = async (params) => {
  return await axiosFetch(`/fixture/${params.fixtureId}`, {
    method: 'PUT',
    data: params.body,
  }).then((response) => {
    return response;
  });
};

const useEditFixture: (
  fixtureId?: number,
) => UseMutationResult<FixtureAttributes, any, Params, unknown> = (
  fixtureId?: number,
) => {
  const serverStore = useQueryClient();
  return useMutation({
    mutationFn: putEditFixture,
    onSuccess: async (dataEdited) => {
      const dataCache = serverStore.getQueryData(['fixtures']) as
        | ResponsePaginatedFixtures
        | undefined;

      if (dataCache && dataCache.results.length) {
        const results = dataCache.results;
        const dataEditIndex = results.findIndex((r) => r.id === fixtureId);
        if (dataEditIndex !== -1) {
          results[dataEditIndex] = dataEdited;
        }
        serverStore.setQueryData(['fixtures'], { ...dataCache, results });
      }
      serverStore.invalidateQueries({
        queryKey: [`fixture-${fixtureId ?? ''}`],
      });
    },
  });
};

export default useEditFixture;

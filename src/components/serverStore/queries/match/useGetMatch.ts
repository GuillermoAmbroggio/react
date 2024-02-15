import { useQuery } from '@tanstack/react-query';
import { MatchAttributes } from '../../../../types/match.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

const getMatch = async (matchId: number): Promise<MatchAttributes> => {
  const response: MatchAttributes = await axiosFetch(`/match/${matchId}`);
  return response;
};

/* export default function useGetMatch(matchId: number) {
  return useQuery<MatchAttributes>(
    [`match-${matchId}`],
    () => getMatch(matchId),
    {
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 5, // 5 minutes (in milliseconds)
    },
  );
}
 */

export default function useGetMatch(matchId: number) {
  return useQuery({
    queryKey: [`match-${matchId}`],
    queryFn: () => getMatch(matchId),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
    gcTime: 1000 * 60 * 10, // 10 minutes (in milliseconds) controla cuánto tiempo se mantienen los datos en caché después de que una consulta ya no se esté utilizando
  });
}

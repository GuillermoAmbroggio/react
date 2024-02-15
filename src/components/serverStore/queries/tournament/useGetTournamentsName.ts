import { useQuery } from '@tanstack/react-query';
import { StatusTournament } from '../../../../types/tournament.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type Response = {
  id: number;
  name: string;
  status: StatusTournament;
}[];
const getTournamentsName = async (): Promise<Response> => {
  const response: Response = await axiosFetch('/tournament/name');
  return response;
};

export default function useGetTournamentsName() {
  return useQuery({
    queryKey: ['tournaments-name'],
    queryFn: () => getTournamentsName(),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
  });
}

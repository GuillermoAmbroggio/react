import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { TournamentAttributes } from '../../../../types/tournament.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type IPostCreateTournament = (
  body: TournamentAttributes,
) => Promise<TournamentAttributes>;
const postCreateTournament: IPostCreateTournament = async (body) => {
  const response = await axiosFetch('/tournament', {
    method: 'POST',
    data: body,
  });
  return response;
};

const useCreateTournament: () => UseMutationResult<
  TournamentAttributes,
  any,
  TournamentAttributes,
  unknown
> = () => {
  const serverStore = useQueryClient();

  return useMutation({
    mutationFn: postCreateTournament,
    onSuccess: () => {
      serverStore.invalidateQueries({ queryKey: ['tournaments'] });
    },
  });
};

export default useCreateTournament;

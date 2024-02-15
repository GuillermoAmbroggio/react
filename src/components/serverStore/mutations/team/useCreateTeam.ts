import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { TeamAttributes } from '../../../../types/team.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type IPostCreateTeam = (body: TeamAttributes) => Promise<TeamAttributes>;
const postCreateTeam: IPostCreateTeam = async (body) => {
  const response = await axiosFetch('/team', {
    method: 'POST',
    data: body,
  });
  return response;
};

const useCreateTeam: () => UseMutationResult<
  TeamAttributes,
  any,
  TeamAttributes,
  unknown
> = () => {
  const serverStore = useQueryClient();

  return useMutation({
    mutationFn: postCreateTeam,
    onSuccess: () => {
      serverStore.invalidateQueries({ queryKey: ['teams'] });
    },
  });
};

export default useCreateTeam;

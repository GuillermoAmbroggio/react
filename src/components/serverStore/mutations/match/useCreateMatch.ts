import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { MatchAttributes } from '../../../../types/match.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type IPostCreateMatch = (body: MatchAttributes) => Promise<MatchAttributes>;
const postCreateMatch: IPostCreateMatch = async (body) => {
  const response = await axiosFetch('/match', {
    method: 'POST',
    data: body,
  });
  return response;
};

const useCreateMatch: () => UseMutationResult<
  MatchAttributes,
  any,
  MatchAttributes,
  unknown
> = () => {
  const serverStore = useQueryClient();

  return useMutation({
    mutationFn: postCreateMatch,
    onSuccess: () => {
      serverStore.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};

export default useCreateMatch;

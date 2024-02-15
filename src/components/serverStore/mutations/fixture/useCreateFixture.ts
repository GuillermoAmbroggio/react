import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { FixtureAttributes } from '../../../../types/fixture.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type IPostCreateFixture = (
  body: FixtureAttributes,
) => Promise<FixtureAttributes>;
const postCreateFixture: IPostCreateFixture = async (body) => {
  const response = await axiosFetch('/fixture', {
    method: 'POST',
    data: body,
  });
  return response;
};

const useCreateFixture: () => UseMutationResult<
  FixtureAttributes,
  any,
  FixtureAttributes,
  unknown
> = () => {
  const serverStore = useQueryClient();

  return useMutation({
    mutationFn: postCreateFixture,
    onSuccess: () => {
      serverStore.invalidateQueries({ queryKey: ['fixtures'] });
    },
  });
};

export default useCreateFixture;

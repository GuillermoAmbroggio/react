import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type PostUploadImage = (body: FormData) => Promise<string>;

const postUploadImage: PostUploadImage = async (body) => {
  return await axiosFetch('/image', {
    method: 'POST',
    data: body,
  }).then((response) => {
    return response;
  });
};

const useUploadImage: () => UseMutationResult<
  string,
  any,
  FormData,
  unknown
> = () => {
  return useMutation({ mutationFn: postUploadImage });
};

export default useUploadImage;

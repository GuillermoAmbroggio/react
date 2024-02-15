import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import { ClaimPriceForm } from '../../../modals/winModal/WinModal';

type IPostClaimPrize = (body: ClaimPriceForm) => Promise<string>;
const postClaimPrize: IPostClaimPrize = async (body) => {
  const response = await axiosFetch('/email/claim-prize', {
    method: 'POST',
    data: body,
  });
  return response;
};

const useClaimPrize: () => UseMutationResult<
  string,
  any,
  ClaimPriceForm,
  unknown
> = () => {
  return useMutation({ mutationFn: postClaimPrize });
};

export default useClaimPrize;

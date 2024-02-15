import { UserAttributes } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

const useGetUser = async (userId?: number): Promise<UserAttributes> => {
  const response: UserAttributes = await axiosFetch(
    `/user${userId ? `?userId=${userId}` : ''}`,
  );

  return response;
};
export default useGetUser;

import { useQuery } from '@tanstack/react-query';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';

const getTrustedUser = async (): Promise<boolean> => {
  const response: boolean = await axiosFetch('/trusted-user/include');
  return response;
};

export default function useTrustedUser() {
  const { loggedUser } = useClientStore();

  return useQuery({
    queryKey: ['trusted-user'],
    queryFn: () => getTrustedUser(),
    enabled: !!loggedUser,
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
  });
}

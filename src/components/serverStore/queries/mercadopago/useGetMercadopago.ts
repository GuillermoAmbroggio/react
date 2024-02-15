import { useQuery } from '@tanstack/react-query';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';

export type ResponseMercadoPago = {
  preferenceId: string;
  url: string;
};

const getMercadopago = async (
  fixtureId: number,
): Promise<ResponseMercadoPago> => {
  const response: ResponseMercadoPago = await axiosFetch(
    `/mercadopago/${fixtureId}`,
  );
  return response;
};

export default function useGetMercadopago(fixtureId: number) {
  const { loggedUser } = useClientStore();

  return useQuery({
    queryKey: ['mercadopago'],
    queryFn: () => getMercadopago(fixtureId),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
    gcTime: 1000 * 60 * 60, // 60 minutes (in milliseconds)
    enabled: !!loggedUser,
  });
}

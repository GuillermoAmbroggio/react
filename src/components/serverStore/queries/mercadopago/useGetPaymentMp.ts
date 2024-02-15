import { useQuery } from '@tanstack/react-query';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';
import { ResponsePaymentMp } from './paymentType';

const getPaymentMp = async (paymentId?: string): Promise<ResponsePaymentMp> => {
  const response: ResponsePaymentMp = await axiosFetch(
    `/mercadopago/payment?paymentId=${paymentId}`,
  );
  return response;
};

export default function useGetPaymentMp(paymentId?: string) {
  const { loggedUser } = useClientStore();

  return useQuery({
    queryKey: ['paymentMp'],
    queryFn: () => getPaymentMp(paymentId),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
    gcTime: 1000 * 60 * 60, // 60 minutes (in milliseconds)
    enabled: !!loggedUser,
  });
}

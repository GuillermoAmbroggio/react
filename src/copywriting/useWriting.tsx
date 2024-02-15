import useClientStore from '../components/clientStore/useClientStore';
import writingES from './writin.es';
import writingEn from './writing.en';
import { IWriting } from './writing.type';

const useWriting: () => IWriting = () => {
  const { language } = useClientStore();

  return language === 'es' ? writingES : writingEn;
};

export default useWriting;

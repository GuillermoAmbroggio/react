import { useEffect, useRef, useState } from 'react';
import useClientStore from '../../components/clientStore/useClientStore';
import useGetUser from '../../components/serverStore/queries/user/useGetUser';
import logger from '../logger/logger';
import generateXAK from './generateXAK';
import moment from 'moment-timezone';
import axios from 'axios';

/** Funcion que revisa si hay una sesion activa antes de iniciar la app */
export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const unmounted = useRef(false);

  const { dispatch } = useClientStore();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync(): Promise<void> {
      try {
        const apiKey = await generateXAK(
          moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD'),
        );
        axios.interceptors.request.use((config: any) => {
          config.headers['x-a-k'] = apiKey;

          return config;
        });

        dispatch({ type: 'LOADING', payload: true });
        // Si existe una sesion activa
        const auth = await localStorage.getItem('auth');
        if (auth) {
          dispatch({ type: 'AUTH', payload: JSON.parse(auth) });
          const user = await useGetUser();
          if (user) {
            dispatch({ type: 'SET_USER', payload: user });
          } else {
            dispatch({ type: 'LOGOUT' });
          }
        }
      } catch (e) {
        logger(e);
        dispatch({ type: 'LOGOUT' });
      } finally {
        setLoadingComplete(true);
        dispatch({ type: 'LOADING', payload: false });
      }
    }
    if (!unmounted.current) {
      void loadResourcesAndDataAsync();
    }

    return () => {
      unmounted.current = true;
    };
  }, []);

  return isLoadingComplete;
}

import { create } from 'zustand';
import { produce } from 'immer';
import { Actions } from './actions';
import reducer from './reducers';
import { ClientDispatch, ClientStore } from './clientStore.types';

const initialClientStore: ClientStore = {
  authentication: null,
  isLoading: false,
  notification: null,
  language: 'es',
  loggedUser: undefined,
};

const immer = (config: any) => (set: any, get: any, api: any) =>
  config((fn: any) => set(produce(fn)), get, api);

const useClientStore = create<ClientStore & ClientDispatch>(
  immer((set: (arg0: (state: ClientStore) => void) => any) => ({
    ...initialClientStore,
    dispatch: (args: Actions) =>
      set((state: ClientStore) => reducer(state, args)),
  })),
);

export default useClientStore;

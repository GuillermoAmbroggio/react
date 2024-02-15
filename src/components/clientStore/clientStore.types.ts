import { IAuth, UserAttributes } from '../../types/user.types';
import { Actions } from './actions';
export type ClientDispatch = {
  dispatch: (action: Actions) => void;
};

export type NotificationPorps = {
  message: string;
  description?: string;
  status: 'success' | 'error' | 'info' | 'warning';
};

export type ClientStore = {
  authentication: IAuth | null;
  isLoading: boolean;
  notification: NotificationPorps | null;
  language: 'es' | 'en';
  loggedUser?: UserAttributes;
};

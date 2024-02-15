import { UserAttributes } from '../../types/user.types';
import { NotificationPorps } from './clientStore.types';

export type AuthActions =
  | { type: 'LOGOUT' }
  | {
      type: 'AUTH';
      payload: {
        csrfToken: string;
      };
    }
  | {
      type: 'SET_USER';
      payload: UserAttributes;
    };

export type LoadingActions = {
  type: 'LOADING';
  payload: boolean;
};

export type NotificationActions = {
  type: 'SET_NOTIFICATION';
  payload: NotificationPorps;
};

export type Actions = AuthActions | LoadingActions | NotificationActions;

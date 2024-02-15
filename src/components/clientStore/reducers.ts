import { Actions } from './actions';
import { ClientStore } from './clientStore.types';

const reducer = (draft: ClientStore, action: Actions): void => {
  switch (action.type) {
    case 'LOGOUT':
      void localStorage.removeItem('auth');
      draft.authentication = null;
      draft.loggedUser = undefined;
      break;

    case 'AUTH': {
      const { csrfToken } = action.payload;
      draft.authentication = action.payload;
      void localStorage.setItem(
        'auth',
        JSON.stringify({
          csrfToken,
        }),
      );
      break;
    }

    case 'SET_USER': {
      draft.loggedUser = action.payload;
      break;
    }

    case 'LOADING': {
      draft.isLoading = action.payload;
      break;
    }

    case 'SET_NOTIFICATION': {
      draft.notification = action.payload;
      break;
    }

    default:
      throw new Error('Invalid action type');
  }
};

export default reducer;

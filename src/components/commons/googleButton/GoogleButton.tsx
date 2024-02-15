import { Divider } from 'antd';
import React from 'react';
import { Column } from '../../../utils/layout';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginGoogle } from '../../serverStore/mutations';
import useClientStore from '../../clientStore/useClientStore';
import useWriting from '../../../copywriting/useWriting';

type GoogleButton = {
  handleClose?: () => void;
};
const GoogleButton: React.FC<GoogleButton> = ({ handleClose }) => {
  const { mutate } = useLoginGoogle();
  const { dispatch } = useClientStore();
  const writing = useWriting();
  return (
    <Column alignItems='center'>
      <Divider />
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            mutate({ credential: credentialResponse.credential });
            handleClose && handleClose();
            dispatch({
              type: 'SET_NOTIFICATION',
              payload: {
                status: 'success',
                message: writing.user.login.successMessage,
              },
            });
          }
        }}
        onError={() => {
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              message: writing.user.login.errorMessage,
              status: 'error',
            },
          });
        }}
        theme='outline'
        size='large'
        shape='pill'
      />
    </Column>
  );
};

export default GoogleButton;

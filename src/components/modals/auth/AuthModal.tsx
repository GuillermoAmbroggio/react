import { Modal } from 'antd';
import React, { useState } from 'react';
import useWriting from '../../../copywriting/useWriting';
import LoginModal from './components/login/LoginModal';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import RegisterModal from './components/register/RegisterModal';
import { GoogleButton } from '../../commons';

export type AuthType = 'login' | 'register' | 'forgotPassword';

interface IAuthModalProps {
  authType: AuthType;
  open: boolean;
  handleClose?: () => void;
}

const AuthModal: React.FC<IAuthModalProps> = ({
  authType,
  open,
  handleClose,
}) => {
  const writing = useWriting();
  const [auth, setAuth] = useState(authType);
  const style = auth === 'register' ? { top: 0 } : undefined;
  return (
    <Modal
      title={writing.user[auth].title}
      open={open}
      onCancel={handleClose}
      footer={null}
      style={style}
    >
      {auth === 'login' ? (
        <LoginModal setAuth={setAuth} handleClose={handleClose} />
      ) : null}
      {auth === 'register' ? (
        <RegisterModal setAuth={setAuth} handleClose={handleClose} />
      ) : null}
      {auth === 'forgotPassword' ? <ForgetPassword setAuth={setAuth} /> : null}
      {auth !== 'forgotPassword' ? (
        <GoogleButton handleClose={handleClose} />
      ) : null}
    </Modal>
  );
};

export default AuthModal;

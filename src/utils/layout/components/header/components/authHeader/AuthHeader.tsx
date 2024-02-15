import React, { useState } from 'react';
import Flex from '../../../Flex';
import styles from './authHeader.module.css';
import useWriting from '../../../../../../copywriting/useWriting';
import AuthModal, {
  AuthType,
} from '../../../../../../components/modals/auth/AuthModal';
import { Dropdown, MenuProps, Modal } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../../../../../components/serverStore/mutations';
import useClientStore from '../../../../../../components/clientStore/useClientStore';

const AuthHeader: React.FC = () => {
  const writing = useWriting();
  const navigate = useNavigate();
  const { mutate } = useLogout();
  const { loggedUser, dispatch } = useClientStore();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [authModal, setAuthModal] = useState<{
    open?: boolean;
    authType?: AuthType;
  }>({});

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => navigate('/user/predictions')}>
          {writing.authHeader.myTickets}
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => navigate('/user/profile')}>
          {writing.authHeader.myProfile}
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div onClick={() => setIsConfirmModalOpen(true)}>
          {writing.authHeader.logout}
        </div>
      ),
    },
  ];

  const handleOpen = (authType?: AuthType) => {
    setAuthModal({ open: true, authType });
  };

  const handleClose = () => {
    setAuthModal({ open: false });
  };

  return (
    <>
      {!loggedUser ? (
        <>
          <Flex style={{ gap: 16, alignItems: 'center' }}>
            <span
              className={styles.loginText}
              onClick={() => handleOpen('login')}
            >
              {writing.user.login.title}
            </span>
            <span
              className={styles.registerText}
              onClick={() => handleOpen('register')}
            >
              {writing.user.register.title}
            </span>
          </Flex>
          {authModal.authType && authModal.open ? (
            <AuthModal
              open={authModal.open}
              authType={authModal.authType}
              handleClose={handleClose}
            />
          ) : null}
        </>
      ) : (
        <>
          <Dropdown menu={{ items }}>
            <div
              style={{
                color: 'white',
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                cursor: 'pointer',
                fontWeight: 800,
              }}
              onClick={(e) => e.preventDefault()}
            >
              <UserOutlined />
              {`${loggedUser.name} ${loggedUser.lastname}`}
              <DownOutlined />
            </div>
          </Dropdown>
          <Modal
            title={writing.authHeader.confirmModal.title}
            open={isConfirmModalOpen}
            okText={writing.authHeader.confirmModal.confirmButton}
            cancelText={writing.authHeader.confirmModal.cancelButton}
            onOk={() => {
              setIsConfirmModalOpen(false);
              handleClose();
              dispatch({
                type: 'SET_NOTIFICATION',
                payload: {
                  message: 'Usuario desconectado',
                  status: 'info',
                },
              });
              mutate();
            }}
            onCancel={() => setIsConfirmModalOpen(false)}
          >
            <p>{writing.authHeader.confirmModal.description}</p>
          </Modal>
        </>
      )}
    </>
  );
};

export default AuthHeader;

import React, { useState } from 'react';
import { Drawer, Modal } from 'antd';
import styles from './userMenuMobile.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../../../../../../../components/serverStore/mutations';
import useWriting from '../../../../../../../copywriting/useWriting';
import Column from '../../../../Column';
import useClientStore from '../../../../../../../components/clientStore/useClientStore';
import Flex from '../../../../Flex';
type MenuMobile = {
  open?: boolean;
  onClose?: () => void;
};
const MenuMobile: React.FC<MenuMobile> = ({ open, onClose }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { mutate } = useLogout();
  const { loggedUser, dispatch } = useClientStore();

  const writing = useWriting();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  return (
    <Drawer
      placement={'left'}
      closable={false}
      onClose={onClose}
      open={open}
      key={'left'}
      width={'50%'}
    >
      <Column style={{ overflow: 'hidden' }}>
        <Column style={{ flex: 1 }}>
          <Flex gap={8}>
            <i className='fas fa-user' />
            <p
              className={styles.nameText}
            >{`${loggedUser?.name} ${loggedUser?.lastname}`}</p>
          </Flex>
          <div className={styles.lineDivider} />
          <span
            className={`${styles.headerText} ${
              currentPath === '/user/profile' ? styles.headerTextSelected : ''
            }`}
            onClick={() => navigate('/user/profile')}
          >
            {writing.authHeader.myProfile}
          </span>

          <span
            className={`${styles.headerText} ${
              currentPath === '/user/predictions'
                ? styles.headerTextSelected
                : ''
            }`}
            onClick={() => navigate('/user/predictions')}
          >
            {writing.authHeader.myTickets}
          </span>
        </Column>
        <div
          onClick={() => setIsConfirmModalOpen(true)}
          className={styles.logoutText}
        >
          {writing.authHeader.logout}
        </div>
      </Column>
      <Modal
        title={writing.authHeader.confirmModal.title}
        open={isConfirmModalOpen}
        okText={writing.authHeader.confirmModal.confirmButton}
        cancelText={writing.authHeader.confirmModal.cancelButton}
        onOk={() => {
          setIsConfirmModalOpen(false);
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
    </Drawer>
  );
};

export default MenuMobile;

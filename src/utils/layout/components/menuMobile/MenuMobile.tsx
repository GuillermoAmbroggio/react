import React, { useState } from 'react';
import { Drawer, Modal } from 'antd';
import styles from './menuMobile.module.css';
import Column from '../Column';
import useWriting from '../../../../copywriting/useWriting';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../../../../components/serverStore/mutations';
type MenuMobile = {
  open?: boolean;
  onClose?: () => void;
};
const MenuMobile: React.FC<MenuMobile> = ({ open, onClose }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { mutate } = useLogout();

  const writing = useWriting();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const handleMenuClick = (goPath: string) => {
    navigate(goPath);
  };

  const isHome = currentPath === '/';

  return (
    <Drawer
      placement={'left'}
      closable={false}
      onClose={onClose}
      open={open}
      key={'left'}
      width={'50%'}
    >
      <Column>
        <span
          className={`${styles.headerText} ${
            isHome ? styles.headerTextSelected : ''
          }`}
          onClick={() => handleMenuClick('/')}
        >
          {writing.menuTop.home}
        </span>

        <span
          className={`${styles.headerText} ${
            currentPath === '/instructions' ? styles.headerTextSelected : ''
          }`}
          onClick={() => handleMenuClick('/instructions')}
        >
          {writing.menuTop.instructions}
        </span>
        <span
          className={`${styles.headerText} ${
            currentPath === '/support' ? styles.headerTextSelected : ''
          }`}
          onClick={() => handleMenuClick('/support')}
        >
          {writing.menuTop.support}
        </span>
      </Column>

      <Modal
        title={writing.authHeader.confirmModal.title}
        open={isConfirmModalOpen}
        okText={writing.authHeader.confirmModal.confirmButton}
        cancelText={writing.authHeader.confirmModal.cancelButton}
        onOk={() => {
          setIsConfirmModalOpen(false);
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

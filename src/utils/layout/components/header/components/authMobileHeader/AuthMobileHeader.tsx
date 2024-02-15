import React, { useState } from 'react';
import useClientStore from '../../../../../../components/clientStore/useClientStore';
import AuthModal, {
  AuthType,
} from '../../../../../../components/modals/auth/AuthModal';
import UserMenuMobile from './userMenuMobile/UserMenuMobile';

const AuthMobileHeader: React.FC = () => {
  const { loggedUser } = useClientStore();
  const [authModal, setAuthModal] = useState<{
    open?: boolean;
    authType?: AuthType;
  }>({});
  const [openUserMenuMobile, setOpenUserMenuMobile] = useState(false);

  const handleCloseUserMenuMobile = () => {
    setOpenUserMenuMobile(false);
  };

  const handleToggleMenuMobile = () => {
    setOpenUserMenuMobile(!openUserMenuMobile);
  };

  const handleOpenAuthModal = (authType?: AuthType) => {
    setAuthModal({ open: true, authType });
  };

  const handleCloseAuthModal = () => {
    setAuthModal({ open: false });
  };

  const handleUserClick = () => {
    if (!loggedUser) {
      return handleOpenAuthModal('login');
    } else {
      return handleToggleMenuMobile();
    }
  };
  return (
    <>
      <i className='fas fa-user' onClick={handleUserClick}></i>
      {authModal.authType && authModal.open ? (
        <AuthModal
          open={authModal.open}
          authType={authModal.authType}
          handleClose={handleCloseAuthModal}
        />
      ) : null}
      {openUserMenuMobile && loggedUser ? (
        <UserMenuMobile
          open={openUserMenuMobile}
          onClose={handleCloseUserMenuMobile}
        />
      ) : null}
    </>
  );
};

export default AuthMobileHeader;

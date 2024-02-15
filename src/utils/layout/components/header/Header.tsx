import React from 'react';
import Flex from '../Flex';
import styles from './header.module.css';
import useWriting from '../../../../copywriting/useWriting';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthHeader from './components/authHeader/AuthHeader';
import LogoPelota from '../../../../assets/logoPelota.png';
import AuthMobileHeader from './components/authMobileHeader/AuthMobileHeader';
interface IHeaderProps {
  startScroll: boolean;
  onToggleMenuMobile: () => void;
}

const Header: React.FC<IHeaderProps> = ({
  startScroll,
  onToggleMenuMobile,
}) => {
  const writing = useWriting();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const handleMenuClick = (goPath: string) => {
    navigate(goPath);
  };

  const isHome = currentPath === '/';

  return (
    <div
      className={`${styles.containerHeader} ${
        startScroll && isHome ? styles.containerHeaderHomeScroll : undefined
      } ${!startScroll && isHome ? styles.containerHeaderHome : undefined} 
      ${
        startScroll && !isHome ? styles.containerHeaderRestScroll : undefined
      } ${!startScroll && !isHome ? styles.containerHeaderRest : undefined}
      `}
      id='headerDiv'
    >
      <div
        className={`${styles.dividerWidth} ${styles.containerLogo}`}
        onClick={() => handleMenuClick('/')}
      >
        <img src={LogoPelota} alt='Logo' width={30} height='auto' />
        <p className={styles.logoTitle}>fixtuwin</p>
      </div>
      <Flex
        style={{ gap: 16 }}
        className={`${styles.dividerWidth} ${styles.navigationMenu}`}
      >
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
      </Flex>
      <div className={`${styles.dividerWidth} ${styles.authHeader}`}>
        <AuthHeader />
      </div>
      <div className={styles.mobileMenu}>
        <AuthMobileHeader />
        <i className='fas fa-bars' onClick={onToggleMenuMobile}></i>
      </div>
    </div>
  );
};

export default Header;

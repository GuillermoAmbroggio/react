import React from 'react';
import styles from './headerWithTitle.module.css';
import { GoBackButton } from '../../../../commons';
import AuthHeader from '../../../../../utils/layout/components/header/components/authHeader/AuthHeader';
import { Flex } from '../../../../../utils/layout';
import AuthMobileHeader from '../../../../../utils/layout/components/header/components/authMobileHeader/AuthMobileHeader';

type THeaderWithTitle = {
  title: string;
  goBackButton?: () => void;
};

const HeaderWithTitle: React.FC<THeaderWithTitle> = ({
  title,
  goBackButton,
}) => {
  return (
    <>
      <Flex className={styles.headerContainer}>
        {goBackButton ? (
          <GoBackButton
            className={styles.goBackContainer}
            goBackButton={goBackButton}
          />
        ) : null}
        <p className={`${styles.title}`}>{title.toLocaleUpperCase()}</p>
        <div className={`${styles.authHeader}`}>
          <AuthHeader />
        </div>
        <div className={styles.mobileMenu}>
          <AuthMobileHeader />
        </div>
      </Flex>
      <p className={`${styles.titleMobile}`}>{title.toLocaleUpperCase()}</p>
    </>
  );
};

export default HeaderWithTitle;

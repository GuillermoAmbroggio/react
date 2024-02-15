import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MenuMobile from './components/menuMobile/MenuMobile';
import styles from './layout.module.css';

const Layout: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const divElement = document.getElementById('headerDiv');

  const containerRef = useRef<any>(null);

  const handleScroll = () => {
    // Obtener la posición actual del scroll
    const scrollY = window.scrollY;

    // Comprobar si el usuario está haciendo scroll
    if (scrollY > 0) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  const handleCloseMenuMobile = () => {
    setOpenMenuMobile(false);
  };

  const handleToggleMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      style={{ paddingTop: isScrolling ? divElement?.offsetHeight : undefined }}
    >
      <div className={styles.containerHeaderBody}>
        <Header
          startScroll={isScrolling}
          onToggleMenuMobile={handleToggleMenuMobile}
        />
        <div className={`${styles.containerBody}`}>
          <Outlet />
        </div>
      </div>
      <Footer />
      {openMenuMobile ? (
        <MenuMobile open={openMenuMobile} onClose={handleCloseMenuMobile} />
      ) : null}
    </div>
  );
};

export default Layout;

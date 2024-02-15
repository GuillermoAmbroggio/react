import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footerText}>
      <p>&copy; 2024 Fixtuwin</p>
    </div>
  );
};

export default Footer;

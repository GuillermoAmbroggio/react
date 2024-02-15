import React from 'react';
import styles from './bannerSection.module.css';
import banner from '../../../../assets/banner.png';
interface IBannerSectionProps {
  nameSection: string;
  classNameText?: string;
}

const BannerSection: React.FC<IBannerSectionProps> = ({
  nameSection,
  classNameText,
}) => {
  const headerDiv = document.getElementById('headerDiv');

  return (
    <div className={`${styles.container}`}>
      <div className={styles.imgOverlay} />
      <img src={banner} className={styles.img} />
      <div
        className={`${styles.containerText}`}
        style={{ paddingTop: headerDiv?.offsetHeight }}
      >
        <span className={`${styles.titleText} ${classNameText}`}>
          {nameSection}
        </span>
      </div>
    </div>
  );
};

export default BannerSection;

import React, { useState } from 'react';
import { Flex } from '../../../utils/layout';
import styles from './pagination.module.css';

interface IPaginationProps {
  current?: number;
  total?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  current,
  itemsPerPage,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil((total || 1) / (itemsPerPage || 10));
  const [currentPage, setCurrentPage] = useState(current || 1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange && onPageChange(newPage);
    }
  };

  return (
    <Flex className={styles.container}>
      <div
        className={`${styles.icon} ${
          currentPage === 1 ? styles.disabledIcon : styles.iconHover
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <i className='fas fa-chevron-left' />
      </div>

      {Array.from({ length: totalPages }, (_, index) => (
        <div
          key={index}
          className={`${styles.itemPage} ${
            index + 1 === currentPage
              ? styles.selectedItemPage
              : styles.noSelectedItemPage
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </div>
      ))}

      <div
        className={`${styles.icon} ${
          currentPage === totalPages ? styles.disabledIcon : styles.iconHover
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <i className='fas fa-chevron-right' />
      </div>
    </Flex>
  );
};

export default Pagination;

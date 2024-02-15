import React from 'react';
import { Flex } from '../../../../../../../utils/layout';
import styles from './resultTable.module.css';

interface RowData {
  [key: string]: string;
}

const data: RowData[] = [
  { puesto: '1', ticket: 'A123', usuario: 'Usuario1', puntos: '100' },
  { puesto: '2', ticket: 'B456', usuario: 'Usuario2', puntos: '80' },
  { puesto: '3', ticket: 'C789', usuario: 'Usuario3', puntos: '120' },
  // Agrega más filas según tus necesidades
];

const ResultTable: React.FC = () => {
  const columnDefinitions = [
    { key: 'puesto', headerName: 'PUESTO' },
    { key: 'ticket', headerName: 'TICKET' },
    { key: 'usuario', headerName: 'USUARIO' },
    { key: 'puntos', headerName: 'PUNTOS' },
  ];

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        {columnDefinitions.map((c, i) => (
          <Flex justifyContent={'center'} key={`header-${i}`}>
            {c.headerName}
          </Flex>
        ))}
      </div>
      <div>
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {columnDefinitions.map((c, columnIndex) => (
              <Flex
                className={styles.rowContainer}
                justifyContent={'center'}
                key={`row-${columnIndex}`}
              >
                {row[c.key]}
              </Flex>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultTable;

import { Spin } from 'antd';
import React from 'react';

interface ISpinerScreenProps {
  size?: 'small' | 'large';
  style?: React.CSSProperties;
}

const SpinerScreen: React.FC<ISpinerScreenProps> = ({ size, style }) => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        ...style,
      }}
    >
      <Spin size={size || 'large'} />
    </div>
  );
};

export default SpinerScreen;

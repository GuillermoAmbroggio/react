import React from 'react';
import styles from '../layout.module.css';
interface IFlexProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  gap?: React.CSSProperties['gap'];
  onClick?: () => void;
}

const Flex: React.FC<IFlexProps> = ({
  children,
  className: classNameProp,
  style: stylePop,
  alignItems,
  justifyContent,
  gap,
  onClick,
}) => {
  return (
    <div
      style={{ alignItems, justifyContent, gap, ...stylePop }}
      className={`${styles.flex} ${classNameProp}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Flex;

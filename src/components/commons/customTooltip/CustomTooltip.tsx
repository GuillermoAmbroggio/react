import { Tooltip, TooltipProps } from 'antd';
import React from 'react';

type ICustomTooltipProps = {
  disabled?: boolean;
} & TooltipProps;

const CustomTooltip: React.FC<ICustomTooltipProps> = ({
  disabled,
  children,
  ...rest
}) => {
  return disabled ? <>{children}</> : <Tooltip {...rest}>{children}</Tooltip>;
};

export default CustomTooltip;

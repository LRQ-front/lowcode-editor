import { Button as AntdButton } from 'antd';
import type { CommonComponentProps } from '../../interface';
import type { ButtonType } from 'antd/es/button';

export interface ButtonProps {
    type: ButtonType,
    text: string;
}

const Button = ({id, type, text, styles, ...props}: CommonComponentProps) => {
  return (
    <AntdButton style={styles} type={type} {...props}>{text}</AntdButton>
  )
}

export default Button;
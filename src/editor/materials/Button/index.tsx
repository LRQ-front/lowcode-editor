import { Button as AntdButton } from 'antd';
import type { CommonComponentProps } from '../../interface';
import type { ButtonType } from 'antd/es/button';

export interface ButtonProps {
    type: ButtonType,
    text: string;
}

const Button = ({id, type, text}: CommonComponentProps) => {
  return (
    <AntdButton data-component-id={id} type={type}>{text}</AntdButton>
  )
}

export default Button;
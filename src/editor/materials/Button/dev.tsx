import { Button as AntdButton } from 'antd';
import type { CommonComponentProps } from '../../interface';
import type { ButtonType } from 'antd/es/button';
import { useDrag } from "react-dnd";

export interface ButtonProps {
    type: ButtonType,
    text: string;
}

const Button = ({id, type, text, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'Button',
      item: {
          type: 'Button',
          dragType: 'move',
          id,
      }})

  return (
    <AntdButton ref={drag}  data-component-id={id} style={styles} type={type}>{text}</AntdButton>
  )
}

export default Button;
import type { CommonComponentProps } from "../../interface";


const Container = ({ id, name,children, styles }: CommonComponentProps) => {
  return (
    <div 
     style={styles}
      className={`p-[20px]`}
      >{children}</div>
  )
}

export default Container;
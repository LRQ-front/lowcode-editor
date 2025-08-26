import type { CommonComponentProps } from "../../interface";
function Page({ id, name, children, styles }: CommonComponentProps) {
  return (
    <div
      className='p-[20px] h-[100%] box-border'
      style={ {...styles}}
    >
      {children}
    </div>
  )
}

export default Page;
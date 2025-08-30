import { useMaterialDrop } from "../../hooks/useMaterialDrop"
import type { CommonComponentProps } from "../../interface"

export default function Modal({id, children, title, styles}: CommonComponentProps) {

    const {canDrop, drop} = useMaterialDrop(['Button', 'Container'], id)

    return <div
        data-component-id={id}
        ref={drop}
        style={styles}
        className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
    >
       <div>{title}</div>
       <div>{children}</div>
    </div>
}
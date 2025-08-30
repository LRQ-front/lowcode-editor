import type { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useDrag } from "react-dnd";
import { useEffect, useRef } from "react";

const Container = ({ id, name, children, styles }: CommonComponentProps) => {
    const { canDrop, drop} = useMaterialDrop(['Button', 'Container', 'Table'], id)

    const containerRef = useRef<HTMLDivElement>(null)

      const [_, drag] = useDrag({
        type: 'Container',
        item: {
            type: 'Container',
            dragType: 'move',
            id,
        }})

        useEffect(() => {
          drop(containerRef)
          drag(containerRef)
        }, [])

  return (
    <div 
    data-component-id={id}
     ref={containerRef}
     style={styles}
      className={`min-h-[100px] p-[20px] ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
      >{children}</div>
  )
}

export default Container;
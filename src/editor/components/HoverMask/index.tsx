import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useComponetsStore, getComponentById } from "../../stores/components";

interface HoverMaskProps {
    containerClassName: string;
    componentId: number;
    portalWrapperClass: string;
}

export function HoverMask({ containerClassName, portalWrapperClass, componentId }: HoverMaskProps) { 
    const { components} = useComponetsStore();

    const [ position, setPosition ] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0
    })

    useEffect(() => { 
        updatePosition();
    }, [componentId])

    useEffect(() => { 
        updatePosition();
    }, [components])

    const el = useMemo(()=> {
        return document.querySelector(`.${portalWrapperClass}`)!
    }, [])

    function updatePosition() {
        if (!componentId) return;

        const containerElement = document.querySelector(`.${containerClassName}`) as HTMLElement;
        if (!containerElement) return;

        const hoverComponent = document.querySelector(`[data-component-id="${componentId}"]`) as HTMLElement;
        if (!hoverComponent) return;

        const { top, left , width, height} = hoverComponent.getBoundingClientRect();
        const { top: containerTop, left: containerLeft} = containerElement.getBoundingClientRect();

        let labelLeft = left -containerLeft + width;
        let labelTop = top - containerTop + containerElement.scrollTop;

        if (labelTop <= 0) {
            labelTop -= -20;
        }

        setPosition({
            top: top - containerTop + containerElement.scrollTop,
            left: left - containerLeft + containerElement.scrollTop,
            width,
            height,
            labelLeft,
            labelTop
        })
    }

    const curComponent= useMemo(() => {
        return getComponentById(componentId, components)
    }, [componentId])

    return createPortal((
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(0, 0, 255, 0.05)",
          border: "1px dashed blue",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      />
      <div
          style={{
            position: "absolute",
            left: position.labelLeft,
            top: position.labelTop,
            fontSize: "14px",
            zIndex: 13,
            display: (!position.width || position.width < 10) ? "none" : "inline",
            transform: 'translate(-100%, -100%)',
          }}
        >
          <div
            style={{
              padding: '0 8px',
              backgroundColor: 'blue',
              borderRadius: 4,
              color: '#fff',
              cursor: "pointer",
              whiteSpace: 'nowrap',
            }}
          >
            {curComponent?.desc}
          </div>
        </div>
    </>
    ), el)
}
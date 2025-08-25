import React, { useState, type MouseEventHandler } from 'react'
import { useComponetsStore } from "../../stores/components"
import type { Component } from "../../stores/components"
import { useComponentConfigStore } from "../../stores/component-config";
import { HoverMask } from '../HoverMask';
import SelectedMask from '../SelectMask';
export function EditArea() {

  const { components, addComponent, curComponentId, setCurComponentId } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const handleClick: MouseEventHandler = (e) => { 
        const path = e.nativeEvent.composedPath();

        for(let i =0 ;i< path.length; i++) {
            const ele = path[i] as HTMLElement;
            const componentId = ele?.dataset?.componentId;
            if (componentId) {
                setCurComponentId(+componentId)
                return;
            }
        }
    }

    const handleMouseOver: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();

        for(let i = 0; i < path.length; i++) {
            const ele = path[i] as HTMLElement;

            const componentId = ele?.dataset?.componentId;
            if (componentId) {
                setHoverComponentId(+componentId)
                return;
            }
        }
    }

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map(component => {
            const config = componentConfig?.[component.name]

            if (!config?.component) {
                return null;
            }

            return React.createElement(
                config.component,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    ...config.defaultProps,
                    ...component.props
                },
                renderComponents(component.children || [])
            )
        })
    }

    return <div className='h-[100%] edit-area' onMouseOver={handleMouseOver} onClick={handleClick} onMouseLeave={() => setHoverComponentId(null)}>
        {renderComponents(components)}
        {hoverComponentId && hoverComponentId !== curComponentId && <HoverMask portalWrapperClass='portal-wrapper' containerClassName='edit-area' componentId={hoverComponentId}></HoverMask>}
        {curComponentId && <SelectedMask portalWrapperClass='portal-wrapper' containerClassName='edit-area' componentId={curComponentId}></SelectedMask>}
        <div className="portal-wrapper"></div>
    </div>
}
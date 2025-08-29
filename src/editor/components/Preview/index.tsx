import React from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { type Component, useComponetsStore } from "../../stores/components"
import { message } from "antd";
import type { ActionConfig } from "../Setting/ActionModal";

export function Preview() {
    const { components } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    function handleEvent(component: Component) {
        const props: Record<string, any> = {}

        componentConfig[component.name].events?.forEach((event) => {
            const eventConfig = component.props[event.name];

            if (eventConfig) {
                props[event.name] = () => {
                    eventConfig.actions?.forEach((action: ActionConfig) => {
                        if (action.type === 'goToLink' && action.url) {
                            window.location.href = action.url
                        } else if (action.type === 'showMessage' && action.config) {
                            if (action.config.type === 'success') {
                                message.success(action.config.text)
                            } else if (action.config.type === 'error') {
                                message.error(action.config.text)
                            }
                        } else if (action.type === 'customJS' && action.code) {
                            // 添加参数
                            const func = new Function('context', action.code)
                            // 自定义js内部可以拿到参数
                            func({
                                name: component.name,
                                props: component.props,
                                showMessage: (content: string)=>{
                                    message.success(content)
                                }
                            })
                        }
                    })
                }
            }
        })

        return props;
    }

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name]

            if (!config?.prod) {
                return null;
            }
            
            return React.createElement(
                config.prod,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    styles: component.styles,
                    ...config.defaultProps,
                    ...component.props,
                    ...handleEvent(component)
                },
                renderComponents(component.children || [])
            )
        })
    }

    return <div>
        {renderComponents(components)}
    </div>
}
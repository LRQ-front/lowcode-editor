import type { ComponentEvent } from "../../../stores/component-config"
import { Input } from "antd";
import { useComponetsStore } from "../../../stores/components"

export function GoToLink (props: { event: ComponentEvent }) {
    const { event } = props;

    const { curComponent, curComponentId, updateComponentProps } = useComponetsStore();

    const urlChange = (eventName: string, url: string) => { 
        if (!curComponentId) return;

        updateComponentProps(curComponentId, {[eventName]: {
            ...curComponent?.props?.[eventName],
            url
        }})
    }

    return <div className="mt-[10px]">
            <div className="flex events-center gap-[10px]">
                <div>链接：</div>
                <Input 
                    placeholder="请输入链接"
                    value={curComponent?.props[event.name]?.url}
                    onChange={(e) => {urlChange(event.name, e.target.value)}}
                />
            </div>
        </div>
}
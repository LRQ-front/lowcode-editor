import { type ComponentEvent } from "../../../stores/component-config"
import { Input, Select } from "antd";
import { useComponetsStore } from "../../../stores/components";

export function ShowMessage(props: { event: ComponentEvent}) {
    const { event } = props;

    const { curComponent, curComponentId, updateComponentProps} = useComponetsStore();
    const messageTypeChange = (eventName: string, value: string) => { 
        if (!curComponentId) return;

        updateComponentProps(curComponentId, {[eventName]: {
            ...curComponent?.props?.[eventName],
            config: {
                ...curComponent?.props?.[eventName].config,
                type: value
            }
        }})
    }

    const messageTextChange = (eventName: string, value: string) => { 
        if (!curComponentId) return;

        updateComponentProps(curComponentId, {[eventName]: {
            ...curComponent?.props?.[eventName],
            config: {
                ...curComponent?.props?.[eventName].config,
                text: value
            }
        }})
    }

    return <div className="mt-[10px]">
        <div className="flex items-center gap-[10px]">
            <div>类型：</div>
            <Select
                style={{width: 160}}
                options={[
                    {label: '成功', value: 'success'},
                    {label: '失败', value: 'error'}
                ]}
                onChange={(value) => messageTypeChange(event.name, value)}
                value={curComponent?.props[event.name]?.config?.type}
            ></Select>
        </div>
        <div className="flex items-center gap-[10px] mt-[10px]">
            <div>文本：</div>
            <Input
                value={curComponent?.props[event.name]?.config?.text}
                onChange={(e) => messageTextChange(event.name, e.target.value)}
            ></Input>
        </div>
    </div>
    
}
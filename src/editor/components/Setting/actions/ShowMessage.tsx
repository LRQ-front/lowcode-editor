import { type ComponentEvent } from "../../../stores/component-config"
import { Input, Select } from "antd";
import { useComponetsStore } from "../../../stores/components";
import { useState } from "react";

export interface ShowMessageConfig {
    type: 'showMessage'
    config: {
        text: string;
        type: 'success' | 'error'
    }
}

export interface ShowMessageProps {
    onChange?: (config: ShowMessageConfig) => void
    value?: ShowMessageConfig['config']
}

export function ShowMessage(props: ShowMessageProps) {
    const { onChange, value } = props;

    const { curComponentId} = useComponetsStore();

    const [text, setText] = useState<string>(value?.text || '');
    const [type, setType] = useState<'success' | 'error'>(value?.type || 'success')
    const messageTypeChange = (type: 'success' | 'error') => { 
        if (!curComponentId) return;

        setType(type);

        onChange?.({
            type: 'showMessage',
            config: {
                text,
                type
            }
        })
    }

    const messageTextChange = (text: string) => { 
        if (!curComponentId) return;

        setText(text);

        onChange?.({
            type: 'showMessage',
            config: {
                text,
                type
            }
        })
    }

    return <div className="mt-[10px]">
        <div className="flex items-center gap-[10px]">
            <div className="whitespace-nowrap">类型：</div>
            <Select
                style={{width: 500, height: 50}}
                options={[
                    {label: '成功', value: 'success'},
                    {label: '失败', value: 'error'}
                ]}
                onChange={(value) => messageTypeChange(value)}
                value={type}
            ></Select>
        </div>
        <div className="flex items-center gap-[10px] mt-[10px]">
            <div className="whitespace-nowrap">文本：</div>
            <Input
              style={{width: 500, height: 50}}
                value={text}
                onChange={(e) => messageTextChange(e.target.value)}
            ></Input>
        </div>
    </div>
    
}
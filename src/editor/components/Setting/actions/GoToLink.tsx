import { useState } from "react";
import type { ComponentEvent } from "../../../stores/component-config"
import { useComponetsStore } from "../../../stores/components"
import TextArea from "antd/es/input/TextArea";

export interface GoToLinkConfig {
    type: 'goToLink'
    url: string;
}

export interface GoToLinkProps {
    defaultValue?: string;
    onChange?: (config: GoToLinkConfig) => void
}

export function GoToLink (props: GoToLinkProps) {
    const { onChange, defaultValue } = props;

    const { curComponentId } = useComponetsStore();

    const [url, setUrl] = useState(defaultValue)

    const urlChange = (url: string) => { 
        if (!curComponentId) return;

        setUrl(url);

        onChange?.({
            type: 'goToLink',
            url
        })
    }

    return <div className="mt-[10px]">
            <div className="flex events-center gap-[10px]">
                <div className="whitespace-nowrap">链接：</div>
                <TextArea 
                    style={{width: 500, height: 200, border: '1px solid #000'}}
                    value={url || ''}
                    onChange={(e) => {urlChange(e.target.value)}}
                />
            </div>
        </div>
}
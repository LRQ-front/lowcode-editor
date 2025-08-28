import { Modal, Segmented } from "antd";
import type { ComponentEvent } from "../../stores/component-config";
import { GoToLink, type GoToLinkConfig } from "./actions/GoToLink";
import {ShowMessage, type ShowMessageConfig} from "./actions/ShowMessage";
import { useState } from "react";



interface ActionModalProps {
    visible: boolean;
    handleOk: (config?: ShowMessageConfig | GoToLinkConfig) => void;
    handleCancel: () => void;
}
export function ActionModal(props: ActionModalProps) {
    const { visible, handleOk, handleCancel } = props;

    const [key, setKey] = useState('访问链接')

    const [curConfig, setCurConfig] = useState<ShowMessageConfig | GoToLinkConfig>()

    return <Modal
        title="事件动作配置"
        width={800}
        open={visible}
        okText="确定"
        cancelText="取消"
        onOk={() => handleOk(curConfig)}
        onCancel={handleCancel}
    >
        <div className="h-[500px]">
            <Segmented value={key} onChange={setKey} options={['访问链接', '消息提示', '自定义js']}></Segmented>
            {
                key==='访问链接' && <GoToLink onChange={setCurConfig} />
            }
            {
                key === '消息提示' && <ShowMessage onChange={setCurConfig}/>
            }
        </div>
    </Modal>
}
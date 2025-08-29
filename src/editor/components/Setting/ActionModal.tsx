import { Modal, Segmented } from "antd";
import { GoToLink, type GoToLinkConfig } from "./actions/GoToLink";
import {ShowMessage, type ShowMessageConfig} from "./actions/ShowMessage";
import { useEffect, useState } from "react";
import { CustomJS ,type CustomJSConfig} from "./actions/CustomJS";


export type ActionConfig = ShowMessageConfig | GoToLinkConfig | CustomJSConfig;
interface ActionModalProps {
    visible: boolean;
    action?: ActionConfig;
    handleOk: (config?: ActionConfig) => void;
    handleCancel: () => void;
}
export function ActionModal(props: ActionModalProps) {
    const { visible, handleOk, handleCancel, action } = props;

    const [key, setKey] = useState('访问链接')

    const [curConfig, setCurConfig] = useState<ActionConfig>()

    const actionMap = {
        goToLink: '访问链接',
        showMessage: '消息提示',
        customJS: '自定义js'
    }

    useEffect(() => {
        if (action?.type) {
            setKey(actionMap[action.type])
        } else {
            setKey('访问链接')
        }
    }, [action])

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
                key==='访问链接' && <GoToLink value={action?.type === 'goToLink' ? action.url : ''} onChange={setCurConfig} />
            }
            {
                key === '消息提示' && <ShowMessage value={action?.type === 'showMessage' ? action.config : undefined} onChange={setCurConfig}/>
            }
            {
                key === '自定义js' && <CustomJS value={action?.type === 'customJS' ? action.code : ''} onChange={setCurConfig}/>
            }
        </div>
    </Modal>
}
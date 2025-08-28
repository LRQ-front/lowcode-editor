import { Collapse, type CollapseProps, Button } from "antd";
import { useComponetsStore } from "../../stores/components";
import { useComponentConfigStore, type ComponentEvent } from "../../stores/component-config";
import { ActionModal } from "./ActionModal";
import { useState } from "react";
import type { GoToLinkConfig } from "./actions/GoToLink";
import type { ShowMessageConfig } from "./actions/ShowMessage";
import { DeleteOutlined } from '@ant-design/icons';
export function ComponentEvent() {
    const { curComponent, updateComponentProps } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [curEvent, setCurEvent]= useState<ComponentEvent>();

    if (!curComponent) return null;

    function handleOk (config?: GoToLinkConfig | ShowMessageConfig) {
        setActionModalVisible(false);
        if (!config || !curEvent || !curComponent) return;

        updateComponentProps(curComponent.id, {
            [curEvent.name]: {
                actions: [
                    ...(curComponent.props[curEvent.name]?.actions || []),
                    config
                ]
            }
        })
    }

    function deleteAction (event: ComponentEvent, index: number) {
        if(!curComponent) return;

        const actions = curComponent.props[event.name]?.actions;
        
        actions.splice(index, 1);

        updateComponentProps(curComponent.id, {
            [event.name]: {
                actions
            }
        })
    }

    const items: CollapseProps["items"] = (componentConfig[curComponent?.name]?.events || []).map(event => {
        return {
            key: event.name,
            label: <div className="flex justify-between leading-[30px]">
                {event.label}
                <Button type='primary' onClick={(e)=> {
                    e.stopPropagation();
                    setCurEvent(event);
                    setActionModalVisible(true);
                }}>添加动作</Button>
            </div>,
            children: <div>
                {
                    (curComponent.props[event.name]?.actions || []).map((item: GoToLinkConfig | ShowMessageConfig, index: number) => {
                        return <div key={item.type}>
                            {
                                item.type === 'goToLink' ? <div className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                    <div className='text-[blue]'>跳转链接</div>
                                    <div>{item.url}</div>
                                    <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                        onClick={() => deleteAction(event, index)}
                                    ><DeleteOutlined /></div>
                                </div> : null
                            }
                            {
                                item.type === 'showMessage' ? <div className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                    <div className='text-[blue]'>消息弹窗</div>
                                    <div>{item.config.type}</div>
                                    <div>{item.config.text}</div>
                                     <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                        onClick={() => deleteAction(event, index)}
                                    ><DeleteOutlined /></div>
                                </div> : null
                            }
                        </div>
                    })
                }
            </div>
        }
    })

    return <div className="px-[10px]">
        <Collapse className="mb-[10px]" items={items} defaultActiveKey={componentConfig[curComponent.name]?.events?.map(item => item.name)}></Collapse>
        <ActionModal visible={actionModalVisible} 
        handleOk={handleOk}
        handleCancel={() => {setActionModalVisible(false)}}></ActionModal>
    </div>
}
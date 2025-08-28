import { Collapse, type CollapseProps, Input, Select } from "antd";
import { useComponetsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import { GoToLink } from "./actions/GoToLink";
import { ShowMessage } from "./actions/ShowMessage";

export function ComponentEvent() {
    const { curComponent, curComponentId, updateComponentProps } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    if (!curComponent) return null;

    const selectAction = (eventName: string, action: string) => { 
        if (!curComponentId) return;

        updateComponentProps(curComponentId, {[eventName]: {
            type: action
        }})
    }

    const items: CollapseProps["items"] = (componentConfig[curComponent?.name]?.events || []).map(item => {
        return {
            key: item.name,
            label: item.label,
            children: <div>
                <div className="flex items-center">
                    <div>动作：</div>
                    <Select 
                        className="w-[160px]"
                        options={[
                            {label: '显示提示', value: 'showMessage'},
                            {label: '跳转链接', value: 'goToLink'}
                        ]}
                        value={curComponent?.props?.[item.name]?.type}
                        onChange={(value) => {selectAction(item.name, value)}}
                    ></Select>
                </div>
                 {
                    curComponent?.props?.[item.name]?.type === 'goToLink' && <GoToLink event={item}></GoToLink>
                }
                  {
                    curComponent?.props?.[item.name]?.type === 'showMessage' && <ShowMessage event={item}></ShowMessage>
                }
            </div>
        }
    })

    return <div className="px-[10px]">
        <Collapse className="mb-[10px]" items={items}></Collapse>
    </div>
}
import { Form, Input, Select} from "antd";
import { useComponetsStore } from "../../stores/components";
import { useComponentConfigStore, type ComponentSetter, type ComponentConfig } from "../../stores/component-config";
import { useEffect } from "react";

export function ComponentAttr() {
    const [form] = Form.useForm();

    const  { curComponent, curComponentId, updateComponentProps} = useComponetsStore();

    const { componentConfig} = useComponentConfigStore();

    useEffect(() => {
        const data = form.getFieldsValue();
        console.log(data)
        form.setFieldsValue({...data, ...curComponent?.props})
    }, [curComponent])

     if (!curComponentId || !curComponent) return null;

     function renderFormElement(setter: ComponentSetter) {
        if (setter.type  === 'input') {
            return <Input></Input>
        } else if (setter.type  === 'select') {
            return <Select options={setter.options}></Select>
        }
     }

     function handleValuesChange(values: ComponentConfig) {
        if (curComponentId) {
            updateComponentProps(curComponentId, values)
        }
     }

    return <Form
        form={form}
        onValuesChange={handleValuesChange}
        labelCol={{span: 8}}
        wrapperCol={{span: 14}}
        >
        <Form.Item label="组件id">
            <Input value={curComponent.id} disabled></Input>
        </Form.Item>
        <Form.Item label="组件名称">
            <Input value={curComponent.name} disabled></Input>
        </Form.Item>
        <Form.Item label="组件描述">
            <Input value={curComponent.desc} disabled></Input>
        </Form.Item>
        {
            componentConfig[curComponent.name]?.setter?.map(setter => {
                return (
                    <Form.Item key={setter.name} name={setter.name} label={setter.label}>
                        {renderFormElement(setter)}
                    </Form.Item>
                )
            })
        }
    </Form>
}
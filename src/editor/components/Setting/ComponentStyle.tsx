import { Form, Input, Select, InputNumber} from "antd";
import  { type CSSProperties, useState } from "react";
import { useComponetsStore } from "../../stores/components";
import { useComponentConfigStore, type ComponentSetter} from "../../stores/component-config";
import { useEffect } from "react";
import CssEditor from './CssEditor'
import { debounce } from "lodash-es";
import StyleToObject from "style-to-object";

export function ComponentStyle() {
    const [form] = Form.useForm();

    const [css, setCss] = useState<string>('.comp{\n\n}')
    const  { curComponent, curComponentId, updateComponentStyles} = useComponetsStore();

    const { componentConfig} = useComponentConfigStore();

    useEffect(() => {
        form.resetFields();

        const data = form.getFieldsValue();
        form.setFieldsValue({...data, ...curComponent?.styles})

        console.log('css Style', curComponent)
        setCss(toCssStr(curComponent?.styles!))
    }, [curComponent])

    function toCssStr(css: Record<string, any>) {
        let cssStr = '.comp {\n';

        for(const key in css) {
            let value = css[key];
            if (!value) {
                continue;
            }
            if (['width', 'height'].includes(key) && !value.toString().endsWith('px')) {
                value = `${value}px`;
            }
            cssStr += `\t${key}: ${value};\n`;
        }

        return cssStr + '}';
    }

     if (!curComponentId || !curComponent) return null;

     function renderFormElement(styleSetter: ComponentSetter) {
        if (styleSetter.type  === 'input') {
            return <Input></Input>
        } else if (styleSetter.type  === 'select') {
            return <Select options={styleSetter.options}></Select>
        } else if (styleSetter.type === 'inputNumber') {
            return <InputNumber></InputNumber>
        }
     }

     function handleValuesChange(values: CSSProperties) {
        if (curComponentId) {
            updateComponentStyles(curComponentId, values)
        }
     }

     const handleEditChange = debounce((value) => {
        let css: Record<string, any> = {};

        try {
            let cssStr = value.replace(/\/\*.*\*\//, '')
            .replace(/(\.?[^{]+{)/, '')
            .replace('}', '')

            StyleToObject(cssStr, (name, value) => {
                css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
            })

            updateComponentStyles(curComponentId, {...form.getFieldsValue(), ...css}, true);
        } catch (error) {
            
        }
     }, 500)

    return <Form
        form={form}
        onValuesChange={handleValuesChange}
        labelCol={{span: 8}}
        wrapperCol={{span: 14}}
        >
        {
            componentConfig[curComponent.name]?.stylesSetter?.map(styleSetter => {
                return (
                    <Form.Item key={styleSetter.name} name={styleSetter.name} label={styleSetter.label}>
                        {renderFormElement(styleSetter)}
                    </Form.Item>
                )
            })
        }
        <div className='h-[200px] border-[1px] border-[#ccc]'>
            <CssEditor value={css} onChange={handleEditChange}/>
        </div>
    </Form>
}
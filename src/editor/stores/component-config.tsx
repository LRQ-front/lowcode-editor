import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ComponentSetter {
    name: string;
    label: string;
    type: string;
    [key: string]: any;
}

export interface ComponentConfig {
    name: string;
    desc: string;
    defaultProps: Record<string, any>;
    component: any;
    setter?: ComponentSetter[];
    stylesSetter?: ComponentSetter[];
}

interface State {
    componentConfig: { [key: string]: ComponentConfig}
}

interface Actions {
    registerComponent: (name: string, ComponentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Actions>((set, get) => ({
    componentConfig: {
        Container: {
            name: 'Container',
            defaultProps: {},
            component: Container,
            desc: '容器'
        },
        Button: {
            name: 'Button',
            defaultProps: {
                text: '按钮',
                type: 'primary'
            },
            component: Button,
            desc: '按钮',
            setter: [
                {
                    name: 'text',
                    label: '按钮文字',
                    type: 'input'
                },
                {
                    name: 'type',
                    label: '按钮类型',
                    type: 'select',
                    options: [
                        {
                            label: '主按钮',
                            value: 'primary'
                        },
                        {
                            label: '次按钮',
                            value: 'default'
                        }
                    ]
                }
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber'
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber'
                }
            ]
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            component: Page,
            desc: '页面'
        }
    },
    registerComponent: (name, ComponentConfig) => {
        return {
            componentConfig: {
                ...get().componentConfig,
                [name]: ComponentConfig
            }
        }
    }
   
}));
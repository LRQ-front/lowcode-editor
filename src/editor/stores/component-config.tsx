import { create } from "zustand";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import ModalPord from '../materials/Modal/prod'
import ModalDev from '../materials/Modal/dev'

export interface ComponentSetter {
    name: string;
    label: string;
    type: string;
    [key: string]: any;
}

export interface ComponentEvent {
    name: string;
    label: string;
}

export interface ComponentMethod {
    name: string;
    label: string;
}

export interface ComponentConfig {
    name: string;
    desc: string;
    defaultProps: Record<string, any>;
    setter?: ComponentSetter[];
    stylesSetter?: ComponentSetter[];
    events?: ComponentEvent[];
    methods?: ComponentMethod[];
    dev: any;
    prod: any;
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
            desc: '容器',
            dev: ContainerDev,
            prod: ContainerProd
        },
        Button: {
            name: 'Button',
            defaultProps: {
                text: '按钮',
                type: 'primary'
            },
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
            ],
           events: [
                {
                    name: 'onClick',
                    label: '点击事件',
                },
                {
                    name: 'onDoubleClick',
                    label: '双击事件'
                },
            ],  
            dev: ButtonDev,
            prod: ButtonProd
        },
        Modal: {
            name: 'Modal',
            defaultProps: {
                title: '标题',
            },
            setter: [
                {
                    name: 'title',
                    label: '标题',
                    type: 'input'
                },
            ],
            stylesSetter: [],
            events: [
                {
                    name: 'onOk',
                    label: '确认事件'
                },
                 {
                    name: 'onCancel',
                    label: '取消事件'
                }
            ],
            methods: [
                {
                    name: 'open',
                    label: '打开弹窗'
                },
                {
                    name: 'close',
                    label: '关闭弹窗'
                }
            ],
            desc: "弹窗",
            dev: ModalDev,
            prod: ModalPord
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            desc: '页面',
            dev: PageDev,
            prod: PageProd
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
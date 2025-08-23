import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>;
    component: any;
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
            component: Container
        },
        Button: {
            name: 'Button',
            defaultProps: {
                text: '按钮',
                type: 'primary'
            },
            component: Button
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            component: Page
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
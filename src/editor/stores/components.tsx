import type { CSSProperties } from 'react'
import { create } from 'zustand'

export interface Component {
    id: number
    name: string
    desc: string
    styles?: CSSProperties
    children?: Component[]
    parentId?: number
    props: any
}

interface State {
    components: Component[],
    mode: 'edit' | 'preview'
    curComponent: Component | null
    curComponentId: number | null
}

interface Action {
    addComponent: (component: Component, parentId?: number) => void;
    deleteComponent: (id: number) => void;
    updateComponentProps: (id: number, props: any) => void;
    setCurComponentId: (id: number | null) => void;
    updateComponentStyles: (id: number, styles: CSSProperties, replace?: boolean) => void;
    setMode: (mode: State['mode']) => void;
}


export const useComponetsStore = create<State & Action>(
    ((set, get) => ({
        components: [
            {
                id: 1,
                name: 'Page',
                props: {},
                desc: '页面'
            }
        ],
        mode: 'edit',
        curComponent: null,
        curComponentId: null,
        setMode: (mode) => {
            set({ mode });
        },
        updateComponentStyles: (id, styles, replace) => {
            set((state) => {
                const component = getComponentById(id, state.components);
                if (component) {
                    component.styles = replace ? {...styles} : {...component.styles, ...styles};
                    return {components: [...state.components]}
                }

                return {components: [...state.components]}
            })
        },
        setCurComponentId: (id) => {
            set((state) => ({
                curComponentId: id,
                curComponent: getComponentById(id!, state.components)
            }))
        },
        addComponent: (component, parentId) => { 
            set((state)=> {
                if (parentId) {
                    const parentElement = getComponentById(parentId, state.components)
                    if (parentElement) {
                        if (parentElement.children) {
                            parentElement.children.push(component)
                        } else {
                            parentElement.children = [component]
                        }
                        component.parentId = parentId
                        return { components: [...state.components] }
                    }
                }

                return {
                    components: [...state.components, component]
                }
            })
        },
        deleteComponent: (id) => { 
            if (!id) return;

            const component = getComponentById(id, get().components);
            if (component) {
                const parentId = component.parentId;
                if (parentId) {
                    const parentComponent = getComponentById(parentId, get().components);
                    if (parentComponent && parentComponent.children) {
                        parentComponent.children = parentComponent.children.filter((item) => item.id !== id);
                    }

                    set({components: [...get().components]})
                }
            }
        },
        updateComponentProps: (id, props) => { 
            set((state) => {
                const component = getComponentById(id, state.components);
                if (component) {
                    component.props = {...component.props, ...props};

                    return {components: [...state.components]}
                }

                return {components: [...state.components]}

            })
        }
    }))
);

export function getComponentById(id: number, components: Component[]): Component | null {
    if (!id) return null;

    for(const component of components) {
        if (component.id === id) return component;
        if (component.children&& component.children.length) {
            const result = getComponentById(id, component.children);
            if (result) return result;
        }
    }

    return null;
}
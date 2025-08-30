import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponetsStore, getComponentById } from "../stores/components";

export interface ItemType {
  type: string;
  dragType?: 'move' | 'add',
  id?: number
}

export function useMaterialDrop(accept: string[], id: number) {
    const { addComponent, components, deleteComponent } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    const [{ canDrop }, drop] = useDrop(() => ({
        accept,
        drop: (item: ItemType, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
              return;
            }
            if (item.dragType === 'move') {
              const component = getComponentById(item.id!, components);

              deleteComponent(item.id!);
              addComponent(component!, id)
            } else {
              const config = componentConfig[item.type];

              addComponent({
                  id: new Date().getTime(),
                  name: item.type,
                  props: config.defaultProps,
                  desc: config.desc,
              }, id)
            }
        },
        collect: (monitor) => ({
          canDrop: monitor.canDrop(),
        }),
    }));

    return { canDrop, drop }
}
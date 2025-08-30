import React, {useMemo, useEffect, useRef } from 'react'
import { Table as AntTable } from 'antd'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'
import type { CommonComponentProps } from '../../interface'
import { useDrag } from 'react-dnd'

export default function Table({id, name, children, styles}: CommonComponentProps) {
    const divRef = useRef<HTMLDivElement>(null)

    const { canDrop, drop} = useMaterialDrop(['TableColumn'], id)

    const [_,drag] = useDrag(() => ({
        type: name,
        item: {
            type: name,
            id,
            dragType: 'move'
        }
    }))

    useEffect(() => {
        drop(divRef)
        drag(divRef)
    }, [])

    const columns = useMemo(() => {
        return React.Children.map(children, (item:any) => {
            return {
                title: <div className='m-[-16px] p-[16px]' data-component-id={item.props?.id}>{item.props?.title}</div>,
                dataIndex: item.props?.dataIndex,
                key: item
            }
        })
    }, [children])

    return <div className={`w-[100%] ${canDrop ?'border-[2px] border-[blue]' : 'border-[1px] border-[#000]' }`} data-component-id={id} ref={divRef} style={styles}>
        <AntTable columns={columns} pagination={false} dataSource={[]}></AntTable>
    </div>
}
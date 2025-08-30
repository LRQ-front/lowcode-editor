import { Table as AntTable } from "antd"
import axios from "axios"
import dayjs from "dayjs"
import React, { useEffect, useMemo, useState } from "react"
import type { CommonComponentProps } from "../../interface"


export default function Table({url, children}: CommonComponentProps) {

    const [data, setData] = useState<Array<Record<string,any>>>([])
    const [loading, setLoading ] = useState(false)

    function mockData() {
        return new Promise<Array<Record<string,any>>>((resolve) => {
            setTimeout(() => {
                resolve([
                    {name: '张三', age: 18, sex: '男'},
                    {name: '张三', age: 18, sex: '男'},
                    {name: '张三', age: 18, sex: '男'},
                    {name: '张三', age: 18, sex: '男'},
                    {name: '张三', age: 18, sex: '女'}
                ])
            }, 400)
        })
    }

    const getData = async () => {
        setLoading(true)
        const data = await mockData()
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = useMemo(() => {
        return React.Children.map(children, (item: any) => {
            if (item?.props?.type === 'data') {
                return {
                    dataIndex: item.props?.dataIndex,
                    title: item.props?.title,
                    render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD') : null
                }
            } else {
                return {
                    dataIndex: item.props?.dataIndex,
                    title: item.props?.title
                }
            }
        })
    }, [children])


    return <AntTable loading={loading} rowKey='id' pagination={false} dataSource={data} columns={columns}></AntTable>
}
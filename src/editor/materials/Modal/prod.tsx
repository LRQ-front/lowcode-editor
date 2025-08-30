import { Modal as AntdModal } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { type CommonComponentProps } from '../../interface';

export interface ModalRef {
    open: () => void;
    close: () => void;  
}

const Modal: React.ForwardRefRenderFunction<ModalRef, Omit<CommonComponentProps, "ref">> = ({
    children, title, onOk, onCancel, styles
}, ref) => {

    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true),
            close: () => setOpen(false)
        }
    })


    return (
        <AntdModal
        title={title}
        style={styles}
        open={open}
        onCancel={
            () => {
                setOpen(false);
                onCancel?.();
            }
        }
        onOk={() => {
            onOk?.();
        }}
        >
        {children}
        </AntdModal>
    )
}

export default React.forwardRef(Modal);
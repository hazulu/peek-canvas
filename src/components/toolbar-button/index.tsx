import React, { ChangeEventHandler, FunctionComponent, HTMLInputTypeAttribute, MouseEventHandler, TouchEventHandler } from 'react';

type ToolbarButtonProps = {
    inputType: HTMLInputTypeAttribute,
    onClick: MouseEventHandler | undefined,
    children: any
}

const ToolbarButton: FunctionComponent<ToolbarButtonProps> = ({ 
    inputType = 'checkbox',
    onClick,
    children
}: ToolbarButtonProps) => {

    return (
        <div className="flex">
            <button className="flex transition-all duration-75 hover:bg-neutral-500 active:bg-sky-600 border-2 border-transparent active:peer-checked:bg-sky-600 peer-checked:bg-neutral-600 peer-checked:border-sky-500 p-1 rounded cursor-pointer select-none text-neutral-50">
                {children}
            </button>
        </div>
    )
}

export default ToolbarButton
import React, { ChangeEventHandler, FunctionComponent, HTMLInputTypeAttribute, MouseEventHandler, TouchEventHandler } from 'react';

type ToolbarInputButtonProps = {
    inputType: HTMLInputTypeAttribute,
    inputId: string,
    inputName: string,
    inputValue?: any,
    checked?: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>,
    children: any,
    accept?: string,
}

const ToolbarInputButton: FunctionComponent<ToolbarInputButtonProps> = ({
    inputType = 'checkbox',
    inputId = '',
    inputName = '',
    inputValue = '',
    checked,
    onChange,
    accept,
    children
}: ToolbarInputButtonProps) => {

    return (
        <div className="flex">
            <input
                className='input-button peer hidden'
                type={inputType}
                id={inputId}
                name={inputName}
                value={inputValue}
                checked={checked}
                onChange={onChange}
                accept={accept}
            />
            <label htmlFor={inputId} className='flex transition-all duration-75 hover:bg-neutral-500 active:bg-sky-600 border-2 border-transparent active:peer-checked:bg-sky-600 peer-checked:bg-neutral-600 peer-checked:border-sky-500 p-1 rounded cursor-pointer select-none text-neutral-50'>
                {children}
            </label>
        </div>
    )
}

export default ToolbarInputButton
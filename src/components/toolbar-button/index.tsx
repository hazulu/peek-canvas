import React, { FunctionComponent, MouseEventHandler } from 'react';

type ToolbarButtonProps = {
    onClick?: MouseEventHandler,
    className?: string,
    disabled?: boolean
    children?: any
}

const ToolbarButton: FunctionComponent<ToolbarButtonProps> = ({ 
    onClick,
    className = '',
    disabled = false,
    children
}: ToolbarButtonProps) => {

    return (
        <div className="flex">
            <button onClick={onClick} className={`flex transition-all duration-75 hover:bg-neutral-500 active:bg-sky-600 border-2 border-transparent p-1 rounded cursor-pointer select-none text-neutral-50 disabled:text-neutral-500 disabled:bg-neutral-700 disabled:hover:bg-neutral-700 disabled:cursor-not-allowed ${className}`} disabled={disabled}>
                {children}
            </button>
        </div>
    )
}

export default ToolbarButton
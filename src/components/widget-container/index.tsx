import React, { FunctionComponent, ReactNode } from 'react';

type WidgetContainerProps = {
    className?: string,
    spacingClassName?: string,
    inOverlayState: boolean,
    children: ReactNode,
}

const WidgetContainer: FunctionComponent<WidgetContainerProps> = ({ className = '', spacingClassName = '', inOverlayState, children }: WidgetContainerProps) => {
    return (
        <div data-enabled={!inOverlayState} className={`block transition-all duration-75 select-none opacity-0 data-[enabled=true]:opacity-100 ${className}`}>
            <div className={`flex bg-neutral-700 border border-neutral-500 p-2 rounded-lg select-none shadow-md text-neutral-50 ${spacingClassName}`}>
                {children}
            </div>
        </div>
    )
}

export default WidgetContainer
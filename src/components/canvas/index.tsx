import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import FeatureApplication from '@/classes/application';

type CanvasProps = {
    application: FeatureApplication,
}

const Canvas: FunctionComponent<CanvasProps> = ({application}: CanvasProps) => {
    const containerRef = useRef();
    const [cursorStyle, setCursorStyle] = useState('cursor-auto');

    useEffect(() => {
        application.start(async (view: HTMLWebViewElement) => {
            application.setParent(containerRef.current);
            containerRef.current.appendChild(view);
            application.onUpdateCursor(setCursor);
        });
    }, []);

    const setCursor = (cursorStyleName: string): void => setCursorStyle(cursorStyleName);


    return (
        <div className={`block h-full w-full ${cursorStyle}`} id="canvas-container" ref={containerRef} />
    )
}

export default Canvas
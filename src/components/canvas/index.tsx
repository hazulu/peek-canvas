import React, { useEffect, useRef, FunctionComponent } from 'react';
import FeatureApplication from '@/classes/application';

type CanvasProps = {
    application: FeatureApplication,
}

const Canvas: FunctionComponent<CanvasProps> = ({application}: CanvasProps) => {

    const containerRef = useRef();

    const init = () => {
        application.start(async (view: HTMLWebViewElement) => {
            application.setParent(containerRef.current);
            containerRef.current.appendChild(view);
        });
    };

    // const exit = () => {
    //     application.stop();
    //     if (containerRef.current) containerRef.current.innerHTML = "";
    // };

    useEffect(() => {
        init();
        // return () => exit();
    }, []);


    return (
        <div className='flex flex-1 w-full h-full'>
            <div className='block h-full w-full' id="canvas-container" ref={containerRef} />
        </div>
    )
}

export default Canvas
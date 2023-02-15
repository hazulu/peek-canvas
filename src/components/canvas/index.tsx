import React, { useEffect, useRef, FunctionComponent } from 'react';
import FeatureApplication from '@/classes/application';

type CanvasProps = {
    application: FeatureApplication,
}

const Canvas: FunctionComponent<CanvasProps> = ({application}: CanvasProps) => {

    const containerRef = useRef(null);

    const init = () => {
        application.start(async (view: HTMLWebViewElement) => {
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
        <div className='w-full'>
            <div id="canvas-container" ref={containerRef} />
        </div>
    )
}

export default Canvas
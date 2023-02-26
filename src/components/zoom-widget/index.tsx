import React, { useState, useEffect, ChangeEvent, FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import ZoomInIcon from 'Components/icons/zoom-in';
import ZoomOutIcon from 'Components/icons/zoom-out';
import WidgetContainer from '../widget-container';
import { clamp } from '@/util/math';

type ZoomSliderProps = {
    onChangeZoom: Function,
    currentZoom: number,
    inOverlayState: boolean
}

const ZoomSlider: FunctionComponent<ZoomSliderProps> = ({ onChangeZoom, currentZoom, inOverlayState }: ZoomSliderProps) => {

    // const [zoomSliderValue, setZoomSliderValue] = useState(50);

    // useEffect(() => {
    //     // convert number to slider zoom
    //     setZoomSliderValue(currentZoom * 100);
    // }, [currentZoom])
    
    // const handleChangeZoom = (zoom: number) => {
    //     // convert number to true zoom
    //     const trueZoom = zoom / 100;
    //     onChangeZoom(trueZoom, false);
    // }

    // return (
    //     <div data-enabled={!inOverlayState} className="block transition-all duration-75 absolute top-2 right-4 select-none opacity-0 data-[enabled=true]:opacity-100">
    //         <input id='trueZoom' hidden />
    //         <input
    //             id='zoomSlider'
    //             type='range'
    //             value={zoomSliderValue}
    //             className='flex flex-1 h-3 origin-right -rotate-90 bg-neutral-600 border-2 border-neutral-700 rounded-lg appearance-none cursor-pointer'
    //             onChange={(e) => handleChangeZoom(parseInt(e.target.value))}
    //             min={25}
    //             max={200}
    //         />
    //     </div>
    // )

    const handleZoomIn = ():void => {
        if (currentZoom >= 2) return;
        onChangeZoom(clamp(currentZoom + 0.25, 0.25, 2), false);
    }

    const handleZoomOut = ():void => {
        if (currentZoom <= 0.25) return;
        onChangeZoom(clamp(currentZoom - 0.25, 0.25, 2), false);
    }

    return (
        <WidgetContainer className='absolute top-2 right-2' spacingClassName='flex-col space-y-2' inOverlayState={inOverlayState}>
            <ToolbarButton onClick={handleZoomIn}>
                <div className='flex'>
                    <ZoomInIcon className="w-6 h-6" />
                </div>
            </ToolbarButton>
            <div className="flex justify-center font-semibold text-sm">{currentZoom % 1 != 0 ? currentZoom.toFixed(2) : currentZoom}x</div>
            <ToolbarButton onClick={handleZoomOut}>
                <div className='flex'>
                    <ZoomOutIcon className="w-6 h-6" />
                </div>
            </ToolbarButton>
        </WidgetContainer>
    )
}

export default ZoomSlider
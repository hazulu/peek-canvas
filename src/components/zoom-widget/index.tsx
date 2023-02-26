import React, { useState, useEffect, ChangeEvent, FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import ZoomInIcon from 'Components/icons/zoom-in';
import ZoomOutIcon from 'Components/icons/zoom-out';
import WidgetContainer from '../widget-container';
import { clamp } from '@/util/math';

type ZoomWidgetProps = {
    onChangeZoom: Function,
    currentZoom: number,
    inOverlayState: boolean
}

const ZoomWidget: FunctionComponent<ZoomWidgetProps> = ({ onChangeZoom, currentZoom, inOverlayState }: ZoomWidgetProps) => {

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

export default ZoomWidget
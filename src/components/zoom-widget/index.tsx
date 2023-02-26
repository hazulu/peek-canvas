import React, { useState, useEffect, ChangeEvent, FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import ZoomInIcon from 'Components/icons/zoom-in';
import ZoomOutIcon from 'Components/icons/zoom-out';
import WidgetContainer from '../widget-container';
import { clamp } from '@/util/math';
import { MAX_ZOOM, MIN_ZOOM } from '@/util/global';

type ZoomWidgetProps = {
    onChangeZoom: Function,
    currentZoom: number,
    inOverlayState: boolean
}

const ZoomWidget: FunctionComponent<ZoomWidgetProps> = ({ onChangeZoom, currentZoom, inOverlayState }: ZoomWidgetProps) => {

    const handleZoomIn = ():void => {
        if (currentZoom >= MAX_ZOOM) return;
        onChangeZoom(clamp(currentZoom + MIN_ZOOM, MIN_ZOOM, MAX_ZOOM), false);
    }

    const handleZoomOut = ():void => {
        if (currentZoom <= MIN_ZOOM) return;
        onChangeZoom(clamp(currentZoom - MIN_ZOOM, MIN_ZOOM, MAX_ZOOM), false);
    }

    return (
        <WidgetContainer className='absolute top-2 right-2' spacingClassName='flex-col space-y-2' inOverlayState={inOverlayState}>
            <ToolbarButton onClick={handleZoomIn} disabled={currentZoom === MAX_ZOOM}>
                <div className='flex'>
                    <ZoomInIcon className="w-6 h-6" />
                </div>
            </ToolbarButton>
            <div className="flex justify-center font-semibold text-sm">{currentZoom % 1 != 0 ? currentZoom.toFixed(2) : currentZoom}x</div>
            <ToolbarButton onClick={handleZoomOut} disabled={currentZoom === MIN_ZOOM}>
                <div className='flex'>
                    <ZoomOutIcon className="w-6 h-6" />
                </div>
            </ToolbarButton>
        </WidgetContainer>
    )
}

export default ZoomWidget
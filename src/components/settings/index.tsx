import React, { useEffect, useState, ChangeEventHandler, FunctionComponent, HTMLInputTypeAttribute, MouseEventHandler, TouchEventHandler } from 'react';

type SettingsModalProps = {
    show: boolean,
    overlayOpacity: number,
    canvasBackgroundColor: string,
    onSaveSettings: Function
}

const SettingsModal: FunctionComponent<SettingsModalProps> = ({ show, overlayOpacity, canvasBackgroundColor, onSaveSettings }: SettingsModalProps) => {

    const [overlayOpacitySetting, setOverlayOpacitySetting] = useState(50);
    const [canvasBackgroundColorSetting, setCanvasBackgroundColorSetting] = useState('333333');

    useEffect(() => {
        setOverlayOpacitySetting(overlayOpacity);
        setCanvasBackgroundColorSetting(canvasBackgroundColor);
    }, [overlayOpacity, canvasBackgroundColor])

    const onSave = () => {
        let newOverlayOpacity = undefined;
        let newCanvasBackgroundColor = undefined;

        if (overlayOpacitySetting != overlayOpacity)
            newOverlayOpacity = overlayOpacitySetting;

        if (canvasBackgroundColor != canvasBackgroundColorSetting)
            newCanvasBackgroundColor = canvasBackgroundColorSetting;

        onSaveSettings(newOverlayOpacity, newCanvasBackgroundColor);
    }

    return (
        <div data-enabled={show} className="flex bg-neutral-900 pointer-events-none transition-all duration-75 justify-center items-center absolute inset-0 z-10 opacity-0 data-[enabled=true]:opacity-90 data-[enabled=true]:pointer-events-auto select-none">
            <div className='flex flex-col w-4/5 h-4/5 p-10 bg-neutral-700 rounded-lg border border-2 border-neutral-600' style={{maxWidth: '400px', maxHeight: '400px'}}>
                <div className='text-white'>
                    <label htmlFor='overlayOpacitySetting' className='block mb-2 text-md font-medium text-gray-50'>Overlay Opacity:</label>
                    <div className='text-sm mb-2'>Transparency when overlay mode is activated.</div>
                    <div className='flex items-center space-x-4'>
                        <input
                            id='overlayOpacitySetting'
                            type='range'
                            value={overlayOpacitySetting}
                            className='flex flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
                            onChange={(e) => setOverlayOpacitySetting(e.target.value)}
                        />
                        <div className='flex justify-center font-semibold text-lg ml-2 w-1/6'>
                            {overlayOpacitySetting}%
                        </div>
                    </div>
                </div>
                <div className='text-white mt-6'>
                    <label htmlFor='canvasBackgroundColor' className='block mb-2 text-md font-medium text-gray-50'>Canvas Background Color:</label>
                    <div className='text-sm mb-2'>Color of the canvas background.</div>
                    <div className='flex relative'>
                        <label className="relative flex flex-1">
                            <span className="absolute inset-y-0 left-1 flex items-center pl-2">
                                #
                            </span>
                            <input
                                id='canvasBackgroundColor'
                                name="canvasBackgroundColor"
                                type="text"
                                className="flex-1 border-2 border-neutral-600 bg-neutral-500 rounded-md py-2 pl-6 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                value={canvasBackgroundColorSetting}
                                onChange={(e) => setCanvasBackgroundColorSetting(e.target.value)}
                                placeholder="333333"
                            />
                        </label>
                        <div className='ml-2 w-1/6 rounded-md border border-2 border-neutral-600' style={{ background: `#${canvasBackgroundColorSetting}` }} />
                    </div>
                </div>
                <div className='text-white mt-auto'>
                    <button className='w-full bg-neutral-600 hover:bg-neutral-500 active:bg-sky-600 active:border-sky-500 p-2 transition-all duration-75 border-2 border-neutral-500 rounded-md font-semibold text-md' onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal
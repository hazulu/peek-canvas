import React, { ChangeEvent, FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import LayersIcon from 'Components/icons/layers';
import TrashIcon from 'Components/icons/trash';

type LayerWidgetProps = {
    selectedLayer: number,
    layerCount: number,
    onLayerSelected: Function,
    onLayerDeleted: Function,
    inOverlayState: boolean,
}

const LayerWidget: FunctionComponent<LayerWidgetProps> = ({ selectedLayer = 0, layerCount = 0, onLayerSelected, onLayerDeleted, inOverlayState }: LayerWidgetProps) => {

    const handleLayerCycle = () => {
        let next = selectedLayer + 1;
        if (next >= layerCount) next = 0;
        onLayerSelected(next);
    }

    const handleLayerDelete = () => onLayerDeleted(selectedLayer);

    return (
        <div data-enabled={!inOverlayState} className="block transition-all duration-75 absolute bottom-2 right-2 select-none opacity-0 data-[enabled=true]:opacity-100">
            <div className="flex flex-row bg-neutral-700 border border-neutral-500 p-2 rounded-lg space-x-2 select-none shadow-md text-neutral-50">
                <ToolbarButton onClick={handleLayerCycle}>
                    <div className='flex'>
                        <div className="font-semibold">{layerCount === 0 ? 0 : selectedLayer + 1} / {layerCount}</div>
                        <LayersIcon className="ml-2 w-6 h-6" />
                    </div>
                </ToolbarButton>
                { layerCount > 0 && (
                    <ToolbarButton onClick={handleLayerDelete}>
                        <div className='flex'>
                            <TrashIcon className="w-6 h-6" />
                        </div>
                    </ToolbarButton>
                )}
            </div>
        </div>
    )
}

export default LayerWidget
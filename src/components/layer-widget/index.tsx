import React, { ChangeEvent, FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import LayersIcon from 'Components/icons/layers'

type LayerWidgetProps = {
    selectedLayer: number,
    layerCount: number,
    onLayerSelected: Function,
}

const LayerWidget: FunctionComponent<LayerWidgetProps> = ({ selectedLayer = 0, layerCount = 0, onLayerSelected }: LayerWidgetProps) => {

    const layerCycleClicked = () => {
        let next = selectedLayer + 1;
        if (next >= layerCount) next = 0;
        onLayerSelected(next);
    }

    return (
        <div className="block absolute bottom-2 right-2 select-none">
            <div className="flex flex-row bg-neutral-700 border border-neutral-500 p-2 rounded-lg space-x-2 select-none shadow-md text-neutral-50">
                <ToolbarButton onClick={layerCycleClicked}>
                    <div className='flex'>
                        <div className="font-semibold">{layerCount === 0 ? 0 : selectedLayer + 1} / {layerCount}</div>
                        <LayersIcon className="ml-2 w-6 h-6" />
                    </div>
                </ToolbarButton>
            </div>
        </div>
    )
}

export default LayerWidget
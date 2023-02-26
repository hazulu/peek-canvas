import React, { ChangeEvent, FunctionComponent } from 'react';
import WidgetContainer from '../widget-container';
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
        <WidgetContainer className='absolute bottom-2 right-2' spacingClassName='flex-row space-x-2' inOverlayState={inOverlayState}>
            <ToolbarButton onClick={handleLayerCycle}>
                <div className='flex'>
                    <div className="font-semibold">{layerCount === 0 ? 0 : selectedLayer + 1} / {layerCount}</div>
                    <LayersIcon className="ml-2 w-6 h-6" />
                </div>
            </ToolbarButton>
            {layerCount > 0 && (
                <ToolbarButton onClick={handleLayerDelete}>
                    <div className='flex'>
                        <TrashIcon className="w-6 h-6" />
                    </div>
                </ToolbarButton>
            )}
        </WidgetContainer>
    )
}

export default LayerWidget
import React, { ChangeEvent, FunctionComponent } from 'react';
import WidgetContainer from '../widget-container';
import ToolbarInputButton from '../toolbar-input-button';
import ToolbarButton from '../toolbar-button';
import ToolbarDivider from '../toolbar-divider';
import MoveLayerIcon from 'Components/icons/move-layer';
import ResizeLayer from 'Components/icons/resize-layer';
import UploadImageIcon from 'Components/icons/upload-image';
import OptionsIcon from 'Components/icons/options';

type ToolbarProps = {
    onShowOptions: Function,
    selectedTool: number,
    onToolSelected: Function,
    onImportImage: Function,
    inOverlayState: boolean
}

const Toolbar: FunctionComponent<ToolbarProps> = ({ onShowOptions, selectedTool, onToolSelected, onImportImage, inOverlayState }: ToolbarProps) => {

    const handleToolSelected = (toolId: number) => {
        onToolSelected(toolId);
    } 

    const handleImportImage = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        onImportImage(files);
    }

    return (
        <WidgetContainer className='absolute bottom-2 left-2' spacingClassName='flex-row space-x-2' inOverlayState={inOverlayState}>
            <ToolbarButton onClick={() => onShowOptions()}>
                <OptionsIcon className="w-6 h-6" />
            </ToolbarButton>
            <ToolbarDivider />
            <ToolbarInputButton inputType='checkbox' inputId='0' inputName='0' inputValue='0' checked={selectedTool === 0} onChange={() => handleToolSelected(0)}>
                <MoveLayerIcon className="w-6 h-6" />
            </ToolbarInputButton>
            <ToolbarInputButton inputType='checkbox' inputId='1' inputName='1' inputValue='1' checked={selectedTool === 1} onChange={() => handleToolSelected(1)}>
                <ResizeLayer className="w-6 h-6" />
            </ToolbarInputButton>
            <ToolbarDivider />
            <ToolbarInputButton inputType='file' inputId='image-upload' inputName='image-upload' onChange={handleImportImage} accept='image/*'>
                <UploadImageIcon className="w-6 h-6" />
            </ToolbarInputButton>
        </WidgetContainer>
    )
}

export default Toolbar
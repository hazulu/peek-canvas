import React, { FunctionComponent } from 'react';
import ToolbarInputButton from '../toolbar-input-button';
import ToolbarButton from '../toolbar-button';
import ToolbarDivider from '../toolbar-divider';
import MoveLayerIcon from 'Components/icons/move-layer';
import ResizeLayer from 'Components/icons/resize-layer';
import UploadImageIcon from 'Components/icons/upload-image';
import OptionsIcon from 'Components/icons/options';

type ToolbarProps = {
    selectedTool: number,
    onToolSelected: Function,
    onUploadFile: Function
}

const Toolbar: FunctionComponent<ToolbarProps> = ({ selectedTool, onToolSelected, onUploadImage }: ToolbarProps) => {

    const handleToolSelected = (toolId: number) => {
        onToolSelected(toolId);
    } 

    const handleUploadImage = e => {
        // select file
        // after file selected ->
        console.log(e);
        // onUploadImage();
    }

    return (
        <div className="block absolute bottom-2 left-2 select-none">
            <div className="flex flex-row bg-neutral-700 p-2 rounded-lg space-x-2 select-none">
                <ToolbarButton inputType='button' onClick={e => null}>
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
                <ToolbarInputButton inputType='file' inputId='image-upload' inputName='image-upload' onChange={handleUploadImage}>
                    <UploadImageIcon className="w-6 h-6" />
                </ToolbarInputButton>
            </div>
        </div>
    )
}

export default Toolbar
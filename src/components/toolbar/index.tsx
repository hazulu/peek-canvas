import React, { useState, FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import MoveLayerIcon from 'Components/icons/move-layer'
import ResizeLayer from '@/components/icons/resize-layer'

type ToolbarProps = {
    onToolSelected: Function,
}

const Toolbar: FunctionComponent<ToolbarProps> = ({ onToolSelected }: ToolbarProps) => {
    const [selectedTool, setSelectedTool] = useState(0);

    const handleToolSelected = (toolId: number) => {
        setSelectedTool(toolId);
        onToolSelected(toolId);
    } 

    return (
        <div className="block absolute bottom-2 left-2 select-none">
            <div className="flex flex-row bg-neutral-700 p-2 rounded-lg space-x-2 select-none">
                <ToolbarButton inputType='checkbox' inputId='0' inputName='0' inputValue='0' checked={selectedTool === 0} onChange={() => handleToolSelected(0)}>
                    <MoveLayerIcon className="w-6 h-6" />
                </ToolbarButton>
                <ToolbarButton inputType='checkbox' inputId='1' inputName='1' inputValue='1' checked={selectedTool === 1} onChange={() => handleToolSelected(1)}>
                    <ResizeLayer className="w-6 h-6" />
                </ToolbarButton>
            </div>
        </div>
    )
}

export default Toolbar
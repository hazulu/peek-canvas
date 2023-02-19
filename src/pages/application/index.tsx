import { useState, useEffect } from 'react';
import Canvas from 'Components/canvas';
import Toolbar from 'Components/toolbar';
import FeatureApplication from "../../classes/application";
import { retrieveImageFromClipboardAsBlob, blobToData } from "../../services/clipboard";
import Dropzone from "Components/dropzone";
import LayerWidget from "Components/layer-widget";

const application = new FeatureApplication(600, 400, {})

function App() {
    const [selectedTool, setSelectedTool] = useState(0);
    const [selectedLayer, setSelectedLayer] = useState(0);
    const [layerCount, setLayerCount] = useState(0);

    useEffect(() => {
        window.addEventListener("paste", onPaste);

        return () => {
            window.removeEventListener('paste', onPaste);
        };
    }, []);

    // Rebind New State Values
    useEffect(() => {
        window.addEventListener("keyup", onKeyUp);
        return () => window.removeEventListener('keyup', onKeyUp);
    }, [selectedLayer, layerCount]);

    const onPaste = (e: ClipboardEvent) => {
        const clipboardImage = retrieveImageFromClipboardAsBlob(e);

        if (clipboardImage) onImport(clipboardImage);
    }

    const onKeyUp = (e: KeyboardEvent): void => {
        const key = e.key;
        console.log(key);
        let nextLayer;

        switch (key) {
            case 'V':
            case 'v':
                handleToolSelected(0);
                break;
            case 'T':
            case 't':
                handleToolSelected(1);
                break;
            case 'O':
            case 'o':
                // open options
                break;
            case '[':
                nextLayer = selectedLayer - 1;
                if (nextLayer < 0) return;
                handleLayerSelected(nextLayer);
                break;
            case ']':
                nextLayer = selectedLayer + 1;
                if (nextLayer >= layerCount) return;
                handleLayerSelected(nextLayer);
                break;
            case 'Delete':
                handleLayerDeleted(selectedLayer);
                break;
        }
    }

    const onFilesImported = (files) => {
        if (files) {
            const file = files[0];
            onImport(file);
        }
    }

    const onImport = async (file) => {
        const base64 = await blobToData(file);
        let layerCount = application.addImageLayer(base64);
        setLayerCount(layerCount);
        setSelectedLayer(layerCount - 1);
        application.selectLayer(layerCount - 1);
    }

    const handleToolSelected = (toolId: number): void => {
        setSelectedTool(toolId);
        application.selectTool(toolId);
    }

    const handleLayerSelected = (layerId: number): void => {
        setSelectedLayer(layerId);
        application.selectLayer(layerId);
    }

    const handleLayerDeleted = (layerId: number): void => {
        const layersInfo = application.deleteLayer(layerId);

        if(layersInfo) {
            const {
                layerCount,
                selectedLayer,
            } = layersInfo;

            setLayerCount(layerCount);
            setSelectedLayer(selectedLayer);
        }
    }

    return (
        <div className="App flex flex-col h-screen w-screen bg-slate-200 relative">
            <Dropzone onFilesDropped={onFilesImported} />

            <div className='flex h-full w-full flex-1 relative'>
                <Canvas application={application} />
                <Toolbar selectedTool={selectedTool} onToolSelected={handleToolSelected} onImportImage={onFilesImported} />
                <LayerWidget selectedLayer={selectedLayer} layerCount={layerCount} onLayerSelected={handleLayerSelected} onLayerDeleted={handleLayerDeleted} />
            </div>
        </div>
    )
}

export default App

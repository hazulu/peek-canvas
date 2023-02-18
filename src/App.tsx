import { useState, useEffect } from 'react'
import './App.css'
import Canvas from 'Components/canvas'
import Toolbar from 'Components/toolbar'
import FeatureApplication from "./classes/application"
import { retrieveImageFromClipboardAsBlob, blobToData } from "./services/clipboard"
import Dropzone from "Components/dropzone"
import LayerWidget from "Components/layer-widget"

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

  const onPaste = (e: ClipboardEvent) => {
    const clipboardImage = retrieveImageFromClipboardAsBlob(e);

    if (clipboardImage) onImport(clipboardImage);
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

  return (
    <div className="App flex flex-col h-screen w-screen bg-slate-200 relative">
      <Dropzone onFilesDropped={onFilesImported} />

      <div className='flex h-full w-full flex-1 relative'>
        <Canvas application={application} />
        <Toolbar selectedTool={selectedTool} onToolSelected={handleToolSelected} onImportImage={onFilesImported} />
        <LayerWidget selectedLayer={selectedLayer} layerCount={layerCount} onLayerSelected={handleLayerSelected} />
      </div>
    </div>
  )
}

export default App

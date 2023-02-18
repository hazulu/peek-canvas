import nodeLogo from "./assets/node.svg"
import { useState, useEffect } from 'react'
import './App.css'
import Canvas from 'Components/canvas'
import Toolbar from 'Components/toolbar'
import FeatureApplication from "./classes/application"
import { retrieveImageFromClipboardAsBlob, blobToData } from "./services/clipboard"
import Dropzone from "./components/dropzone"

const application = new FeatureApplication(600, 400, {})

function App() {
  const [selectedTool, setSelectedTool] = useState(0);

  useEffect(() => {
    window.addEventListener("paste", onPaste);

    return () => {
      window.removeEventListener('paste', onPaste);
    };
  }, []);

  const onPaste = (e: ClipboardEvent) => {
    const clipboardImage = retrieveImageFromClipboardAsBlob(e);

    if (clipboardImage) onUpload(clipboardImage);
  }

  const onFilesDropped = (files) => {
    if (files) {
      const file = files[0];
      onUpload(file);
    }
  }

  const onUpload = async (file) => {
    const base64 = await blobToData(file);
    application.addImageLayer(base64);
  }

  const handleToolSelected = (toolId: number): void => {
    setSelectedTool(toolId);
    application.selectTool(toolId);
  }

  return (
    <div className="App flex flex-col h-screen w-screen bg-slate-200 relative">
      <Dropzone onFilesDropped={onFilesDropped} />

      <div className='flex h-full w-full flex-1 relative'>
        <Canvas application={application} />
        <Toolbar selectedTool={selectedTool} onToolSelected={handleToolSelected} />
      </div>
    </div>
  )
}

export default App

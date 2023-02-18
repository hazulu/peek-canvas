import nodeLogo from "./assets/node.svg"
import { useState, useEffect } from 'react'
import './App.css'
import Canvas from 'Components/canvas'
import Toolbar from 'Components/toolbar'
import FeatureApplication from "./classes/application"
import { retrieveImageFromClipboardAsBlob, blobToData } from "./services/clipboard"

const application = new FeatureApplication(600, 400, {})

function App() {
  const [selectedTool, setSelectedTool] = useState(0);

  useEffect(() => {
    window.addEventListener("paste", onPaste);

    return () => {
      window.removeEventListener('paste', onPaste);
    };
  }, []);

  const onPaste = async (e: ClipboardEvent) => {
    const clipboardImage = retrieveImageFromClipboardAsBlob(e);

    if (clipboardImage) {
      const base64 = await blobToData(clipboardImage);
      application.addImageLayer(base64);
    }
  }

  const handleToolSelected = (toolId: number): void => {
    setSelectedTool(toolId);
    application.selectTool(toolId);
  }

  return (
    <div className="App flex flex-col h-screen w-screen bg-slate-200">
      <div className='flex h-full w-full flex-1 relative'>
        <Canvas application={application} />
        <Toolbar selectedTool={selectedTool} onToolSelected={handleToolSelected} />
      </div>
    </div>
  )
}

export default App

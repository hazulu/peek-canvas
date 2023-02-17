import nodeLogo from "./assets/node.svg"
import { useState, useEffect } from 'react'
import './App.css'
import Canvas from 'Components/canvas'
import Toolbar from 'Components/toolbar'
import FeatureApplication from "./classes/application"

const application = new FeatureApplication(600, 400, {})

function App() {
  const [clipboardImg, setClipboardImg] = useState(null)

  useEffect(() => {
    // window.addEventListener("paste", (e) => {
    // });

    return () => {
      // window.removeEventListener('paste')
    };
  }, []);

  const handleToolSelected = (toolId: number): void =>
    application.selectTool(toolId);

  return (
    <div className="App flex flex-col h-screen w-screen bg-slate-200">
      <div className='flex h-full w-full flex-1 relative'>
        <Canvas application={application} />
        <Toolbar onToolSelected={handleToolSelected} />
      </div>
    </div>
  )
}

export default App

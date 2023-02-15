import nodeLogo from "./assets/node.svg"
import { useState, useEffect } from 'react'
import './App.css'
import Canvas from 'Components/canvas'
import Toolbar from 'Components/toolbar'
import FeatureApplication from "./classes/application"

const application = new FeatureApplication(600, 400, {})

function App() {
  const [count, setCount] = useState(0)
  const [clipboardImg, setClipboardImg] = useState(null)

  // useEffect(() => {
  //   window.addEventListener("paste", (e) => {
      
  //   });

  //   return () => window.removeEventListener("paste");
  // }, []);

  const incrementCount = (): void => {
    setCount((count) => count + 1)
    console.log(count)
    window.electronAPI.setTitle(count)
  }

  return (
    <div className="App flex flex-col min-h-screen bg-slate-200">
      <div>
        <Canvas application={application} />
        <Toolbar />
      </div>
    </div>
  )
}

export default App

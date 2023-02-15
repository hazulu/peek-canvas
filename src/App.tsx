import nodeLogo from "./assets/node.svg"
import { useState, useEffect } from 'react'
import './App.css'
import Canvas from 'Components/canvas'
import Toolbar from 'Components/toolbar'
import FeatureApplication from "./classes/application"

const application = new FeatureApplication(600, 400, {})

function App() {
  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(100)
  const [clipboardImg, setClipboardImg] = useState(null)

  window.electronAPI.onResize((_event, { width, height }) => {
    setHeight(height);
    setWidth(width);
  })

  useEffect(() => {
    // window.addEventListener("resize", (e) => {
    //   application.resize()
    // });

    return () => {
      // window.removeEventListener('resize')
      // window.removeEventListener('paste')
    };
  }, []);

  return (
    <div className="App flex flex-col bg-slate-200" style={{ width: width, height: height }}>
      <div className="flex bg-purple-600 h-4" />
      <Canvas application={application} />
      {/* <Toolbar /> */}
      <div className="flex bg-purple-600 h-4 mt-auto" />
    </div>
  )
}

export default App

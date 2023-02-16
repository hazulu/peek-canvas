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

  return (
    <div className="App flex flex-col h-screen w-screen bg-slate-200">
      <div className='flex h-full w-full flex-1 relative'>
        <Canvas application={application} />
        {/* <div className="flex items-center justify-center absolute bottom-0 left-0 right-0 p-2">
          <div className="flex bg-purple-600 px-2 py-1 select-none">Menu</div>
        </div> */}
        <div className="block absolute bottom-2 left-2 select-none">
          <div className="bg-purple-600 px-2 py-1">Menu</div>
        </div>
      </div>
    </div>
  )
}

export default App

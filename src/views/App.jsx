import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [windowSize, setWindowSize] = useState({ w: undefined, h: undefined });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", handleSize);
    handleSize();

    return () => {
      window.removeEventListener("resize", handleSize);
    }
  }, []);

  useEffect(() => {
    if (windowSize.w < 1024)
      setIsMobile(true);
    else
      setIsMobile(false)

  }, [windowSize]);

  return (
    <div >

    </div>

  )
}

export default App

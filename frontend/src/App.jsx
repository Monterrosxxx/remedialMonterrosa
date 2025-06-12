import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Clients from './pages/Clients'
import Games from "./pages/Games"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Games></Games>
    </>
  )
}

export default App

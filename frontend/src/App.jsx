import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/Home'
import Clients from './pages/Clients'
import Games from "./pages/Games"

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'clients':
        return <Clients currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'games':
        return <Games currentPage={currentPage} setCurrentPage={setCurrentPage} />
      default:
        return <Home currentPage={currentPage} setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <>
      {renderCurrentPage()}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  )
}

export default App
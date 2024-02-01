import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './Router'

function App() {

  return (
    <RouterProvider router={router} fallbackElement={null}/>
  )
}

export default App

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'

const __BASE_PATH__ = import.meta.env.BASE_URL || '/'

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
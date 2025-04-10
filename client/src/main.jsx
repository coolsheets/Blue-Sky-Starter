import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FrontPage from './FrontPage.jsx'
import SuperheroRegistry from './SuperheroRegistry.jsx'
import TrafficVideo from './TrafficVideo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FrontPage />
    <TrafficVideo />
  </StrictMode>,
)

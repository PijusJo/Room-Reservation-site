import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RoomList from './RoomLists'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoomList/>
  </StrictMode>,
)

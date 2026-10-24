import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserListView from './UserListview'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserListView/>
  </StrictMode>,
)

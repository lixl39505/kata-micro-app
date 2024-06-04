import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
// Router
import AppRouter from './features/router/AppRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AppRouter></AppRouter>
    </ReduxProvider>
  </StrictMode>,
)

// DevTest
if (import.meta.env.DEV) {
  Object.assign(window, { store })
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import OpenSourcePage from './OpenSourcePage'
import TutorialPage from './TutorialPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/open-source" element={<OpenSourcePage />} />
        <Route path="/ip-tv" element={<TutorialPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)

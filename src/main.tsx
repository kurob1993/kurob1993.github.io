import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import BlogPage from './BlogPage'
import OpenSourcePage from './OpenSourcePage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/open-source" element={<OpenSourcePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

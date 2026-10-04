import { HashRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ExamplePage from './pages/ExamplePage'
import PageNotFound from './lib/PageNotFound'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ex/:type" element={<ExamplePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App

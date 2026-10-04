import { HashRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import { AuthProvider } from './lib/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import OAuthConsent from './pages/OAuthConsent'
import ExamplePage from './pages/ExamplePage'
import AdminStats from './pages/AdminStats'
import PageNotFound from './lib/PageNotFound'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/oauth/consent" element={<OAuthConsent />} />
            <Route path="/example" element={<ExamplePage />} />
            <Route path="/admin/stats" element={
              <ProtectedRoute>
                <AdminStats />
              </ProtectedRoute>
            } />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

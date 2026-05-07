import React from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, Navigate } from 'react-router-dom'
import { Calendar as CalendarIcon, LayoutDashboard, Plus, Bot, User } from 'lucide-react'
import { AppProvider, useAppContext } from './context/AppContext'
import Auth from './components/Auth'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'
import CalendarView from './components/CalendarView'
import SymptomLogger from './components/SymptomLogger'
import Chatbot from './components/Chatbot'
import Settings from './components/Settings'

// Layout component with bottom navigation
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-container" style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', position: 'relative', paddingBottom: '80px', overflowX: 'hidden', overscrollBehaviorY: 'contain' }}>
      <header style={{ margin: 'var(--spacing-md)', padding: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/logo.png" alt="Mestrux Logo" style={{ height: '60px', objectFit: 'contain' }} />
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '0 var(--spacing-md)' }}>
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav style={{ 
        position: 'fixed', 
        bottom: 'var(--spacing-lg)', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: 'calc(100% - 48px)', 
        maxWidth: '432px',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: 'var(--radius-full)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        zIndex: 100
      }}>
        <NavLink to="/" style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isActive ? 'var(--color-primary)' : 'transparent',
          color: isActive ? 'white' : 'var(--text-muted)',
          width: '44px', height: '44px', borderRadius: '50%', transition: 'all 0.2s'
        })}>
          <LayoutDashboard size={22} />
        </NavLink>
        
        <NavLink to="/calendar" style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isActive ? 'var(--color-primary)' : 'transparent',
          color: isActive ? 'white' : 'var(--text-muted)',
          width: '44px', height: '44px', borderRadius: '50%', transition: 'all 0.2s'
        })}>
          <CalendarIcon size={22} />
        </NavLink>

        <Link to="/log" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--color-surface)', color: 'var(--color-primary)',
          width: '44px', height: '44px', borderRadius: '50%', transition: 'all 0.2s',
          border: '2px solid var(--color-primary-pale)'
        }}>
          <Plus size={22} />
        </Link>

        <NavLink to="/chat" style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isActive ? 'var(--color-primary)' : 'transparent',
          color: isActive ? 'white' : 'var(--text-muted)',
          width: '44px', height: '44px', borderRadius: '50%', transition: 'all 0.2s'
        })}>
          <Bot size={22} />
        </NavLink>

        <NavLink to="/settings" style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isActive ? 'var(--color-primary)' : 'transparent',
          color: isActive ? 'white' : 'var(--text-muted)',
          width: '44px', height: '44px', borderRadius: '50%', transition: 'all 0.2s'
        })}>
          <User size={22} />
        </NavLink>
      </nav>
    </div>
  )
}

const AppContent = () => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <div className="spin-animation" style={{ animation: 'spin 1.5s linear infinite', width: '32px', height: '32px', border: '3px solid var(--color-primary-pale)', borderTopColor: 'var(--color-primary)', borderRadius: '50%' }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/onboarding" element={
        <Onboarding />
      } />
      
      <Route path="/*" element={
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/log" element={<SymptomLogger />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App

import { Settings as SettingsIcon, Bell, Shield, CreditCard, Link as LinkIcon, LogOut, ChevronRight, Edit2, Crown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Settings() {
  const { user, logout } = useAppContext();

  const MenuItem = ({ icon: Icon, title, onClick, color = "var(--text-main)" }: any) => (
    <div 
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.03)',
        cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Icon size={20} color="var(--text-muted)" />
        <span style={{ fontSize: '15px', fontWeight: 500, color }}>{title}</span>
      </div>
      <ChevronRight size={18} color="var(--text-muted)" />
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ padding: '0 8px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>Menstrux</h2>
      </div>

      {/* Upgrade Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
        borderRadius: 'var(--radius-md)', padding: '20px', color: 'white',
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px',
        boxShadow: 'var(--shadow-primary)'
      }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%' }}>
          <Crown size={24} color="white" />
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700 }}>Upgrade Plan Now!</h3>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Get full access to all premium features.</p>
        </div>
      </div>

      {/* Profile Summary */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'var(--color-secondary-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 600, fontSize: '20px'
          }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>{user?.name || 'Menstrux User'}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>{user?.id ? `ID: ${user.id.slice(0,8)}...` : 'Anonymous'}</p>
          </div>
        </div>
        <div style={{ background: 'var(--color-bg)', padding: '8px', borderRadius: '50%' }}>
          <Edit2 size={16} color="var(--text-muted)" />
        </div>
      </div>

      {/* General Section */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>General</h4>
        <div className="card" style={{ padding: '0 16px' }}>
          <MenuItem icon={SettingsIcon} title="Preferences" />
          <MenuItem icon={Bell} title="Reminder" />
          <MenuItem icon={Shield} title="Account & Security" />
          <MenuItem icon={CreditCard} title="Payment Method" />
        </div>
      </div>

      {/* Support Section */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Support</h4>
        <div className="card" style={{ padding: '0 16px' }}>
          <MenuItem icon={LinkIcon} title="Linked Account" />
          <MenuItem icon={LogOut} title="Log Out" onClick={logout} color="var(--color-primary)" />
        </div>
      </div>

    </div>
  );
}

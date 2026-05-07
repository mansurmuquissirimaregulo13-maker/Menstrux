import { Settings as SettingsIcon, Bell, Shield, CreditCard, Link as LinkIcon, LogOut, ChevronRight, Edit2, Crown, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Settings() {
  const { user, logout } = useAppContext();

  const MenuItem = ({ icon: Icon, title, value, onClick, color = "var(--text-main)" }: any) => (
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {value && <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{value}</span>}
        <ChevronRight size={18} color="var(--text-muted)" />
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ padding: '0 8px' }}>
      
      {/* Spacer for top logo consistency */}
      <div style={{ height: '24px' }} />

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
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700 }}>Assine o Plano Premium!</h3>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Tenha acesso total a todas as funcionalidades.</p>
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
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>{user?.name || 'Usuária Menstrux'}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>{user?.id ? `ID: ${user.id.slice(0,8)}...` : 'Anônimo'}</p>
          </div>
        </div>
        <div style={{ background: 'var(--color-bg)', padding: '8px', borderRadius: '50%' }}>
          <Edit2 size={16} color="var(--text-muted)" />
        </div>
      </div>

      {/* General Section */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Geral</h4>
        <div className="card" style={{ padding: '0 16px' }}>
          <MenuItem icon={Globe} title="Idioma" value="Português (Brasil)" />
          <MenuItem icon={SettingsIcon} title="Preferências" />
          <MenuItem icon={Bell} title="Lembretes" />
          <MenuItem icon={Shield} title="Conta e Segurança" />
          <MenuItem icon={CreditCard} title="Métodos de Pagamento" />
        </div>
      </div>

      {/* Support Section */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Suporte</h4>
        <div className="card" style={{ padding: '0 16px' }}>
          <MenuItem icon={LinkIcon} title="Contas Vinculadas" />
          <MenuItem icon={LogOut} title="Sair da Conta" onClick={logout} color="var(--color-primary)" />
        </div>
      </div>

    </div>
  );
}

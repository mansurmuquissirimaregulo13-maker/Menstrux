import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, CreditCard, Link as LinkIcon, LogOut, ChevronRight, Edit2, Crown, Globe, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, logout, updateProfileName } = useAppContext();
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');

  const handleUpdateName = async () => {
    try {
      await updateProfileName(newName);
      setIsEditingName(false);
    } catch (err) {
      alert("Erro ao atualizar nome.");
    }
  };

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
      
      <div style={{ height: '24px' }} />

      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
        borderRadius: 'var(--radius-md)', padding: '20px', color: 'white',
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px',
        boxShadow: 'var(--shadow-primary)',
        cursor: 'pointer'
      }} onClick={() => alert('Plano Mestrux Premium - Em Breve!')}>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%' }}>
          <Crown size={24} color="white" />
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700 }}>Assine o Mestrux Premium!</h3>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Tenha acesso total a todas as funcionalidades.</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'var(--color-secondary-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 600, fontSize: '20px'
          }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1 }}>
            {isEditingName ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  autoFocus
                  style={{ 
                    border: '1px solid var(--color-primary)', 
                    borderRadius: '8px', padding: '4px 8px', 
                    fontSize: '16px', width: '100%' 
                  }}
                />
                <Check size={20} color="var(--color-primary)" onClick={handleUpdateName} style={{ cursor: 'pointer' }} />
              </div>
            ) : (
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>{user?.name || 'Usuária Mestrux'}</h4>
            )}
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>{user?.id ? `ID: ${user.id.slice(0,8)}...` : 'Anônimo'}</p>
          </div>
        </div>
        <div 
          onClick={() => setIsEditingName(!isEditingName)}
          style={{ background: 'var(--color-bg)', padding: '8px', borderRadius: '50%', cursor: 'pointer', marginLeft: '12px' }}
        >
          <Edit2 size={16} color="var(--text-muted)" />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Geral</h4>
        <div className="card" style={{ padding: '0 16px' }}>
          <MenuItem icon={Globe} title="Idioma" value="Português (Brasil)" onClick={() => alert('Idioma: Português (Brasil)')} />
          <MenuItem icon={SettingsIcon} title="Preferências do Ciclo" onClick={() => navigate('/onboarding')} />
          <MenuItem icon={Bell} title="Lembretes e Notificações" onClick={() => alert('Lembretes Ativados!')} />
          <MenuItem icon={Shield} title="Privacidade e Segurança" onClick={() => alert('Seus dados estão protegidos.')} />
          <MenuItem icon={CreditCard} title="Método de Pagamento" onClick={() => alert('Pagamentos em breve.')} />
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Suporte</h4>
        <div className="card" style={{ padding: '0 16px' }}>
          <MenuItem icon={LinkIcon} title="Centro de Ajuda" onClick={() => alert('Suporte Mestrux: contato@mestrux.com')} />
          <MenuItem icon={LogOut} title="Sair da Conta" onClick={logout} color="var(--color-primary)" />
        </div>
      </div>

    </div>
  );
}

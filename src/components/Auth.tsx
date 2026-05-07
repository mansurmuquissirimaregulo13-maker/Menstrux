import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Mail, Lock, User, Loader2 } from 'lucide-react';
import { supabase } from '../utils/supabase';

export default function Auth() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);
    
    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { 
            data: { full_name: name },
            emailRedirectTo: window.location.origin 
          }
        });
        
        if (error) throw error;
        
        // If Supabase returns a session, we're logged in. 
        // If not, it might mean email confirmation is required.
        if (data.session) {
          if (data.user) {
            await supabase.from('profiles').upsert({ id: data.user.id, name });
          }
          navigate('/onboarding');
        } else {
          setErrorMessage("Conta criada! Por favor, verifique seu e-mail para confirmar a conta.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      if (err.status === 429) {
        setErrorMessage("Muitas tentativas! Por favor, aguarde um momento antes de tentar novamente.");
      } else if (err.status === 422) {
        setErrorMessage("Dados inválidos. Verifique se o e-mail está correto ou se a senha tem pelo menos 6 caracteres.");
      } else {
        setErrorMessage(err.message || "Erro ao autenticar. Verifique sua conexão.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="animate-fade-in flex-column align-center justify-center" style={{ minHeight: '100vh', padding: 'var(--spacing-lg)' }}>
      {errorMessage && (
        <div style={{ 
          width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', 
          background: errorMessage.includes('criada') ? '#E6F9F0' : '#FFE6E6', 
          color: errorMessage.includes('criada') ? '#008554' : '#FF4D4D', 
          marginBottom: '20px', fontSize: '14px', fontWeight: 600, textAlign: 'center',
          border: `1px solid ${errorMessage.includes('criada') ? '#00D084' : '#FFB6CB'}`
        }}>
          {errorMessage}
        </div>
      )}
      <div style={{ background: 'var(--color-primary)', color: 'white', padding: '16px', borderRadius: '50%', boxShadow: 'var(--shadow-primary)', marginBottom: 'var(--spacing-lg)' }}>
        <Sparkles size={32} />
      </div>
      
      <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>
        {isRegister ? 'Criar sua conta' : 'Bem-vinda de volta'}
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        Acompanhe seu ciclo e entenda seu corpo.
      </p>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ width: '100%', padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        
        {isRegister && (
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #E8E5E6' }}>
            <User size={20} color="var(--text-muted)" style={{ marginRight: '12px' }} />
            <input 
              required
              type="text" 
              placeholder="Seu nome" 
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }}
              value={name} onChange={e => setName(e.target.value)} 
            />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #E8E5E6' }}>
          <Mail size={20} color="var(--text-muted)" style={{ marginRight: '12px' }} />
          <input 
            required
            type="email" 
            placeholder="Seu e-mail" 
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }}
            value={email} onChange={e => setEmail(e.target.value)} 
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #E8E5E6' }}>
          <Lock size={20} color="var(--text-muted)" style={{ marginRight: '12px' }} />
          <input 
            required
            type="password" 
            placeholder="Sua senha" 
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }}
            value={password} onChange={e => setPassword(e.target.value)} 
          />
        </div>

        <button 
          type="submit"
          disabled={isProcessing}
          className="hover-scale"
          style={{
            marginTop: '8px',
            background: isProcessing ? 'var(--text-muted)' : 'var(--color-primary)', color: 'white',
            border: 'none', padding: '16px', borderRadius: 'var(--radius-full)',
            fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: 'var(--shadow-primary)', cursor: isProcessing ? 'default' : 'pointer',
            minHeight: '52px'
          }}
        >
          {isProcessing ? (
            <Loader2 size={20} className="spin-animation" />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{isRegister ? 'Começar Jornada' : 'Entrar'}</span>
              <ArrowRight size={20} />
            </div>
          )}
        </button>
      </form>

      <button 
        onClick={() => setIsRegister(!isRegister)}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', marginTop: 'var(--spacing-lg)', cursor: 'pointer', fontWeight: 500 }}
      >
        {isRegister ? 'Já tenho uma conta. Entrar.' : 'Ainda não tem conta? Criar agora.'}
      </button>
    </div>
  );
}

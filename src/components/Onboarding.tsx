import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, Loader2, Target, ShieldAlert, CalendarDays, HelpCircle } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAppContext();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [weight, setWeight] = useState(87);
  const [lastPeriodStart, setLastPeriodStart] = useState('');
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(28);
  const [goal, setGoal] = useState('track');
  const [birthYear, setBirthYear] = useState(1998);

  const handleFinish = async () => {
    setIsProcessing(true);
    try {
      await completeOnboarding({
        weight,
        lastPeriodStart,
        periodLength,
        cycleLength,
        goal,
        birthYear
      });
      navigate('/');
    } catch (err) {
      alert("Erro ao salvar seu perfil. Por favor, tente novamente.");
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="flex-column align-center justify-center animate-fade-in" style={{ minHeight: '100vh', background: 'var(--color-primary)', color: 'white' }}>
        <Loader2 size={48} className="spin-animation" style={{ animation: 'spin 1.5s linear infinite' }} />
        <h2 style={{ marginTop: 'var(--spacing-lg)', fontWeight: 700, fontSize: '24px' }}>Salvando seu perfil...</h2>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const renderStepHeader = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', marginBottom: '32px' }}>
      <ChevronLeft size={24} color="var(--text-muted)" onClick={() => setStep(prev => Math.max(1, prev - 1))} style={{ cursor: 'pointer', visibility: step === 1 ? 'hidden' : 'visible' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: `${(step/6) * 100}px`, height: '4px', background: 'var(--color-primary)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
        <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>{step}/6</span>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', padding: '16px', display: 'flex', flexDirection: 'column' }}>
      {renderStepHeader()}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {step === 1 && (
          <div className="animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center', marginBottom: '48px' }}>
              Qual é o seu peso?
            </h2>
            <div style={{ position: 'relative', width: '100%', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-primary)' }}>
                {weight}<span style={{ fontSize: '20px', color: 'var(--text-muted)' }}>kg</span>
              </div>
            </div>
            <input 
              type="range" min="30" max="150" value={weight} 
              onChange={(e) => setWeight(parseInt(e.target.value))} 
              style={{ width: '80%', accentColor: 'var(--color-primary)' }} 
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center', marginBottom: '48px' }}>
              Quando começou sua última menstruação?
            </h2>
            <input 
              type="date" value={lastPeriodStart}
              onChange={e => setLastPeriodStart(e.target.value)}
              style={{ width: '100%', maxWidth: '300px', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,0,0,0.1)', fontSize: '18px', textAlign: 'center' }}
            />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center', marginBottom: '48px' }}>
              Quantos dias dura sua menstruação?
            </h2>
            <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '24px' }}>
              {periodLength} <span style={{ fontSize: '20px', color: 'var(--text-muted)' }}>dias</span>
            </div>
            <input 
              type="range" min="1" max="15" value={periodLength} 
              onChange={(e) => setPeriodLength(parseInt(e.target.value))} 
              style={{ width: '80%', accentColor: 'var(--color-primary)' }} 
            />
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center', marginBottom: '48px' }}>
              Qual é a duração média do seu ciclo?
            </h2>
            <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '24px' }}>
              {cycleLength} <span style={{ fontSize: '20px', color: 'var(--text-muted)' }}>dias</span>
            </div>
            <input 
              type="range" min="20" max="45" value={cycleLength} 
              onChange={(e) => setCycleLength(parseInt(e.target.value))} 
              style={{ width: '80%', accentColor: 'var(--color-primary)' }} 
            />
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center', marginBottom: '32px' }}>
              Qual é o seu objetivo principal?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '340px' }}>
              {[
                { id: 'track', label: 'Monitorar Ciclo', icon: <CalendarDays size={20} /> },
                { id: 'conceive', label: 'Tentar Engravidar', icon: <Target size={20} /> },
                { id: 'prevent', label: 'Evitar Gravidez', icon: <ShieldAlert size={20} /> },
                { id: 'health', label: 'Monitorar Saúde', icon: <HelpCircle size={20} /> }
              ].map(opt => (
                <div 
                  key={opt.id} onClick={() => setGoal(opt.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '16px',
                    background: goal === opt.id ? 'var(--color-primary-pale)' : 'var(--color-surface)',
                    border: goal === opt.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  <div style={{ color: goal === opt.id ? 'var(--color-primary)' : 'var(--text-muted)' }}>{opt.icon}</div>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{opt.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center', marginBottom: '48px' }}>
              Em que ano você nasceu?
            </h2>
            <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '24px' }}>
              {birthYear}
            </div>
            <input 
              type="range" min="1950" max="2015" value={birthYear} 
              onChange={(e) => setBirthYear(parseInt(e.target.value))} 
              style={{ width: '80%', accentColor: 'var(--color-primary)' }} 
            />
          </div>
        )}

      </div>

      <div style={{ padding: '16px 0', marginTop: 'auto' }}>
        <button 
          onClick={() => step === 6 ? handleFinish() : setStep(prev => prev + 1)}
          className="btn-primary"
          disabled={step === 2 && !lastPeriodStart}
        >
          {step === 6 ? 'Finalizar' : 'Continuar'}
        </button>
      </div>
    </div>
  );
}

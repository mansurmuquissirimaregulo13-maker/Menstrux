import { useState } from 'react';
import { X, Droplet, Activity, Smile, CloudRain, ShieldAlert, Heart, Calendar, Loader2, Zap, Brain, Coffee, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function SymptomLogger() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<string | null>('light');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };
  
  const toggleMood = (id: string) => {
    setSelectedMoods(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setIsSaving(true);
    
    try {
      const { error } = await supabase.from('logs').insert({
        user_id: user.id,
        log_date: format(new Date(), 'yyyy-MM-dd'),
        flow: selectedFlow,
        symptoms: selectedSymptoms,
        moods: selectedMoods
      });

      if (error) throw error;
      navigate('/');
    } catch (err) {
      alert("Erro ao salvar seu registro.");
      setIsSaving(false);
    }
  };

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - 3 + i);
    return {
      day: format(d, 'EEE', { locale: ptBR }),
      date: d.getDate(),
      active: d.getDate() === today.getDate()
    };
  });

  const flows = [
    { id: 'light', label: 'Leve', color: 'var(--flow-light)', iconColor: '#FF6B93' },
    { id: 'medium', label: 'Moderado', color: 'var(--flow-medium)', iconColor: '#FFF' },
    { id: 'heavy', label: 'Intenso', color: 'var(--flow-heavy)', iconColor: '#FFF' },
    { id: 'disaster', label: 'Crítico', color: 'var(--flow-disaster)', iconColor: '#FFF' },
  ];

  const symptoms = [
    { id: 'headache', label: 'Dor de Cabeça', icon: <Activity size={20} />, bg: '#E6F4FF', color: '#4DA6FF' },
    { id: 'cramps', label: 'Cólica', icon: <Zap size={20} />, bg: '#FFE6E6', color: '#FF4D4D' },
    { id: 'bloating', label: 'Inchaço', icon: <Droplet size={20} />, bg: '#E6F9F0', color: '#00D084' },
    { id: 'backache', label: 'Dor Lombar', icon: <ShieldAlert size={20} />, bg: '#FFF0E6', color: '#FF884D' },
    { id: 'acne', label: 'Acne', icon: <Smile size={20} />, bg: '#F6E6FF', color: '#B24DFF' },
    { id: 'fatigue', label: 'Cansaço', icon: <Coffee size={20} />, bg: '#FFF9E6', color: '#FFD24D' },
    { id: 'tender_breasts', label: 'Seios Sensíveis', icon: <Heart size={20} />, bg: '#FFE6F0', color: '#FF4D94' },
    { id: 'insomnia', label: 'Insônia', icon: <Moon size={20} />, bg: '#E6E6FF', color: '#4D4DFF' },
  ];

  const moods = [
    { id: 'happy', label: 'Feliz', icon: <Smile size={20} />, bg: '#E6F9F0', color: '#00D084' },
    { id: 'sad', label: 'Triste', icon: <CloudRain size={20} />, bg: '#E6F4FF', color: '#4DA6FF' },
    { id: 'angry', label: 'Irritada', icon: <Activity size={20} />, bg: '#FFE6E6', color: '#FF4D4D' },
    { id: 'anxious', label: 'Ansiosa', icon: <ShieldAlert size={20} />, bg: '#FFF0E6', color: '#FF884D' },
    { id: 'calm', label: 'Calma', icon: <Smile size={20} />, bg: '#F6E6FF', color: '#B24DFF' },
    { id: 'energetic', label: 'Energética', icon: <Zap size={20} />, bg: '#FFF9E6', color: '#FFD24D' },
    { id: 'confused', label: 'Confusa', icon: <Brain size={20} />, bg: '#E6F0FF', color: '#4D88FF' },
    { id: 'tired', label: 'Exausta', icon: <Moon size={20} />, bg: '#F0F0F0', color: '#666' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '0 16px', paddingBottom: '32px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
        <X size={24} color="var(--text-muted)" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Registrar Dia</h2>
        <div style={{ width: '24px' }} />
      </div>

      {/* Calendar Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '16px' }}>
        {dates.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{d.day}</span>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: d.active ? 'var(--color-primary)' : 'transparent',
              color: d.active ? 'white' : 'var(--text-main)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, fontSize: '14px'
            }}>
              {d.date}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Flow */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '16px' }}>Fluxo Menstrual</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {flows.map(flow => (
              <div 
                key={flow.id} onClick={() => setSelectedFlow(flow.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: flow.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: selectedFlow === flow.id ? `0 0 0 2px var(--color-surface), 0 0 0 4px ${flow.color}` : 'none'
                }}>
                  <Droplet size={24} color={flow.iconColor} style={{ fill: flow.iconColor }} />
                </div>
                <span style={{ fontSize: '12px', color: selectedFlow === flow.id ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: 500 }}>{flow.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '16px' }}>Sintomas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px 12px' }}>
            {symptoms.map(sym => {
              const isSelected = selectedSymptoms.includes(sym.id);
              return (
                <div 
                  key={sym.id} onClick={() => toggleSymptom(sym.id)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', textAlign: 'center' }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: sym.bg, color: sym.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isSelected ? `0 0 0 2px var(--color-surface), 0 0 0 4px ${sym.color}` : 'none'
                  }}>
                    {sym.icon}
                  </div>
                  <span style={{ fontSize: '11px', color: isSelected ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: 500, lineHeight: 1.2 }}>{sym.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Moods */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '16px' }}>Humor</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px 12px' }}>
            {moods.map(mood => {
              const isSelected = selectedMoods.includes(mood.id);
              return (
                <div 
                  key={mood.id} onClick={() => toggleMood(mood.id)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', textAlign: 'center' }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: mood.bg, color: mood.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isSelected ? `0 0 0 2px var(--color-surface), 0 0 0 4px ${mood.color}` : 'none'
                  }}>
                    {mood.icon}
                  </div>
                  <span style={{ fontSize: '11px', color: isSelected ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: 500, lineHeight: 1.2 }}>{mood.label}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <button 
        onClick={handleSave}
        disabled={isSaving}
        className="btn-primary"
        style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        {isSaving ? <Loader2 size={20} className="spin-animation" /> : 'Salvar Registro'}
      </button>

    </div>
  );
}

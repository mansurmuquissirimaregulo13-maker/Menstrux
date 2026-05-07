import { Menu, Droplet, Plus, ArrowRight, Edit3, Flame, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { differenceInDays, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAppContext();
  const today = new Date();
  
  let cycleDay = 1;
  let phaseName = 'Follicular';
  let daysLeft = 24;
  let phaseColor = 'var(--color-primary)';
  let phaseIcon = <Droplet size={20} />;

  if (user && user.last_period_start) {
    const lastStart = parseISO(user.last_period_start);
    cycleDay = differenceInDays(today, lastStart) + 1;
    
    const cycleLen = user.cycle_length || 28;
    const periodLen = user.period_length || 5;

    if (cycleDay > cycleLen) {
      cycleDay = ((cycleDay - 1) % cycleLen) + 1;
    }
    
    // Detailed Phase Logic
    if (cycleDay <= periodLen) {
      phaseName = 'Menstrual';
      phaseColor = '#FF5C8A';
      phaseIcon = <Droplet size={20} />;
    } else if (cycleDay <= cycleLen - 14 - 3) {
      phaseName = 'Follicular';
      phaseColor = '#7F73E8';
      phaseIcon = <Sparkles size={20} />;
    } else if (cycleDay <= cycleLen - 14 - 1) {
      phaseName = 'Fertile Window';
      phaseColor = '#00D084';
      phaseIcon = <Flame size={20} />;
    } else if (cycleDay <= cycleLen - 14 + 1) {
      phaseName = 'Ovulation';
      phaseColor = '#FFB900';
      phaseIcon = <Flame size={20} />;
    } else if (cycleDay <= cycleLen - 7) {
      phaseName = 'Early Luteal';
      phaseColor = '#A0254D';
      phaseIcon = <Sparkles size={20} />;
    } else {
      phaseName = 'Late Luteal (PMS)';
      phaseColor = '#5046E5';
      phaseIcon = <Sparkles size={20} />;
    }
    
    daysLeft = cycleLen - cycleDay;
  }

  const cycleLenValue = user?.cycle_length || 28;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((cycleDay / cycleLenValue) * circumference);

  return (
    <div className="animate-fade-in" style={{ padding: '0 8px', marginTop: '16px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Hi, Good Morning</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: 'var(--text-main)' }}>
              {user?.name?.split(' ')[0] || 'User'}
            </h2>
            <span style={{ fontSize: '18px' }}>👋</span>
          </div>
        </div>
        <div style={{ padding: '8px' }}>
          <Menu size={24} color="var(--text-main)" />
        </div>
      </div>

      {/* Cycle Ring Section */}
      <div style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        marginTop: '32px', marginBottom: '24px' 
      }}>
        <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="220" height="220" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
            <circle cx="110" cy="110" r={radius} fill="transparent" stroke="#F0F0F0" strokeWidth="16" strokeDasharray="4 8" />
            <circle 
              cx="110" cy="110" r={radius} fill="transparent" 
              stroke={phaseColor} strokeWidth="16" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
            />
          </svg>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: phaseColor, marginBottom: '8px' }}>{phaseIcon}</div>
            <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 800, color: 'var(--text-main)' }}>
              {cycleDay}<span style={{ fontSize: '18px', fontWeight: 600 }}>th</span>
            </h1>
            <span style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 500 }}>Day</span>
            
            <div style={{ 
              marginTop: '12px', padding: '4px 12px', 
              border: '1px solid #EBEBEB', borderRadius: 'var(--radius-full)',
              fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600
            }}>
              {daysLeft} Days left • {phaseName}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'transparent', border: '1px solid #EBEBEB',
            padding: '10px 16px', borderRadius: 'var(--radius-full)',
            color: 'var(--text-main)', fontSize: '13px', fontWeight: 600
          }}>
            <Edit3 size={14} color="var(--color-primary)" />
            Edit Cycle
          </button>
          <Link to="/log" style={{ textDecoration: 'none' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'transparent', border: '1px solid #EBEBEB',
              padding: '10px 16px', borderRadius: 'var(--radius-full)',
              color: 'var(--text-main)', fontSize: '13px', fontWeight: 600
            }}>
              <Plus size={14} color="var(--text-main)" />
              Add Symptoms
            </button>
          </Link>
        </div>
      </div>

      {/* Cycle Phases Details */}
      <div style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            Cycle Phases Details
          </h3>
          <ArrowRight size={20} color="var(--text-muted)" />
        </div>

        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }} className="hide-scrollbar">
          {[
            { name: 'Menstrual', color: '#FFE1EB', text: '#A0254D', icon: <Droplet size={20} /> },
            { name: 'Follicular', color: '#E6E4FF', text: '#4A40A0', icon: <Sparkles size={20} /> },
            { name: 'Fertile', color: '#E6FFF5', text: '#008554', icon: <Flame size={20} /> },
            { name: 'Ovulation', color: '#FFF9E6', text: '#856100', icon: <Flame size={20} /> },
            { name: 'Luteal', color: '#FFE6E6', text: '#A02525', icon: <Sparkles size={20} /> },
          ].map(p => (
            <div key={p.name} style={{ 
              minWidth: '120px', background: p.color, borderRadius: 'var(--radius-md)', padding: '16px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: p.text }}>{p.name}</span>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.text }}>
                {p.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { subMonths, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, addDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAppContext } from '../context/AppContext';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useAppContext();

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // Project period days based on context
  const simulatedPeriodDays: Date[] = [];
  if (user && user.last_period_start) {
    const lastStart = parseISO(user.last_period_start);
    const pLen = user.period_length || 5;
    const cLen = user.cycle_length || 28;

    // Current period
    const endP = addDays(lastStart, pLen - 1);
    simulatedPeriodDays.push(...eachDayOfInterval({ start: lastStart, end: endP }));
    
    // Future tracking (+ 3 cycles in advance for testing)
    for (let i = 1; i <= 3; i++) {
        const nextStart = addDays(lastStart, cLen * i);
        const nextEnd = addDays(nextStart, pLen - 1);
        simulatedPeriodDays.push(...eachDayOfInterval({ start: nextStart, end: nextEnd }));
    }
  }

  return (
    <div className="animate-fade-in flex-column gap-lg" style={{ marginTop: 'var(--spacing-lg)' }}>
      {/* Month Navigation */}
      <div className="glass-panel" style={{ padding: 'var(--spacing-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 'var(--radius-md)' }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, textTransform: 'capitalize' }}>
          {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="glass-panel" style={{ padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
          {weekDays.map((day, idx) => (
            <div key={idx} style={{ textAlign: 'center', fontWeight: 600, fontSize: '14px', color: 'var(--text-muted)' }}>
              {day}
            </div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--spacing-sm)' }}>
          {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {daysInMonth.map((day) => {
            const isPeriodDay = simulatedPeriodDays.some(pd => isSameDay(pd, day));
            const isToday = isSameDay(day, new Date());
            
            return (
              <div 
                key={day.toString()} 
                style={{ 
                  aspectRatio: '1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderRadius: '50%',
                  fontSize: '14px',
                  fontWeight: 500,
                  background: isPeriodDay ? 'var(--color-primary)' : isToday ? 'var(--color-surface)' : 'transparent',
                  color: isPeriodDay ? '#FFFFFF' : 'var(--text-main)',
                  border: isToday && !isPeriodDay ? '2px solid var(--color-primary-light)' : 'none',
                  boxShadow: isPeriodDay ? 'var(--shadow-primary)' : 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                className={isPeriodDay ? 'hover-scale' : ''}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="glass-panel" style={{ padding: 'var(--spacing-md)', display: 'flex', justifyContent: 'center', gap: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)' }} />
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-main)' }}>Menstruação</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid var(--color-primary-light)' }} />
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-main)' }}>Hoje</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

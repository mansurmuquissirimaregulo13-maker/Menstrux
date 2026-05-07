import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { getAIResponse } from '../utils/aiKnowledge';
import { useAppContext } from '../context/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chatbot = () => {
  const { user } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Olá! Sou a assistente de IA do Menstrux. Fui treinada com um conhecimento imenso sobre saúde feminina, ciclos, fertilidade e bem-estar. O que você gostaria de saber hoje?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponseText = getAIResponse(newUserMessage.text, user);
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500); // 1.5 seconds delay for realism
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', position: 'relative' }}>
      
      {/* Messages Area */}
      <div 
        className="hide-scrollbar"
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: 'var(--spacing-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingBottom: '20px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px',
            background: 'var(--color-primary-light)', 
            padding: '8px 16px', 
            borderRadius: '20px',
            color: 'var(--color-primary)',
            fontSize: '12px',
            fontWeight: 600
          }}>
            <Sparkles size={14} />
            Especialista Menstrual IA
          </div>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            style={{ 
              display: 'flex', 
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
              gap: '12px',
              alignItems: 'flex-end',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--color-secondary)',
              color: 'white',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>

            {/* Bubble */}
            <div style={{
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: '20px',
              borderBottomRightRadius: msg.sender === 'user' ? '4px' : '20px',
              borderBottomLeftRadius: msg.sender === 'ai' ? '4px' : '20px',
              background: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--bg-card)',
              color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {msg.text}
              <div style={{ 
                fontSize: '10px', 
                opacity: 0.7, 
                marginTop: '4px', 
                textAlign: msg.sender === 'user' ? 'right' : 'left' 
              }}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--color-secondary)', color: 'white', boxShadow: 'var(--shadow-sm)'
            }}>
              <Bot size={18} />
            </div>
            <div className="typing-indicator" style={{
              padding: '12px 16px', borderRadius: '20px', borderBottomLeftRadius: '4px',
              background: 'var(--bg-card)', display: 'flex', gap: '4px', alignItems: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div className="typing-dot"></div>
              <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
              <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-panel" style={{
        position: 'sticky',
        bottom: 0,
        margin: '0 var(--spacing-md)',
        padding: '12px',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '12px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pergunte sobre seu ciclo..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: 'var(--text-main)'
            }}
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            style={{
              background: inputValue.trim() && !isTyping ? 'var(--color-primary)' : 'var(--text-muted)',
              color: 'white',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputValue.trim() && !isTyping ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            <Send size={18} style={{ marginLeft: '2px' }} />
          </button>
        </form>
      </div>

    </div>
  );
};

export default Chatbot;

import { UserProfile } from '../context/AppContext';

export const getAIResponse = (userMessage: string, profile: UserProfile | null): string => {
  const normalizedMessage = userMessage.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Contextual Data
  const goal = profile?.goal || 'track';
  const cycleLen = profile?.cycle_length || 28;
  const periodLen = profile?.period_length || 5;

  // Smarter heuristic with memory/context
  if (normalizedMessage.includes('fase') || normalizedMessage.includes('fases')) {
    return `Com base no seu perfil de ${cycleLen} dias, o seu ciclo é dividido em fases: Menstrual (sangramento), Folicular (energia subindo), Janela Fértil e Ovulação (pico de fertilidade) e Lútea (pré-menstrual). Como seu objetivo é ${goal === 'track' ? 'apenas monitorar' : goal === 'conceive' ? 'engravidar' : 'evitar gravidez'}, preste atenção especial à sua janela fértil!`;
  }

  if (normalizedMessage.includes('fertil') || normalizedMessage.includes('engravidar') || normalizedMessage.includes('ovular')) {
    if (goal === 'conceive') {
      return `Como seu objetivo é **engravidar**, a identificação correta da sua ovulação é vital. Em um ciclo de ${cycleLen} dias, sua janela fértil geralmente ocorre entre os dias ${Math.max(1, cycleLen - 18)} e ${cycleLen - 12}. Tente monitorar o muco cervical (tipo clara de ovo) para confirmar!`;
    }
    return `Sua fertilidade está ligada à ovulação. No seu ciclo médio de ${cycleLen} dias, você geralmente é mais fértil no meio do mês. Se você está tentando ${goal === 'prevent' ? 'evitar gravidez' : 'monitorar sua saúde'}, use métodos de barreira ou acompanhe os sinais do seu corpo com precisão.`;
  }

  if (normalizedMessage.includes('tpm') || normalizedMessage.includes('humor') || normalizedMessage.includes('irritada')) {
    return `A TPM geralmente acontece na sua fase Lútea Final (os últimos 7 dias do seu ciclo de ${cycleLen} dias). É normal sentir mudanças de humor. Tente reduzir cafeína e sal nesse período. Sabia que exercícios leves ajudam a liberar endorfina e melhorar o humor?`;
  }

  if (normalizedMessage.includes('colica') || normalizedMessage.includes('dor')) {
    return `Cólicas são comuns na fase menstrual (${periodLen} dias no seu caso). Se a dor for muito forte e impedir suas atividades, pode ser sinal de algo mais sério. Tente bolsas de água quente e chás de camomila ou gengibre.`;
  }

  if (normalizedMessage.includes('oi') || normalizedMessage.includes('ola') || normalizedMessage.includes('bom dia')) {
    return `Olá! Eu sou sua IA do Menstrux. Eu "decorei" que você tem ${profile?.birth_year ? (new Date().getFullYear() - profile.birth_year) : 'vários'} anos e seu objetivo é ${goal === 'conceive' ? 'engravidar' : 'acompanhar seu ciclo'}. Como posso te ajudar com sua saúde hoje?`;
  }

  return "Entendi! O corpo feminino é fascinante. Embora eu seja uma IA focada em dados, lembre-se que cada ciclo é único. Tente me perguntar sobre 'fases do ciclo', 'fertilidade', 'TPM' ou 'cólicas' para que eu possa te dar informações baseadas no seu perfil de saúde!";
};

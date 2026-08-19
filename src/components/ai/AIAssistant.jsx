'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, X, Send, ChevronRight, MessageSquare, Code, Briefcase, Mail, User, Terminal, Activity } from 'lucide-react';

export default function AIAssistant({ data = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hi! I'm Ratul AI, Mahmud's portfolio intelligence engine. Ask me anything about his flagship projects, edge-AI research, work experience, or tech stack!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const person = data.personInfo || {};
  const projectsList = data.projects || [];
  const experiencesList = data.experiences || [];
  const researchList = data.researchPapers || [];

  useEffect(() => {
    if (isOpen && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Quick Prompt Chips
  const promptChips = [
    { label: '🚀 Flagship Works', query: 'Show flagship projects' },
    { label: '💼 Work Experience', query: 'Tell me about work experience' },
    { label: '🧠 Tech Stack', query: 'What is his tech stack?' },
    { label: '✉️ Contact Details', query: 'How can I contact Mahmud?' },
  ];

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Projects Query
    if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('sipprq')) {
      const topProjects = projectsList.slice(0, 3).map(p => `• **${p.title}**: ${p.description}`).join('\n');
      
      const projSec = document.getElementById('projects');
      if (projSec) projSec.scrollIntoView({ behavior: 'smooth' });

      return {
        text: `Here are Mahmud's top flagship projects:\n\n${topProjects}\n\nI have scrolled to the **Projects** section!`,
        action: 'projects'
      };
    }

    // 2. Experience Query
    if (q.includes('experience') || q.includes('job') || q.includes('role') || q.includes('intern') || q.includes('club') || q.includes('diucpc')) {
      const topExp = experiencesList.slice(0, 3).map(e => `• **${e.role}** at *${e.organization}* (${e.period})`).join('\n');
      
      const expSec = document.getElementById('experience');
      if (expSec) expSec.scrollIntoView({ behavior: 'smooth' });

      return {
        text: `Here is a quick summary of Mahmud's work & leadership roles:\n\n${topExp}\n\nI have scrolled to the **Experience** deck section!`,
        action: 'experience'
      };
    }

    // 3. Tech Stack Query
    if (q.includes('tech') || q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('next') || q.includes('react') || q.includes('c++')) {
      const techSec = document.getElementById('tech-stack');
      if (techSec) techSec.scrollIntoView({ behavior: 'smooth' });

      return {
        text: `Mahmud specializes in **Full-Stack Web Engineering** (Next.js 14, React, Node.js, PostgreSQL) and **Edge-AI & Embedded Hardware** (C++, ESP32-S3 Microcontrollers, TinyML, PyTorch).\n\nCheck out the interactive **Tech Stack** section!`,
        action: 'techstack'
      };
    }

    // 4. Contact / Hire Query
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone') || q.includes('location')) {
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });

      return {
        text: `You can reach Mahmud directly via:\n• **Email**: ${person.email || 'mhratul.dev@gmail.com'}\n• **Location**: ${person.location || 'Savar, Dhaka, Bangladesh'}\n• **GitHub**: ${person.github || person.github_url || 'https://github.com/Ratul-NotFound'}\n\nI have opened the **Contact** form section below!`,
        action: 'contact'
      };
    }

    // 5. General Bio Query
    return {
      text: `${person.name || 'Mahmud Hasan Ratul'} is a **${person.title || person.role || 'Full-Stack & Edge AI Engineer'}** based in ${person.location || 'Dhaka, Bangladesh'}. ${person.about || person.bio || 'He architects high-throughput web applications with Next.js & Node.js, and researches low-latency embedded AI hardware systems.'}`
    };
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(query);
      const aiMsg = {
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono select-none">
      {/* Floating Compact Circular AI Icon Launcher Button */}
      {!isOpen && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative group flex justify-end"
        >
          {/* Hover Tooltip (Left Side of Button) */}
          <div 
            className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-2 group-hover:translate-x-0"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            Ratul AI Assistant
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 relative backdrop-blur-xl group-hover:scale-110 active:scale-95"
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-accent)',
              boxShadow: '0 0 24px rgba(56, 189, 248, 0.45), 0 8px 20px rgba(0,0,0,0.5)',
            }}
          >
            {/* Pulsating Ping Ring */}
            <span className="absolute -inset-1 rounded-full border border-accent/60 animate-ping pointer-events-none" />

            {/* AI Bot Icon */}
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" style={{ color: 'var(--color-accent)' }} />

            {/* Online Live Status Beacon Dot */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[var(--color-surface)] shadow-md" />
          </button>
        </motion.div>
      )}

      {/* Interactive Folder Deck Chat Window Modal */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] relative z-50">
          {/* Top Folder Tab Notch */}
          <div className="flex justify-end pr-6 relative z-20">
            <div 
              className="px-4 py-1 rounded-t-2xl text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md relative -mb-[1px]"
              style={{
                background: 'var(--color-surface)',
                borderTop: '1px solid var(--color-border-accent)',
                borderLeft: '1px solid var(--color-border-accent)',
                borderRight: '1px solid var(--color-border-accent)',
                color: 'var(--color-accent)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>RATUL AI // INTELLIGENCE</span>
            </div>
          </div>

          {/* Main Folder Chat Container */}
          <div 
            className="w-full h-[480px] rounded-3xl rounded-tr-none flex flex-col overflow-hidden shadow-2xl relative z-10 transition-all duration-300"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
            }}
          >
            {/* Top Laser Accent Sweep */}
            <div 
              className="absolute inset-x-0 top-0 h-[2px] z-30" 
              style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} 
            />

            {/* Chat Header Bar */}
            <div className="p-4 flex items-center justify-between border-b flex-shrink-0" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-2)' }}>
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center shadow-inner"
                  style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}
                >
                  <Bot className="w-4 h-4 text-accent" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-sans flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                    <span>Ratul AI Assistant</span>
                    <span 
                      className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold"
                      style={{ background: 'var(--color-surface-3)', color: 'var(--color-accent)', border: '1px solid var(--color-border-accent)' }}
                    >
                      LIVE
                    </span>
                  </h3>
                  <p className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>Portfolio Intelligence Engine</p>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg transition-colors cursor-pointer"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 border-b flex gap-1.5 overflow-x-auto custom-scrollbar flex-shrink-0" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-3)' }}>
              {promptChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.query)}
                  className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer shadow-sm"
                  style={{
                    background: 'var(--color-surface-2)',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar text-xs font-sans">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      m.sender === 'user' 
                        ? 'font-semibold rounded-tr-none shadow-md' 
                        : 'rounded-tl-none font-mono text-[11px] shadow-sm'
                    }`}
                    style={m.sender === 'user' ? {
                      background: 'var(--color-accent)',
                      color: '#000',
                    } : {
                      background: 'var(--color-surface-2)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] font-mono mt-1 px-1" style={{ color: 'var(--color-text-faint)' }}>{m.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs font-mono p-2" style={{ color: 'var(--color-text-muted)' }}>
                  <Bot className="w-3.5 h-3.5 animate-spin" style={{ color: 'var(--color-accent)' }} />
                  <span>Ratul AI is thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t flex-shrink-0" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-2)' }}>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Ask about projects, tech stack, experience..."
                  className="flex-1 px-3.5 py-2 rounded-xl text-xs outline-none font-mono transition-colors"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--color-border-accent)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl font-bold transition-opacity cursor-pointer shadow-md"
                  style={{
                    background: 'var(--color-accent)',
                    color: '#000',
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

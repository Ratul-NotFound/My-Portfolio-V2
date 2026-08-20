'use client';
import { useState } from 'react';
import { Mail, MapPin, Clock, Send, Copy, Check, MessageSquare, Loader2, Sparkles, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import Magnetic from './ux/Magnetic';
import { submitContactMessage } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact({ personInfo = {} }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied]       = useState(false);

  const email    = personInfo.email    || 'mhratul.dev@gmail.com';
  const location = personInfo.location || personInfo.address || 'Savar, Dhaka, Bangladesh';
  const github   = personInfo.github   || 'https://github.com/Ratul-NotFound';
  const linkedin = personInfo.linkedin || 'https://linkedin.com/in/ratul-notfound';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending || submitted) return;
    setIsSending(true);
    try {
      await submitContactMessage(formData);
      setIsSending(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4500);
    } catch (err) {
      console.error('Submission failed:', err);
      setIsSending(false);
    }
  };

  return (
    <SectionWrapper id="contact" variant="glass-rise">
      <div className="w-full relative z-10" style={{ maxWidth: 'var(--container-inner)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
        
        {/* Section Header */}
        <SectionHeader
          number="08"
          category="Let's Work Together"
          title="Get In"
          highlight="Touch"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full items-stretch">

          {/* LEFT: Contact Details Spec Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div 
              className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex flex-col justify-between h-full rounded-3xl relative overflow-hidden group transition-all duration-300 font-mono shadow-xl"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--color-border)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              {/* Top Laser Accent Line */}
              <div 
                className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} 
              />

              {/* Ambient Glow */}
              <div 
                className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full blur-[70px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity"
                style={{ background: 'var(--color-accent)' }}
              />

              {/* Card Header */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <h3 className="text-sm sm:text-base font-bold font-sans flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                    <MessageSquare className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    <span>Direct Channels</span>
                  </h3>
                  <span 
                    className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"
                    style={{ 
                      background: 'rgba(34, 197, 94, 0.12)', 
                      border: '1px solid rgba(34, 197, 94, 0.25)', 
                      color: '#22c55e' 
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span>Available for Roles</span>
                  </span>
                </div>

                {/* Contact Items List */}
                <div className="space-y-2">
                  {/* Direct Email */}
                  <a
                    href={`mailto:${email}`}
                    className="p-2.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer group/item border"
                    style={{
                      background: 'var(--color-surface-2)',
                      borderColor: 'var(--color-border)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.background = 'var(--color-surface)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.background = 'var(--color-surface-2)';
                    }}
                  >
                    <div 
                      className="p-1.5 rounded-lg flex-shrink-0 transition-transform group-hover/item:scale-110"
                      style={{ background: 'var(--color-surface-3)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold block opacity-75" style={{ color: 'var(--color-text-muted)' }}>DIRECT EMAIL</span>
                      <span className="text-xs font-bold truncate block transition-colors group-hover/item:text-accent" style={{ color: 'var(--color-text)' }}>
                        {email}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" style={{ color: 'var(--color-accent)' }} />
                  </a>

                  {/* Location */}
                  <div 
                    className="p-2.5 rounded-xl flex items-center gap-2.5 border"
                    style={{
                      background: 'var(--color-surface-2)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div 
                      className="p-1.5 rounded-lg flex-shrink-0"
                      style={{ background: 'var(--color-surface-3)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold block opacity-75" style={{ color: 'var(--color-text-muted)' }}>LOCATION</span>
                      <span className="text-xs font-bold truncate block" style={{ color: 'var(--color-text)' }}>
                        {location}
                      </span>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div 
                    className="p-2.5 rounded-xl flex items-center gap-2.5 border"
                    style={{
                      background: 'var(--color-surface-2)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div 
                      className="p-1.5 rounded-lg flex-shrink-0"
                      style={{ background: 'var(--color-surface-3)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
                    >
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold block opacity-75" style={{ color: 'var(--color-text-muted)' }}>TYPICAL RESPONSE</span>
                      <span className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
                        ⚡ Within 2 Hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Copy Button & Social Row */}
              <div className="space-y-2 pt-2.5" style={{ borderTop: '1px solid var(--color-border)' }}>
                {/* One-Click Copy Email Button */}
                <button 
                  type="button"
                  onClick={copyEmail}
                  className="w-full p-2 rounded-xl flex items-center justify-between text-xs font-mono font-bold cursor-pointer transition-all border active:scale-98 shadow-sm"
                  style={{ 
                    background: copied ? 'rgba(56, 189, 248, 0.15)' : 'var(--color-surface-3)', 
                    borderColor: copied ? 'var(--color-accent)' : 'var(--color-border)', 
                    color: copied ? 'var(--color-accent)' : 'var(--color-text)' 
                  }}
                  onMouseEnter={e => { if (!copied) e.currentTarget.style.borderColor = 'var(--color-border-accent)'; }}
                  onMouseLeave={e => { if (!copied) e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                >
                  <span className="truncate text-[11px]">{email}</span>
                  {copied ? (
                    <span className="flex items-center gap-1 text-xs text-accent font-bold" style={{ color: 'var(--color-accent)' }}>
                      <Check className="w-3.5 h-3.5 text-green-400" /> Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-accent opacity-85 hover:opacity-100" style={{ color: 'var(--color-accent)' }}>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </span>
                  )}
                </button>

                {/* Social Connect Icons Row */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { href: github, icon: <GithubIcon className="w-3.5 h-3.5 fill-current" />, label: 'GitHub' },
                    { href: linkedin, icon: <LinkedinIcon className="w-3.5 h-3.5 fill-current" />, label: 'LinkedIn' },
                    { href: `mailto:${email}`, icon: <Mail className="w-3.5 h-3.5" />, label: 'Mail' },
                  ].map(({ href, icon, label }, i) => (
                    <a 
                      key={i} 
                      href={href} 
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-mono font-semibold transition-all border group/soc cursor-pointer hover:scale-103 active:scale-95 shadow-sm"
                      style={{ 
                        background: 'var(--color-surface-2)', 
                        borderColor: 'var(--color-border)', 
                        color: 'var(--color-text-muted)' 
                      }}
                      onMouseEnter={e => { 
                        e.currentTarget.style.color = 'var(--color-accent)'; 
                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                        e.currentTarget.style.background = 'var(--color-surface)';
                      }}
                      onMouseLeave={e => { 
                        e.currentTarget.style.color = 'var(--color-text-muted)'; 
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.background = 'var(--color-surface-2)';
                      }}
                    >
                      {icon}
                      <span className="text-[11px]">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: High-Performance Contact Message Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div 
              className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex flex-col justify-between h-full rounded-3xl relative overflow-hidden group transition-all duration-300 font-mono shadow-xl"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--color-border)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              {/* Top Laser Accent Line */}
              <div 
                className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} 
              />

              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 flex flex-col justify-between h-full">
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Name Input */}
                    <div className="space-y-0.5">
                      <label className="text-xs font-mono font-bold flex items-center justify-between" style={{ color: 'var(--color-text-muted)' }}>
                        <span>Your Name</span>
                        <span className="text-[10px] opacity-50 font-normal">Required</span>
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Mahmud Hasan"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-xs font-mono outline-none transition-all duration-200 placeholder:text-zinc-500 focus:ring-2 focus:ring-accent/30"
                        style={{
                          background: 'var(--color-surface-2)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-0.5">
                      <label className="text-xs font-mono font-bold flex items-center justify-between" style={{ color: 'var(--color-text-muted)' }}>
                        <span>Email Address</span>
                        <span className="text-[10px] opacity-50 font-normal">Required</span>
                      </label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-xs font-mono outline-none transition-all duration-200 placeholder:text-zinc-500 focus:ring-2 focus:ring-accent/30"
                        style={{
                          background: 'var(--color-surface-2)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-0.5">
                    <label className="text-xs font-mono font-bold flex items-center justify-between" style={{ color: 'var(--color-text-muted)' }}>
                      <span>Subject</span>
                      <span className="text-[10px] opacity-50 font-normal">Inquiry Type</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Project Collaboration / Full-Time Engineering Role"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-xs font-mono outline-none transition-all duration-200 placeholder:text-zinc-500 focus:ring-2 focus:ring-accent/30"
                      style={{
                        background: 'var(--color-surface-2)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                    />
                  </div>

                  {/* Message Body */}
                  <div className="space-y-0.5">
                    <label className="text-xs font-mono font-bold flex items-center justify-between" style={{ color: 'var(--color-text-muted)' }}>
                      <span>Message</span>
                      <span className="text-[10px] opacity-50 font-normal">Details</span>
                    </label>
                    <textarea 
                      required 
                      rows={2.5} 
                      placeholder="Hi Mahmud, I came across your portfolio and would like to discuss..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-xs font-mono outline-none transition-all duration-200 placeholder:text-zinc-500 focus:ring-2 focus:ring-accent/30 resize-none"
                      style={{
                        background: 'var(--color-surface-2)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-1.5">
                  <Magnetic>
                    <button 
                      type="submit" 
                      disabled={submitted || isSending}
                      className="w-full py-3.5 rounded-2xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98 disabled:opacity-80"
                      style={{ 
                        background: submitted ? 'rgba(34, 197, 94, 0.9)' : 'var(--color-accent)', 
                        color: submitted ? '#fff' : '#000',
                        boxShadow: submitted ? '0 0 20px rgba(34, 197, 94, 0.4)' : '0 0 25px rgba(56, 189, 248, 0.35)'
                      }}
                      onMouseEnter={e => { if (!submitted && !isSending) e.currentTarget.style.opacity = '0.88'; }}
                      onMouseLeave={e => { if (!submitted && !isSending) e.currentTarget.style.opacity = '1'; }}
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : submitted ? (
                        <>
                          <Check className="w-4 h-4 text-white animate-bounce" />
                          <span>Message Dispatched Successfully!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}

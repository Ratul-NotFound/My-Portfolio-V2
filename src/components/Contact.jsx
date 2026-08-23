'use client';
import { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight,
  Sparkles,
  Loader2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import Magnetic from './ux/Magnetic';
import { submitContactMessage } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function Contact({ personInfo = {} }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied]       = useState(false);

  const email    = personInfo.email    || 'mhratul.dev@gmail.com';
  const location = personInfo.location || personInfo.address || 'Savar, Dhaka, Bangladesh';
  const github   = personInfo.github   || 'https://github.com/Ratul-NotFound';
  const linkedin = personInfo.linkedin || 'https://www.linkedin.com/in/mahmud-hasan-ratul';
  const status   = personInfo.status   || personInfo.availability || 'Available for Roles';

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
      <div className="w-full relative z-10" style={{ maxWidth: 'var(--container-inner)', margin: '0 auto' }}>
        
        {/* Section Header */}
        <SectionHeader
          number="08"
          category="Direct Connection"
          title="Get In"
          highlight="Touch"
        />

        {/* ── Ultra-Clean Modern Editorial Contact Structure ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 w-full items-start mt-2">

          {/* ── LEFT: Typography & Direct Action Channels (5 Cols) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* 1. Header Statement */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400" 
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{status}</span>
              </div>

              <h3 className="font-sans font-black text-3xl sm:text-4xl leading-tight tracking-tight text-white">
                Let's start a <span style={{ color: 'var(--color-accent)' }}>conversation</span>.
              </h3>

              <p className="text-sm font-sans text-zinc-300 leading-relaxed max-w-md">
                Have a new project in mind, an engineering role to fill, or want to discuss AI workflows? Drop me a line anytime.
              </p>
            </div>

            {/* 2. Direct Large Email Action */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block">Direct Email</span>
              <div className="flex items-center gap-3">
                <a 
                  href={`mailto:${email}`} 
                  className="font-mono text-base sm:text-lg font-bold text-white hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span>{email}</span>
                  <ArrowUpRight className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer"
                  style={{
                    background: copied ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.04)',
                    borderColor: copied ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                    color: copied ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  }}
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Copy
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 3. Metadata Details */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Base Location</span>
                <div className="text-xs sm:text-sm font-sans font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{location}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Response Time</span>
                <div className="text-xs sm:text-sm font-mono font-bold text-purple-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Within 2 Hours</span>
                </div>
              </div>
            </div>

            {/* 4. Social Links */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2.5">Find Me On</span>
              <div className="flex items-center gap-2">
                {[
                  { href: github, icon: <GithubIcon className="w-4 h-4 fill-current" />, label: 'GitHub' },
                  { href: linkedin, icon: <LinkedinIcon className="w-4 h-4 fill-current" />, label: 'LinkedIn' },
                  { href: `mailto:${email}`, icon: <Mail className="w-4 h-4" />, label: 'Email' },
                ].map(({ href, icon, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-mono font-semibold transition-all border group cursor-pointer hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.08)',
                      color: 'var(--color-text)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.color = 'var(--color-accent)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'var(--color-text)';
                    }}
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT: Minimalist Underline Input Form (7 Cols) ── */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span>Your Name</span>
                    <span className="text-[10px] text-sky-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mahmud Hasan"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pb-3 pt-1 text-sm sm:text-base font-sans text-white outline-none transition-all placeholder:text-zinc-600 bg-transparent border-b"
                    style={{
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = '0 1px 0 var(--color-accent)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span>Email Address</span>
                    <span className="text-[10px] text-sky-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pb-3 pt-1 text-sm sm:text-base font-sans text-white outline-none transition-all placeholder:text-zinc-600 bg-transparent border-b"
                    style={{
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = '0 1px 0 var(--color-accent)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>Subject / Inquiry</span>
                </label>
                <input
                  type="text"
                  placeholder="Project Collaboration / Full-Time Engineering Role"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full pb-3 pt-1 text-sm sm:text-base font-sans text-white outline-none transition-all placeholder:text-zinc-600 bg-transparent border-b"
                  style={{
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.boxShadow = '0 1px 0 var(--color-accent)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>Message Details</span>
                  <span className="text-[10px] text-sky-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi Mahmud, I would love to discuss a project..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pb-3 pt-1 text-sm sm:text-base font-sans text-white outline-none transition-all leading-relaxed placeholder:text-zinc-600 bg-transparent border-b resize-none"
                  style={{
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.boxShadow = '0 1px 0 var(--color-accent)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex items-center justify-between">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={isSending || submitted}
                    className="px-8 py-3.5 rounded-2xl font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    style={{
                      background: submitted ? '#22c55e' : 'var(--color-accent)',
                      color: '#000',
                      boxShadow: '0 0 25px rgba(56,189,248,0.35)',
                    }}
                    onMouseEnter={e => { if (!submitted && !isSending) e.currentTarget.style.opacity = '0.9'; }}
                    onMouseLeave={e => { if (!submitted && !isSending) e.currentTarget.style.opacity = '1'; }}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Transmission...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>Message Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </Magnetic>

                <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                  🔒 Direct Transmission to Mahmud
                </span>
              </div>

            </form>
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}

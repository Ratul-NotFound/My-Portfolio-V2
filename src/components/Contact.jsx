'use client';
import { useState } from 'react';
import { Mail, MapPin, Clock, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import Magnetic from './ux/Magnetic';
import { submitContactMessage } from '@/lib/supabase';

const card = {
  borderRadius: '1.5rem',
  border: '1px solid var(--color-border)',
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.875rem',
  border: '1px solid var(--color-border)',
  background: 'var(--color-surface-3)',
  color: 'var(--color-text)',
  fontSize: '0.75rem',
  fontFamily: 'JetBrains Mono, monospace',
  outline: 'none',
  transition: 'border-color 0.25s ease',
};

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
    setIsSending(true);
    await submitContactMessage(formData);
    setIsSending(false);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name:'', email:'', subject:'', message:'' }); }, 4000);
  };

  const focusStyle  = e => e.currentTarget.style.borderColor = 'var(--color-accent)';
  const blurStyle   = e => e.currentTarget.style.borderColor = 'var(--color-border)';
  const hoverCardIn = e => { e.currentTarget.style.borderColor = 'var(--color-border-accent)'; };
  const hoverCardOut= e => { e.currentTarget.style.borderColor = 'var(--color-border)'; };

  return (
    <SectionWrapper id="contact" variant="glass-rise">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <SectionHeader number="08" category="Let's Work Together" title="Get In" highlight="Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">

          {/* LEFT: Contact Details */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 group relative h-full rounded-3xl" style={card}
              onMouseEnter={hoverCardIn} onMouseLeave={hoverCardOut}>
              {/* laser line */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

              <div className="flex items-center justify-between pb-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h3 className="text-base font-bold font-sans flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                  <MessageSquare className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                  Contact Details
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono"
                  style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border-accent)', color: 'var(--color-accent)' }}>
                  Open for Roles
                </span>
              </div>

              {[
                { icon: <Mail className="w-4 h-4" />, label: 'DIRECT EMAIL', value: email, href: `mailto:${email}` },
                { icon: <MapPin className="w-4 h-4" />, label: 'LOCATION', value: location },
                { icon: <Clock className="w-4 h-4" />, label: 'RESPONSE TIME', value: '< 2 Hours' },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="p-2 rounded-xl flex-shrink-0"
                    style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-accent)' }}>
                    {icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold block font-mono" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                    {href
                      ? <a href={href} className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{value}</a>
                      : <span className="text-xs font-bold" style={{ color: label === 'RESPONSE TIME' ? 'var(--color-accent)' : 'var(--color-text)' }}>{value}</span>
                    }
                  </div>
                </div>
              ))}

              {/* Copy Email */}
              <div className="pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                <button onClick={copyEmail}
                  className="w-full p-3 rounded-2xl flex items-center justify-between text-xs font-mono font-bold cursor-pointer transition-all"
                  style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                  <span className="truncate">{email}</span>
                  {copied
                    ? <span className="flex items-center gap-1" style={{ color: 'var(--color-accent)' }}><Check className="w-4 h-4" /> Copied!</span>
                    : <span className="flex items-center gap-1" style={{ color: 'var(--color-accent)' }}><Copy className="w-4 h-4" /> Copy</span>
                  }
                </button>
              </div>

              {/* Socials */}
              <div className="flex items-center justify-center gap-3 pt-1">
                {[
                  { href: github, icon: <GithubIcon className="w-4 h-4" /> },
                  { href: linkedin, icon: <LinkedinIcon className="w-4 h-4" /> },
                  { href: `mailto:${email}`, icon: <Mail className="w-4 h-4" /> },
                ].map(({ href, icon }, i) => (
                  <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl transition-colors"
                    style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.borderColor = 'var(--color-border-accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-7 group relative rounded-3xl" style={card}
              onMouseEnter={hoverCardIn} onMouseLeave={hoverCardOut}>
              <div className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Jane Doe' },
                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'jane@example.com' },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key} className="space-y-1">
                      <label className="text-xs font-mono font-bold" style={{ color: 'var(--color-text-muted)' }}>{label}</label>
                      <input
                        type={type} required placeholder={placeholder}
                        value={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        style={inputStyle}
                        onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold" style={{ color: 'var(--color-text-muted)' }}>Subject</label>
                  <input type="text" required placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold" style={{ color: 'var(--color-text-muted)' }}>Message</label>
                  <textarea required rows={3} placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>

                <Magnetic>
                  <button type="submit" disabled={submitted}
                    className="w-full py-3.5 rounded-2xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-opacity cursor-pointer disabled:opacity-70"
                    style={{ background: 'var(--color-accent)', color: '#000' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    {submitted
                      ? <><Check className="w-4 h-4" /> Message Sent Successfully!</>
                      : <><Send className="w-4 h-4" /> Send Message</>
                    }
                  </button>
                </Magnetic>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

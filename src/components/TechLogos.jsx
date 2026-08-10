'use client';

import React from 'react';

// Authentic Official SVG Brand Logos for all Technologies
export function GetTechLogo({ name = '', className = "w-5 h-5" }) {
  const lower = name.toLowerCase();

  // n8n
  if (lower.includes('n8n')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M18 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 23a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="#FF6D5A" />
        <path d="M6 4h12M12 4v16" stroke="#FF6D5A" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // LangChain
  if (lower.includes('langchain')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#1C3C3C" />
        <path d="M8 12l3 3 5-6" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Langflow
  if (lower.includes('langflow')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#0F172A" />
        <path d="M6 12h12M12 6v12" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#A855F7" />
      </svg>
    );
  }

  // Google Colab / Colab
  if (lower.includes('colab')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#F9AB00" d="M16.5 6a4.5 4.5 0 0 0-3.2 1.3L12 8.6l-1.3-1.3A4.5 4.5 0 1 0 4.3 13.7L12 21.4l7.7-7.7A4.5 4.5 0 0 0 16.5 6z" />
        <path fill="#E37400" d="M12 8.6L7.5 13.1a4.5 4.5 0 0 0 6.4 0L12 8.6z" />
      </svg>
    );
  }

  // Supabase
  if (lower.includes('supabase')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#3ECF8E" d="M13.3 2.1l-10 11.9c-.4.5-.1 1.2.6 1.2h7.3l-1.5 6.7c-.2.9 1 1.4 1.6.7l10-11.9c.4-.5.1-1.2-.6-1.2h-7.3l1.5-6.7c.2-.9-1-1.4-1.6-.7z" />
      </svg>
    );
  }

  // Next.js
  if (lower.includes('next')) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path d="M149.508 157.52L69.142 54H54v71.97h12.114V72.637l68.22 88.756c3.785-1.258 7.41-2.8 10.874-4.593z" fill="url(#next_grad)" />
        <rect x="115" y="54" width="12" height="72" fill="#FFFFFF" />
        <defs>
          <linearGradient id="next_grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // React Native & React
  if (lower.includes('react')) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348">
        <circle r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // TypeScript
  if (lower.includes('typescript') || lower === 'ts') {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="16" fill="#3178C6" />
        <path fill="#FFFFFF" d="M115.5 103.5c-2.5 4.3-7.8 8.1-16 8.1-14.8 0-24.8-10-24.8-24.8 0-14.8 10-24.8 24.8-24.8 8.2 0 13.5 3.8 16 8.1l-10.8 6.9c-1.5-2.5-3.5-4-5.2-4-5.5 0-9.2 4.5-9.2 13.8 0 9.3 3.7 13.8 9.2 13.8 1.7 0 3.7-1.5 5.2-4l10.8 6.9zM42.5 62h15.5v53.5H42.5V62zM32 46.5h36.5V59H32V46.5z" />
      </svg>
    );
  }

  // Tailwind CSS
  if (lower.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 6C9 6 7.2 7.5 6.6 10.5C7.8 8.7 9.3 8.1 11.1 8.7C12.4 9.1 13.3 10.1 14.4 11.2C16.1 12.9 18.1 15 22.5 15C25.5 15 27.3 13.5 27.9 10.5C26.7 12.3 25.2 12.9 23.4 12.3C22.1 11.9 21.2 10.9 20.1 9.8C18.4 8.1 16.4 6 12 6Z" fill="#38BDF8" />
        <path d="M6.6 15C3.6 15 1.8 16.5 1.2 19.5C2.4 17.7 3.9 17.1 5.7 17.7C7 18.1 7.9 19.1 9 20.2C10.7 21.9 12.7 24 17.1 24C20.1 24 21.9 22.5 22.5 19.5C21.3 21.3 19.8 21.9 18 21.3C16.7 20.9 15.8 19.9 14.7 18.8C13 17.1 11 15 6.6 15Z" fill="#38BDF8" />
      </svg>
    );
  }

  // Vite
  if (lower.includes('vite')) {
    return (
      <svg className={className} viewBox="0 0 256 257" fill="none">
        <path d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.524 6.524 0 002.326 0L248.318 28.27c5.457-.975 9.574 4.857 6.835 9.668z" fill="url(#vite_a)" />
        <path d="M185.432 0L96.44 163.633a3.262 3.262 0 01-5.748-.119L57.514 96.536a3.262 3.262 0 012.778-4.717l47.784-2.884a3.262 3.262 0 002.946-2.12L124.966 52.8a3.262 3.262 0 014.288-1.79l56.178 24.36a3.262 3.262 0 010 6.002z" fill="url(#vite_b)" />
        <defs>
          <linearGradient id="vite_a" x1="6" y1="20" x2="240" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="vite_b" x1="120" y1="10" x2="180" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFEA83" />
            <stop offset="1" stopColor="#FFDD35" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // JavaScript
  if (lower.includes('javascript') || lower === 'js') {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="16" fill="#F7DF1E" />
        <path fill="#000000" d="M67.312 103.94c3.08 5.17 7.74 8.79 16.03 8.79 6.84 0 11.23-3.41 11.23-8.15 0-5.71-4.57-7.74-12.24-11.07l-4.23-1.83c-12.16-5.23-20.2-11.85-20.2-25.04 0-12.56 9.6-21.75 24.58-21.75 10.74 0 18.57 3.84 23.77 12.98l-10.74 6.88c-2.33-4.11-5.5-6.02-12.39-6.02-4.57 0-8.23 2.87-8.23 6.64 0 4.6 3.08 6.57 10.02 9.54l4.23 1.83c14.25 6.13 22.7 12.44 22.7 25.82 0 14.86-11.45 23.46-27.79 23.46-15.65 0-25.1-7.74-29.84-17.39l13.1-6.9zm-38.31.25c2.5 4.33 5.83 8.04 11.96 8.04 6.08 0 9.96-3.08 9.96-10.96V45.8h15.42v55.54c0 16.29-9.54 23.54-24.5 23.54-12.98 0-21.08-6.62-25.33-14.79l12.49-6.9z" />
      </svg>
    );
  }

  // Node.js
  if (lower.includes('node')) {
    return (
      <svg className={className} viewBox="0 0 256 289">
        <path fill="#5FA04E" d="M128 0L9.4 68.4v136.9L128 273.7l118.6-68.4V68.4L128 0z" />
        <path fill="#FFFFFF" d="M128 40L35 93.6v107.2L128 254.4l93-53.6V93.6L128 40z" />
      </svg>
    );
  }

  // MongoDB
  if (lower.includes('mongo')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#47A248" d="M12 0s-7 7-7 13.5C5 18 8 24 12 24s7-6 7-10.5C19 7 12 0 12 0z" />
      </svg>
    );
  }

  // Firebase
  if (lower.includes('firebase')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#FFCA28" d="M3.8 17.7l5.6-10.7 3.1 5.9z" />
        <path fill="#FFA000" d="M12.5 12.9l2.8-5.3 4.9 10.1z" />
        <path fill="#F57C00" d="M3.8 17.7l8.7 4.9 7.7-4.9-4.9-10.1-2.8 5.3-3.1-5.9z" />
        <path fill="#FFCA28" d="M12.5 2.5l2.2 4.4-2.2 4.2-2.2-4.2z" />
      </svg>
    );
  }

  // Google Gemini
  if (lower.includes('gemini') || lower.includes('google')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="url(#gemini_grad)" d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
        <defs>
          <linearGradient id="gemini_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1A73E8" />
            <stop offset="0.5" stopColor="#8AB4F8" />
            <stop offset="1" stopColor="#C58AF9" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // OpenAI GPT-4
  if (lower.includes('openai') || lower.includes('gpt')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#10A37F">
        <path d="M22.28 11.2c-.22-1.44-.97-2.7-2.1-3.56a6.18 6.18 0 0 0-4.14-1.5c-.32 0-.64.03-.96.08a6.18 6.18 0 0 0-5.18-2.62c-1.6 0-3.1.62-4.23 1.74A6.16 6.16 0 0 0 4.1 9.47c-.96.48-1.74 1.25-2.22 2.22a6.22 6.22 0 0 0 .34 6.28c.72 1.1 1.76 1.9 2.98 2.28a6.18 6.18 0 0 0 4.14 1.5c.32 0 .64-.03.96-.08a6.18 6.18 0 0 0 5.18 2.62c1.6 0 3.1-.62 4.23-1.74a6.16 6.16 0 0 0 1.57-4.12c.96-.48 1.74-1.25 2.22-2.22a6.22 6.22 0 0 0-.34-6.28z" />
      </svg>
    );
  }

  // Python
  if (lower.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#3776AB" d="M62.6 0c-18.7 0-17.5 8.1-17.5 8.1l.1 8.4h17.9v2.5H23.9s-8.4-.9-8.4 17.7c0 18.6 7.4 18 7.4 18h4.4v-6.2c0-8.9 7.7-8.9 7.7-8.9h26.4s7.5.1 7.5-7.3V8.1S79.8 0 62.6 0z" />
        <path fill="#FFD43B" d="M65.4 128c18.7 0 17.5-8.1 17.5-8.1l-.1-8.4H64.9V109h39.2s8.4.9 8.4-17.7c0-18.6-7.4-18-7.4-18h-4.4v6.2c0 8.9-7.7 8.9-7.7 8.9H66.6s-7.5-.1-7.5 7.3v16.4s.9 8.1 16.3 8.1z" />
      </svg>
    );
  }

  // TensorFlow
  if (lower.includes('tensorflow')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#FF6F00" d="M12 0L2 6v12l4-2.4V8.4L12 12l6-3.6v7.2l4 2.4V6L12 0z" />
      </svg>
    );
  }

  // PyTorch
  if (lower.includes('pytorch')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#EE4C2C" d="M12 0L2 12l10 12 10-12L12 0zm0 4.5l6.5 7.5L12 19.5 5.5 12 12 4.5z" />
      </svg>
    );
  }

  // Pandas
  if (lower.includes('pandas')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#150458" />
        <path fill="#E70488" d="M7 6h3v12H7V6zm7 0h3v12h-3V6z" />
      </svg>
    );
  }

  // Vercel
  if (lower.includes('vercel')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#FFFFFF" d="M12 1L24 22H0L12 1z" />
      </svg>
    );
  }

  // GitHub Actions
  if (lower.includes('github') || lower.includes('actions')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }

  // Docker
  if (lower.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#2496ED" d="M13 3h3v3h-3V3zm-4 0h3v3H9V3zm-4 0h3v3H5V3zm-4 4h3v3H1V7zm4 0h3v3H5V7zm4 0h3v3H9V7zm4 0h3v3h-3V7zm4 0h3v3h-3V7zM1 11h3v3H1v-3zm4 0h3v3H5v-3zm4 0h3v3H9v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3z" />
      </svg>
    );
  }

  // Git
  if (lower === 'git') {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#F05032" d="M23.5 10.9L13.1.5c-.7-.7-1.8-.7-2.5 0L8.2 2.9l3.2 3.2c.8-.3 1.8-.1 2.3.5.6.6.7 1.6.3 2.3l3.1 3.1c.8-.3 1.8-.1 2.3.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.6-.6-.7-1.6-.3-2.3L13.5 9c-.3.1-.6.1-.9.1-.4 0-.8-.1-1.1-.3l-3.2 3.2v6.6l-3.8-3.8V9.1L2.2 6.8c-.7-.7-.7-1.8 0-2.5L10.6.5c.7-.7 1.8-.7 2.5 0l10.4 10.4c.7.7.7 1.8 0 2.5l-3.2 3.2z" />
      </svg>
    );
  }

  // Linux
  if (lower.includes('linux')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#FCC624" d="M12 2C9 2 7 5 7 9v4c0 3 1 6 3 8 1 1 1 1 2 1s1 0 2-1c2-2 3-5 3-8V9c0-4-2-7-5-7z" />
        <circle cx="10" cy="8" r="1.5" fill="#000" />
        <circle cx="14" cy="8" r="1.5" fill="#000" />
        <path fill="#E95420" d="M10 11c1 1 3 1 4 0v1c-1 1-3 1-4 0v-1z" />
      </svg>
    );
  }

  // Default Code Icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

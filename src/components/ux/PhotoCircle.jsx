'use client';

export default function PhotoCircle({ src = "/images/profile/Profile Pic Without BG.png", alt = "Mahmud Hasan Ratul" }) {
  const imagePath = src || "/images/profile/Profile Pic Without BG.png";

  return (
    <div className="relative inline-flex items-center justify-center group select-none">
      {/* Pure Backgroundless Profile Picture from public/images/profile/Profile Pic Without BG.png */}
      <div 
        className="relative flex items-center justify-center overflow-visible"
        style={{
          width: 'clamp(8rem, 18vw, 18rem)',
          height: 'clamp(8rem, 18vw, 18rem)',
        }}
      >
        <img
          src={imagePath}
          alt={alt}
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain object-center scale-105 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

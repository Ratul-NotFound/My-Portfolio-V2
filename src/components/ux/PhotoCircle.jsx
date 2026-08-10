'use client';

export default function PhotoCircle({ src = "/images/profile/Profile Pic Without BG.png", alt = "Mahmud Hasan Ratul" }) {
  const imagePath = src || "/images/profile/Profile Pic Without BG.png";

  return (
    <div className="relative inline-flex items-center justify-center group select-none">
      {/* Pure Backgroundless Profile Picture from public/images/profile/Profile Pic Without BG.png */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center overflow-visible">
        <img
          src={imagePath}
          alt={alt}
          className="w-full h-full object-contain object-center scale-105 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

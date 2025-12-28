import { memo } from "react";

export const LogoText = memo(({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ minWidth: '180px' }}>
      <span 
        className="text-2xl md:text-3xl font-extrabold tracking-wider"
        style={{
          background: 'linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block',
        }}
      >
        PLAGE
      </span>
      <span 
        className="text-lg md:text-xl font-semibold tracking-wide"
        style={{
          color: '#64748b',
        }}
      >
        STORE
      </span>
    </div>
  );
});

LogoText.displayName = "LogoText";


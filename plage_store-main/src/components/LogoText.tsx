import { memo } from "react";

export const LogoText = memo(({ className = "" }: { className?: string }) => {
  return (
    <div 
      className={`flex items-center gap-3 ${className}`} 
      style={{ 
        minWidth: '180px',
        visibility: 'visible',
        display: 'flex',
      }}
    >
      <span 
        className="text-2xl md:text-3xl font-extrabold tracking-wider"
        style={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block',
          lineHeight: '1.2',
        }}
      >
        PLAGE
      </span>
      <span 
        className="text-lg md:text-xl font-semibold tracking-wide"
        style={{
          color: '#64748b',
          lineHeight: '1.2',
        }}
      >
        STORE
      </span>
    </div>
  );
});

LogoText.displayName = "LogoText";


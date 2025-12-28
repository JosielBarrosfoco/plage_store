import { memo, useId } from "react";

export const Logo = memo(({ className = "h-8 md:h-10 w-auto" }: { className?: string }) => {
  const id = useId();
  const plageGradientId = `plageGradient-${id}`;
  const storeGradientId = `storeGradient-${id}`;
  
  return (
    <svg 
      width="200" 
      height="50" 
      viewBox="0 0 200 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="PLAGE STORE"
    >
      <defs>
        <linearGradient id={plageGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id={storeGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#64748b", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#94a3b8", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* PLAGE - Destaque principal */}
      <text 
        x="0" 
        y="32" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        fontSize="32" 
        fontWeight="800" 
        fill={`url(#${plageGradientId})`}
        letterSpacing="2"
      >
        PLAGE
      </text>
      
      {/* STORE - Complemento harmonioso, posicionado após PLAGE */}
      <text 
        x="125" 
        y="32" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        fontSize="20" 
        fontWeight="600" 
        fill={`url(#${storeGradientId})`}
        letterSpacing="1.5"
      >
        STORE
      </text>
      
      {/* Linha decorativa elegante */}
      <line x1="0" y1="36" x2="120" y2="36" stroke={`url(#${plageGradientId})`} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="122" cy="36" r="2" fill={`url(#${plageGradientId})`}/>
    </svg>
  );
});

Logo.displayName = "Logo";


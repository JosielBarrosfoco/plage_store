import { memo } from "react";

export const LogoText = memo(({ className = "h-8 md:h-10" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span 
        className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-wider"
        style={{
          backgroundImage: 'linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        PLAGE
      </span>
      <span className="text-lg md:text-xl font-semibold text-slate-500 tracking-wide">
        STORE
      </span>
      <div className="h-0.5 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
    </div>
  );
});

LogoText.displayName = "LogoText";


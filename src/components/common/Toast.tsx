import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { activeToast, hideToast } = useApp();

  if (!activeToast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#38bdf8] shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#ef4444] shrink-0" />,
  };

  const borders = {
    success: 'border-[#10b981]/40 bg-[#042018]',
    info: 'border-[#38bdf8]/40 bg-[#031c26]',
    warning: 'border-[#f59e0b]/40 bg-[#261904]',
    error: 'border-[#ef4444]/40 bg-[#260505]',
  };

  return (
    <div
      id="tethra-global-toast"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${borders[activeToast.type]}`}
      >
        {icons[activeToast.type]}
        <div className="flex-1 pr-2">
          <h4 className="text-sm font-semibold text-white">{activeToast.title}</h4>
          <p className="text-xs text-[#a0c4b8] mt-0.5 leading-relaxed">{activeToast.message}</p>
        </div>
        <button
          onClick={hideToast}
          className="text-white/60 hover:text-white transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

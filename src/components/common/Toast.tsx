import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useProfile();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-zinc-300" />;
        let borderColor = 'border-border';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
          borderColor = 'border-emerald-500/20';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;
          borderColor = 'border-amber-500/20';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-red-400" />;
          borderColor = 'border-red-500/20';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-charcoal/95 backdrop-blur-md border ${borderColor} shadow-modal transition-all duration-200 animate-in slide-in-from-bottom-3`}
          >
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-primary">{toast.title}</h4>
              {toast.message && (
                <p className="text-[11px] text-primary-dim mt-0.5 leading-relaxed break-words">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 p-1 rounded-md text-primary-dim hover:text-primary hover:bg-raised transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};


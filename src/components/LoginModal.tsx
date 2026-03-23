import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Zap, User } from 'lucide-react';

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showPw, setShowPw] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-md rounded-lg border bg-card p-8 card-shadow animate-fade-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 justify-center">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Auto<span className="text-primary">Ops</span></span>
        </div>
        <h2 className="text-center text-lg font-semibold mb-6">Sign in to AutoOps</h2>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg border bg-background px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-lg border bg-background px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
            Sign In
          </button>

          <button className="w-full rounded-lg border py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition flex items-center justify-center gap-2">
            <User className="h-4 w-4" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-muted-foreground">
            <button className="text-primary hover:underline">Forgot password?</button>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordToggle?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({ showPasswordToggle, type, className, ...props }) => {
  const [show, setShow] = useState(false);
  const inputType = showPasswordToggle ? (show ? 'text' : 'password') : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        className={`w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition placeholder:text-muted-foreground ${className ?? ''}`}
        {...props}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
};

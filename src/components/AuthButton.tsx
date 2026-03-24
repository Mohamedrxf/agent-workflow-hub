import React from "react";
import { Loader2 } from "lucide-react";

interface AuthButtonProps {
  label: string;
  onClick: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "outline";
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  onClick,
  loading,
  disabled,
  variant = "primary",
  icon,
  className,
  type = "button",
}) => {
  const base =
    "w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:opacity-90"
      : "border border-border text-foreground hover:bg-secondary";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${base} ${styles} ${className ?? ""}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {label}
    </button>
  );
};

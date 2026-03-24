import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  subMessage?: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  subMessage,
  type,
  onClose,
  duration = 4000,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in
    const showTimer = setTimeout(() => setVisible(true), 10);

    // Auto-close
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400); // wait for slide-out animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const isSuccess = type === "success";

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(110%); opacity: 0; }
        }
        .toast-enter {
          animation: slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .toast-exit {
          animation: slideOut 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .toast-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          border-radius: 0 0 12px 12px;
          animation: progress ${duration}ms linear forwards;
        }
        @keyframes progress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>

      <div
        className={visible ? "toast-enter" : "toast-exit"}
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 9999,
          minWidth: "300px",
          maxWidth: "380px",
          backgroundColor: isSuccess ? "#0f2e1a" : "#2e0f0f",
          border: `1px solid ${isSuccess ? "#22c55e" : "#ef4444"}`,
          borderRadius: "12px",
          padding: "16px 20px",
          boxShadow: `0 8px 32px ${isSuccess ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          overflow: "hidden",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: isSuccess
              ? "rgba(34,197,94,0.15)"
              : "rgba(239,68,68,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "2px",
          }}
        >
          <span style={{ fontSize: "14px" }}>{isSuccess ? "✓" : "✕"}</span>
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 600,
              color: isSuccess ? "#22c55e" : "#ef4444",
              lineHeight: "1.4",
            }}
          >
            {message}
          </p>
          {subMessage && (
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "13px",
                color: isSuccess ? "#86efac" : "#fca5a5",
                lineHeight: "1.4",
              }}
            >
              {subMessage}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 400);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: isSuccess ? "#4ade80" : "#f87171",
            fontSize: "16px",
            padding: "0",
            lineHeight: 1,
            flexShrink: 0,
            opacity: 0.7,
          }}
        >
          ×
        </button>

        {/* Progress bar */}
        <div
          className="toast-progress"
          style={{
            backgroundColor: isSuccess ? "#22c55e" : "#ef4444",
          }}
        />
      </div>
    </>
  );
}

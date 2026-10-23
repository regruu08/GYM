"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "info" | "error";
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#11161c]/95 border border-[#756247]/40 text-[#f6f4ef] shadow-2xl backdrop-blur-xl animate-fade-up">
      {type === "success" && (
        <CheckCircle2 className="w-5 h-5 text-[#c6af87] shrink-0" />
      )}
      {type === "error" && (
        <AlertCircle className="w-5 h-5 text-[#e7d7b8] shrink-0" />
      )}
      <span className="text-xs sm:text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-[#a3adb7] hover:text-[#dce3e7] hover:bg-white/10"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

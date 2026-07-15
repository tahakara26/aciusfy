"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const ease = [0.16, 1, 0.3, 1] as const;

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  noScaleAnimation?: boolean;
  title?: string;
}

export function AnimatedModal({
  isOpen,
  onClose,
  children,
  className,
  noScaleAnimation = false,
  title,
}: AnimatedModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useOutsideClick(modalRef, onClose);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          className="fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050810]/82 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={modalRef}
            initial={noScaleAnimation || reduceMotion ? { opacity: 0, y: 16 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={noScaleAnimation || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={noScaleAnimation || reduceMotion ? { opacity: 0, y: 16 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease }}
            className={cn(
              "relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-[color:var(--hairline-strong)] [background:linear-gradient(165deg,rgba(19,29,46,0.97),rgba(9,14,24,0.97))] shadow-[0_32px_80px_rgba(0,0,0,0.55)]",
              className,
            )}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[color:var(--hairline)] px-5 py-4 sm:px-6">
              {title ? (
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{title}</p>
              ) : (
                <span aria-hidden />
              )}
              <button
                type="button"
                onClick={onClose}
                className="ml-auto rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:border-white/16 hover:bg-white/[0.04] hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

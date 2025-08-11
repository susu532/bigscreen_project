// Lightweight external notifier bridge so non-React modules (e.g., API layer)
// can trigger toasts without importing React hooks.

export type AlertLevel = 'success' | 'info' | 'warning' | 'error';

type Options = {
  durationMs?: number;
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' | 'center' };
};

type NotifyFn = ((message: string, options?: Options & { severity?: AlertLevel }) => void) & {
  success: (message: string, options?: Options) => void;
  info: (message: string, options?: Options) => void;
  warning: (message: string, options?: Options) => void;
  error: (message: string, options?: Options) => void;
  promise: <T>(p: Promise<T>, labels: { loading?: string; success?: string; error?: string }, options?: Options) => Promise<T>;
};

let current: NotifyFn | null = null;

export function setNotifier(fn: NotifyFn | null) {
  current = fn;
}

export const notify: NotifyFn = Object.assign(
  (message: string, options?: Options & { severity?: AlertLevel }) => {
    current?.(message, options);
  },
  {
    success: (m: string, o?: Options) => current?.success(m, o),
    info: (m: string, o?: Options) => current?.info(m, o),
    warning: (m: string, o?: Options) => current?.warning(m, o),
    error: (m: string, o?: Options) => current?.error(m, o),
    promise: async <T,>(p: Promise<T>, labels: { loading?: string; success?: string; error?: string }, options?: Options) => {
      if (current?.promise) return current.promise(p, labels, options);
      return p;
    },
  }
);



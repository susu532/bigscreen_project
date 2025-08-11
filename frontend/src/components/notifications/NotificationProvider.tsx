import { createContext, useCallback, useContext, useMemo, useState, PropsWithChildren, useEffect } from 'react';
import { Alert, Snackbar, Box, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { SlideProps } from '@mui/material/Slide';
import type { SnackbarOrigin } from '@mui/material/Snackbar';
import { setNotifier } from './notifier';
import type { AlertColor } from '@mui/material/Alert';

type Notification = {
  id: number;
  message: string;
  severity?: AlertColor;
  durationMs?: number;
  count?: number;
  anchorOrigin?: SnackbarOrigin;
};

type NotifyBaseOptions = { severity?: AlertColor; durationMs?: number; anchorOrigin?: SnackbarOrigin };
type NotifyFn = (message: string, options?: NotifyBaseOptions) => void;

type NotificationContextType = {
  notify: NotifyFn & {
    success: NotifyFn;
    info: NotifyFn;
    warning: NotifyFn;
    error: NotifyFn;
    promise: <T>(p: Promise<T>, labels: { loading?: string; success?: string; error?: string }, options?: NotifyBaseOptions) => Promise<T>;
  };
  close: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

function SlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function NotificationProvider({ children }: PropsWithChildren) {
  const [queue, setQueue] = useState<Notification[]>([]);
  const [counter, setCounter] = useState(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const close = useCallback((id: number) => {
    setQueue((q) => q.filter((n) => n.id !== id));
  }, []);

  const baseNotify: NotifyFn = useCallback((message, options) => {
    setQueue((q) => {
      // de-duplicate recent same message/severity
      const severity = options?.severity || 'info';
      const existingIndex = [...q].reverse().findIndex((n) => n.message === message && (n.severity || 'info') === severity);
      if (existingIndex !== -1) {
        const idx = q.length - 1 - existingIndex;
        const existing = q[idx];
        const updated: Notification = {
          ...existing,
          id: counter, // bump to refresh timer
          count: (existing.count || 1) + 1,
          durationMs: options?.durationMs ?? existing.durationMs ?? 3500,
          anchorOrigin: options?.anchorOrigin || existing.anchorOrigin,
        };
        const clone = q.slice();
        clone[idx] = updated;
        return clone.slice(-4);
      }
      return [
        ...q,
        {
          id: counter,
          message,
          severity,
          durationMs: options?.durationMs ?? 3500,
          count: 1,
          anchorOrigin: options?.anchorOrigin,
        },
      ].slice(-4);
    });
    setCounter((c) => c + 1);
  }, [counter]);

  const notify = useMemo(() => {
    const fn = baseNotify as NotificationContextType['notify'];
    fn.success = (m, o) => baseNotify(m, { ...o, severity: 'success' });
    fn.info = (m, o) => baseNotify(m, { ...o, severity: 'info' });
    fn.warning = (m, o) => baseNotify(m, { ...o, severity: 'warning' });
    fn.error = (m, o) => baseNotify(m, { ...o, severity: 'error' });
    fn.promise = async (p, labels, options) => {
      const loadingId = counter;
      baseNotify(labels.loading || 'Working...', { ...options, severity: 'info', durationMs: undefined });
      try {
        const result = await p;
        setQueue((q) => q.filter((n) => n.id !== loadingId));
        baseNotify(labels.success || 'Done', { ...options, severity: 'success' });
        return result;
      } catch (err) {
        setQueue((q) => q.filter((n) => n.id !== loadingId));
        baseNotify(labels.error || 'Something went wrong', { ...options, severity: 'error' });
        throw err;
      }
    };
    return fn;
  }, [baseNotify]);

  const value = useMemo<NotificationContextType>(() => ({ notify, close }), [notify, close]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: (t) => t.zIndex.snackbar }}>
        {queue.slice(-4).map((n) => (
          <Snackbar
            key={n.id}
            open
            anchorOrigin={n.anchorOrigin || { vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={hoveredId === n.id ? undefined : n.durationMs}
            onClose={() => close(n.id)}
            TransitionComponent={SlideLeft}
            sx={{ mb: 1 }}
          >
            <Alert
              variant="filled"
              severity={n.severity}
              onClose={() => close(n.id)}
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId((id) => (id === n.id ? null : id))}
              sx={{ boxShadow: 3, position: 'relative', overflow: 'hidden', pr: n.count && n.count > 1 ? 6 : 2 }}
            >
              <Typography component="span" sx={{ mr: 1 }}>{n.message}</Typography>
              {n.count && n.count > 1 && (
                <Box component="span" sx={{ ml: 1, px: 0.75, py: 0.25, borderRadius: 1, bgcolor: 'rgba(0,0,0,0.2)', fontWeight: 700 }}>x{n.count}</Box>
              )}
              {typeof n.durationMs === 'number' && (
                <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, bgcolor: 'rgba(255,255,255,0.35)' }}>
                  <Box
                    sx={{
                      height: 2,
                      width: '100%',
                      bgcolor: 'rgba(255,255,255,0.85)',
                      animation: 'shrink linear forwards',
                      animationDuration: `${n.durationMs}ms`,
                      '@keyframes shrink': {
                        from: { transform: 'scaleX(1)', transformOrigin: 'left' },
                        to: { transform: 'scaleX(0)', transformOrigin: 'left' },
                      },
                    }}
                  />
                </Box>
              )}
            </Alert>
          </Snackbar>
        ))}
      </Box>
    </NotificationContext.Provider>
  );
}

export function useNotify() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotify must be used within NotificationProvider');
  return ctx.notify;
}

// Bind global imperative notifier
export function NotificationBinder() {
  const notify = useNotify();
  useEffect(() => {
    setNotifier(notify as any);
    return () => setNotifier(null);
  }, [notify]);
  return null;
}



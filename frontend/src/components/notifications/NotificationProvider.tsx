import { createContext, useCallback, useContext, useMemo, useState, PropsWithChildren } from 'react';
import { Alert, Snackbar, Box } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { SlideProps } from '@mui/material/Slide';
import type { AlertColor } from '@mui/material/Alert';

type Notification = {
  id: number;
  message: string;
  severity?: AlertColor;
  durationMs?: number;
};

type NotifyFn = (message: string, options?: { severity?: AlertColor; durationMs?: number }) => void;

type NotificationContextType = {
  notify: NotifyFn & {
    success: NotifyFn;
    info: NotifyFn;
    warning: NotifyFn;
    error: NotifyFn;
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

  const close = useCallback((id: number) => {
    setQueue((q) => q.filter((n) => n.id !== id));
  }, []);

  const baseNotify: NotifyFn = useCallback((message, options) => {
    setQueue((q) => [
      ...q,
      { id: counter, message, severity: options?.severity || 'info', durationMs: options?.durationMs ?? 3500 },
    ]);
    setCounter((c) => c + 1);
  }, [counter]);

  const notify = useMemo(() => {
    const fn = baseNotify as NotificationContextType['notify'];
    fn.success = (m, o) => baseNotify(m, { ...o, severity: 'success' });
    fn.info = (m, o) => baseNotify(m, { ...o, severity: 'info' });
    fn.warning = (m, o) => baseNotify(m, { ...o, severity: 'warning' });
    fn.error = (m, o) => baseNotify(m, { ...o, severity: 'error' });
    return fn;
  }, [baseNotify]);

  const value = useMemo<NotificationContextType>(() => ({ notify, close }), [notify, close]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: (t) => t.zIndex.snackbar }}>
        {queue.slice(-3).map((n) => (
          <Snackbar
            key={n.id}
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={n.durationMs}
            onClose={() => close(n.id)}
            TransitionComponent={SlideLeft}
            sx={{ mb: 1 }}
          >
            <Alert variant="filled" severity={n.severity} onClose={() => close(n.id)} sx={{ boxShadow: 3 }}>
              {n.message}
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



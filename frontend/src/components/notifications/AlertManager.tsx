import { Alert, AlertColor, Collapse, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PropsWithChildren, useState } from 'react';

type InlineAlertProps = PropsWithChildren<{
  severity?: AlertColor;
  defaultOpen?: boolean;
  onClose?: () => void;
}>;

export function InlineAlert({ severity = 'info', defaultOpen = true, onClose, children }: InlineAlertProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapse in={open}>
      <Alert
        variant="outlined"
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => { setOpen(false); onClose?.(); }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ borderRadius: 2 }}
      >
        {children}
      </Alert>
    </Collapse>
  );
}

type AlertStackProps = {
  items: Array<{ key: string | number; message: string; severity?: AlertColor }>;
  onDismiss?: (key: string | number) => void;
};

export function AlertStack({ items, onDismiss }: AlertStackProps) {
  return (
    <Stack spacing={1}>
      {items.map((i) => (
        <InlineAlert key={i.key} severity={i.severity} onClose={() => onDismiss?.(i.key)}>
          {i.message}
        </InlineAlert>
      ))}
    </Stack>
  );
}



import { Button, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import { styled, keyframes } from '@mui/material/styles';

const pulse = keyframes`
  0%, 100% { transform: translateZ(0) scale(1); box-shadow: 0 0 20px rgba(255,20,147,0.35), 0 0 40px rgba(153,50,204,0.25); }
  50% { transform: translateZ(10px) scale(1.04); box-shadow: 0 0 35px rgba(255,20,147,0.6), 0 0 80px rgba(153,50,204,0.4); }
`;

const ringSpin = keyframes`
  to { transform: rotate(360deg); }
`;

const FinalizeRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  perspective: '1000px',
  transformStyle: 'preserve-3d',
  '& .ring': {
    position: 'absolute',
    inset: -6,
    borderRadius: 20,
    pointerEvents: 'none',
    background: `conic-gradient(from 0deg,
      ${theme.palette.primary.main},
      ${theme.palette.secondary.main},
      ${theme.palette.primary.light},
      ${theme.palette.secondary.light},
      ${theme.palette.primary.main}
    )`,
    filter: 'blur(6px) saturate(1.2)',
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    maskComposite: 'exclude',
    WebkitMaskComposite: 'xor',
    padding: 6,
    animation: `${ringSpin} 4s linear infinite`,
    opacity: 0.6,
  }
}));

const FancyButton = styled(Button)<{ loading?: boolean }>(({ theme, loading }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: '#fff',
  fontWeight: 800,
  letterSpacing: 0.4,
  borderRadius: 18,
  padding: '12px 28px',
  textTransform: 'none',
  transformStyle: 'preserve-3d',
  animation: loading ? 'none' : `${pulse} 3s ease-in-out infinite`,
  boxShadow: `0 10px 24px rgba(0,0,0,0.35), 0 0 24px ${theme.palette.primary.main}55`,
  '&:hover': {
    transform: 'translateY(-2px) scale(1.03)',
    boxShadow: `0 14px 28px rgba(0,0,0,0.4), 0 0 36px ${theme.palette.primary.main}88`,
  },
  '&:disabled': {
    opacity: 0.7,
    boxShadow: 'none',
  }
}));

type FinalizeButtonProps = Omit<ButtonProps, 'variant' | 'color'> & {
  loading?: boolean;
  label?: string;
  loadingLabel?: string;
};

export default function FinalizeButton({ loading, label = 'Finalize', loadingLabel = 'Submitting...', ...props }: FinalizeButtonProps) {
  return (
    <FinalizeRoot>
      {!loading && <div className="ring" />}
      <FancyButton loading={loading} disabled={loading || props.disabled} {...props}>
        {loading ? (
          <>
            <CircularProgress size={18} sx={{ color: '#fff', mr: 1 }} />
            {loadingLabel}
          </>
        ) : (
          label
        )}
      </FancyButton>
    </FinalizeRoot>
  );
}



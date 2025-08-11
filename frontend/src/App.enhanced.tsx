import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Stack, Typography } from '@mui/material';
import theme from './theme';

// Enhanced Pages
import SurveyPage from './pages/SurveyPage';
import ResponsePage from './pages/ResponsePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminQuestionsPage from './pages/admin/AdminQuestionsPage';
import AdminResponsesPage from './pages/admin/AdminResponsesPage';

// Enhanced Components
import FuturisticTitle from './components/FuturisticTitle';
import NeuroCard from './components/NeuroCard';
import CyberBackground from './components/CyberBackground';
import AnimatedContainer from './components/animations/AnimatedContainer';
import QuantumButton from './components/QuantumButton';
import GlowingTypography from './components/GlowingTypography';
import { styled } from '@mui/material/styles';

const MainContainer = styled(Box)(() => ({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
}));

const PreviewSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  position: 'relative',
  borderBottom: '2px solid rgba(255, 20, 147, 0.3)',
  marginBottom: theme.spacing(4),
}));

const NavigationCard = styled(NeuroCard)(({ theme }) => ({
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 1000,
  padding: theme.spacing(2),
  minWidth: '200px',
  background: `
    linear-gradient(135deg, 
      rgba(15, 15, 25, 0.95) 0%,
      rgba(25, 15, 35, 0.92) 100%
    )
  `,
  backdropFilter: 'blur(20px)',
}));

/**
 * Enhanced App Preview - Next-Gen Animated UI Showcase
 * Features all reformatted pages with futuristic design elements
 */
export default function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContainer>
        <CyberBackground />
        
        <NavigationCard>
          <GlowingTypography variant="h6" glow="primary" sx={{ mb: 2 }}>
            🚀 Navigation
          </GlowingTypography>
          <Stack spacing={1}>
            {[
              { id: 'survey', label: 'Survey Page' },
              { id: 'response', label: 'Response Page' },
              { id: 'admin-login', label: 'Admin Login' },
              { id: 'admin-home', label: 'Admin Dashboard' },
              { id: 'admin-questions', label: 'Questions' },
              { id: 'admin-responses', label: 'Responses' },
            ].map((item) => (
              <QuantumButton
                key={item.id}
                variant="outlined"
                size="small"
                onClick={() => scrollToSection(item.id)}
                sx={{ 
                  fontSize: '0.8rem',
                  py: 0.5,
                  px: 1.5,
                }}
              >
                {item.label}
              </QuantumButton>
            ))}
          </Stack>
        </NavigationCard>

        {/* Hero Section */}
        <PreviewSection>
          <Box 
            sx={{ 
              position: 'relative', 
              zIndex: 10, 
              pt: 8, 
              pb: 4,
              textAlign: 'center' 
            }}
          >
            <AnimatedContainer animationType="float" delay={0.2}>
              <FuturisticTitle 
                mainTitle="BIGSCREEN" 
                subtitle="NEXT-GEN UI" 
                description="Enhanced with futuristic animations, 3D effects, and cyberpunk aesthetics" 
              />
            </AnimatedContainer>
            
            <AnimatedContainer animationType="breathe" delay={0.8}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mt: 4,
                  color: 'text.secondary',
                  fontFamily: 'monospace',
                  textShadow: '0 0 10px rgba(255, 20, 147, 0.4)',
                }}
              >
                ✨ Featuring: Holographic Cards • Quantum Buttons • Neural Networks • Cyber Backgrounds ✨
              </Typography>
            </AnimatedContainer>
          </Box>
        </PreviewSection>

        {/* Survey Page Preview */}
        <PreviewSection id="survey">
          <SurveyPage />
        </PreviewSection>

        {/* Response Page Preview */}
        <PreviewSection id="response">
          <ResponsePage />
        </PreviewSection>

        {/* Admin Login Preview */}
        <PreviewSection id="admin-login">
          <AdminLoginPage />
        </PreviewSection>

        {/* Admin Dashboard Preview */}
        <PreviewSection id="admin-home">
          <AdminHomePage />
        </PreviewSection>

        {/* Admin Questions Preview */}
        <PreviewSection id="admin-questions">
          <AdminQuestionsPage />
        </PreviewSection>

        {/* Admin Responses Preview */}
        <PreviewSection id="admin-responses">
          <AdminResponsesPage />
        </PreviewSection>

        {/* Footer */}
        <Box 
          sx={{ 
            position: 'relative', 
            zIndex: 10, 
            py: 6, 
            textAlign: 'center' 
          }}
        >
          <AnimatedContainer animationType="shimmer">
            <GlowingTypography 
              variant="h4" 
              glow="accent" 
              intensity="high"
              sx={{ mb: 2 }}
            >
              🎯 Mission Complete
            </GlowingTypography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              All pages have been enhanced with next-generation animated UI featuring 
              virtual 3D aesthetics, responsive design, colorful pink-violet gradients, 
              radiant vibrant animations, and futuristic glowing neon colors.
            </Typography>
          </AnimatedContainer>
        </Box>
      </MainContainer>
    </ThemeProvider>
  );
}
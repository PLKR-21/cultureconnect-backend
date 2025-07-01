import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from './components/ui/toaster';
import Navigation from './components/Navigation';
import AppRoutes from './AppRoutes';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Navigation />
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4 pt-20 pb-8"
            >
              <AnimatePresence mode="wait">
                <AppRoutes />
              </AnimatePresence>
            </motion.main>
            
            {/* Background Gradients */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
              <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
              <div className="absolute bottom-0 left-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/30 opacity-20 blur-[100px]" />
              <div className="absolute right-0 top-1/2 -z-10 h-[310px] w-[310px] rounded-full bg-primary/50 opacity-20 blur-[100px]" />
            </div>
          </div>
          <Toaster />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

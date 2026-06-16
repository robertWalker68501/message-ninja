import { WallpaperProvider } from './context/WallpaperContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navigate, Route, Routes } from 'react-router';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import { useAuth } from '@clerk/react';
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      checkAuth();
      return;
    }

    clearAuth();
  }, [checkAuth, clearAuth, isLoaded, isSignedIn]);

  if (!isLoaded || (isSignedIn && isCheckingAuth)) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route
            path='/'
            element={
              isSignedIn ? (
                <ChatPage />
              ) : (
                <Navigate
                  to={'/auth'}
                  replace
                />
              )
            }
          />
          <Route
            path='/auth'
            element={
              !isSignedIn ? (
                <AuthPage />
              ) : (
                <Navigate
                  to={'/'}
                  replace
                />
              )
            }
          />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;

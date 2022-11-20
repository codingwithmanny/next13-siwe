'use client';

// Imports
// ========================================================
import React, { createContext, useContext, useState } from 'react';

// Config
// ========================================================
const AuthContext = createContext<{
  isSignedIn?: boolean;
  user?: { address: string; },
  setAuth: (values: {
    isSignedIn?: boolean;
    user?: { address: string; }
  }) => void
}>({
  isSignedIn: false,
  setAuth: (_values) => { }
});

// Hooks
// ========================================================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error(`useAuth must be used withing AuthContext`);

  return context;
};

// Providers
// ========================================================
export default function AuthProvider({ children, isSignedIn = false, user }: { children: React.ReactNode; isSignedIn?: boolean; user?: { address: string; } }) {
  // State / Props
  const [state, setState] = useState<{
    isSignedIn?: boolean; user?: { address: string; }
  }>({
    isSignedIn,
    user
  });

  // Functions
  const setAuth = (values: {
    isSignedIn?: boolean;
    user?: { address: string; }
  }) => {
    setState((x) => ({ ...x, ...values }));
  }

  // Render
  return (
    <AuthContext.Provider value={{ isSignedIn: state.isSignedIn, user: state.user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
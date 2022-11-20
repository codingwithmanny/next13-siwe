'use client';

// Imports
// ========================================================
import React from 'react';
import WagmiProvider from '../providers/wagmi';
import AuthProvider from '../providers/auth';

// Providers
// ========================================================
export function Providers({ children, isSignedIn, user }: { children: React.ReactNode; isSignedIn?: boolean; user?: { address: string; } }) {
    return (
        <WagmiProvider>
            <AuthProvider isSignedIn={isSignedIn} user={user}>
                {children}
            </AuthProvider>
        </WagmiProvider>
    );
};
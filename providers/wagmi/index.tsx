'use client';

// Imports
// ========================================================
import React from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';

// Config
// ========================================================
const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
});

// Providers
// ========================================================
export default function WagmiProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiConfig client={client}>
            {children}
        </WagmiConfig>
    );
};
'use client';

// Imports
// ========================================================
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { SiweMessage } from 'siwe';
import { useRouter } from 'next/navigation';
import ClientOnly from '../../components/ClientOnly';
import { useAuth } from '../../providers/auth';

// Page
// ========================================================
export default function AuthClient() {
    // State / Props
    const [state, setState] = useState<{
        isLoading?: boolean;
        isSignedIn?: boolean;
        nonce?: {
            expirationTime?: string;
            issuedAt?: string;
            nonce?: string;
        },
        address?: string;
        error?: Error
    }>({});

    const { address, isConnected } = useAccount();
    const { connect } = useConnect({ connector: new InjectedConnector() });
    const { disconnect } = useDisconnect();
    const { chain } = useNetwork();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();
    const { isSignedIn, setAuth } = useAuth();

    // Requests
    /**
     * 
     */
    const fetchNonce = async () => {
        try {
            const nonceRes = await fetch('/api/nonce');
            const nonce = await nonceRes.json();
            setState((x) => ({ ...x, nonce }));
        } catch (error) {
            setState((x) => ({ ...x, error: error as Error }));
        }
    };

    // Functions
    /**
     * 
     * @returns 
     */
    const signIn = async () => {
        try {
            const chainId = chain?.id
            if (!address || !chainId) return;

            setState((x) => ({ ...x, loading: true }));
            // Create SIWE message with pre-fetched nonce and sign with wallet
            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: 'Sign in with Ethereum to the app.',
                uri: window.location.origin,
                version: '1',
                chainId,
                expirationTime: state.nonce?.expirationTime,
                issuedAt: state.nonce?.expirationTime,
                nonce: state.nonce?.nonce,
            })
            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })

            // Verify signature
            const verifyRes = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, signature }),
            })
            if (!verifyRes.ok) throw new Error('Error verifying message');
            setAuth({ isSignedIn: true });
            setState((x) => ({ ...x, isSignedIn: true, loading: false }));
        } catch (error) {
            setState((x) => ({ ...x, loading: false, nonce: undefined }));
            fetchNonce();
        }
    };

    /**
     * 
     */
    const verify = async () => {
        try {
            const res = await fetch('/api/me');
            const json = await res.json();
            setState((x) => ({ ...x, address: json.address }))
        } catch (error) {
            setState((x) => ({ ...x, error: error as Error }))
        }
    };

    const profile = () => {
        push('/profile');
    };

    // Hooks
    useEffect(() => {
        setState((x) => ({ ...x, isSignedIn }));
        fetchNonce();
    }, []);

    // Render
    return <div className="p-6">
        <h1 className="text-white text-xl font-medium mb-4">Auth</h1>
        <ClientOnly>
            <div>
                {isConnected
                    ? <div>
                        <div className="block mb-4">
                            <label className="text-zinc-400 block mb-2">Wallet Connected</label>
                            <code className="bg-black bg-opacity-20 rounded p-4 block text-white">{address}</code>
                        </div>
                        <button className="h-10 mb-8 rounded-full px-6 text-white font-medium bg-blue-600" onClick={() => disconnect()}>Disconnect</button>

                        <hr className="mb-8 bg-none border-t-0 border-b border-zinc-700" />

                        {!state.isSignedIn
                            ? <button className="h-10 mb-8 rounded-full px-6 text-white font-medium bg-blue-600" onClick={signIn}>Sign-In With Ethereum</button>
                            : <div>
                                <button className="h-10 mb-8 rounded-full px-6 text-white font-medium bg-blue-600" onClick={verify}>Verify Authentication</button>
                                {state?.address
                                    ? <div className="block mb-4">
                                        <label className="text-zinc-400 block mb-2">Verified Address</label>
                                        <code className="bg-black bg-opacity-20 mb-4 rounded p-4 block text-white">{state?.address}</code>
                                        <button onClick={profile} className="h-10 leading-10 w-auto mb-8 rounded-full px-6 text-white font-medium bg-blue-600">Go To Profile</button>
                                    </div>
                                    : null}
                                <div className="block mb-4">
                                    <button
                                        className="h-10 mb-8 rounded-full px-6 text-white font-medium bg-blue-600"
                                        onClick={async () => {
                                            await fetch('/api/logout', { credentials: 'include' });
                                            setState({});
                                            setAuth({ isSignedIn: false });
                                        }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                    : <button className="h-10 rounded-full px-6 text-white font-medium bg-blue-600" onClick={() => connect()}>Connect Wallet</button>
                }
            </div>
        </ClientOnly>
    </div>
};
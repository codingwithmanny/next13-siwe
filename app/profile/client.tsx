'use client';

// Imports
// ========================================================
import { useAuth } from "../../providers/auth";
import { redirect } from 'next/navigation';

// Page
// ========================================================
export default function ProfileClient({ user }: { user?: { address: string; } }) {
    // State / Props
    const { isSignedIn, setAuth } = useAuth();

    // Redirect
    if (!isSignedIn) {
        redirect('/auth');
    }

    // Render
    return (
        <div className="p-6">
            <h1 className="text-white text-xl font-medium mb-4">Profile</h1>
            <div className="block mb-4">
                <label className="text-zinc-400 block mb-2">Account Signed In</label>
                <code className="bg-black bg-opacity-20 rounded p-4 block text-white">{JSON.stringify(user?.address)}</code>
            </div>
            <button
                className="h-10 mb-8 rounded-full px-6 text-white font-medium bg-blue-600"
                onClick={async () => {
                    await fetch('/api/logout', { credentials: 'include' });
                    setAuth({ isSignedIn: false });
                }}
            >
                Sign Out
            </button>
        </div>
    );
};

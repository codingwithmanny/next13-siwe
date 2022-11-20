// Imports
// ========================================================
import { cookies, headers } from 'next/headers';

// AuthMiddleware
// ========================================================
const AuthMiddleware = async () => {
    // State / Props
    const host = headers().get('host');
    const nextCookies = cookies();
    const cookie = nextCookies.get('siwe');
    let isSignedIn = false;
    let user: { address: string; } | undefined;

    // Requests
    if (!!cookie) {
        const res = await fetch(`http://${host}/api/me`, {
            credentials: 'include',
            headers: {
                cookie: `${cookie?.name}=${cookie.value}`
            },
            cache: 'no-store'
        });

        const json = await res.json();

        if (json?.address && json?.address?.startsWith('0x')) {
            isSignedIn = true;
            user = json;
        }
    }

    // Return
    return { isSignedIn, user };
};

// Imports
// ========================================================
export default AuthMiddleware;

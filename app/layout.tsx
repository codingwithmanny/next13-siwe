// Imports
// ========================================================
import Nav from '../components/Nav';
import { Providers } from './providers';
import AuthMiddleware from './authMiddleware';
import '../styles/globals.css';

// Layout
// ========================================================
export default async function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    // State / Props
    const { isSignedIn, user } = await AuthMiddleware();

    // State / Props
    return (
        <html lang="en">
            <body className="bg-zinc-900">
                <Providers isSignedIn={!!isSignedIn} user={user}>
                    <Nav />
                    <div>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
};
"use client";

// Imports
// ========================================================
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../providers/auth";

// Component
// ========================================================
const Nav = () => {
    // State / Props
    const pathname = usePathname();
    const { isSignedIn } = useAuth();

    // Render
    return <nav className="h-20 bg-black bg-opacity-30 px-6 flex justify-between items-center">
        <span className="text-md font-medium text-white h-10 leading-10">
            <Link href="/">Next 13 SIWE</Link>
        </span>

        <ul className="flex">
            <li className="px-4"><Link className={`${pathname === '/' ? 'text-white' : 'text-zinc-400'} hover:text-white transition-colors ease-in-out duration-200`} href="/">Home</Link></li>
            <li className="px-4"><Link className={`${pathname === '/auth' ? 'text-white' : 'text-zinc-400'} hover:text-white transition-colors ease-in-out duration-200`} href="/auth">Auth</Link></li>
            {isSignedIn ? <li className="pl-4"><Link className={`${pathname === '/profile' ? 'text-white' : 'text-zinc-400'} hover:text-white transition-colors ease-in-out duration-200`} href="/profile">Profile</Link></li> : null}
        </ul>
    </nav>;
}

// Exports
// ========================================================
export default Nav;
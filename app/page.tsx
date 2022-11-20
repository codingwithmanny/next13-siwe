// Imports
// ========================================================
import Link from 'next/link';

// Page
// ========================================================
export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-white text-xl font-medium mb-4">Home</h1>
      <p className="text-zinc-400 mb-4">A Next 13 web application demonstrating Sign-In With Ethereum.</p>
      <ul>
        <li className="mb-2"><Link className="text-blue-500 hover:text-blue-200 transition-colors ease-in-out duration-200" href="/auth">Auth Page</Link></li>
        <li className="mb-2"><Link className="text-blue-500 hover:text-blue-200 transition-colors ease-in-out duration-200" href="/profile">Profile Page</Link></li>
      </ul>
    </div>
  );
};

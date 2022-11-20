"use client";

// Imports
// ========================================================
import { useState, useEffect } from 'react';

// Component
// ========================================================
const ClientOnly = ({ children, ...delegated }: { children: React.ReactNode }) => {
    // State Props
    const [hasMounted, setHasMounted] = useState(false);

    // Hooks
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Render
    if (!hasMounted) {
        return null;
    }

    return (
        <div {...delegated}>
            {children}
        </div>
    );
};

// Exports
// ========================================================
export default ClientOnly;

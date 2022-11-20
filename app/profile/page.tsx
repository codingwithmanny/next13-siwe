// Imports
// ========================================================
import AuthMiddleware from "../authMiddleware";
import { redirect } from "next/navigation";
import ProfileClient from "./client";

// Page
// ========================================================
export default async function ProfilePage() {
    // State / Props
    const { isSignedIn, user } = await AuthMiddleware();

    // Redirect
    if (!isSignedIn) {
        redirect('/auth');
    }

    // Render
    return (<ProfileClient user={user} />);
};

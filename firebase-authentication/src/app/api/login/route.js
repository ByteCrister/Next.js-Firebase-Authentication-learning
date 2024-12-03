import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log(email);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return new Response(JSON.stringify({ user: userCredential.user }), { status: 200 });
    } catch (error) {
        let errorMessage;

        switch (error.code) {
            case "auth/invalid-email":
                errorMessage = "Invalid email format. Please check and try again.";
                break;
            case "auth/user-disabled":
                errorMessage = "This account has been disabled.";
                break;
            case "auth/user-not-found":
                errorMessage = "No account found with this email. Please sign up first.";
                break;
            case "auth/wrong-password":
                errorMessage = "Incorrect password. Please try again.";
                break;
            default:
                errorMessage = "An unexpected error occurred. Please try again.";
                break;
        }

        // Log for debugging (remove in production)
        console.error("Firebase Error:", error.code, error.message);

        return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
}
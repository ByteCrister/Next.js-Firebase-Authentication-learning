import { auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    // Ensure email is not empty
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required!" }),
        { status: 400 }
      );
    }

    // Send password reset email
    await sendPasswordResetEmail(auth, email);

    return new Response(
      JSON.stringify({ message: "Password reset email sent!" }),
      { status: 200 }
    );
  } catch (error) {
    // Log detailed error
    console.error("Error sending password reset email:", error.code, error.message);

    // Return more descriptive error
    let errorMessage = "An error occurred. Please try again.";
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "The email address is not valid.";
        break;
      case "auth/user-not-found":
        errorMessage = "No user found with this email address.";
        break;
      default:
        errorMessage = error.message;
        break;
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400 }
    );
  }
}

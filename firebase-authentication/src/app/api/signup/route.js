import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Send email verification
    await sendEmailVerification(userCredential.user);

    return new Response(
      JSON.stringify({
        user: userCredential.user,
        message: "Registration successful. Please verify your email."
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("error:", error.code, error.message);

    let errorMessage = "An unexpected error occurred. Please try again.";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "The email address is invalid.";
        break;
      case "auth/user-not-found":
        errorMessage = "No user found with this email address.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak.";
        break;
      case "auth/email-already-in-use":
        errorMessage = "Email is already in use.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many requests. Please try again later.";
        break;
      case "auth/missing-email":
        errorMessage = "Email is required.";
        break;
      case "auth/invalid-credential":
        errorMessage = "Invalid credentials.";
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

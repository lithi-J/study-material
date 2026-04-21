import { NextRequest, NextResponse } from "next/server";
import { signInUser } from "@/backend/services/authService";
import { generateToken, TokenPayload } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find and verify user via authService
    const { user, error } = await signInUser(email, password);
    
    if (error || !user) {
      return NextResponse.json(
        { error: error || "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const token = generateToken(tokenPayload);

    // Return success response with token
    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}

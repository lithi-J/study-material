import { NextRequest, NextResponse } from "next/server";
import { signUpUser } from "@/backend/sevices/authService";
import { generateToken, TokenPayload } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Create the user via authService
    const { user: newUser, error } = await signUpUser(email, password, name);
    
    if (error || !newUser) {
      return NextResponse.json(
        { error: error || "Failed to register user" },
        { status: 400 }
      );
    }

    // Generate JWT token
    const tokenPayload: TokenPayload = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
    const token = generateToken(tokenPayload);

    // Return success response with token
    return NextResponse.json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}

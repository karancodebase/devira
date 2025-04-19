import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "../../../models/User";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    // Check if the user exists in the database by email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If user exists, return response indicating user exists
      return NextResponse.json(
        { userExists: true },
        { status: 200 }
      );
    } else {
      // If user does not exist, return response indicating no user found
      return NextResponse.json(
        { userExists: false },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

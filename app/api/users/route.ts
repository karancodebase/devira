import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "../../../models/User";
import { UserProfile } from "../../../models/UserProfile";

export async function POST(req: Request) {
  const body = await req.json();
  // console.log("Received body:", body);

  const {
    email,
    password,
    firstName,
    lastName,
    collegeName,
    semester,
    github,
    leetcode,
  } = body;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !collegeName ||
    !semester ||
    !github ||
    !leetcode
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Store basic info in User table
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
    });

    // Store full profile in UserProfile table
    const newUserProfile = await UserProfile.create({
      email,
      password,
      firstName,
      lastName,
      collegeName,
      semester,
      github,
      leetcode,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
        profile: newUserProfile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 })
  }

  try {
    await connectToDatabase()
    const profile = await UserProfile.findOne({ email })
  // console.log(profile)
    if (!profile) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ profile }, { status: 200 })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ message: 'Failed to fetch profile' }, { status: 500 })
  }
}

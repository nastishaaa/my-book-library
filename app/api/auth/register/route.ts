import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connection } from "@/lib/mongoose";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
        await connection();

        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already in use" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: "User registered", userId: newUser._id }, { status: 201 });
    } catch (error: any) {
        console.error("Register error:", error);
        return NextResponse.json({ message: "Something went wrong", error: error.message || error }, { status: 500 });
    }
}

import mongoose from "mongoose";
import { connection } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        await connection();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        const { _id, name, email: userEmail } = user;

        return NextResponse.json(
            {
                message: "Login successful",
                user: { id: _id, name, email: userEmail },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Something went wrong", error: error.message || error }, { status: 500 });
    }
}

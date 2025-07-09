import { getToken } from "next-auth/jwt";
import { connection } from "@/lib/mongoose";
import { Book } from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connection();

        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token?.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const books = await Book.find({ userId: token.sub });

        console.log("📚 FOUND BOOKS:", books);

        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        console.error("❌ ERROR IN GET BOOKS:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

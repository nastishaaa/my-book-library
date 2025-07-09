import { NextRequest, NextResponse } from "next/server";
import { Book } from "@/models/Book";
import { connection } from "@/lib/mongoose";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        await connection();

        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        console.log("🔐 Token from cookie:", token);

        if (!token || !token.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, author, published, genre, description } = body;

        if (!title || !author || !genre || !description) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newBook = await Book.create({
            title,
            author,
            published: published ? new Date(published) : undefined,
            genre,
            description,
            userId: token.sub,
        });

        return NextResponse.json(
            { message: "Book added", bookId: newBook._id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding book:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

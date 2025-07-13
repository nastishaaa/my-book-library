import { NextRequest, NextResponse } from "next/server";
import { Book } from "@/models/Book";
import { connection } from "@/lib/mongoose";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    await connection();

    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        const book = await Book.findById(id);

        if (!book) {
            return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        }

        return NextResponse.json(book, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connection();

        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token || !token.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); 
        
        if (!id) {
            return NextResponse.json({ message: "Missing ID" }, { status: 400 });
        }

        const data = await req.json();

        const book = await Book.findOneAndUpdate(
            { _id: id, userId: token.sub },
            data,
            { new: true }
        );

        if (!book) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Book updated", book }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

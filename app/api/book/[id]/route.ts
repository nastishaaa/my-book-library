import { NextRequest, NextResponse } from "next/server";
import { Book } from "@/models/Book";
import { connection } from "@/lib/mongoose";
import { getToken } from "next-auth/jwt";

export async function PATCH( req: NextRequest, { params }: { params: { id: string } } ) {
    try {
        await connection();
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const data = await req.json();

        const book = await Book.findOneAndUpdate(
            { _id: params.id, userId: token.sub },
            data,
            { new: true }
        );
        if (!book) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }
        
        return NextResponse.json({ message: "Book updated", book }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
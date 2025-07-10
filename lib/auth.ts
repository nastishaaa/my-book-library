import NextAuth, { NextAuthOptions, SessionStrategy, User as NextAuthUser, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { User } from "@/models/User";
import { connection } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                await connection();
                const user = await User.findOne({ email: credentials.email });
                if (!user) return null;
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;
                return {
                    id: user._id.toString(), 
                    name: user.name,
                    email: user.email,
                };
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.accessToken = user.id; 
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.accessToken = token.accessToken as string; // ✅ це головне!
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
}


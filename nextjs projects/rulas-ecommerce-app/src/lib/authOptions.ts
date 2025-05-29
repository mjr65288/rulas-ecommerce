import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Admin Login',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const isAdmin =
                    credentials?.username === "admin" &&
                    credentials?.password === "secret123";

                if (isAdmin) {
                    return { id: 'admin', name: 'Admin', email: 'admin@example.com' };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

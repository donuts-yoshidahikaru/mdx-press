import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
  ],
  // Add other NextAuth.js options here if needed, like session strategy, secret, etc.
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // If you have custom sign-in, sign-out, error pages, specify them here.
    // signIn: '/auth/signin', 
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

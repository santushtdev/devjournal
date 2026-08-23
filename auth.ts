import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {prisma} from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("AUTHORIZE CALLED")
  if (!credentials?.email || !credentials?.password) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  })

  if (!user || !user.password) {
    return null
  }

  const isValidPassword = await bcrypt.compare(
    credentials.password,
    user.password
  )

  if (!isValidPassword) {
    return null
  }

  return user
}
    }),
  ],
})
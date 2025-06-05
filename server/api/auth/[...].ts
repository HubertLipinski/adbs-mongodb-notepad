import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { NuxtAuthHandler } from '#auth'
import { User } from '~/server/models/User'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret || 'my-auth-secret',
  providers: [
    // @ts-expect-error .default for SSR
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: { email: string, password: string }) {
        const user = await User.findOne({ email: credentials.email })
        if (!user) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid email or password',
          })
        }

        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid email or password',
          })
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
    newUser: '/register',
  },
})

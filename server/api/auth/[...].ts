import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from "~/server/models/User";
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,

    session: {
        strategy: 'jwt'
    },

    pages: {
        signIn: '/login',
    },

    // todo: refactor

    providers: [
        CredentialsProvider.default({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            async authorize(credentials: {email: string, password: string}) {

                const user = await User.findOne({email: credentials.email})

                if (!user) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: "Unauthorized"
                    })
                }

                const isValid = await bcrypt.compare(credentials.password, user.password)

                if (!isValid) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: "Unauthorized"
                    })
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                }
            }
        })
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

})
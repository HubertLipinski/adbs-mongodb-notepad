import {User} from '~/server/models/User'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    if (!body.email || !body.password || !body.name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing required fields",
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await User.create({
        ...body,
        password: hashedPassword
    })

    return {
        ...user.toObject(),
        password: undefined
    }
})
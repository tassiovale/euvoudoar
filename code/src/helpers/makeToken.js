import jwt from 'jsonwebtoken';

export const makeToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.SECRETKEY
    )
}
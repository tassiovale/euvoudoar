import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
    '/api/account/sign_up',
    [
        body('email')
            .isEmail()
            .withMessage('Email inválido'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('A senha deve conter entre 4 e 20 caracteres')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('E-mail já está em uso');
        }

        const user = User.build({ email, password });
        await user.save();

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    }
);

export { router as signUpRouter };
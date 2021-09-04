import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
    '/api/account/sign_in', 
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
        if (!existingUser) {
            throw new BadRequestError('Credenciais inválidas');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);
        if (!passwordsMatch) {
            throw new BadRequestError('Credenciais inválidas');
        }

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    }
);

export { router as signInRouter };
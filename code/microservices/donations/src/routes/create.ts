import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Donation } from '../models/donation';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
    '/api/donations',
    requireAuth,
    [
        body('institutionName')
            .not()
            .isEmpty()
            .withMessage('Nome da instituição obrigatório'),
        body('description')
            .not()
            .isEmpty()
            .withMessage('Descrição da doação obrigatória'),
        body('value')
            .isFloat({ gt: 0 })
            .withMessage('Valor inválido')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { institutionName, description, value } = req.body;

        const existingDonation = await Donation.findOne({ description, value });
        if (existingDonation) {
            throw new BadRequestError('Doação já criada');
        }

        const donation = Donation.build({ 
            institutionName, 
            description, 
            value, 
            userId: req.currentUser!.id
        });
        await donation.save();

        res.status(201).send(donation);
    }
);

export { router as createRouter };
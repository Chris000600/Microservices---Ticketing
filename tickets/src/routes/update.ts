import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError
} from '@microtutorials/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

// update existing ticket information
router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    // check if ticket exists
    if (!ticket) {
      throw new NotFoundError();
    }

    // check if user is the one who created the ticket
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    // update ticket
    ticket.set({
      title: req.body.title,
      price: req.body.price
    });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };

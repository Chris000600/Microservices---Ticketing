import express, { Request, Response } from 'express';
import { NotFoundError } from '@microtutorials/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

// show ticket requested by unique ticket id
router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };

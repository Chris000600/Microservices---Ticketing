import express from 'express';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  // the currentUser middleware would have updated the req.currentUser value appropriately
  res.send({ currentUser: req.currentUser || null }); // returns null instead of undefined
});

export { router as currentUserRouter };

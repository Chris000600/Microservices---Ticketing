import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  // invalidate jwt
  req.session = null;

  res.send({});
});

export { router as signoutRouter };

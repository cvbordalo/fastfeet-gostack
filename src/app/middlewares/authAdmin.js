import User from '../models/User';

export default async (req, res, next) => {
  if (!User.isAdmin) {
    return res
      .status(401)
      .json({ error: 'To create a deliveryman you need to be an admin.' });
  }
  return next();
};

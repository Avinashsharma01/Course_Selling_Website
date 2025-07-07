import userModel from '../models/user.model.js';

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const user = await userModel.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'access denied, admin only' });
    }

    req.user = user; // ✅ make user available to next middleware/controller
    next();
  } catch (err) {
    return res.status(500).json({ message: 'server error', error: err.message });
  }
};

export default adminMiddleware;


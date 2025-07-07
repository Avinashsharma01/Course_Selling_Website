import AdminModel from '../models/admin.model.js';

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const admin = await AdminModel.findById(req.userId);
    if (!admin) {
      return res.status(403).json({ message: 'access denied, admin only' });
    }

    req.admin = admin; // make admin available to next middleware/controller
    next();
  } catch (err) {
    return res.status(500).json({ message: 'server error', error: err.message });
  }
};

export default adminMiddleware;


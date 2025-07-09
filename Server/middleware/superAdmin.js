// middleware/superAdmin.js

import AdminModel from '../models/admin.model.js';

const superAdminMiddleware = async (req, res, next) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: 'unauthorized' });
        }

        const admin = await AdminModel.findById(req.userId);
        if (!admin || !admin.isSuperAdmin) {
            return res.status(403).json({ message: 'access denied, super admin only' });
        }

        req.admin = admin; // make admin available to next middleware/controller
        next();
    } catch (err) {
        return res.status(500).json({ message: 'server error', error: err.message });
    }
};

export default superAdminMiddleware;

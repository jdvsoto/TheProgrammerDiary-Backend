import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import { exportedToken } from '../auth/auth.controller.js';

export const validateJWT = async (req, res, next) => {
    global.exportRole = null;
    try {
        const token = exportedToken;

        if (!token) {
            return res.status(401).json({
                msg: "There is no token in the request"
            });
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: "Token is not valid - user does not exist in database"
            });
        }

        req.user = user;
        const userRole = user.role;
        global.exportRole = userRole;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token is not valid"
        });
    }
};
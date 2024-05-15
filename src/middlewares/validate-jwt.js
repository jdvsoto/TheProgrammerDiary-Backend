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


// import jwt from 'jsonwebtoken';

// export const validateJWT = (req, res, next) => {
//     let token = req.body.token || req.query.token || req.headers['authorization']

//     if (!token){
//         return res.status(401).send('A token is required for authentication')
//     }

//     try{
//         token = token.replace(/^Bearer\s+/, '')
//         const decoded = jwt.verify(token, process.env.TOKEN_KEY)

//         req.user = decoded
//     }catch(e){
//         console.log(e)
//         return res.status(401).send('Invalid Token')
//     }

//     return next()
// }
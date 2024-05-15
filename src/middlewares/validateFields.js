import { validationResult } from "express-validator";

export const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}


// import { validationResult } from "express-validator";

// export  const validateFields = (req, res, next) => {
//     const error = validationResult(req)
//     if(!error.isEmpty()){
//         return res.status(400).json(error)
//     }
//     next()
// }
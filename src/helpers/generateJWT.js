import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '2h'
            },
            (err, token) => {
                err ? (console.log(err), reject('Could not generate JWT')) : resolve(token);
            });
    });
};

// import jwt from 'jsonwebtoken'

// export const generateJWT = (uid = '', email = '') => {
//     return new Promise((resolve, reject) => {
//         const payload = { uid, email }
//         jwt.sign(
//             payload,
//             process.env.SECRETORPRIVATEKEY,
//             {
//                 expiresIn: '8h'
//             },
//             (err, token) => {
//                 err ? (console.log(err), reject('we have a proble to generate the token')) : resolve(token)
//             }
//         )
//     })
// }
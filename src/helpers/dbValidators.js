import User from '../user/user.model.js';
export const existentEmail = async (email = '') => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id)
    if (!existeUsuario) {
        throw new Error(` el ID: ${id} no existe`)
    }
}

export const existentUsername = async (userName = '') => {
    const exists = await User.findOne({ userName });
    if (exists) {
        throw new Error(`The username ${userName} is already registered`);
    }
}

// export const validateImg = (validated, img) => {
//     var errors = [];
//     if (validated === 'Y' && img === undefined) {
//         errors.push('Select an image on fomrmat jpg, jpeg or png');
//     } else {
//         if (errors != '') {
//             fs.unlinkSync('./public/uploads/' + img.filename);
//         }
//     }
//     return errors;

// };
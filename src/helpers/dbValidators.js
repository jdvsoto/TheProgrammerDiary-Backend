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


// import User from '../user/user.model.js'

// export const existentEmail = async (email = '') => {
//     const existe = await User.findOne({email})
//     if(existe){
//         throw new Error(`El email ${email} ya fue registrado`)
//     }
// }

// export const existeUsuarioById = async (id = '') =>{
//     const existeUsuario = await User.findById(id)
//     if(!existeUsuario){
//         throw new Error(` el ID: ${id} no existe` )
//     }
// }
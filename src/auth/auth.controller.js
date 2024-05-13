import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generateJWT } from '../helpers/generateJWT.js';

let exportedToken = '';
export const register = async (req, res) => {
    try {
        const { userName, name, email, password } = req.body;

        const salt = bcryptjs.genSaltSync();
        const encryptedPassword = bcryptjs.hashSync(password, salt);

        const user = await User.create({
            userName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            name,
        });

        return res.status(200).json({
            msg: "user has been added to database",
            userDetails: {
                user: user.userName,
                email: user.email,
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send("User cannot be added to database");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await bcryptjs.compare(password, user.password))) {
            const token = await generateJWT(user.id, user.email)
            exportedToken = token;
            res.status(200).json({
                msg: "Login Ok!!!",
                userDetails: {
                    username: user.username,
                    token: token
                },
            });
        }

        // console.log(exportedToken)

        if (!user) {
            return res
                .status(400)
                .send(`Wrong credentials, ${email} doesn't exists on database`);
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).send("wrong password");
        }
    } catch (error) {
        res.status(500).send("Something went wrong on the server");
    }
};


export const updateUser = async (req, res) => {
    try {
        const user = req.user;
        const { idToChange, role } = req.body;


        if (user.role !== 'ADMIN_ROLE') {
            return res.status(401).json({
                msg: "You don't have permission to update this user"
            });

        }
        console.log("este es el role " + user.role);
        await User.findByIdAndUpdate(idToChange, {role: role});

        return res.status(200).json({
            msg: "User has been updated"
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Something went wrong on the server",
        });
    }
};

export { exportedToken };
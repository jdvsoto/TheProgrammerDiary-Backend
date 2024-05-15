import Publication from "./publications.model.js";
import upload from "../middlewares/multerConfig.js";
export const createPublication = async (req, res) => {
    try {
        // const user = req.user;
        const { title, subTitle, content, author, img } = req.body;
        // if (user.role !== 'ADMIN_ROLE') {
        //     return res.status(400).json({
        //         msg: "You are not authorized to create publications"
        //     })
        // }

        const newPublication = new Publication({
            title,
            subTitle,
            content,
            author,
            img,
        });
        await newPublication.save();

        return res.status(200).json({
            msg: "Publication has been created",
            publication: newPublication,
        });
    } catch (e) {
        // console.log(e);
        return res.status(500).json({

            msg: "Publication has not been created"
        });
    }
}

export const getPublicationsById = async (req, res) => {
    try {
        const { id } = req.params;
        const publications = await Publication.findOne({ _id: id });

        return res.status(200).json({
            msg: "Publications have been found",
            publications,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Publications have not been found",
            errors: error,
        });
    }
}

export const getPublications = async (req, res) => {
    try {
        const publications = await Publication.find();
        return res.status(200).json({
            msg: "Publications have been found",
            publications,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Publications have not been found",
            errors: error,
        });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { __v, _id, status, ...rest } = req.body;

        if (user.role !== "ADMIN_ROLE") {
            return res.status(401).json({
                msg: "You are not authorized to see this publication",
            });
        }
        const publication = await Publication.findOne({ _id: id });
        if (!publication) {
            return res.status(404).json({
                msg: "Publication has not been found",
            });
        }
        console.log("Se encontró la publicación"+publication);
        const newPublication = {
            rest
        };

        console.log("esta es la nueva publicación" + newPublication)
        const updatedPublication = await Publication.findOneAndUpdate({ _id: id }, rest);
        console.log(updatedPublication);
        return res.status(200).json({
            msg: "Publication has been updated"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Publication has not been updated",
            errors: error,
        });
    }

};

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        if (user.role !== "ADMIN_ROLE") {
            return res.status(401).json({
                msg: "You are not authorized to see this publication",
            });
        }
        await Publication.findByIdAndUpdate({ _id: id }, { status: false });
        return res.status(200).json({
            msg: "Publication has been deleted",
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Publication has not been deleted",
            errors: error,
        });
    }
};
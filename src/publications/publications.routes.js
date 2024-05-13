import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { createPublication, deletePublication, getPublications, getPublicationsById, updatePublication } from "./publications.controller.js";
import upload from "../middlewares/multerConfig.js";
import { get } from "mongoose";

const router = Router();

router.post('/newPublication', [
    validateJWT,
    validateFields
], createPublication);

router.get('/getPublication/:id', [
    validateJWT,
], getPublicationsById);

router.get('/getPublications', [
    validateJWT,
], getPublications)

router.put('/updatePublication/:id', [
    validateJWT,
    validateFields
], updatePublication);

router.delete('/deletePublication/:id', [
    validateJWT,
], deletePublication);

export default router;
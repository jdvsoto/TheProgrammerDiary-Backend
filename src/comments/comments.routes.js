import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { createComment, deleteComment, getComments, getCommentsByPublication, getCommentsByUser, updateComment } from './comments.controller.js';


const router = Router();

router.post('/newComment', [
    validateJWT,
    check('content', 'Content is required').not().isEmpty(),
    check('publication', 'Publication is required').not().isEmpty(),
    validateFields
], createComment);

router.get('/getComments', validateJWT, getComments);

router.get('/getCommentsByPublication', [
    validateJWT,
    check('publication', 'Publication is required').not().isEmpty(),
    validateFields
], getCommentsByPublication);

router.get('/getCommentsByUser', [
    validateJWT,
    validateFields
], getCommentsByUser);

router.put('/updateComment/:id', [
    validateJWT,
    check('content', 'Content is required').not().isEmpty(),
    validateFields
], updateComment);

router.delete('/deleteComment/:id', validateJWT, deleteComment);
export default router;
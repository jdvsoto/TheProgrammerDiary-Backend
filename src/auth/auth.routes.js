import { Router } from 'express';
import { check } from 'express-validator';
import { login, register, updateUser } from './auth.controller.js';
import { validateFields } from '../middlewares/validateFields.js';
import { existentEmail } from '../helpers/dbValidators.js';
import { existentUsername } from '../helpers/dbValidators.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.post('/register', [
    check('userName', 'Username is required').not().isEmpty(),
    check('userName').custom(existentUsername),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('password', 'Password is required').not().isEmpty(),
    check('email').custom(existentEmail),
    validateFields
], register);

router.put('/update', [
    validateJWT,
    validateFields
], updateUser)

export default router;
import express from 'express';
import userController from '../controllers/user.controller';
import InputValidation from '../helpers/Validations/users.joi.validate';

const router = express.Router();

const { validateSignup } = InputValidation

router.post('/signup', validateSignup, userController.signup);


export default router;

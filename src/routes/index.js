import express from 'express';
import userRoute from './user.route';
import menuRoute from './menu.route';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/menu', menuRoute);
export default Router;

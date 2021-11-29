import express from 'express';
import menuController from '../controllers/menu.controller';

const router = express.Router();

router.post('/create', menuController.createMenu);
router.get('/', menuController.getFood);
router.get('/:id', menuController.getOneFood);
router.get('/menu/:location', menuController.getLocationFood);
router.patch('/order/:id', menuController.orderFood);

export default router;

import { Router, Request, Response } from "express";

import multer from 'multer';

// -- IMPORTANDO USER CONTROLLERS --
import {CreateUserController} from './controllers/user/CreateUserController';
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// -- IMPORTANDO CATEGORY CONTROLLERS --
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";


// -- IMPORTANDO PRODUCT CONTROLLERS --
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";


// -- IMPORTANDO ORDER CONTROLLERS --
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";


// -- IMPORTANDO MIDDLEWARES --

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

// -- ROTAS USER --
router.post("/users",new CreateUserController().handle);
router.post('/session',new AuthUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --

router.post('/category', isAuthenticated, new CreateCategoryController().handle);
// router.get('/category', isAuthenticated, new ListCategoryController().handle);
router.get('/category',  new ListCategoryController().handle);


// -- ROTAS PRODUCT --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
// router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);
router.get('/category/product', new ListByCategoryController().handle);


// -- ROTAS ORDER --
// router.post('/order', isAuthenticated, new CreateOrderController().handle);
// router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.post('/order',  new CreateOrderController().handle);
router.delete('/order',  new RemoveOrderController().handle);


// router.post('/order/add', isAuthenticated, new AddItemController().handle);
// router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);
router.delete('/order/remove', new RemoveItemController().handle);
router.post('/order/add', new AddItemController().handle);

// router.post('/order/send', isAuthenticated, new SendOrderController().handle);
router.post('/order/send', new SendOrderController().handle);

router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export default router;
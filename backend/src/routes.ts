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
router.get('/category', isAuthenticated, new ListCategoryController().handle);


// -- ROTAS PRODUCT --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);


// -- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

export default router;
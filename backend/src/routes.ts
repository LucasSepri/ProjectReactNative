import { Router, Request, Response } from "express";

import multer from 'multer';



// -- IMPORTANDO USER CONTROLLERS --
import { DeleteUserController } from './controllers/user/DeleteUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { ListUserController } from "./controllers/user/ListUserController";
import { UpdateCargoUserController } from './controllers/user/UpdateCargoUserController';

// -- IMPORTANDO CATEGORY CONTROLLERS --
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { DeleteCategoryController } from './controllers/category/DeleteCategoryController';
import { UpdateCategoryController } from './controllers/category/UpdateCategoryController';


// -- IMPORTANDO PRODUCT CONTROLLERS --
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { UpdateProductController } from './controllers/product/UpdateProductController';


// -- IMPORTANDO ORDER CONTROLLERS --
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";


// -- IMPORTANDO MIDDLEWARES --

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from './config/multer';

const router = Router();

// -- CONFIGURAÇÃO DE UPLOAD --
const upload = multer(uploadConfig.upload(process.env.FTP === 'true' ? '/' : './tmp')); 


// -- ROTAS USER --
router.post("/users", upload.single('profileImage'), new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/users', isAuthenticated, new ListUserController().handle);
router.put('/users/cargo', isAuthenticated, new UpdateCargoUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/me/excluir', isAuthenticated, new DeleteUserController().handle);


// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', new ListCategoryController().handle);
router.delete('/category/remove', isAuthenticated, new DeleteCategoryController().handle);
router.put('/category/update', isAuthenticated, new UpdateCategoryController().handle);



// -- ROTAS PRODUCT --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', new ListByCategoryController().handle);
router.delete('/product/remove', isAuthenticated, new DeleteProductController().handle);
router.put('/product/update', isAuthenticated, upload.single('file'), new UpdateProductController().handle);


// -- ROTAS ORDER --
router.post('/order', new CreateOrderController().handle);
router.delete('/order', new RemoveOrderController().handle);


router.delete('/order/remove', new RemoveItemController().handle);
router.post('/order/add', new AddItemController().handle);

router.post('/order/send', new SendOrderController().handle);

router.get('/orders', new ListOrdersController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export default router;
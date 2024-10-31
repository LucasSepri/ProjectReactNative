import { Router } from 'express';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdmin } from './middlewares/isAdmin';
import upload from './config/multer';

/* ---- Usuário Controller ---- */
import CreateUserController from './controllers/user/CreateUserController';
import LoginUserController from './controllers/user/LoginUserController';
import UpdateUserController from './controllers/user/UpdateUserController';
import DeleteUserController from './controllers/user/DeleteUserController';
import ListUsersController from './controllers/user/ListUsersController';
import PromoteUserController from './controllers/user/PromoteUserController';
import RevokeAdminController from './controllers/user/RevokeAdminController';
/* ---- Endereço Controller ---- */
import CreateAddressController from './controllers/address/CreateAddressController';
import ListAddressesController from './controllers/address/ListAddressesController';
import DeleteAddressController from './controllers/address/DeleteAddressController';
/* ---- Categoria Controller ---- */
import CategoryController from './controllers/category/CategoryController'
/* ---- Produtos Controller ---- */
import CreateProductController from './controllers/product/CreateProductController';
import ListProductsController from './controllers/product/ListProductsController';
import DeleteProductController from './controllers/product/DeleteProductController';
import UpdateProductController from './controllers/product/UpdateProductController';
import ListProductsByCategoryController from './controllers/product/ListProductsByCategoryController';
/* ---- Favoritos Controller ---- */
import ListFavoritesController from './controllers/favorite/ListFavoritesController';
import AddFavoriteController from './controllers/favorite/AddFavoriteController';
import RemoveFavoriteController from './controllers/favorite/RemoveFavoriteController';
/* ---- Carrinho Controller ---- */
import AddToCartController from './controllers/cart/AddToCartController';
import ListCartItemsController from './controllers/cart/ListCartItemsController';
import RemoveFromCartController from './controllers/cart/RemoveFromCartController';
import UpdateCartItemController from './controllers/cart/UpdateCartItemController';
/* ---- Ordem Controller ---- */
import CreateOrderController from './controllers/order/CreateOrderController';
import ListOrdersController from './controllers/order/ListOrdersController';
import CancelOrderController from './controllers/order/CancelOrderController';
import UpdateOrderStatusController from './controllers/order/UpdateOrderStatusController';
import CheckFavoriteController from './controllers/favorite/CheckFavoriteController';
import FindOrderController  from './controllers/order/FindOrderController';



const router = Router();

/* --------- USUÁRIOS --------- */
// Rota para cadastro de usuário com upload de imagem
router.post('/users', upload.single('profileImage'), CreateUserController.handle);
// Rota para login de usuário
router.post('/login', LoginUserController.handle);
// Rota para atualizar usuário, protegida por autenticação
router.put('/users/:id', isAuthenticated, upload.single('profileImage'), UpdateUserController.handle);
// Rota para excluir usuários, protegida por autenticação
router.delete('/users/:id', isAuthenticated, DeleteUserController.handle);
// Rota para listar todos os usuários, protegida por autenticação e acesso de admin
router.get('/users', isAuthenticated, isAdmin, ListUsersController.handle);
// Rota para promover usuário a administrador
router.put('/users/promote/:id', isAuthenticated, isAdmin, PromoteUserController.handle);
// Rota para revogar status de administrador
router.put('/users/revoke/:id', isAuthenticated, isAdmin, RevokeAdminController.handle);

/* --------- ENDEREÇOS --------- */
// Rota para criar um endereço
router.post('/addresses', isAuthenticated, CreateAddressController.handle);
// Rota para listar todos os endereços
router.get('/addresses', isAuthenticated, ListAddressesController.handle.bind(ListAddressesController));
// Rota para deletar um endereço por ID
router.delete('/addresses/:id', isAuthenticated, DeleteAddressController.handle);

/* --------- CATEGORIAS --------- */
router.post('/categories', isAuthenticated, CategoryController.create);
router.get('/categories', CategoryController.list);
router.put('/categories/:id', isAuthenticated, CategoryController.update);
router.delete('/categories/:id', isAuthenticated, CategoryController.delete);

/* --------- PRODUTOS --------- */
router.post('/products', isAuthenticated, isAdmin, upload.single('banner'), CreateProductController.handle);
router.get('/products', ListProductsController.handle);
router.delete('/products/:id', isAuthenticated, isAdmin, DeleteProductController.handle);
router.put('/products/:id', isAuthenticated, isAdmin, upload.single('banner'), UpdateProductController.handle);
// Rota para listar produtos por categoria
router.get('/products/:idcategory', ListProductsByCategoryController.handle);

/* --------- FAVORITOS --------- */
// Rota para listar produtos favoritos
router.get('/favorites', isAuthenticated, ListFavoritesController.handle);
// Adicionar produto aos favoritos
router.post('/favorites', isAuthenticated, AddFavoriteController.handle);
// Remover produto dos favoritos
router.delete('/favorites/:productId', isAuthenticated, RemoveFavoriteController.handle);
// Adicione a rota para verificar se um produto é favorito
router.get('/favorites/:productId', isAuthenticated,CheckFavoriteController.handle);

/* --------- CARRINHO --------- */
// Adicionar item ao carrinho
router.post('/cart', isAuthenticated, AddToCartController.handle);
// Listar itens do carrinho        
router.get('/cart', isAuthenticated, ListCartItemsController.handle);
// Remover item do carrinho 
router.delete('/cart/:product_id', isAuthenticated, RemoveFromCartController.handle);
// Atualizar quantidade do item no carrinho  
router.put('/cart', isAuthenticated, UpdateCartItemController.handle);

/* --------- ORDEM ----------- */
// Rota para criar um pedido
router.post('/orders', isAuthenticated, CreateOrderController.handle);
router.get('/orders', isAuthenticated, ListOrdersController.handle);
router.get('/orders/:id', FindOrderController.handle);
router.delete('/orders/:order_id/cancel', isAuthenticated, CancelOrderController.handle);
router.put('/orders/:order_id/status', isAuthenticated, isAdmin, UpdateOrderStatusController.handle);
/* 
crie:
AddToCartController.ts
ListCartItemsController.ts
RemoveFromCartController.ts

AddToCartService.ts
ListCartItemsService.ts
RemoveFromCartService.ts */
export default router;

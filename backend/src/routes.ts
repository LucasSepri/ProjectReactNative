import { Router } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdmin } from './middlewares/isAdmin';
import upload from './config/multer';

/* ---- Usuário Controller ---- */
import UserProtectController from './controllers/user/UserProtectController';
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
import CategoryController from './controllers/category/CategoryController';

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
import CheckFavoriteController from './controllers/favorite/CheckFavoriteController';

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
import FindOrderController from './controllers/order/FindOrderController';
import ListAllOrdersController from './controllers/order/ListAllOrdersController';

/* ---- Payment Methods Controller ---- */
import {
    createPaymentMethodController,
    deletePaymentMethodController,
    getPaymentMethodsController,
    updatePaymentMethodController
} from './controllers/paymentMethod/paymentMethodController';

/* ---- Sales Controller ---- */
import {dashboardController} from './controllers/sales/salesController';

/* ---- Configs Controller ---- */
import uploadController from './controllers/file/uploadController';
import {
    createOrUpdateStoreSettingsController,
    deleteStoreSettingsController,
    getStoreSettingsController,
} from './controllers/storeSettings/storeSettingsController';

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
// Rota para obter os dados do usuário, protegida pelo middleware
router.get('/user', isAuthenticated, UserProtectController.getUserData.bind(UserProtectController));

/* --------- ENDEREÇOS --------- */
// Rota para criar um endereço
router.post('/addresses', isAuthenticated, CreateAddressController.handle);
// Rota para listar todos os endereços
router.get('/addresses', isAuthenticated, ListAddressesController.handle);
// Rota para deletar um endereço por ID
router.delete('/addresses/:id', isAuthenticated, DeleteAddressController.handle);

/* --------- CATEGORIAS --------- */
// Rota para criar, listar, atualizar e excluir categorias
router.post('/categories', isAuthenticated, CategoryController.create);
router.get('/categories', CategoryController.list);
router.put('/categories/:id', isAuthenticated, CategoryController.update);
router.delete('/categories/:id', isAuthenticated, CategoryController.delete);

/* --------- PRODUTOS --------- */
// Rota para criar, listar, atualizar e excluir produtos
router.post('/products', isAuthenticated, isAdmin, upload.single('banner'), CreateProductController.handle);
router.get('/products', ListProductsController.handle);
router.delete('/products/:id', isAuthenticated, isAdmin, DeleteProductController.handle);
router.put('/products/:id', isAuthenticated, isAdmin, upload.single('banner'), UpdateProductController.handle);
// Rota para listar produtos por categoria
router.get('/products/:idcategory', ListProductsByCategoryController.handle);

/* --------- FAVORITOS --------- */
// Rota para listar, adicionar e remover produtos dos favoritos
router.get('/favorites', isAuthenticated, ListFavoritesController.handle);
router.post('/favorites', isAuthenticated, AddFavoriteController.handle);
router.delete('/favorites/:productId', isAuthenticated, RemoveFavoriteController.handle);
// Verificar se um produto é favorito
router.get('/favorites/:productId', isAuthenticated, CheckFavoriteController.handle);

/* --------- CARRINHO --------- */
// Adicionar item ao carrinho, listar itens, remover item e atualizar quantidade
router.post('/cart', isAuthenticated, AddToCartController.handle);
router.get('/cart', isAuthenticated, ListCartItemsController.handle);
router.delete('/cart/:product_id', isAuthenticated, RemoveFromCartController.handle);
router.put('/cart', isAuthenticated, UpdateCartItemController.handle);

/* --------- ORDEM ----------- */
// Criar, listar, cancelar e atualizar status dos pedidos
router.post('/orders', isAuthenticated, CreateOrderController.handle);
router.get('/orders', isAuthenticated, ListOrdersController.handle);
router.get('/orders/:id', FindOrderController.handle);
router.delete('/orders/:order_id/cancel', isAuthenticated, CancelOrderController.handle);
router.put('/orders/:order_id/status', isAuthenticated, isAdmin, UpdateOrderStatusController.handle);
router.get("/admin/orders", isAuthenticated, isAdmin, ListAllOrdersController.handle);

/* -------- payment-methods --------- */
// Criar, buscar, atualizar e excluir métodos de pagamento
router.post('/payment-methods', isAuthenticated, isAdmin, createPaymentMethodController);
router.get('/payment-methods', isAuthenticated, getPaymentMethodsController);
router.put('/payment-methods/:id', isAuthenticated, isAdmin, updatePaymentMethodController);
router.delete('/payment-methods/:id', isAuthenticated, isAdmin, deletePaymentMethodController);



/* -------- Configs App --------- */
// Gerenciamento de arquivos (upload e exclusão)
router.get('/files', isAuthenticated, isAdmin, uploadController.listFiles);
router.delete('/files/:filename', isAuthenticated, isAdmin, uploadController.deleteFile);

// Configurações da loja
router.post('/store-settings',
    upload.fields([
        { name: 'logo', maxCount: 1 },        // O campo 'logo' aceita um arquivo
        { name: 'background', maxCount: 1 }    // O campo 'background' aceita um arquivo
    ]),
    createOrUpdateStoreSettingsController
);

// Rota para obter as configurações da loja
router.get('/store-settings', getStoreSettingsController);

// Rota para deletar as configurações da loja
router.delete('/store-settings', isAuthenticated, isAdmin, deleteStoreSettingsController);

/* ------- Sales ------- */
// Rota para o resumo de vendas
router.get('/dashboard/summary', (req, res) => dashboardController.getSalesSummary(req, res));

// Rota para o gráfico de vendas mensais
router.get('/dashboard/chart', (req, res) => dashboardController.getSalesChart(req, res));

// Rota para a tabela de produtos vendidos
router.get('/dashboard/products', (req, res) => dashboardController.getSoldProductsTable(req, res));

export default router;

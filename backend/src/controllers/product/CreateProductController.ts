import {Request, Response} from 'express'; 
import { CreateProductService } from '../../services/product/CreateProductService';

// MINHA MODIFICAÇÃO:: Importando a interface 'File' do 'multer'
import { File } from 'multer';

// MINHA MODIFICAÇÃO:: Criando uma interface para sobrescrever a interface 'Request' do 'express'
interface MulterRequest extends Request {
    file: File; // Usando a interface 'File' do 'multer'
}

class CreateProductController {
    // MINHA MODIFICAÇÃO:: Alterando o tipo do parâmetro 'req' para a interface criada
    // async handle(req: Request, res: Response) {
    async handle(req: MulterRequest, res: Response) {

        const {name, price, description,category_id} = req.body;

        const createProductService = new CreateProductService();

        if(!req.file) {
            throw new Error("erro no upload do arquivo");
        } else{
            const {originalname, filename: banner} = req.file;
            
        
            const product = await createProductService.execute({
                name,
                price,
                description,
                banner,
                category_id
            });

            return res.json(product);
        }

    }
}

export { CreateProductController };
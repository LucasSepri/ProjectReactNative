import { Request, Response } from 'express';
import { UpdateProductService } from '../../services/product/UpdateProductService';

// MINHA MODIFICAÇÃO:: Importando a interface 'File' do 'multer'
// import { File } from 'multer';

// MINHA MODIFICAÇÃO:: Criando uma interface para sobrescrever a interface 'Request' do 'express'
// interface MulterRequest extends Request {
//     file: File; // Usando a interface 'File' do 'multer'
// }

class UpdateProductController {
    // MINHA MODIFICAÇÃO:: Alterando o tipo do parâmetro 'req' para a interface criada

    async handle(req: Request, res: Response) {
        // async handle(req: MulterRequest, res: Response) {

        const { id, name, price, description, category_id } = req.body;

        const updateProductService = new UpdateProductService();

        let banner;
        if (!req.file) {
            //banner = null;
        } else {
            banner = req.file.path.split(process.env.FTP === 'true' ? "/" : "\\" ).pop();
        }

        const product = await updateProductService.execute({
            id,
            name,
            price,
            description,
            banner,
            category_id
        });
         return res.json(product);
         
        // if (!req.file) {
        //     throw new Error("erro no upload do arquivo");
        // } else {
        //     const banner = req.file.path.split(process.env.FTP === 'true' ? "/" : "\\" ).pop();

        //     const product = await updateProductService.execute({
        //         id,
        //         name,
        //         price,
        //         description,
        //         banner,
        //         category_id
        //     });

        //     return res.json(product);
        // }

    }
}

export { UpdateProductController };
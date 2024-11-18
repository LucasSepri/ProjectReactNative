import { Request, Response } from 'express';
import uploadService from '../../services/file/uploadService';

class UploadController {
  // Método para listar arquivos
  public listFiles(req: Request, res: Response): void {
    try {
      const files = uploadService.listFiles();
      res.status(200).json({ files });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar arquivos', error: error.message });
    }
  }

  // Método para excluir um arquivo
  public deleteFile(req: Request, res: Response): void {
    const { filename } = req.params;

    if (!filename) {
      res.status(400).json({ message: 'Nome do arquivo é obrigatório' });
      return;
    }

    try {
      if (uploadService.fileExists(filename)) {
        uploadService.deleteFile(filename);
        res.status(200).json({ message: 'Arquivo excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Arquivo não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir arquivo', error: error.message });
    }
  }
}

export default new UploadController();

import fs from 'fs';
import path from 'path';

class UploadService {
  private uploadPath: string;

  constructor() {
    this.uploadPath = path.join(__dirname, '../../../uploads'); // Caminho da pasta uploads
  }

  // Método para listar arquivos, excluindo o .gitkeep
  public listFiles(): string[] {
    try {
      const files = fs.readdirSync(this.uploadPath);
      return files.filter(file => file !== '.gitkeep'); // Filtra o .gitkeep
    } catch (error) {
      throw new Error('Erro ao listar arquivos');
    }
  }

  // Método para excluir um arquivo da pasta
  public deleteFile(filename: string): void {
    const filePath = path.join(this.uploadPath, filename);
    
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        throw new Error('Arquivo não encontrado');
      }
    } catch (error) {
      throw new Error('Erro ao excluir arquivo');
    }
  }
  
  // Método para verificar se o arquivo existe
  public fileExists(filename: string): boolean {
    const filePath = path.join(this.uploadPath, filename);
    return fs.existsSync(filePath);
  }
}

export default new UploadService();

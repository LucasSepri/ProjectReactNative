import fs from 'fs';
import path from 'path';

// Função para deletar um arquivo do sistema
export function deleteFile(filePath: string) {
  const fullPath = path.resolve(__dirname, '..', '..', 'uploads', filePath);
  
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(`Erro ao tentar deletar o arquivo ${filePath}:`, err);
    }
  });
}

import fs from 'fs';
import path from 'path';

// Função para deletar um arquivo do sistema, se ele existir
export function deleteFile(filePath: string) {
  const fullPath = path.resolve(__dirname, '..', '..', 'uploads', filePath);

  // Verifica se o arquivo existe antes de tentar deletá-lo
  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(`Erro ao tentar deletar o arquivo ${filePath}:`, err);
      }
    });
  }
}

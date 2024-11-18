import { Request, Response } from 'express';
import { createOrUpdateStoreSettings, getStoreSettings, deleteStoreSettings } from '../../services/storeSettings/storeSettingsService';

// Criar ou atualizar configurações de loja (única)
export const createOrUpdateStoreSettingsController = async (req: Request, res: Response) => {
  // Verifique se os arquivos logo e background estão presentes em req.files
  const logo = req.files['logo'] ? `${(req.files['logo'] as Express.Multer.File[])[0].filename}` : null;
  const background = req.files['background'] ? `${(req.files['background'] as Express.Multer.File[])[0].filename}` : null;

  try {
    const storeSettings = await createOrUpdateStoreSettings({
      ...req.body,
      logo,
      background,
    });
    res.status(200).json(storeSettings);
  } catch (error) {
    console.error('Erro ao criar ou atualizar configurações da loja:', error);
    res.status(500).json({ error: 'Erro ao criar ou atualizar configurações da loja' });
  }
};

// Obter configurações da loja (única)
export const getStoreSettingsController = async (_req: Request, res: Response) => {
  try {
    const storeSettings = await getStoreSettings();

    if (!storeSettings) {
      return res.status(404).json({ error: 'Configurações da loja não encontradas' });
    }

    res.status(200).json(storeSettings);
  } catch (error) {
    console.error('Erro ao obter configurações da loja:', error);
    res.status(500).json({ error: 'Erro ao obter configurações da loja' });
  }
};

// Deletar configurações da loja (única)
export const deleteStoreSettingsController = async (_req: Request, res: Response) => {
  try {
    const storeSettings = await deleteStoreSettings();

    if (!storeSettings) {
      return res.status(404).json({ error: 'Configurações da loja não encontradas' });
    }

    res.status(200).json({ message: 'Configurações da loja deletadas com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar configurações da loja:', error);
    res.status(500).json({ error: 'Erro ao deletar configurações da loja' });
  }
};

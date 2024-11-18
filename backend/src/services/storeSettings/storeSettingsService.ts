import { PrismaClient } from '@prisma/client';
import { deleteFile } from '../../utils/deleteFile';

const prisma = new PrismaClient();

// Função para validar o formato de horário
const isValidTimeFormat = (time: string) => {
  const regex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
  return regex.test(time);
};

export const createOrUpdateStoreSettings = async (storeData: {
  storeName: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  logo?: string;
  background?: string;
  colors?: {
    primary: string;
    secondary: string;
    success?: string;
    danger?: string;
    text?: string;
    background?: string;
    border?: string;
  };
  openingHours: {
    [day: string]: { open: string; close: string };
  };
}) => {
  // Validando horários de funcionamento
  for (const day in storeData.openingHours) {
    const { open, close } = storeData.openingHours[day];
    if (open && !isValidTimeFormat(open)) {
      throw new Error(`Formato inválido para o horário de abertura no ${day}.`);
    }
    if (close && !isValidTimeFormat(close)) {
      throw new Error(`Formato inválido para o horário de fechamento no ${day}.`);
    }
  }

  // Validando latitude e longitude
  if (isNaN(storeData.latitude) || isNaN(storeData.longitude)) {
    throw new Error("Latitude e longitude precisam ser números válidos.");
  }

  const existingSettings = await prisma.storeSettings.findFirst();

  if (existingSettings) {
    // Deleta as imagens antigas, se houver, antes de atualizar
    if (storeData.logo && storeData.logo !== existingSettings.logo) {
      if (existingSettings.logo) {
        deleteFile(existingSettings.logo.replace('/uploads/', ''));
      }
    }

    if (storeData.background && storeData.background !== existingSettings.background) {
      if (existingSettings.background) {
        deleteFile(existingSettings.background.replace('/uploads/', ''));
      }
    }

    // Atualiza as configurações existentes
    return await prisma.storeSettings.update({
      where: { id: existingSettings.id },
      data: {
        ...storeData,
        latitude: parseFloat(storeData.latitude.toString()),  // Converte para float
        longitude: parseFloat(storeData.longitude.toString()),  // Converte para float
        logo: storeData.logo || existingSettings.logo || '', // Se não houver logo, mantém o anterior
        background: storeData.background || existingSettings.background || '', // Se não houver background, mantém o anterior
        colors: storeData.colors || undefined,
        openingHours: storeData.openingHours || undefined,
      },
    });
  } else {
    // Cria uma nova configuração se não existir
    return await prisma.storeSettings.create({
      data: {
        ...storeData,
        latitude: parseFloat(storeData.latitude.toString()),  // Converte para float
        longitude: parseFloat(storeData.longitude.toString()),  // Converte para float
        logo: storeData.logo || '', // Define um valor padrão caso logo não seja passado
        background: storeData.background || '', // Define um valor padrão caso background não seja passado
        colors: storeData.colors || undefined,
        openingHours: storeData.openingHours || undefined,
      },
    });
  }
};

export const getStoreSettings = async () => {
  return await prisma.storeSettings.findFirst();
};

export const deleteStoreSettings = async () => {
  const existingSettings = await prisma.storeSettings.findFirst();
  if (existingSettings) {
    if (existingSettings.logo) {
      deleteFile(existingSettings.logo.replace('/uploads/', ''));
    }
    if (existingSettings.background) {
      deleteFile(existingSettings.background.replace('/uploads/', ''));
    }
    return await prisma.storeSettings.delete({
      where: { id: existingSettings.id },
    });
  }
  return null;
};

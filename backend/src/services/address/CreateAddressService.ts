// services/address/CreateAddressService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AddressRequest {
  user_id: string;
  zip: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  referencePoint?: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

class CreateAddressService {
  async execute({
    user_id,
    zip,
    street,
    number,
    neighborhood,
    complement,
    referencePoint,
    city,
    state,
    latitude,
    longitude,
  }: AddressRequest) {
    const address = await prisma.address.create({
      data: {
        user_id,
        zip,
        street,
        number,
        neighborhood,
        complement,
        referencePoint,
        city,
        state,
        latitude,
        longitude,
      },
    });

    return address;
  }
}

export default CreateAddressService;

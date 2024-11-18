import React, { createContext, useState, useContext } from 'react';

type Address = {
  zip: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  referencePoint: string;
  latitude?: number;
  longitude?: number;
  address?: string;
};

type AddressContextType = {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
};

const AddressContext = createContext<AddressContextType | undefined>(undefined);

interface AddressProviderProps {
  children: React.ReactNode;
}

export const AddressProvider: React.FC<AddressProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<Address>({
    zip: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: '',
    referencePoint: '',
    latitude: undefined,
    longitude: undefined,
    address: '',
  });

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = (): AddressContextType => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};

import React, { createContext, useContext, useState } from 'react';

// Defina a estrutura dos dados de alimento
interface Food {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  banner: string;
}

// Defina a estrutura dos itens do carrinho
interface CartItem extends Food {
  quantity: number;
}

// Defina o tipo para o contexto
interface FoodsContextType {
  foods: CartItem[];
  setFoods: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
}

// Crie o contexto
const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

// Componente provedor para envolver seus componentes e fornecer o contexto
export const FoodsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setFoods(prevFoods => {
      const existingItem = prevFoods.find(food => food.id === item.id);
      if (existingItem) {
        return prevFoods.map(food =>
          food.id === item.id ? { ...food, quantity: food.quantity + item.quantity } : food
        );
      }
      return [...prevFoods, item];
    });
  };

  return (
    <FoodsContext.Provider value={{ foods, setFoods, addToCart }}>
      {children}
    </FoodsContext.Provider>
  );
};

// Um hook para acessar o contexto
export const useFoods = () => {
  const context = useContext(FoodsContext);
  if (!context) {
    throw new Error('useFoods must be used within a FoodsProvider');
  }
  return context;
};

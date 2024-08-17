import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TableContextData {
  tableNumber: string | null;
  setTableNumber: (number: string) => void;
  clearTable: () => void;
}

const TableContext = createContext<TableContextData | undefined>(undefined);

export const TableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tableNumber, setTableNumber] = useState<string | null>(null);

  const clearTable = () => setTableNumber(null);

  return (
    <TableContext.Provider value={{ tableNumber, setTableNumber, clearTable }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = (): TableContextData => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};

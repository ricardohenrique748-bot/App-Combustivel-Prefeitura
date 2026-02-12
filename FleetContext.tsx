
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Secretariat, Vehicle, Transaction } from './types';
import { SECRETARIATS, VEHICLES, RECENT_TRANSACTIONS } from './constants';

interface FleetContextType {
  secretariats: Secretariat[];
  vehicles: Vehicle[];
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateSecretariat: (id: string, consumed: number) => void;
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export const FleetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [secretariats, setSecretariats] = useState<Secretariat[]>(SECRETARIATS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES);
  const [transactions, setTransactions] = useState<Transaction[]>(RECENT_TRANSACTIONS);

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([transaction, ...transactions]);

    // Update Secretariat consumption
    const vehicle = vehicles.find(v => v.plate === newTx.plate);
    if (vehicle) {
      const secName = vehicle.secretariat === 'Saúde' ? 'Secretaria de Saúde' : 
                     vehicle.secretariat === 'Segurança' ? 'Segurança Pública' : 
                     vehicle.secretariat === 'Educação' ? 'Secretaria de Educação' : 'Transporte e Frotas';
      
      setSecretariats(prev => prev.map(s => {
        if (s.name === secName) {
          const newConsumed = s.consumed + newTx.volume;
          const newRemaining = s.contracted - newConsumed;
          return {
            ...s,
            consumed: newConsumed,
            remaining: newRemaining,
            status: newRemaining < s.contracted * 0.1 ? 'CRITICAL' : newRemaining < s.contracted * 0.25 ? 'WARNING' : 'HEALTHY'
          };
        }
        return s;
      }));
    }
  };

  const updateSecretariat = (id: string, consumed: number) => {
    setSecretariats(prev => prev.map(s => s.id === id ? { ...s, consumed } : s));
  };

  return (
    <FleetContext.Provider value={{ secretariats, vehicles, transactions, addTransaction, updateSecretariat }}>
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => {
  const context = useContext(FleetContext);
  if (!context) throw new Error('useFleet must be used within a FleetProvider');
  return context;
};

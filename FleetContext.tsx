
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Secretariat, Vehicle, Transaction } from './types';
import { SECRETARIATS, VEHICLES, RECENT_TRANSACTIONS } from './constants';

interface FleetContextType {
  secretariats: Secretariat[];
  vehicles: Vehicle[];
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addSecretariat: (secretariat: { name: string; shortName: string; contracted: number; consumed?: number }) => void;
  updateSecretariat: (id: string, updates: Partial<Secretariat>) => void;
  deleteSecretariat: (id: string) => void;
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

  const addSecretariat = (newSec: { name: string; shortName: string; contracted: number; consumed?: number }) => {
    const consumed = newSec.consumed || 0;
    const remaining = newSec.contracted - consumed;
    const secretariat: Secretariat = {
      ...newSec,
      id: Math.random().toString(36).substr(2, 9),
      consumed,
      remaining,
      status: remaining < newSec.contracted * 0.1 ? 'CRITICAL' :
        remaining < newSec.contracted * 0.25 ? 'WARNING' : 'HEALTHY'
    };
    setSecretariats(prev => [...prev, secretariat]);
  };

  const updateSecretariat = (id: string, updates: Partial<Secretariat>) => {
    setSecretariats(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...updates };
        const newRemaining = updated.contracted - updated.consumed;
        return {
          ...updated,
          remaining: newRemaining,
          status: newRemaining < updated.contracted * 0.1 ? 'CRITICAL' :
            newRemaining < updated.contracted * 0.25 ? 'WARNING' : 'HEALTHY'
        };
      }
      return s;
    }));
  };

  const deleteSecretariat = (id: string) => {
    setSecretariats(prev => prev.filter(s => s.id !== id));
  };

  return (
    <FleetContext.Provider value={{
      secretariats,
      vehicles,
      transactions,
      addTransaction,
      addSecretariat,
      updateSecretariat,
      deleteSecretariat
    }}>
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => {
  const context = useContext(FleetContext);
  if (!context) throw new Error('useFleet must be used within a FleetProvider');
  return context;
};

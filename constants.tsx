
import { Secretariat, Transaction, Vehicle } from './types';

export const SECRETARIATS: Secretariat[] = [
  { id: '1', name: 'Secretaria de Saúde', shortName: 'SH', contracted: 120000, consumed: 118760, remaining: 1240, status: 'CRITICAL' },
  { id: '2', name: 'Secretaria de Educação', shortName: 'SE', contracted: 80000, consumed: 45200, remaining: 34800, status: 'HEALTHY' },
  { id: '3', name: 'Segurança Pública', shortName: 'PS', contracted: 150000, consumed: 145500, remaining: 4500, status: 'WARNING' },
  { id: '4', name: 'Transporte e Frotas', shortName: 'TR', contracted: 34000, consumed: 12100, remaining: 21900, status: 'HEALTHY' },
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '24 Out, 2023', time: '09:45', plate: 'ABC-1234', driver: 'Carlos Eduardo', fuelType: 'GASOLINA', volume: 45.50, value: 268.45, status: 'VERIFIED', efficiency: 12.0 },
  { id: '2', date: '24 Out, 2023', time: '08:12', plate: 'HLT-8892', driver: 'Maria Oliveira', fuelType: 'DIESEL S10', volume: 120.00, value: 707.88, status: 'VERIFIED', efficiency: 7.8 },
  { id: '3', date: '23 Out, 2023', time: '16:30', plate: 'XPT-4450', driver: 'João Ferreira', fuelType: 'GASOLINA', volume: 38.20, value: 225.34, status: 'PENDING', efficiency: 9.5 },
  { id: '4', date: '23 Out, 2023', time: '14:15', plate: 'MED-0092', driver: 'Fernando Lima', fuelType: 'DIESEL S10', volume: 85.00, value: 501.41, status: 'VERIFIED', efficiency: 13.0 },
];

export const VEHICLES: Vehicle[] = [
  { plate: 'ABC-1234', model: 'Toyota Hilux - 2023', secretariat: 'Saúde', driver: 'Carlos Eduardo', status: 'ACTIVE' },
  { plate: 'HLT-8892', model: 'Volkswagen Gol 1.0', secretariat: 'Segurança', driver: 'Maria Oliveira', status: 'ACTIVE' },
  { plate: 'XPT-4450', model: 'Ford Ranger Limited', secretariat: 'Saúde', driver: 'João Ferreira', status: 'ACTIVE' },
];

export const CONSUMPTION_TRENDS = [
  { date: '01 Oct', amount: 300 },
  { date: '08 Oct', amount: 450 },
  { date: '15 Oct', amount: 850 },
  { date: '22 Oct', amount: 600 },
  { date: '29 Oct', amount: 700 },
];

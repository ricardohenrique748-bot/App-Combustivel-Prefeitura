
import React from 'react';
import { 
  Building2, 
  MoreVertical, 
  Plus, 
  ArrowUpRight, 
  AlertCircle,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { useFleet } from '../FleetContext';

const Secretariats: React.FC = () => {
  const { secretariats } = useFleet();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Gestão de Secretarias</h1>
          <p className="text-sm text-slate-500">Controle de cotas e centros de custo governamentais.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secretariats.map((s) => {
          const percentUsed = (s.consumed / s.contracted) * 100;
          return (
            <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                    s.status === 'CRITICAL' ? 'bg-rose-100 text-rose-600' :
                    s.status === 'WARNING' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {s.shortName}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1">{s.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Centro de Custo #{s.id}00</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Consumo Atual</p>
                      <p className="text-xl font-black text-slate-900">{s.consumed.toLocaleString()} L</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Cota Total</p>
                      <p className="text-sm font-bold text-slate-500">{s.contracted.toLocaleString()} L</p>
                    </div>
                  </div>

                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100">
                      <div 
                        style={{ width: `${percentUsed}%` }} 
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ${
                          percentUsed > 90 ? 'bg-rose-500' : percentUsed > 75 ? 'bg-amber-500' : 'bg-primary'
                        }`}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase">
                      <span className={percentUsed > 90 ? 'text-rose-600' : 'text-slate-400'}>
                        {percentUsed.toFixed(1)}% Utilizado
                      </span>
                      <span className="text-slate-400">Restam {s.remaining.toLocaleString()} L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Secretariats;


import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Droplet, 
  History, 
  Truck, 
  TrendingUp, 
  MoreVertical,
  Download,
  Bell,
  Search
} from 'lucide-react';
import { CONSUMPTION_TRENDS } from '../constants';
import { useFleet } from '../FleetContext';

const Dashboard: React.FC = () => {
  const { secretariats, transactions, vehicles } = useFleet();

  const kpis = useMemo(() => {
    const totalContracted = secretariats.reduce((acc, s) => acc + s.contracted, 0);
    const totalConsumed = secretariats.reduce((acc, s) => acc + s.consumed, 0);
    const totalRemaining = totalContracted - totalConsumed;
    const monthlyConsumption = transactions
      .filter(t => t.date.includes('Out')) // Simplified monthly filter
      .reduce((acc, t) => acc + t.volume, 0);

    return {
      totalContracted,
      totalConsumed,
      totalRemaining,
      monthlyConsumption,
      percentAvailable: (totalRemaining / totalContracted) * 100
    };
  }, [secretariats, transactions]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Global Dashboard</h1>
          <p className="text-sm text-slate-500">Visão geral da frota, consumo e alocações de combustível.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar dados..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-colors">
            <Download className="w-4 h-4" />
            Relatórios
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Litros Restantes</span>
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Droplet className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-extrabold text-slate-900">{kpis.totalRemaining.toLocaleString()}</p>
              <p className="text-sm text-primary font-semibold mt-1">{kpis.percentAvailable.toFixed(0)}% Disponível</p>
            </div>
            <div className="relative w-14 h-14">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset={150 - (150 * (kpis.percentAvailable/100))} className="text-primary transition-all duration-1000" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Contratado</span>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <History className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{kpis.totalContracted.toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">L (Limite Anual)</p>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Veículos Ativos</span>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{vehicles.filter(v => v.status === 'ACTIVE').length}</p>
          <p className="text-sm text-slate-500 mt-1">Monitoramento em tempo real</p>
          <div className="mt-4 flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-300"></div>
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[8px] text-white font-bold">+{vehicles.length}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consumo Mensal</span>
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{kpis.monthlyConsumption.toLocaleString()}</p>
          <p className="text-sm text-rose-600 font-semibold mt-1">↑ 8.2% vs mês anterior</p>
          <div className="mt-4 flex items-end gap-1 h-6">
            {[4, 6, 5, 8, 10].map((h, i) => (
              <div key={i} style={{ height: `${h * 10}%` }} className={`flex-1 rounded-sm ${i === 4 ? 'bg-rose-500' : 'bg-rose-100'}`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Tendências de Consumo</h3>
              <p className="text-sm text-slate-500">Consumo diário total (L) nos últimos 30 dias</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CONSUMPTION_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {CONSUMPTION_TRENDS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#135bec' : '#bfdbfe'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Alertas de Baixa Cota</h3>
              <p className="text-sm text-slate-500">Secretarias em nível crítico</p>
            </div>
          </div>
          <div className="flex-1 divide-y divide-slate-50 overflow-y-auto scrollbar-hide">
            {secretariats.filter(s => s.status !== 'HEALTHY').map(s => (
              <div key={s.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-slate-900">{s.name}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                    s.status === 'CRITICAL' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                  }`}>{s.status === 'CRITICAL' ? 'Crítico' : 'Aviso'}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Restante: <span className="font-bold text-slate-900">{s.remaining.toLocaleString()} L</span></p>
                    <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${s.status === 'CRITICAL' ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: `${(s.remaining/s.contracted) * 100}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{( (s.remaining/s.contracted) * 100 ).toFixed(1)}% Restante</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold">Desempenho por Secretaria (Centro de Custo)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Secretaria</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Contratado (L)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Consumido (L)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Restante (L)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {secretariats.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${
                        s.status === 'CRITICAL' ? 'bg-rose-100 text-rose-600' :
                        s.status === 'WARNING' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>{s.shortName}</div>
                      <span className="font-semibold text-sm text-slate-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-right">{s.contracted.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-right">{s.consumed.toLocaleString()}</td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${
                    s.status === 'CRITICAL' ? 'text-rose-600' : 
                    s.status === 'WARNING' ? 'text-amber-600' : 'text-slate-800'
                  }`}>{s.remaining.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                      s.status === 'CRITICAL' ? 'bg-rose-100 text-rose-600' :
                      s.status === 'WARNING' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>{s.status === 'CRITICAL' ? 'Crítico' : s.status === 'WARNING' ? 'Aviso' : 'Saudável'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

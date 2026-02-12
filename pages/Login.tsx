import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular delay de rede
    setTimeout(() => {
      setIsLoading(false);

      if (email === 'ricardo.luz@eunaman.com.br' && password === '123456') {
        onLogin();
      } else {
        setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex text-slate-800 bg-slate-50 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-primary-200/40 to-primary-100/40 blur-3xl opacity-60"></div>
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-blue-200/40 to-indigo-100/40 blur-3xl opacity-60"></div>
      </div>

      <div className="w-full max-w-[1200px] m-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 z-10 items-center">

        {/* Lado Esquerdo - Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12">
          <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Smart <span className="text-primary">Tech</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-md">
            Sistema avançado para gestão e controle de abastecimento de frotas municipais.
            Eficiência, transparência e economia em um só lugar.
          </p>

          <div className="flex gap-4 mt-4">
            <div className="flex-1 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm">
              <h3 className="font-bold text-slate-800 text-lg mb-1">100%</h3>
              <p className="text-sm text-slate-500">Controle Digital</p>
            </div>
            <div className="flex-1 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm">
              <h3 className="font-bold text-slate-800 text-lg mb-1">24/7</h3>
              <p className="text-sm text-slate-500">Monitoramento</p>
            </div>
          </div>
        </div>

        {/* Lado Direito - Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
            <div className="p-8 sm:p-10">
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-2xl font-bold text-slate-900">Bem-vindo de volta</h2>
                <p className="text-slate-500 mt-2 text-sm">Insira suas credenciais para acessar o painel administrativo.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">!</span>
                  </div>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">E-mail Corporativo</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors duration-200" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm"
                      placeholder="seu.email@prefeitura.gov.br"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-semibold text-slate-700">Senha</label>
                    <a href="#" className="text-xs font-semibold text-primary hover:text-primary-600 transition-colors">Esqueceu a senha?</a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors duration-200" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 shadow-lg shadow-primary/30 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Autenticando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Entrar no Sistema <LogIn size={18} />
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">
                  Acesso restrito a servidores autorizados. <br />
                  Monitorado por IP: 192.168.x.x
                </p>
              </div>
            </div>

            {/* Faixa decorativa inferior */}
            <div className="h-2 w-full bg-gradient-to-r from-primary-400 via-primary to-blue-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

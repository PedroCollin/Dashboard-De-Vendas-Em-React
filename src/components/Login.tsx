import React, { useState } from 'react';
import { Lock, ChefHat } from 'lucide-react';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'quintal123' || password === 'admin') {
      onLogin(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-quintal-bg flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-quintal-light">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-quintal-light rounded-full mb-4 text-quintal-dark">
            <ChefHat size={32} />
          </div>
          <h1 className="text-3xl font-bold text-quintal-dark">Quintal <span className="font-light">Doceria</span></h1>
          <p className="text-quintal-accent text-sm mt-2">Área Administrativa</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-quintal-main mb-2">
              Senha de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-quintal-accent">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full pl-10 pr-4 py-3 border border-quintal-light rounded-lg focus:ring-2 focus:ring-quintal-main focus:border-transparent outline-none transition-all text-gray-700 bg-quintal-bg/30"
                placeholder="Digite sua senha..."
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 font-medium animate-pulse">
                Senha incorreta. Tente novamente.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-quintal-main hover:bg-quintal-dark text-white font-bold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg transform active:scale-95 duration-200"
          >
            Acessar Dashboard
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-400 mt-6">
          Sistema de Gestão Interno v1.0
        </p>
      </div>
    </div>
  );
};
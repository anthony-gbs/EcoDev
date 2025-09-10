import React from 'react';
import { Upload, History, User, LogOut, Recycle } from 'lucide-react';

interface MainMenuProps {
  user: { id: string; name: string; email: string };
  onNavigate: (screen: 'submit' | 'history') => void;
  onLogout: () => void;
}

export default function MainMenu({ user, onNavigate, onLogout }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EcoDev</h1>
                <p className="text-sm text-gray-600">Classificador de Resíduos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bem-vindo, {user.name}!
          </h2>
          <p className="text-gray-600 text-lg">
            O que você gostaria de fazer hoje?
          </p>
        </div>

        {/* Menu Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Submit New Waste */}
          <button
            onClick={() => onNavigate('submit')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="text-center">
              <div className="bg-green-500 p-4 rounded-full inline-block mb-4 group-hover:bg-green-600 transition-colors">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Enviar Novo Resíduo
              </h3>
              <p className="text-gray-600">
                Faça upload de uma foto ou descreva seu resíduo para obter informações sobre classificação e descarte
              </p>
            </div>
          </button>

          {/* History */}
          <button
            onClick={() => onNavigate('history')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="text-center">
              <div className="bg-blue-500 p-4 rounded-full inline-block mb-4 group-hover:bg-blue-600 transition-colors">
                <History className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Histórico de Resíduos
              </h3>
              <p className="text-gray-600">
                Visualize todas as suas consultas anteriores e informações sobre classificação de resíduos
              </p>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Impacto Ambiental
          </h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">12</div>
              <div className="text-gray-600">Resíduos Classificados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">8</div>
              <div className="text-gray-600">Recicláveis Identificados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-500 mb-2">2.5kg</div>
              <div className="text-gray-600">CO₂ Economizado</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
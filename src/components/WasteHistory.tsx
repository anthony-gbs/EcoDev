import React, { useState } from 'react';
import { ArrowLeft, Calendar, Search, Filter, Eye } from 'lucide-react';
import { WasteSubmission } from '../types';
import WasteResult from './WasteResult';

interface WasteHistoryProps {
  onBack: () => void;
}

// Mock data for demonstration
const mockHistory: WasteSubmission[] = [
  {
    id: '1',
    userId: '1',
    description: 'garrafa de plástico transparente',
    imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-15T10:30:00'),
    classification: {
      category: 'reciclavel',
      name: 'Garrafa PET',
      description: 'Material plástico 100% reciclável, amplamente utilizado em embalagens de bebidas.',
      disposal: 'Descarte no contentor azul (recicláveis). Retire a tampa e lave antes do descarte.',
      tips: 'Uma garrafa PET pode virar camisetas, tapetes ou outras garrafas!',
      collectionPoints: [
        {
          id: '1',
          name: 'Ecoponto Central',
          address: 'Rua das Flores, 123 - Centro',
          lat: -23.5505,
          lng: -46.6333,
          acceptedTypes: ['Plástico', 'Vidro', 'Metal'],
          hours: 'Seg-Sex: 8h-17h, Sáb: 8h-12h',
          phone: '(11) 1234-5678'
        }
      ]
    }
  },
  {
    id: '2',
    userId: '1',
    description: 'pilha AA usada',
    createdAt: new Date('2024-01-14T15:45:00'),
    classification: {
      category: 'perigoso',
      name: 'Pilha/Bateria',
      description: 'Contém metais pesados tóxicos como mercúrio, chumbo e cádmio.',
      disposal: 'NUNCA descarte no lixo comum! Leve a pontos de coleta específicos.',
      tips: 'Uma única pilha pode contaminar até 20 mil litros de água!',
      collectionPoints: [
        {
          id: '3',
          name: 'Farmácia EcoSaúde',
          address: 'Rua da Saúde, 789 - Centro',
          lat: -23.5515,
          lng: -46.6340,
          acceptedTypes: ['Pilhas', 'Baterias', 'Medicamentos'],
          hours: 'Seg-Dom: 7h-22h',
          phone: '(11) 2345-6789'
        }
      ]
    }
  },
  {
    id: '3',
    userId: '1',
    description: 'casca de banana',
    createdAt: new Date('2024-01-13T09:20:00'),
    classification: {
      category: 'organico',
      name: 'Casca de Banana',
      description: 'Resíduo orgânico rico em potássio e outros nutrientes.',
      disposal: 'Descarte no contentor marrom (orgânicos) ou faça compostagem.',
      tips: 'Cascas de frutas viram excelente adubo natural em 60-90 dias!',
      collectionPoints: [
        {
          id: '4',
          name: 'Horta Comunitária',
          address: 'Praça Verde, s/n - Jardim Sustentável',
          lat: -23.5495,
          lng: -46.6320,
          acceptedTypes: ['Orgânicos', 'Restos de comida'],
          hours: 'Seg-Dom: 6h-18h'
        }
      ]
    }
  }
];

const categoryInfo = {
  reciclavel: { name: 'Reciclável', color: 'bg-blue-100 text-blue-800' },
  organico: { name: 'Orgânico', color: 'bg-amber-100 text-amber-800' },
  perigoso: { name: 'Perigoso', color: 'bg-red-100 text-red-800' },
  comum: { name: 'Lixo Comum', color: 'bg-gray-100 text-gray-800' }
};

export default function WasteHistory({ onBack }: WasteHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<WasteSubmission | null>(null);

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.classification.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.classification.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedItem) {
    return (
      <WasteResult
        classification={selectedItem.classification}
        description={selectedItem.description}
        imageUrl={selectedItem.imageUrl}
        onBack={() => setSelectedItem(null)}
        onBackToMenu={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Histórico de Resíduos</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por descrição ou tipo..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">Todas as categorias</option>
                <option value="reciclavel">Reciclável</option>
                <option value="organico">Orgânico</option>
                <option value="perigoso">Perigoso</option>
                <option value="comum">Lixo Comum</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredHistory.length} {filteredHistory.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </p>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou termos de busca
              </p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4 flex-1">
                    {/* Image */}
                    {item.imageUrl && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt="Resíduo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.classification.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo[item.classification.category].color}`}>
                          {categoryInfo[item.classification.category].name}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-2 line-clamp-2">
                        <strong>Descrição:</strong> {item.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.createdAt.toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div>
                          {item.createdAt.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex-shrink-0"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver Detalhes</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {filteredHistory.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Suas Estatísticas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {mockHistory.length}
                </div>
                <div className="text-gray-600">Total de Consultas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {mockHistory.filter(item => item.classification.category === 'reciclavel').length}
                </div>
                <div className="text-gray-600">Recicláveis</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-500 mb-2">
                  {mockHistory.filter(item => item.classification.category === 'organico').length}
                </div>
                <div className="text-gray-600">Orgânicos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {mockHistory.filter(item => item.classification.category === 'perigoso').length}
                </div>
                <div className="text-gray-600">Perigosos</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
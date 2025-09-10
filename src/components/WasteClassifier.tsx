import React, { useState, useEffect } from 'react';
import { Search, Recycle, AlertTriangle, Leaf, Trash2, Info, Lightbulb } from 'lucide-react';

interface WasteItem {
  id: string;
  name: string;
  category: 'reciclavel' | 'organico' | 'perigoso' | 'comum';
  description: string;
  disposal: string;
  tips: string;
  color: string;
  icon: React.ReactNode;
}

const wasteDatabase: WasteItem[] = [
  {
    id: '1',
    name: 'Garrafa PET',
    category: 'reciclavel',
    description: 'Material plástico 100% reciclável',
    disposal: 'Descarte no contentor azul (recicláveis). Retire a tampa e lave antes do descarte.',
    tips: 'Uma garrafa PET pode virar camisetas, tapetes ou outras garrafas!',
    color: 'bg-blue-500',
    icon: <Recycle className="w-6 h-6" />
  },
  {
    id: '2',
    name: 'Casca de Banana',
    category: 'organico',
    description: 'Resíduo orgânico compostável',
    disposal: 'Descarte no contentor marrom (orgânicos) ou faça compostagem doméstica.',
    tips: 'Cascas de frutas viram excelente adubo natural em 60-90 dias!',
    color: 'bg-amber-600',
    icon: <Leaf className="w-6 h-6" />
  },
  {
    id: '3',
    name: 'Pilha',
    category: 'perigoso',
    description: 'Contém metais pesados tóxicos',
    disposal: 'Leve a pontos de coleta específicos em lojas ou postos de saúde.',
    tips: 'NUNCA descarte no lixo comum! Pode contaminar solo e água.',
    color: 'bg-red-500',
    icon: <AlertTriangle className="w-6 h-6" />
  },
  {
    id: '4',
    name: 'Papel de Bala',
    category: 'comum',
    description: 'Papel metalizado não reciclável',
    disposal: 'Descarte no lixo comum (contentor cinza).',
    tips: 'Papéis metalizados não podem ser reciclados devido ao revestimento.',
    color: 'bg-gray-500',
    icon: <Trash2 className="w-6 h-6" />
  },
  {
    id: '5',
    name: 'Vidro',
    category: 'reciclavel',
    description: 'Material 100% reciclável infinitas vezes',
    disposal: 'Descarte no contentor verde (vidros). Cuidado com fragmentos.',
    tips: 'O vidro pode ser reciclado infinitas vezes sem perder qualidade!',
    color: 'bg-green-500',
    icon: <Recycle className="w-6 h-6" />
  },
  {
    id: '6',
    name: 'Óleo de Cozinha',
    category: 'perigoso',
    description: 'Altamente poluente se descartado incorretamente',
    disposal: 'Leve a postos de coleta. Nunca descarte na pia ou no lixo.',
    tips: '1 litro de óleo pode contaminar até 1 milhão de litros de água!',
    color: 'bg-red-500',
    icon: <AlertTriangle className="w-6 h-6" />
  },
  {
    id: '7',
    name: 'Papelão',
    category: 'reciclavel',
    description: 'Material reciclável de alta demanda',
    disposal: 'Descarte no contentor azul. Desmonte as caixas antes.',
    tips: 'Papelão molhado não pode ser reciclado. Mantenha seco!',
    color: 'bg-blue-500',
    icon: <Recycle className="w-6 h-6" />
  },
  {
    id: '8',
    name: 'Resto de Comida',
    category: 'organico',
    description: 'Matéria orgânica compostável',
    disposal: 'Contentor marrom ou compostagem doméstica.',
    tips: 'Restos de comida podem virar adubo rico em nutrientes!',
    color: 'bg-amber-600',
    icon: <Leaf className="w-6 h-6" />
  }
];

const categoryInfo = {
  reciclavel: {
    name: 'Reciclável',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  organico: {
    name: 'Orgânico',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  perigoso: {
    name: 'Perigoso',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  comum: {
    name: 'Lixo Comum',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  }
};

export default function WasteClassifier() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<WasteItem[]>([]);
  const [suggestions, setSuggestions] = useState<WasteItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = wasteDatabase.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      
      const suggestionList = wasteDatabase.filter(item =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase()) && 
        item.name.toLowerCase() !== searchTerm.toLowerCase()
      ).slice(0, 3);
      setSuggestions(suggestionList);
      setShowSuggestions(suggestionList.length > 0 && searchTerm.length > 1);
    } else {
      setResults([]);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: WasteItem) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
  };

  const getRandomTip = () => {
    const tips = [
      "💡 Dica: Separe sempre os recicláveis limpos e secos!",
      "🌱 Você sabia? A compostagem reduz 30% do lixo doméstico!",
      "♻️ Reciclando, você economiza energia e preserva recursos naturais!",
      "⚠️ Pilhas e baterias contêm metais tóxicos - descarte corretamente!",
      "🌍 Cada pessoa gera cerca de 1kg de lixo por dia no Brasil!"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Recycle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EcoDev</h1>
              <p className="text-gray-600">Classificador Inteligente de Resíduos</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Como descartar seu resíduo?
            </h2>
            <p className="text-gray-600">
              Digite o nome do material e descubra a forma correta de descarte
            </p>
          </div>

          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: garrafa pet, pilha, casca de banana..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-lg"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b last:border-b-0"
                  >
                    <div className={`p-2 rounded-lg ${suggestion.color} text-white`}>
                      {suggestion.icon}
                    </div>
                    <span className="text-gray-900">{suggestion.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Resultados para "{searchTerm}"
            </h3>
            
            {results.map((item) => {
              const categoryStyle = categoryInfo[item.category];
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${categoryStyle.borderColor} transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${item.color} text-white`}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">
                            {item.name}
                          </h4>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryStyle.bgColor} ${categoryStyle.color} mt-1`}>
                            {categoryStyle.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-1">
                              Como descartar:
                            </h5>
                            <p className="text-gray-700">{item.disposal}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-1">
                              Dica importante:
                            </h5>
                            <p className="text-gray-700">{item.tips}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {searchTerm.length > 0 && results.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Não encontramos informações sobre "{searchTerm}"
            </p>
            <p className="text-sm text-gray-500">
              Tente termos como: garrafa pet, pilha, papelão, óleo de cozinha
            </p>
          </div>
        )}

        {/* Welcome Section */}
        {searchTerm.length === 0 && (
          <div className="space-y-8">
            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  {getRandomTip()}
                </h3>
                <p className="opacity-90">
                  Juntos podemos fazer a diferença para o meio ambiente!
                </p>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Pesquisas mais comuns
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wasteDatabase.slice(0, 8).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSearchTerm(item.name)}
                    className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className={`p-3 rounded-lg ${item.color} text-white mb-2 group-hover:scale-110 transition-transform duration-200`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>EcoDev</strong> - Promovendo sustentabilidade através da tecnologia
            </p>
            <p className="text-sm">
              Baseado na Política Nacional de Resíduos Sólidos (Lei 12.305/2010)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
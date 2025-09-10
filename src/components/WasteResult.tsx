import React from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Recycle, AlertTriangle, Leaf, Trash2, Info, Lightbulb } from 'lucide-react';
import { WasteClassification } from '../types';

interface WasteResultProps {
  classification: WasteClassification;
  description: string;
  imageUrl?: string | null;
  onBack: () => void;
  onBackToMenu: () => void;
}

const categoryInfo = {
  reciclavel: {
    name: 'Reciclável',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: <Recycle className="w-6 h-6" />
  },
  organico: {
    name: 'Orgânico',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: <Leaf className="w-6 h-6" />
  },
  perigoso: {
    name: 'Perigoso',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: <AlertTriangle className="w-6 h-6" />
  },
  comum: {
    name: 'Lixo Comum',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    icon: <Trash2 className="w-6 h-6" />
  }
};

export default function WasteResult({ classification, description, imageUrl, onBack, onBackToMenu }: WasteResultProps) {
  const categoryStyle = categoryInfo[classification.category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Nova Consulta</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Resultado da Classificação</h1>
            </div>
            <button
              onClick={onBackToMenu}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${categoryStyle.borderColor}`}>
            <div className="p-6">
              {/* Header with image */}
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {imageUrl && (
                  <div className="md:w-1/3">
                    <img
                      src={imageUrl}
                      alt="Resíduo enviado"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg ${categoryStyle.bgColor} ${categoryStyle.color}`}>
                      {categoryStyle.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{classification.name}</h2>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryStyle.bgColor} ${categoryStyle.color} mt-1`}>
                        {categoryStyle.name}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Sua descrição:</strong> "{description}"
                    </p>
                  </div>
                  <p className="text-gray-700">{classification.description}</p>
                </div>
              </div>

              {/* Disposal Instructions */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Como descartar:</h3>
                    <p className="text-gray-700">{classification.disposal}</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dica importante:</h3>
                    <p className="text-gray-700">{classification.tips}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collection Points */}
          {classification.collectionPoints.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-green-500" />
                <span>Pontos de Coleta Próximos</span>
              </h3>

              {/* Interactive Map Placeholder */}
              <div className="bg-gray-100 rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Mapa Interativo</p>
                  <p className="text-sm">Visualização dos pontos de coleta</p>
                </div>
              </div>

              {/* Collection Points List */}
              <div className="space-y-4">
                {classification.collectionPoints.map((point) => (
                  <div key={point.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{point.name}</h4>
                      <div className="flex space-x-2">
                        {point.acceptedTypes.map((type) => (
                          <span key={type} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{point.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{point.hours}</span>
                      </div>
                      {point.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{point.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Classificar Outro Resíduo
            </button>
            <button
              onClick={onBackToMenu}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Voltar ao Menu Principal
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
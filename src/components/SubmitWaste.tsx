import React, { useState } from 'react';
import { Camera, Upload, ArrowLeft, Send, Loader } from 'lucide-react';
import WasteResult from './WasteResult';
import { WasteClassification } from '../types';

interface SubmitWasteProps {
  onBack: () => void;
  onSubmit: (description: string, imageFile?: File) => void;
}

// Mock database for waste classification
const wasteDatabase: Record<string, WasteClassification> = {
  'garrafa': {
    category: 'reciclavel',
    name: 'Garrafa PET',
    description: 'Material plástico 100% reciclável, amplamente utilizado em embalagens de bebidas.',
    disposal: 'Descarte no contentor azul (recicláveis). Retire a tampa e lave antes do descarte para facilitar o processo de reciclagem.',
    tips: 'Uma garrafa PET pode ser transformada em camisetas, tapetes, vassouras ou outras garrafas! O processo de reciclagem economiza até 70% de energia.',
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
      },
      {
        id: '2',
        name: 'Cooperativa Verde',
        address: 'Av. Sustentável, 456 - Vila Eco',
        lat: -23.5525,
        lng: -46.6350,
        acceptedTypes: ['Plástico', 'Papel', 'Papelão'],
        hours: 'Seg-Sex: 7h-16h',
        phone: '(11) 9876-5432'
      }
    ]
  },
  'pilha': {
    category: 'perigoso',
    name: 'Pilha/Bateria',
    description: 'Contém metais pesados tóxicos como mercúrio, chumbo e cádmio que podem contaminar o meio ambiente.',
    disposal: 'NUNCA descarte no lixo comum! Leve a pontos de coleta específicos em lojas de eletrônicos, farmácias ou postos de saúde.',
    tips: 'Uma única pilha pode contaminar até 20 mil litros de água! Sempre procure pontos de coleta especializados.',
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
  },
  'banana': {
    category: 'organico',
    name: 'Casca de Banana',
    description: 'Resíduo orgânico rico em potássio e outros nutrientes, ideal para compostagem.',
    disposal: 'Descarte no contentor marrom (orgânicos) ou utilize para compostagem doméstica.',
    tips: 'Cascas de frutas se decompõem em 60-90 dias na compostagem, gerando adubo natural rico em nutrientes!',
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
};

export default function SubmitWaste({ onBack, onSubmit }: SubmitWasteProps) {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<WasteClassification | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      // Simple keyword matching for demo
      const keywords = Object.keys(wasteDatabase);
      const foundKeyword = keywords.find(keyword => 
        description.toLowerCase().includes(keyword)
      );

      if (foundKeyword) {
        setResult(wasteDatabase[foundKeyword]);
      } else {
        // Default result for unknown items
        setResult({
          category: 'comum',
          name: 'Item não identificado',
          description: 'Não foi possível identificar especificamente este resíduo.',
          disposal: 'Descarte no lixo comum (contentor cinza) até obter mais informações específicas.',
          tips: 'Para uma classificação mais precisa, tente ser mais específico na descrição ou consulte órgãos ambientais locais.',
          collectionPoints: []
        });
      }
      setIsProcessing(false);
    }, 2000);
  };

  if (result) {
    return (
      <WasteResult
        classification={result}
        description={description}
        imageUrl={imagePreview}
        onBack={() => {
          setResult(null);
          setDescription('');
          setImageFile(null);
          setImagePreview(null);
        }}
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
            <h1 className="text-2xl font-bold text-gray-900">Enviar Novo Resíduo</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Foto do Resíduo (Opcional)
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                        <Upload className="w-5 h-5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                        <Camera className="w-5 h-5" />
                        <span>Câmera</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Tire uma foto ou faça upload de uma imagem do resíduo
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Resíduo *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: garrafa de plástico transparente, pilha AA usada, casca de banana..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                rows={4}
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Seja específico para obter uma classificação mais precisa
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || !description.trim()}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Classificar Resíduo</span>
                </>
              )}
            </button>
          </form>

          {/* Tips */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Dicas para melhor classificação:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Seja específico: "garrafa PET" ao invés de "plástico"</li>
              <li>• Mencione a cor e tamanho quando relevante</li>
              <li>• Inclua o estado: "usado", "quebrado", "limpo"</li>
              <li>• Para eletrônicos, mencione marca e modelo</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
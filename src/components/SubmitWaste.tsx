import React, { useState } from 'react';
import { Camera, Upload, ArrowLeft, Send, Loader } from 'lucide-react';
import WasteResult from './WasteResult';
import { WasteClassification } from '../types';

interface SubmitWasteProps {
  onBack: () => void;
  onSubmit: (description: string, imageFile?: File) => void;
}

// Definição das categorias de resíduos com sinônimos e palavras-chave
interface WasteCategory {
  keywords: string[];
  classification: WasteClassification;
}

// Base de dados de categorias de resíduos com validação inteligente
const wasteCategories: WasteCategory[] = [
  {
    keywords: [
      'garrafa', 'garrafinha', 'pet', 'plastico', 'plástico', 'refrigerante', 
      'agua', 'água', 'suco', 'coca', 'pepsi', 'fanta', 'guarana', 'embalagem plastica'
    ],
    classification: {
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
          phone: '(65) 1234-5678'
        },
        {
          id: '2',
          name: 'Cooperativa Verde',
          address: 'Av. Sustentável, 456 - Vila Eco',
          lat: -23.5525,
          lng: -46.6350,
          acceptedTypes: ['Plástico', 'Papel', 'Papelão'],
          hours: 'Seg-Sex: 7h-16h',
          phone: '(65) 9876-5432'
        }
      ]
    }
  },
  {
    keywords: [
      'pilha', 'bateria', 'baterias', 'aa', 'aaa', 'controle', 'remoto', 
      'relogio', 'relógio', 'alcalina', 'lithium', 'lítio', 'celular', 'smartphone'
    ],
    classification: {
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
          phone: '(65) 2345-6789'
        }
      ]
    }
  },
  {
    keywords: [
      'banana', 'casca', 'fruta', 'frutas', 'maca', 'maçã', 'laranja', 'resto', 
      'restos', 'comida', 'organico', 'orgânico', 'vegetal', 'legume', 'verdura'
    ],
    classification: {
      category: 'organico',
      name: 'Resíduo Orgânico',
      description: 'Resíduo orgânico rico em nutrientes, ideal para compostagem.',
      disposal: 'Descarte no contentor marrom (orgânicos) ou utilize para compostagem doméstica.',
      tips: 'Resíduos orgânicos se decompõem em 60-90 dias na compostagem, gerando adubo natural rico em nutrientes!',
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
  },
  {
    keywords: [
      'papel', 'papelao', 'papelão', 'caixa', 'revista', 'jornal', 'livro', 
      'caderno', 'folha', 'documento', 'envelope', 'cartao', 'cartão'
    ],
    classification: {
      category: 'reciclavel',
      name: 'Papel/Papelão',
      description: 'Material reciclável que pode ser transformado em novos produtos de papel.',
      disposal: 'Descarte no contentor azul (recicláveis). Certifique-se de que esteja limpo e seco.',
      tips: 'Uma tonelada de papel reciclado economiza cerca de 20 árvores e 50% de água no processo de fabricação!',
      collectionPoints: [
        {
          id: '2',
          name: 'Cooperativa Verde',
          address: 'Av. Sustentável, 456 - Vila Eco',
          lat: -23.5525,
          lng: -46.6350,
          acceptedTypes: ['Plástico', 'Papel', 'Papelão'],
          hours: 'Seg-Sex: 7h-16h',
          phone: '(65) 9876-5432'
        }
      ]
    }
  },
  {
    keywords: [
      'vidro', 'garrafa vidro', 'pote', 'frasco', 'vinho', 'cerveja', 
      'conserva', 'geleia', 'perfume', 'cristal'
    ],
    classification: {
      category: 'reciclavel',
      name: 'Vidro',
      description: 'Material 100% reciclável que pode ser reutilizado infinitas vezes sem perda de qualidade.',
      disposal: 'Descarte no contentor azul (recicláveis). Remova tampas e rótulos quando possível.',
      tips: 'O vidro é o material mais sustentável para embalagens - pode ser reciclado infinitas vezes!',
      collectionPoints: [
        {
          id: '1',
          name: 'Ecoponto Central',
          address: 'Rua das Flores, 123 - Centro',
          lat: -23.5505,
          lng: -46.6333,
          acceptedTypes: ['Plástico', 'Vidro', 'Metal'],
          hours: 'Seg-Sex: 8h-17h, Sáb: 8h-12h',
          phone: '(65) 1234-5678'
        }
      ]
    }
  },
  {
    keywords: [
      'metal', 'lata', 'aluminio', 'alumínio', 'ferro', 'aco', 'aço', 'tampa', 
      'parafuso', 'prego', 'arame', 'refrigerante lata', 'cerveja lata'
    ],
    classification: {
      category: 'reciclavel',
      name: 'Metal/Alumínio',
      description: 'Materiais metálicos altamente recicláveis e valiosos no mercado de reciclagem.',
      disposal: 'Descarte no contentor azul (recicláveis). Lave para remover resíduos de alimentos.',
      tips: 'Uma lata de alumínio pode voltar às prateleiras em apenas 60 dias após a reciclagem!',
      collectionPoints: [
        {
          id: '1',
          name: 'Ecoponto Central',
          address: 'Rua das Flores, 123 - Centro',
          lat: -23.5505,
          lng: -46.6333,
          acceptedTypes: ['Plástico', 'Vidro', 'Metal'],
          hours: 'Seg-Sex: 8h-17h, Sáb: 8h-12h',
          phone: '(65) 1234-5678'
        }
      ]
    }
  }
];

// Função para classificar resíduo baseado na descrição
function classifyWaste(description: string): WasteClassification | null {
  const normalizedDescription = description.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s]/g, '') // Remove pontuação
    .trim();

  // Busca por correspondência exata ou parcial
  for (const category of wasteCategories) {
    for (const keyword of category.keywords) {
      const normalizedKeyword = keyword.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      
      // Verifica se a palavra-chave está contida na descrição
      if (normalizedDescription.includes(normalizedKeyword)) {
        return category.classification;
      }
    }
  }

  return null;
}

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
      // Usar a nova função de classificação inteligente
      const classification = classifyWaste(description);

      if (classification) {
        setResult(classification);
      } else {
        // Default result for unknown items
        setResult({
          category: 'comum',
          name: 'Item não identificado',
          description: 'Não foi possível identificar especificamente este resíduo com base na descrição fornecida.',
          disposal: 'Descarte no lixo comum (contentor cinza) até obter mais informações específicas sobre o tipo de material.',
          tips: 'Para uma classificação mais precisa, tente ser mais específico na descrição (ex: "garrafa PET transparente", "pilha AA", "casca de banana") ou consulte órgãos ambientais locais.',
          collectionPoints: [
            {
              id: '5',
              name: 'Central de Atendimento Ambiental',
              address: 'Rua da Sustentabilidade, 100 - Centro',
              lat: -23.5500,
              lng: -46.6330,
              acceptedTypes: ['Consultas gerais', 'Identificação de resíduos'],
              hours: 'Seg-Sex: 8h-17h',
              phone: '(65) 0800-MEIO-AMBIENTE'
            }
          ]
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
                placeholder="Ex: garrafinha pet, pilha AA, casca de banana, lata de refrigerante, caixa de papelão..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                rows={4}
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                O sistema reconhece variações como "garrafinha PET", "bateria do controle", "resto de comida", etc.
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
            <h3 className="font-semibold text-blue-900 mb-2">Sistema de Reconhecimento Inteligente:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Plásticos:</strong> "garrafinha PET", "embalagem plástica", "garrafa água"</li>
              <li>• <strong>Pilhas/Baterias:</strong> "pilha AA", "bateria celular", "controle remoto"</li>
              <li>• <strong>Orgânicos:</strong> "casca banana", "resto comida", "frutas"</li>
              <li>• <strong>Papel:</strong> "caixa papelão", "revista", "documento"</li>
              <li>• <strong>Vidro:</strong> "pote conserva", "garrafa vinho", "frasco perfume"</li>
              <li>• <strong>Metal:</strong> "lata refrigerante", "tampa metal", "alumínio"</li>
            </ul>
            <p className="text-xs text-blue-600 mt-2">
              💡 O sistema reconhece sinônimos e ignora acentos automaticamente!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
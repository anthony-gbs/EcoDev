export interface User {
  id: string;
  name: string;
  email: string;
}

export interface WasteSubmission {
  id: string;
  userId: string;
  description: string;
  imageUrl?: string;
  classification: WasteClassification;
  createdAt: Date;
}

export interface WasteClassification {
  category: 'reciclavel' | 'organico' | 'perigoso' | 'comum';
  name: string;
  description: string;
  disposal: string;
  tips: string;
  collectionPoints: CollectionPoint[];
}

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  acceptedTypes: string[];
  hours: string;
  phone?: string;
}
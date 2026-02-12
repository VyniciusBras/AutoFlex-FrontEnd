export interface RawMaterial {
  id?: number;
  name: string;
  stockQuantity: number;
}

export interface ProductComposition {
  id?: number;
  rawMaterialId?: number;
  rawMaterial?: RawMaterial;
  quantityRequired: number;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  compositions: ProductComposition[];
}

export interface MaterialComposition {
  name: string;
  quantity: number;
}

export interface ProductionSuggestion {
  productName: string;
  quantityPossible: number;
  totalPrice: number;
  materialsUsed: MaterialComposition[];
}

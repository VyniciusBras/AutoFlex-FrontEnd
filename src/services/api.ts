import axios from "axios";
import { RawMaterial, Product, ProductionSuggestion } from "@/types/inventory";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const inventoryService = {
  getMaterials: () =>
    api.get<RawMaterial[]>("/materials").then((res) => res.data),

  createMaterial: (data: RawMaterial) =>
    api.post<RawMaterial>("/materials", data),

  updateMaterial: (id: number, data: RawMaterial) =>
    api.put<RawMaterial>(`/materials/${id}`, data),

  deleteMaterial: (id: number) => api.delete(`/materials/${id}`),
  getProducts: () => api.get<Product[]>("/products").then((res) => res.data),

  createProduct: (data: Partial<Product>) =>
    api.post<Product>("/products", data),

  deleteProduct: (name: string) =>
    api.delete(`/products/${encodeURIComponent(name)}`),

  getProductionSuggestions: () =>
    api
      .get<ProductionSuggestion[]>("/products/suggested-production")
      .then((res) => res.data),
};

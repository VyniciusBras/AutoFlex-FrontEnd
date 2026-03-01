import { useState, useEffect, useCallback } from "react";
import { inventoryService } from "../services/api";
import { RawMaterial, ProductionSuggestion } from "@/types/inventory";

export function useInventory() {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [suggestions, setSuggestions] = useState<ProductionSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const materialsData = await inventoryService.getMaterials();
      setMaterials(materialsData);
      try {
        const suggestionsData =
          await inventoryService.getProductionSuggestions();
        setSuggestions(suggestionsData);
      } catch (suggErr) {
        setSuggestions([]);
      }
    } catch (err) {
      setError("Server connection error.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return { materials, suggestions, isLoading, error, refreshData };
}

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Product, GarageVehicle } from '@/lib/types';

// --- Types ---

type FitmentResult = 'fits' | 'does-not-fit' | 'universal' | null;

interface GarageContextValue {
  vehicles: GarageVehicle[];
  activeVehicle: GarageVehicle | null;
  addVehicle: (vehicle: Omit<GarageVehicle, 'id'>) => void;
  removeVehicle: (id: string) => void;
  setActiveVehicle: (id: string) => void;
  updateNickname: (id: string, nickname: string) => void;
  clearActiveVehicle: () => void;
  checkFitment: (product: Product) => FitmentResult;
  isGarageOpen: boolean;
  openGarage: () => void;
  closeGarage: () => void;
  toggleGarage: () => void;
}

// --- Constants ---

const STORAGE_KEY = 'turn-key-garage';
const MAX_VEHICLES = 5;

// --- Storage helpers ---

interface StoredGarage {
  vehicles: GarageVehicle[];
  activeId: string | null;
}

function loadGarage(): StoredGarage | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as StoredGarage;
  } catch {
    // Corrupted data — start fresh
  }
  return null;
}

function saveGarage(data: StoredGarage): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

// --- Context ---

const GarageContext = createContext<GarageContextValue | null>(null);

// --- Provider ---

interface GarageProviderProps {
  children: ReactNode;
}

export function GarageProvider({ children }: GarageProviderProps) {
  const [vehicles, setVehicles] = useState<GarageVehicle[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadGarage();
    if (stored) {
      setVehicles(stored.vehicles);
      setActiveId(stored.activeId);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (!hydrated) return;
    saveGarage({ vehicles, activeId });
  }, [vehicles, activeId, hydrated]);

  const activeVehicle = vehicles.find((v) => v.id === activeId) ?? null;

  const addVehicle = useCallback((vehicle: Omit<GarageVehicle, 'id'>) => {
    setVehicles((prev) => {
      if (prev.length >= MAX_VEHICLES) return prev;
      const newVehicle: GarageVehicle = {
        ...vehicle,
        id: crypto.randomUUID(),
      };
      return [...prev, newVehicle];
    });
    // Auto-set as active if it's the first vehicle
    setVehicles((prev) => {
      if (prev.length === 1) {
        setActiveId(prev[0].id);
      } else {
        // Set the newest one as active
        setActiveId(prev[prev.length - 1].id);
      }
      return prev;
    });
  }, []);

  const removeVehicle = useCallback((id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const setActiveVehicle = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const updateNickname = useCallback((id: string, nickname: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, nickname } : v)),
    );
  }, []);

  const clearActiveVehicle = useCallback(() => {
    setActiveId(null);
  }, []);

  const checkFitment = useCallback(
    (product: Product): FitmentResult => {
      if (!activeVehicle) return null;
      if (product.fitment.length === 0) return 'universal';

      const fits = product.fitment.some((f) => {
        // Check make
        if (f.make !== activeVehicle.make) return false;

        // Check model — active vehicle model should start with fitment model
        // e.g., "Camaro SS" starts with "Camaro" ✓
        // e.g., "Challenger R/T" starts with "Challenger R/T" ✓
        if (!activeVehicle.model.startsWith(f.model)) return false;

        // Check year range
        if (activeVehicle.year < f.yearStart || activeVehicle.year > f.yearEnd) return false;

        // Check engine (optional — if fitment doesn't specify engine, match by make/model/year only)
        if (f.engine) {
          // Partial match: check if either contains the other's key part
          const fitEngine = f.engine.toLowerCase();
          const activeEngine = activeVehicle.engine.toLowerCase();
          if (fitEngine !== activeEngine && !activeEngine.includes(fitEngine) && !fitEngine.includes(activeEngine)) {
            return false;
          }
        }

        return true;
      });

      return fits ? 'fits' : 'does-not-fit';
    },
    [activeVehicle],
  );

  const openGarage = useCallback(() => setIsGarageOpen(true), []);
  const closeGarage = useCallback(() => setIsGarageOpen(false), []);
  const toggleGarage = useCallback(() => setIsGarageOpen((prev) => !prev), []);

  const value: GarageContextValue = {
    vehicles,
    activeVehicle,
    addVehicle,
    removeVehicle,
    setActiveVehicle,
    updateNickname,
    clearActiveVehicle,
    checkFitment,
    isGarageOpen,
    openGarage,
    closeGarage,
    toggleGarage,
  };

  return <GarageContext value={value}>{children}</GarageContext>;
}

export function useGarage(): GarageContextValue {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error('useGarage must be used within a GarageProvider');
  return ctx;
}

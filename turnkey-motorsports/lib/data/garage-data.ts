// ============================================================
// Turn-Key Motorsport — Vehicle Garage Data
// Cascading Year/Make/Model/Engine dataset for the Garage tool
// ============================================================

export interface GarageVehicleOption {
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  engines: string[];
}

const GARAGE_VEHICLES: GarageVehicleOption[] = [
  // --- Chevrolet ---
  { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2010, yearEnd: 2015, engines: ['LS3 6.2L', 'L99 6.2L'] },
  { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2016, yearEnd: 2024, engines: ['LT1 6.2L'] },
  { make: 'Chevrolet', model: 'Camaro ZL1', yearStart: 2012, yearEnd: 2015, engines: ['LSA 6.2L SC'] },
  { make: 'Chevrolet', model: 'Camaro ZL1', yearStart: 2017, yearEnd: 2024, engines: ['LT4 6.2L SC'] },
  { make: 'Chevrolet', model: 'Corvette', yearStart: 2008, yearEnd: 2013, engines: ['LS3 6.2L'] },
  { make: 'Chevrolet', model: 'Corvette Z06', yearStart: 2015, yearEnd: 2019, engines: ['LT4 6.2L SC'] },
  { make: 'Chevrolet', model: 'Silverado 1500', yearStart: 2014, yearEnd: 2018, engines: ['L83 5.3L', 'L86 6.2L'] },
  { make: 'Chevrolet', model: 'Silverado 1500', yearStart: 2019, yearEnd: 2024, engines: ['L84 5.3L', 'L87 6.2L'] },

  // --- Ford ---
  { make: 'Ford', model: 'Mustang GT', yearStart: 2011, yearEnd: 2017, engines: ['Coyote 5.0L'] },
  { make: 'Ford', model: 'Mustang GT', yearStart: 2018, yearEnd: 2024, engines: ['Coyote 5.0L Gen 3'] },
  { make: 'Ford', model: 'Mustang Shelby GT350', yearStart: 2016, yearEnd: 2020, engines: ['Voodoo 5.2L'] },
  { make: 'Ford', model: 'F-150', yearStart: 2015, yearEnd: 2020, engines: ['Coyote 5.0L', 'EcoBoost 3.5L'] },

  // --- Dodge ---
  { make: 'Dodge', model: 'Challenger R/T', yearStart: 2011, yearEnd: 2024, engines: ['5.7L HEMI'] },
  { make: 'Dodge', model: 'Challenger Scat Pack', yearStart: 2015, yearEnd: 2024, engines: ['6.4L HEMI 392'] },
  { make: 'Dodge', model: 'Challenger Hellcat', yearStart: 2015, yearEnd: 2023, engines: ['6.2L Hellcat SC'] },
  { make: 'Dodge', model: 'Charger R/T', yearStart: 2011, yearEnd: 2024, engines: ['5.7L HEMI'] },
  { make: 'Dodge', model: 'Charger Scat Pack', yearStart: 2015, yearEnd: 2024, engines: ['6.4L HEMI 392'] },

  // --- GMC ---
  { make: 'GMC', model: 'Sierra 1500', yearStart: 2014, yearEnd: 2018, engines: ['L83 5.3L', 'L86 6.2L'] },
  { make: 'GMC', model: 'Sierra 1500', yearStart: 2019, yearEnd: 2024, engines: ['L84 5.3L', 'L87 6.2L'] },
];

// --- Helper Functions ---

/** All unique years across all vehicles, descending order */
export function getAvailableYears(): number[] {
  const years = new Set<number>();
  for (const v of GARAGE_VEHICLES) {
    for (let y = v.yearStart; y <= v.yearEnd; y++) {
      years.add(y);
    }
  }
  return Array.from(years).sort((a, b) => b - a);
}

/** Makes that have a vehicle covering this year */
export function getMakesForYear(year: number): string[] {
  const makes = new Set<string>();
  for (const v of GARAGE_VEHICLES) {
    if (year >= v.yearStart && year <= v.yearEnd) {
      makes.add(v.make);
    }
  }
  return Array.from(makes).sort();
}

/** Models for a specific year + make combination */
export function getModelsForYearMake(year: number, make: string): string[] {
  const models = new Set<string>();
  for (const v of GARAGE_VEHICLES) {
    if (v.make === make && year >= v.yearStart && year <= v.yearEnd) {
      models.add(v.model);
    }
  }
  return Array.from(models).sort();
}

/** Engines available for a specific year + make + model combination */
export function getEnginesForYearMakeModel(year: number, make: string, model: string): string[] {
  const engines = new Set<string>();
  for (const v of GARAGE_VEHICLES) {
    if (v.make === make && v.model === model && year >= v.yearStart && year <= v.yearEnd) {
      for (const eng of v.engines) {
        engines.add(eng);
      }
    }
  }
  return Array.from(engines).sort();
}

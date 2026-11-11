export type MileageUnit = "kmpl" | "l100km" | "mpg";

export interface FuelCostInput {
  /** Trip distance: kilometres for km/L and L/100km, miles for mpg. */
  distance: number;
  /** Fuel efficiency in the chosen unit. */
  mileage: number;
  /** Fuel price: ₹/litre for km/L and L/100km, ₹/gallon for mpg. */
  price: number;
  unit: MileageUnit;
  roundTrip: boolean;
  passengers: number;
}

export interface FuelCostResult {
  /** Fuel needed in litres (km/L, L/100km) or gallons (mpg). */
  fuelNeeded: number;
  fuelUnit: "L" | "gal";
  totalCost: number;
  costPerPerson: number;
  /** Cost per km (or per mile for mpg). */
  costPerDistance: number;
  distanceUnit: "km" | "mi";
  /** Effective consumption in L/100km (null for mpg). */
  litresPer100Km: number | null;
}

/** Fuel cost = (distance / mileage) × price, with unit conversions. */
export function calculateFuelCost(
  input: FuelCostInput
): FuelCostResult | { error: string } {
  const { distance, mileage, price, unit, roundTrip, passengers } = input;

  if (!Number.isFinite(distance) || distance <= 0) {
    return { error: "Trip distance must be greater than zero." };
  }
  if (!Number.isFinite(mileage) || mileage <= 0) {
    return { error: "Mileage must be greater than zero." };
  }
  if (!Number.isFinite(price) || price <= 0) {
    return { error: "Fuel price must be greater than zero." };
  }
  if (!Number.isFinite(passengers) || passengers < 1 || passengers > 20) {
    return { error: "Passengers must be between 1 and 20." };
  }

  const totalDistance = roundTrip ? distance * 2 : distance;

  let fuelNeeded: number;
  let fuelUnit: "L" | "gal";
  let litresPer100Km: number | null;

  if (unit === "kmpl") {
    fuelNeeded = totalDistance / mileage;
    fuelUnit = "L";
    litresPer100Km = Math.round((100 / mileage) * 100) / 100;
  } else if (unit === "l100km") {
    fuelNeeded = (totalDistance * mileage) / 100;
    fuelUnit = "L";
    litresPer100Km = mileage;
  } else {
    fuelNeeded = totalDistance / mileage;
    fuelUnit = "gal";
    litresPer100Km = null;
  }

  const round2 = (n: number) => Math.round(n * 100) / 100;
  const totalCost = round2(fuelNeeded * price);

  return {
    fuelNeeded: round2(fuelNeeded),
    fuelUnit,
    totalCost,
    costPerPerson: round2(totalCost / passengers),
    costPerDistance: round2(totalCost / totalDistance),
    distanceUnit: unit === "mpg" ? "mi" : "km",
    litresPer100Km,
  };
}

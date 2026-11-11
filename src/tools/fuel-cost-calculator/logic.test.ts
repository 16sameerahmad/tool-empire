import { describe, it, expect } from "vitest";
import { calculateFuelCost } from "./logic";

describe("Fuel Cost Calculator Logic", () => {
  it("calculates one-way cost in km/L (worked example)", () => {
    // Delhi–Jaipur 280 km @ 15 km/L @ ₹100/L: 280/15 = 18.67 L, ₹1,866.67
    const res = calculateFuelCost({
      distance: 280,
      mileage: 15,
      price: 100,
      unit: "kmpl",
      roundTrip: false,
      passengers: 1,
    });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.fuelNeeded).toBe(18.67);
      expect(res.fuelUnit).toBe("L");
      expect(res.totalCost).toBe(1866.67);
      expect(res.costPerDistance).toBe(6.67); // 1866.67 / 280
      expect(res.litresPer100Km).toBe(6.67); // 100 / 15
    }
  });

  it("doubles distance for round trip and splits per person", () => {
    const res = calculateFuelCost({
      distance: 280,
      mileage: 15,
      price: 100,
      unit: "kmpl",
      roundTrip: true,
      passengers: 4,
    });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.totalCost).toBe(3733.33);
      expect(res.costPerPerson).toBe(933.33);
    }
  });

  it("calculates L/100km consumption", () => {
    // 280 km @ 8 L/100km @ ₹100/L: 22.4 L, ₹2,240
    const res = calculateFuelCost({
      distance: 280,
      mileage: 8,
      price: 100,
      unit: "l100km",
      roundTrip: false,
      passengers: 1,
    });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.fuelNeeded).toBe(22.4);
      expect(res.totalCost).toBe(2240);
      expect(res.litresPer100Km).toBe(8);
    }
  });

  it("calculates mpg in gallons and miles", () => {
    // 300 miles @ 30 mpg @ ₹380/gallon: 10 gal, ₹3,800
    const res = calculateFuelCost({
      distance: 300,
      mileage: 30,
      price: 380,
      unit: "mpg",
      roundTrip: false,
      passengers: 1,
    });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.fuelNeeded).toBe(10);
      expect(res.fuelUnit).toBe("gal");
      expect(res.totalCost).toBe(3800);
      expect(res.distanceUnit).toBe("mi");
      expect(res.litresPer100Km).toBe(null);
    }
  });

  it("rejects invalid inputs", () => {
    const base = { distance: 100, mileage: 15, price: 100, unit: "kmpl" as const, roundTrip: false, passengers: 1 };
    expect("error" in calculateFuelCost({ ...base, distance: 0 })).toBe(true);
    expect("error" in calculateFuelCost({ ...base, mileage: 0 })).toBe(true);
    expect("error" in calculateFuelCost({ ...base, price: -5 })).toBe(true);
    expect("error" in calculateFuelCost({ ...base, passengers: 0 })).toBe(true);
    expect("error" in calculateFuelCost({ ...base, passengers: 21 })).toBe(true);
  });
});

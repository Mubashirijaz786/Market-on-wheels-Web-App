import { CartItem, CartVendorGroup, DeliveryCalculation } from '../types';
import { vendors } from '../data/mockData';

export interface DeliveryPricingConfig {
  baseFee: number; // Base fee for first vendor pickup & primary leg (Rs.)
  additionalStopFee: number; // Cost for each incremental pickup vendor (Rs.)
  perKmRate: number; // Rate per estimated total kilometer (Rs.)
  standardSingleVendorFee: number; // Baseline reference if each vendor dispatched independently
}

export const DEFAULT_PRICING_CONFIG: DeliveryPricingConfig = {
  baseFee: 100,
  additionalStopFee: 40,
  perKmRate: 15,
  standardSingleVendorFee: 120,
};

/**
 * Groups raw cart items by their respective vendor
 */
export function groupCartItemsByVendor(items: CartItem[]): CartVendorGroup[] {
  const map = new Map<string, CartVendorGroup>();

  for (const item of items) {
    const vendor = vendors.find(v => v.id === item.vendorId);
    const existing = map.get(item.vendorId);

    if (existing) {
      existing.items.push(item);
      existing.vendorSubtotal += item.price * item.quantity;
    } else {
      map.set(item.vendorId, {
        vendorId: item.vendorId,
        vendorName: item.vendorName,
        vendorZone: vendor ? vendor.zone : 'Central Zone A',
        items: [item],
        vendorSubtotal: item.price * item.quantity,
        estimatedPickupDistanceKm: vendor ? vendor.distanceKm : 1.5,
      });
    }
  }

  return Array.from(map.values());
}

/**
 * Calculates simulated smart delivery charges and multi-vendor consolidated savings
 */
export function calculateDeliveryFee(
  vendorGroups: CartVendorGroup[],
  config: DeliveryPricingConfig = DEFAULT_PRICING_CONFIG
): DeliveryCalculation {
  const vendorCount = vendorGroups.length;

  if (vendorCount === 0) {
    return {
      baseFee: 0,
      additionalPickupFee: 0,
      zoneSurcharge: 0,
      savingsVsIndividual: 0,
      totalDeliveryFee: 0,
      totalDistanceKm: 0,
      estimatedTotalMinutes: 0,
      vendorCount: 0,
      zoneSummary: 'No vendors in cart',
    };
  }

  // Calculate cumulative route distance
  // Primary distance = max single vendor distance, plus 0.8 km for each additional contiguous pickup stop
  const maxVendorDistance = Math.max(...vendorGroups.map(g => g.estimatedPickupDistanceKm), 1.2);
  const totalDistanceKm = Number((maxVendorDistance + (vendorCount - 1) * 0.7).toFixed(1));

  // Base fee covers primary dropoff + 1st vendor
  const baseFee = config.baseFee;

  // Additional vendor pickup charges
  const additionalPickupFee = (vendorCount - 1) * config.additionalStopFee;

  // Distance addition
  const distanceAddition = Math.round(totalDistanceKm * config.perKmRate * 0.5);

  const totalDeliveryFee = baseFee + additionalPickupFee + distanceAddition;

  // Comparative calculation: What the customer would pay if each vendor ordered individually
  const individualDeliveriesTotal = vendorCount * config.standardSingleVendorFee;
  const savingsVsIndividual = Math.max(0, individualDeliveriesTotal - totalDeliveryFee);

  // Time estimate: 20 min base + 8 min per additional vendor
  const estimatedTotalMinutes = 20 + (vendorCount - 1) * 8;

  const zones = Array.from(new Set(vendorGroups.map(g => g.vendorZone)));
  const zoneSummary = zones.join(', ');

  return {
    baseFee,
    additionalPickupFee,
    zoneSurcharge: 0,
    savingsVsIndividual,
    totalDeliveryFee,
    totalDistanceKm,
    estimatedTotalMinutes,
    vendorCount,
    zoneSummary,
  };
}

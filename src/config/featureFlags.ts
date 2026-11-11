/**
 * Market on Wheels - Centralized Feature Flags Configuration
 * 
 * Controls visible and accessible features for the Supervisor Review Demo.
 * 
 * When `supervisorDemoMode` is TRUE:
 * - Only the 6 current Gantt chart tasks are visible & accessible (Tasks 9-14).
 * - Advanced features (AI Chatbot, Autonomous Ordering, Advanced Route Optimization, etc.)
 *   are safely hidden from navigation and direct route access without deleting any source code.
 * 
 * When `supervisorDemoMode` is FALSE:
 * - The complete full application (all AI tools, advanced routing, autonomous agents) is restored.
 */

export interface FeatureFlags {
  // Master demo switch
  supervisorDemoMode: boolean;

  // Task 9 - Core Layouts and Navigation
  coreLayouts: boolean;

  // Task 10 - User Account and Profile Interfaces
  userAccounts: boolean;

  // Task 11 - Vendor and Product Browsing Interfaces
  vendorBrowsing: boolean;
  productBrowsing: boolean;

  // Task 12 - Cart, Checkout and Order Interfaces
  cart: boolean;
  checkout: boolean;
  orders: boolean;

  // Task 13 - Vendor and Admin Interfaces
  vendorInterfaces: boolean;
  adminInterfaces: boolean;

  // Features hidden in supervisor demo mode (preserved in codebase)
  aiChatbot: boolean;
  aiOrderingAgent: boolean;
  aiRecommendations: boolean;
  routeOptimization: boolean;
  advancedDeliveryTracking: boolean;
  smartDeliveryZones: boolean;
  advancedAnalytics: boolean;
}

// Supervisor Demo Mode Configuration (Current Scope: Tasks 9-14)
export const demoFeatureFlags: FeatureFlags = {
  supervisorDemoMode: true,

  coreLayouts: true,
  userAccounts: true,
  vendorBrowsing: true,
  productBrowsing: true,
  cart: true,
  checkout: true,
  orders: true,
  vendorInterfaces: true,
  adminInterfaces: true,

  aiChatbot: false,
  aiOrderingAgent: false,
  aiRecommendations: false,
  routeOptimization: false,
  advancedDeliveryTracking: false,
  smartDeliveryZones: false,
  advancedAnalytics: false,
};

// Full Application Configuration (All features enabled)
export const fullFeatureFlags: FeatureFlags = {
  supervisorDemoMode: false,

  coreLayouts: true,
  userAccounts: true,
  vendorBrowsing: true,
  productBrowsing: true,
  cart: true,
  checkout: true,
  orders: true,
  vendorInterfaces: true,
  adminInterfaces: true,

  aiChatbot: true,
  aiOrderingAgent: true,
  aiRecommendations: true,
  routeOptimization: true,
  advancedDeliveryTracking: true,
  smartDeliveryZones: true,
  advancedAnalytics: true,
};

// Check if localStorage has an override, else default to demoFeatureFlags
const getInitialFeatureFlags = (): FeatureFlags => {
  try {
    const stored = localStorage.getItem('mow_supervisor_demo_mode');
    if (stored === 'false') {
      return fullFeatureFlags;
    }
  } catch {
    // ignore
  }
  return demoFeatureFlags;
};

// Active configuration
export let featureFlags: FeatureFlags = getInitialFeatureFlags();

/**
 * Programmatically toggle supervisor demo mode
 */
export const setSupervisorDemoMode = (enabled: boolean): void => {
  try {
    localStorage.setItem('mow_supervisor_demo_mode', enabled ? 'true' : 'false');
  } catch {
    // ignore
  }
  featureFlags = enabled ? demoFeatureFlags : fullFeatureFlags;
  window.dispatchEvent(new Event('mow_feature_flags_changed'));
};

/**
 * Check if a specific feature is enabled in the current configuration.
 */
export const isFeatureEnabled = (key: keyof FeatureFlags): boolean => {
  return featureFlags[key] === true;
};

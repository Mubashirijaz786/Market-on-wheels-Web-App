export type UserRole = 'customer' | 'vendor' | 'rider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  defaultAddressId?: string;
  memberSince?: string;
}

export type VendorCategory =
  | 'grocery'
  | 'dairy'
  | 'pharmacy'
  | 'restaurant'
  | 'fruits_vegetables'
  | 'bakery'
  | 'meat'
  | 'beverages'
  | 'household'
  | 'personal_care';

export interface CategoryItem {
  id: VendorCategory;
  name: string;
  iconName: string;
  itemCount: number;
  badgeText?: string;
  color: string;
  image: string;
  description: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  categoryName: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  deliveryTimeMin: number;
  minOrder: number;
  deliveryFee: number;
  isOpen: boolean;
  address: string;
  zone: string;
  coverImage: string;
  logoImage: string;
  phone: string;
  tags: string[];
  description?: string;
  operatingHours?: string;
}

export interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: VendorCategory;
  categoryName: string;
  image: string;
  isAvailable: boolean;
  unit: string;
  isRecommended?: boolean;
  isAiPick?: boolean;
  rating: number;
  tags?: string[];
  inStock?: number;
}

export interface CartItem {
  productId: string;
  vendorId: string;
  vendorName: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
  category?: VendorCategory;
}

export interface CartVendorGroup {
  vendorId: string;
  vendorName: string;
  vendorZone: string;
  items: CartItem[];
  vendorSubtotal: number;
  estimatedPickupDistanceKm: number;
}

export interface DeliveryCalculation {
  baseFee: number;
  additionalPickupFee: number;
  zoneSurcharge: number;
  savingsVsIndividual: number;
  totalDeliveryFee: number;
  totalDistanceKm: number;
  estimatedTotalMinutes: number;
  vendorCount: number;
  zoneSummary: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'rider_assigned'
  | 'picking_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface VendorPickupStatus {
  vendorId: string;
  vendorName: string;
  status: 'received' | 'preparing' | 'ready' | 'picked_up';
  itemsCount: number;
  address: string;
}

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  fullAddress: string;
  city: string;
  area: string;
  notes?: string;
  isDefault: boolean;
}

export type PaymentMethodType = 'cod' | 'card' | 'wallet';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  deliveryAddress: Address;
  items: CartItem[];
  vendorGroups: CartVendorGroup[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  vendorStatuses: VendorPickupStatus[];
  createdAt: string;
  estimatedDeliveryTime: string;
  rider?: {
    id: string;
    name: string;
    phone: string;
    vehicle: string;
    plateNumber: string;
    rating: number;
    photo: string;
  };
  paymentMethod: PaymentMethodType;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'delivery' | 'promo' | 'system';
  timestamp: string;
  isRead: boolean;
  orderId?: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  products?: Product[];
  suggestedActions?: string[];
  actionType?: 'add_all' | 'explore_vendor' | 'view_route' | 'auto_order_proposal';
  proposal?: {
    items: Array<{ product: Product; quantity: number }>;
    subtotal: number;
    deliveryFee: number;
    total: number;
    vendorCount: number;
    vendorNames: string[];
  };
}

export interface LocationOption {
  id: string;
  name: string;
  area: string;
  city: string;
  zone: string;
}

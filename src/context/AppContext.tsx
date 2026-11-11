import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CartItem,
  CartVendorGroup,
  DeliveryCalculation,
  LocationOption,
  Order,
  NotificationItem,
  User,
  Product,
  AIMessage,
  Address,
} from '../types';
import {
  currentUser as initialUser,
  locationOptions,
  savedAddresses,
  samplePastOrders,
  mockNotifications,
  products,
} from '../data/mockData';
import { groupCartItemsByVendor, calculateDeliveryFee } from '../utils/deliveryCalculator';

interface AppContextType {
  // User & Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  register: (name: string, email: string, phone: string) => void;
  logout: () => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;

  // Location
  currentLocation: LocationOption;
  setCurrentLocation: (loc: LocationOption) => void;
  allLocations: LocationOption[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  vendorGroups: CartVendorGroup[];
  deliveryCalculation: DeliveryCalculation;
  cartSubtotal: number;
  cartTotal: number;
  totalItemCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (paymentMethod: 'cod' | 'card' | 'wallet', notes?: string) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotifAsRead: (id: string) => void;
  markAllNotifsAsRead: () => void;

  // AI Assistant & Autonomous Ordering
  aiMessages: AIMessage[];
  isAiThinking: boolean;
  sendAiMessage: (text: string) => void;
  clearAiChat: () => void;
  confirmAiProposal: (proposalItems: Array<{ product: Product; quantity: number }>) => Order;

  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  {
    productId: 'p_margherita',
    vendorId: 'v_pizzapalace',
    vendorName: 'Pizza Palace',
    productName: 'Margherita Pizza',
    price: 850,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    unit: 'Medium 10"',
    category: 'restaurant',
  },
  {
    productId: 'p_garlic_bread',
    vendorId: 'v_pizzapalace',
    vendorName: 'Pizza Palace',
    productName: 'Garlic Bread',
    price: 320,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=80',
    unit: '4 Pieces',
    category: 'restaurant',
  },
  {
    productId: 'p_chicken_burger',
    vendorId: 'v_burgerhub',
    vendorName: 'Burger Hub',
    productName: 'Chicken Burger',
    price: 650,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    unit: '1 Burger',
    category: 'restaurant',
  },
  {
    productId: 'p_fries_large',
    vendorId: 'v_burgerhub',
    vendorName: 'Burger Hub',
    productName: 'Fries (Large)',
    price: 350,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    unit: 'Large Box',
    category: 'restaurant',
  },
  {
    productId: 'p_apples_1kg',
    vendorId: 'v_freshmart',
    vendorName: 'Fresh Mart',
    productName: 'Fresh Apples (1 KG)',
    price: 280,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    unit: '1 kg',
    category: 'fruits_vegetables',
  },
  {
    productId: 'p_coca_cola',
    vendorId: 'v_freshmart',
    vendorName: 'Fresh Mart',
    productName: 'Coca Cola (1.5 L)',
    price: 220,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    unit: '1.5 L',
    category: 'beverages',
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load stored user or default
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mow_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('mow_addresses');
    return saved ? JSON.parse(saved) : savedAddresses;
  });

  const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0] || savedAddresses[0]);
  const [currentLocation, setCurrentLocation] = useState<LocationOption>(locationOptions[0]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mow_cart');
    return saved ? JSON.parse(saved) : INITIAL_CART;
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('mow_wishlist');
    return saved ? JSON.parse(saved) : ['p_bread_1', 'p_burger_1'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mow_orders');
    return saved ? JSON.parse(saved) : samplePastOrders;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('mow_notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // AI Chat Messages
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: "👋 Hello Ahmed! I'm your Market on Wheels Shopping Assistant.\n\nYou can ask me to find products, recommend items across multiple nearby stores, or type what you need (e.g. *\"I need 2 liters of milk, 1 bread, and Panadol\"*) and I can prepare your multi-vendor cart for one-click checkout!",
      timestamp: 'Just now',
      suggestedActions: [
        'Find milk, bread, and eggs',
        'Show pharmacy pain relief',
        'Recommend breakfast items',
        'Show top rated nearby stores',
      ],
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('mow_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mow_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mow_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mow_user');
    }
  }, [user]);

  // Auth functions
  const login = (email: string) => {
    const loggedUser: User = {
      ...initialUser,
      email,
    };
    setUser(loggedUser);
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'customer',
      defaultAddressId: 'addr_1',
      memberSince: 'Today',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const created: Address = {
      ...newAddr,
      id: `addr_${Date.now()}`,
    };
    const updated = [...addresses, created];
    setAddresses(updated);
    setSelectedAddress(created);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          vendorId: product.vendorId,
          vendorName: product.vendorName,
          productName: product.name,
          price: product.price,
          quantity,
          image: product.image,
          unit: product.unit,
          category: product.category,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const vendorGroups = groupCartItemsByVendor(cart);
  const deliveryCalculation = calculateDeliveryFee(vendorGroups);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = cartSubtotal + deliveryCalculation.totalDeliveryFee;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (paymentMethod: 'cod' | 'card' | 'wallet', notes?: string): Order => {
    const orderNum = `MOW-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      customerId: user ? user.id : 'usr_guest',
      customerName: user ? user.name : 'Customer',
      deliveryAddress: {
        ...selectedAddress,
        notes: notes || selectedAddress.notes,
      },
      items: [...cart],
      vendorGroups: [...vendorGroups],
      subtotal: cartSubtotal,
      deliveryFee: deliveryCalculation.totalDeliveryFee,
      serviceFee: 40,
      discount: 0,
      total: cartTotal + 40,
      status: 'placed',
      vendorStatuses: vendorGroups.map(vg => ({
        vendorId: vg.vendorId,
        vendorName: vg.vendorName,
        status: 'received',
        itemsCount: vg.items.length,
        address: `${vg.vendorZone}, Lahore`,
      })),
      createdAt: 'Just now',
      estimatedDeliveryTime: `${deliveryCalculation.estimatedTotalMinutes} mins`,
      paymentMethod,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Add confirmation notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: `Order Placed: #${newOrder.orderNumber}`,
      message: `Your multi-vendor order from ${vendorGroups.length} store${vendorGroups.length > 1 ? 's' : ''} is placed! Track its live pickup stages.`,
      type: 'order',
      timestamp: 'Just now',
      isRead: false,
      orderId: newOrder.id,
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId || o.orderNumber === orderId);
  };

  // Notifications
  const markNotifAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  // AI Assistant & Autonomous Ordering logic
  const sendAiMessage = (userInput: string) => {
    const userMsg: AIMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: userInput,
      timestamp: 'Just now',
    };

    setAiMessages(prev => [...prev, userMsg]);
    setIsAiThinking(true);

    setTimeout(() => {
      const lower = userInput.toLowerCase();
      let replyText = '';
      let matchedProducts: Product[] = [];
      let suggestedActions: string[] = [];
      let isAutonomousProposal = false;

      // Check if user is asking for autonomous multi-product basket
      const hasKeywords =
        (lower.includes('milk') || lower.includes('bread') || lower.includes('egg') || lower.includes('apple') || lower.includes('panadol')) &&
        (lower.includes('need') || lower.includes('buy') || lower.includes('get') || lower.includes('order') || lower.includes('cart'));

      if (hasKeywords) {
        isAutonomousProposal = true;
        replyText =
          `I analyzed your shopping request and cross-referenced current stock across nearby stores in **${currentLocation.area}**.\n\n` +
          `I found the exact matches from multiple vendors and grouped them into an optimized single-dispatch bundle. Please review the itemized breakdown below:`;

        const autoPicks: Array<{ product: Product; quantity: number }> = [];

        if (lower.includes('milk')) {
          const milk = products.find(p => p.id === 'p_milk_1');
          if (milk) autoPicks.push({ product: milk, quantity: 2 });
        }
        if (lower.includes('bread')) {
          const bread = products.find(p => p.id === 'p_bread_1');
          if (bread) autoPicks.push({ product: bread, quantity: 1 });
        }
        if (lower.includes('egg')) {
          const eggs = products.find(p => p.id === 'p_eggs_1');
          if (eggs) autoPicks.push({ product: eggs, quantity: 1 });
        }
        if (lower.includes('apple') || lower.includes('fruit')) {
          const apples = products.find(p => p.id === 'p_apple_1');
          if (apples) autoPicks.push({ product: apples, quantity: 1 });
        }
        if (lower.includes('panadol') || lower.includes('medicine')) {
          const panadol = products.find(p => p.id === 'p_panadol_1');
          if (panadol) autoPicks.push({ product: panadol, quantity: 1 });
        }

        // Fallback default basket if none directly matched
        if (autoPicks.length === 0) {
          const m = products.find(p => p.id === 'p_milk_1')!;
          const b = products.find(p => p.id === 'p_bread_1')!;
          const e = products.find(p => p.id === 'p_eggs_1')!;
          autoPicks.push({ product: m, quantity: 2 }, { product: b, quantity: 1 }, { product: e, quantity: 1 });
        }

        matchedProducts = autoPicks.map(a => a.product);

        const subtotal = autoPicks.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const uniqueVendors = Array.from(new Set(autoPicks.map(a => a.product.vendorName)));
        const mockDelivery = 100 + (uniqueVendors.length - 1) * 40;
        const total = subtotal + mockDelivery;

        const aiMsg: AIMessage = {
          id: `msg_ai_${Date.now()}`,
          sender: 'ai',
          text: replyText,
          timestamp: 'Just now',
          products: matchedProducts,
          actionType: 'auto_order_proposal',
          proposal: {
            items: autoPicks,
            subtotal,
            deliveryFee: mockDelivery,
            total,
            vendorCount: uniqueVendors.length,
            vendorNames: uniqueVendors,
          },
          suggestedActions: ['Confirm Order Now', 'Modify In Cart', 'Cancel'],
        };

        setAiMessages(prev => [...prev, aiMsg]);
        setIsAiThinking(false);
        return;
      }

      // General searches and queries
      if (lower.includes('breakfast')) {
        matchedProducts = products.filter(p => ['p_milk_1', 'p_bread_1', 'p_eggs_1', 'p_croissant_1'].includes(p.id));
        replyText = "Here are the top-rated breakfast essentials available right now from fresh bakeries and dairy stores:";
        suggestedActions = ['Add All To Cart', 'Show Dairy Stores', 'Find Hot Coffee'];
      } else if (lower.includes('pharmacy') || lower.includes('medicine') || lower.includes('panadol')) {
        matchedProducts = products.filter(p => p.category === 'pharmacy');
        replyText = "Here are the health & pharmacy essentials available for immediate dispatch from MediCare Pharmacy:";
        suggestedActions = ['Add Panadol Extra', 'Show 24/7 Pharmacies'];
      } else if (lower.includes('fruit') || lower.includes('vegetable') || lower.includes('organic')) {
        matchedProducts = products.filter(p => p.category === 'fruits_vegetables');
        replyText = "Here are fresh farm-picked fruits & vegetables available near you:";
        suggestedActions = ['Add Gala Apples', 'Explore Green Oasis Store'];
      } else if (lower.includes('burger') || lower.includes('food') || lower.includes('hungry')) {
        matchedProducts = products.filter(p => p.category === 'restaurant');
        replyText = "Craving hot food? Check out these freshly prepared delicacies that can be delivered alongside your groceries:";
        suggestedActions = ['Add Truffle Burger', 'Show More Eateries'];
      } else {
        matchedProducts = products.slice(0, 4);
        replyText = `I found several popular items across our partner stores in ${currentLocation.area}. You can combine any of these into a single combined delivery:`;
        suggestedActions = ['Add Rice & Oil', 'Order Milk & Bread', 'Show All Stores'];
      }

      const aiResponse: AIMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'Just now',
        products: matchedProducts,
        suggestedActions,
      };

      setAiMessages(prev => [...prev, aiResponse]);
      setIsAiThinking(false);
    }, 600);
  };

  const clearAiChat = () => {
    setAiMessages([
      {
        id: 'msg_reset',
        sender: 'ai',
        text: "Chat refreshed. How can I assist your multi-vendor shopping today?",
        timestamp: 'Just now',
        suggestedActions: [
          'Find milk, bread, and eggs',
          'Show pharmacy pain relief',
          'Recommend breakfast items',
        ],
      },
    ]);
  };

  const confirmAiProposal = (proposalItems: Array<{ product: Product; quantity: number }>): Order => {
    // Add all to cart
    for (const item of proposalItems) {
      addToCart(item.product, item.quantity);
    }

    // Prepare temporary items for order
    const cartItems: CartItem[] = proposalItems.map(item => ({
      productId: item.product.id,
      vendorId: item.product.vendorId,
      vendorName: item.product.vendorName,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
      unit: item.product.unit,
      category: item.product.category,
    }));

    const vg = groupCartItemsByVendor(cartItems);
    const deliv = calculateDeliveryFee(vg);
    const sub = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

    const orderNum = `MOW-AI-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      customerId: user ? user.id : 'usr_guest',
      customerName: user ? user.name : 'Ahmed Malik',
      deliveryAddress: selectedAddress,
      items: cartItems,
      vendorGroups: vg,
      subtotal: sub,
      deliveryFee: deliv.totalDeliveryFee,
      serviceFee: 40,
      discount: 50,
      total: sub + deliv.totalDeliveryFee + 40 - 50,
      status: 'confirmed',
      vendorStatuses: vg.map(v => ({
        vendorId: v.vendorId,
        vendorName: v.vendorName,
        status: 'preparing',
        itemsCount: v.items.length,
        address: `${v.vendorZone}, Lahore`,
      })),
      createdAt: 'Just now',
      estimatedDeliveryTime: `${deliv.estimatedTotalMinutes} mins`,
      paymentMethod: 'cod',
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Add confirmation message to chat
    setAiMessages(prev => [
      ...prev,
      {
        id: `msg_confirmed_${Date.now()}`,
        sender: 'ai',
        text: `🎉 **Order confirmed!** Your order **#${newOrder.orderNumber}** has been dispatched to ${vg.length} vendor(s). Our smart routing rider will collect from each store and deliver directly to your doorstep in one consolidated delivery.`,
        timestamp: 'Just now',
        suggestedActions: ['Track This Order', 'Order Something Else'],
      },
    ]);

    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        addresses,
        addAddress,
        selectedAddress,
        setSelectedAddress,
        currentLocation,
        setCurrentLocation,
        allLocations: locationOptions,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        vendorGroups,
        deliveryCalculation,
        cartSubtotal,
        cartTotal,
        totalItemCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        createOrder,
        getOrderById,
        notifications,
        unreadNotifsCount,
        markNotifAsRead,
        markAllNotifsAsRead,
        aiMessages,
        isAiThinking,
        sendAiMessage,
        clearAiChat,
        confirmAiProposal,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

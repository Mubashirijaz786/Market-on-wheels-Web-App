import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { AIAssistantWidget } from './components/ai/AIAssistantWidget';
import { isFeatureEnabled } from './config/featureFlags';

// Customer Pages
import { HomePage } from './pages/Home';
import { CategoriesPage } from './pages/Categories';
import { VendorsPage } from './pages/Vendors';
import { VendorDetailPage } from './pages/Vendors/VendorDetail';
import { ProductsPage } from './pages/Products';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { OrdersPage } from './pages/Orders';
import { OrderSuccessPage } from './pages/Orders/OrderSuccess';
import { TrackingPage } from './pages/Tracking';
import { AIAssistantPage } from './pages/AIAssistant';
import { LoginPage } from './pages/Auth/Login';
import { RegisterPage } from './pages/Auth/Register';
import { ForgotPasswordPage } from './pages/Auth/ForgotPassword';
import { ProfilePage } from './pages/Profile';

// Vendor Portal Pages (Task 13)
import { VendorDashboardPage } from './pages/Vendor/VendorDashboard';
import { VendorProductsPage } from './pages/Vendor/VendorProducts';
import { VendorOrdersPage } from './pages/Vendor/VendorOrders';
import { VendorProfilePage } from './pages/Vendor/VendorProfile';

// Admin Portal Pages (Task 13)
import { AdminDashboardPage } from './pages/Admin/AdminDashboard';
import { AdminVendorsPage } from './pages/Admin/AdminVendors';
import { AdminCustomersPage } from './pages/Admin/AdminCustomers';
import { AdminOrdersPage } from './pages/Admin/AdminOrders';
import { AdminCategoriesPage } from './pages/Admin/AdminCategories';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-background text-textPrimary antialiased">
          <Navbar />

          {/* Main Container with persistent Left Sidebar matching reference image */}
          <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex gap-6 sm:gap-8 items-start">
            <Sidebar />
            <main className="flex-1 min-w-0 py-6 sm:py-8">
              <Routes>
                {/* Task 9: Core Layouts & Navigation */}
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<CategoriesPage />} />

                {/* Task 11: Vendor & Product Browsing */}
                <Route path="/vendors" element={<VendorsPage />} />
                <Route path="/vendors/:vendorId" element={<VendorDetailPage />} />
                <Route path="/products" element={<ProductsPage />} />

                {/* Task 12: Cart, Checkout & Orders */}
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/success/:orderId" element={<OrderSuccessPage />} />
                <Route path="/tracking/:orderId" element={<TrackingPage />} />

                {/* Task 10: User Account & Profile */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

                {/* Task 13: Vendor Interfaces */}
                <Route path="/vendor" element={<Navigate to="/vendor/dashboard" replace />} />
                <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
                <Route path="/vendor/products" element={<VendorProductsPage />} />
                <Route path="/vendor/orders" element={<VendorOrdersPage />} />
                <Route path="/vendor/profile" element={<VendorProfilePage />} />

                {/* Task 13: Admin Interfaces */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/vendors" element={<AdminVendorsPage />} />
                <Route path="/admin/customers" element={<AdminCustomersPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/categories" element={<AdminCategoriesPage />} />

                {/* Advanced feature route: Controlled by Feature Flag */}
                <Route
                  path="/ai-assistant"
                  element={
                    isFeatureEnabled('aiChatbot') ? (
                      <AIAssistantPage />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>

          <Footer />
          <AIAssistantWidget />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

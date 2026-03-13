import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

// Protected Route Component for Admin Only
const ProtectedAdminRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{element}</>;
};

// App Routes
const AppRoutes = () => (
  <Routes>
    {/* Landing page - NO login needed for users */}
    <Route path="/" element={<Index />} />

    {/* Admin login page */}
    <Route path="/admin-login" element={<AdminLogin />} />

    {/* Admin Dashboard - protected */}
    <Route
      path="/admin"
      element={<ProtectedAdminRoute element={<AdminDashboard />} />}
    />

    {/* Catch All */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProductProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ProductProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
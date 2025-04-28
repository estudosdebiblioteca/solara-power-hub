
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import CompanyDashboard from "./pages/CompanyDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Plants from "./pages/Plants";
import Clients from "./pages/Clients";

const queryClient = new QueryClient();

const DashboardRouter = () => {
  const { isCompany } = useAuth();
  return isCompany ? <CompanyDashboard /> : <ClientDashboard />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<DashboardRouter />} />
              
              {/* Company Routes */}
              <Route 
                path="/plants" 
                element={
                  <ProtectedRoute allowedRoles={["company"]}>
                    <Plants />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clients" 
                element={
                  <ProtectedRoute allowedRoles={["company"]}>
                    <Clients />
                  </ProtectedRoute>
                } 
              />
              
              {/* Client Routes */}
              <Route 
                path="/my-plants" 
                element={
                  <ProtectedRoute allowedRoles={["client"]}>
                    <div className="p-4">My Plants Page (Coming Soon)</div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/performance" 
                element={
                  <ProtectedRoute allowedRoles={["client"]}>
                    <div className="p-4">Performance Page (Coming Soon)</div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Shared Routes */}
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    <div className="p-4">Reports Page (Coming Soon)</div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute allowedRoles={["company"]}>
                    <div className="p-4">Analytics Page (Coming Soon)</div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <div className="p-4">Settings Page (Coming Soon)</div>
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

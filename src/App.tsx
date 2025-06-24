
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TodoProvider } from "@/contexts/TodoContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient();

const domain = "dev-yuv6emo0pmz4qvov.us.auth0.com";
const clientId = "Ov23licq6RJwZGiYK9jL";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <TooltipProvider>
      <AuthProvider>
        <TodoProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TodoProvider>
      </AuthProvider>
    </TooltipProvider>
    </Auth0Provider>
  </QueryClientProvider>
);

export default App;


// import { Toaster } from "@/components/ui/toaster";
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
import GitHubCallback from './components/Github-success'
import GitHubError from './pages/SocialLoginFailure/github-error';
import GoogleError from './pages/SocialLoginFailure/google-error';
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    
    <TooltipProvider>
      <AuthProvider>
        <TodoProvider>
          {/* <Toaster  /> */}
          <Sonner richColors position="top-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/github-success" element={<GitHubCallback />} />
              <Route path="/github-error" element={<GitHubError />} />
              <Route path="/google-error" element={<GoogleError />} />
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
  </QueryClientProvider>
);

export default App;

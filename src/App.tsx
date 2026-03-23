import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { LoginModal } from "@/components/LoginModal";
import Dashboard from "./pages/Dashboard";
import RunWorkflow from "./pages/RunWorkflow";
import Tasks from "./pages/Tasks";
import AgentActivity from "./pages/AgentActivity";
import AuditLogs from "./pages/AuditLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <AppHeader onLoginClick={() => setLoginOpen(true)} />
      <AppSidebar />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <main className="pt-14 pl-56 transition-all duration-300 min-h-screen">
        <div className="p-6 max-w-[1400px] mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/run" element={<RunWorkflow />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/activity" element={<AgentActivity />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

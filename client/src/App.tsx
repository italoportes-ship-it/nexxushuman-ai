import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import MethodologyPage from "./pages/MethodologyPage";
import CasesPage from "./pages/CasesPage";
import CaseDetail from "./pages/CaseDetail";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Diagnostico from "./pages/Diagnostico";
import BlogPage, { BlogArticle } from "./pages/BlogPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard";
import MeusDiagnosticos from "./pages/MeusDiagnosticos";
import ResultadoPublico from "./pages/ResultadoPublico";
import AgendarPage from "./pages/AgendarPage";
import WebinarPage from "./pages/WebinarPage";
import ImersaoPage from "./pages/ImersaoPage";
import ChatWidget from "./components/ChatWidget";
import DiagnosticoLanding from "./pages/DiagnosticoLanding";
import Resultado from "./pages/Resultado";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/methodology" component={MethodologyPage} />
      <Route path="/cases" component={CasesPage} />
      <Route path="/cases/:id" component={CaseDetail} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/diagnostico" component={DiagnosticoLanding} />
      <Route path="/diagnostico/iniciar" component={Diagnostico} />
      <Route path="/resultado" component={Resultado} />
      <Route path="/produtos" component={ProductsPage} />
      <Route path="/produtos/:id" component={ProductDetail} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogArticle} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/meus-diagnosticos" component={MeusDiagnosticos} />
      <Route path="/resultado/:id" component={ResultadoPublico} />
      <Route path="/agendar" component={AgendarPage} />
      <Route path="/webinar" component={WebinarPage} />
      <Route path="/imersao" component={ImersaoPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/* Chatbot flutuante global */}
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <ChatWidget />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

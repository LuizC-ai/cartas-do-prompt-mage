import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CartaDetalhes from "./pages/CartaDetalhes";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/carta/:slug"} component={CartaDetalhes} />
      <Route path={"/sobre"} component={Sobre} />
      <Route path={"/contato"} component={Contato} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

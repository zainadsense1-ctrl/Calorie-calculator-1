import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TDEECalculator from "@/pages/TDEECalculator";
import MacroCalculator from "@/pages/MacroCalculator";
import BMICalculator from "@/pages/BMICalculator";
import BodyFatCalculator from "@/pages/BodyFatCalculator";
import WaterIntakeCalculator from "@/pages/WaterIntakeCalculator";
import IdealWeightCalculator from "@/pages/IdealWeightCalculator";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Disclaimer from "@/pages/Disclaimer";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tdee-calculator" component={TDEECalculator} />
      <Route path="/macro-calculator" component={MacroCalculator} />
      <Route path="/bmi-calculator" component={BMICalculator} />
      <Route path="/body-fat-calculator" component={BodyFatCalculator} />
      <Route path="/water-intake-calculator" component={WaterIntakeCalculator} />
      <Route path="/ideal-weight-calculator" component={IdealWeightCalculator} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

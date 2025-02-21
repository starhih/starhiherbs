import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import ScrollRestoration from "@/components/ScrollRestoration";
import Loading from "@/components/Loading";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubscriptionPopup from "@/components/SubscriptionPopup";
import { usePopupTrigger } from "@/hooks/usePopupTrigger";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Tools from "@/pages/Tools";
import ResourcesHub from "@/pages/ResourcesHub";
import Catalog from "@/pages/Catalog";
import ProductDetails from "@/pages/ProductDetails";
import Events from "@/pages/Events";
import EventDetails from "@/pages/EventDetails";
import Login from "@/pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import BlogList from "@/pages/blog/BlogList";
import BlogPost from "@/pages/blog/BlogPost";
import IngredientsPage from "@/pages/IngredientsPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import SampleRequest from "@/pages/forms/SampleRequest";
import CompatibilityChecker from "@/pages/tools/CompatibilityChecker";
import DosageCalculator from "@/pages/tools/DosageCalculator";
import COAValidator from "@/pages/tools/COAValidator";
import CostEstimator from "@/pages/tools/CostEstimator";
import QuoteCalculator from "@/pages/forms/QuoteCalculator";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import TermsOfService from "@/pages/legal/TermsOfService";
import CookiePolicy from "@/pages/legal/CookiePolicy";
import IngredientCategory from "@/pages/IngredientCategory";
import ApplicationCategory from "@/pages/ApplicationCategory";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/auth/Register";

const queryClient = new QueryClient();

function App() {
  const {
    showLoadPopup,
    showScrollPopup,
    showExitPopup,
    showInactivePopup,
    handleLoadPopupClose,
    handleScrollPopupClose,
    handleExitPopupClose,
    handleInactivePopupClose,
  } = usePopupTrigger({
    scrollThreshold: 50, // Show scroll popup at 50% scroll
    inactivityTimeout: 60000, // Show inactive popup after 1 minute
    exitDelay: 1000, // Show exit popup after 1 second
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <ScrollRestoration />
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-grow relative">
              <Suspense fallback={<Loading />}>
                <PerformanceMonitor />
                <div className="w-full">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:slug" element={<EventDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/tools/compatibility-checker" element={<CompatibilityChecker />} />
                    <Route path="/tools/dosage-calculator" element={<DosageCalculator />} />
                    <Route path="/tools/coa-validator" element={<COAValidator />} />
                    <Route path="/tools/cost-estimator" element={<CostEstimator />} />
                    <Route path="/forms/quote-calculator" element={<QuoteCalculator />} />
                    <Route path="/resources" element={<ResourcesHub />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/ingredients" element={<IngredientsPage />} />
                    <Route path="/ingredients/:categoryId" element={<IngredientCategory />} />
                    <Route path="/applications" element={<ApplicationsPage />} />
                    <Route path="/applications/:categoryId" element={<ApplicationCategory />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                    <Route path="/forms/sample-request" element={<SampleRequest />} />
                    
                    {/* Legal Routes */}
                    <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/legal/terms-of-service" element={<TermsOfService />} />
                    <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </Suspense>
            </main>
            <Footer />

            {/* Subscription Popups */}
            <SubscriptionPopup
              trigger="load"
              isOpen={showLoadPopup}
              onClose={handleLoadPopupClose}
            />
            <SubscriptionPopup
              trigger="scroll"
              isOpen={showScrollPopup}
              onClose={handleScrollPopupClose}
            />
            <SubscriptionPopup
              trigger="exit"
              isOpen={showExitPopup}
              onClose={handleExitPopupClose}
            />
            <SubscriptionPopup
              trigger="inactive"
              isOpen={showInactivePopup}
              onClose={handleInactivePopupClose}
            />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

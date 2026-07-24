import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToHash from "./components/ScrollToHash";
import ConsultationPopup from "./components/ConsultationPopup";

/* Public pages */
import Home from "./pages/Home";
import Strategy from "./pages/Strategy";
import StrategyConsulting from "./pages/StrategyConsulting";
import Services from "./pages/Services";
import SupportingServices from "./pages/SupportingServices";
import Products from "./pages/Products";
import ProductSolutions from "./pages/ProductSolutions";
import About from "./pages/About";
import Careers from "./pages/Careers";
import SuccessStories from "./pages/SuccessStories";
import MarketReports from "./pages/MarketReports";
import ThankYou from "./pages/ThankYou";
import Reviews from "./pages/Reviews";

import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

export default function App() {
  const [consultOpen, setConsultOpen] = useState(false);

  const openConsultation = () => {
    setConsultOpen(true);
  };

  const closeConsultation = () => {
    setConsultOpen(false);
  };

  return (
    <>
      <Navbar onConsultationClick={openConsultation} />

      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/strategy"
          element={<Strategy />}
        />

        <Route
          path="/strategy-consulting"
          element={<StrategyConsulting />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/supporting-services"
          element={<SupportingServices />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product-solutions"
          element={<ProductSolutions />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/careers"
          element={<Careers />}
        />

        <Route
          path="/success-stories"
          element={<SuccessStories />}
        />
        <Route 
        path="/reviews-feedback" 
        element={<Reviews />} 
        />
        <Route
          path="/market-reports"
          element={<MarketReports />}
        />
        <Route
          path="/thank-you"
          element={<ThankYou />}
        />
        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/cookies-policy"
          element={<CookiesPolicy />}
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <Footer />
      <ScrollToTopButton />
      <ConsultationPopup
        open={consultOpen}
        onClose={closeConsultation}
      />
    </>
  );
}
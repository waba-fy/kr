import { Link } from "react-router-dom";
import "../styles/home.css";
import HeroSlider from "../components/HeroSlider";
import WhatWeDo from "../components/WhatWeDo";
import WhyKeyRoutes from "../components/WhyKeyRoutes";
import StrategyHighlights from "../components/StrategyHighlights";
import ServicesHighlights from "../components/ServicesHighlights";
import ProductsHighlights from "../components/ProductsHighlights";
import ProcessTimeline from "../components/ProcessTimeline";
import CaseStudiesPreview from "../components/CaseStudiesPreview";
import TechnologyEcosystem from "../components/TechnologyEcosystem";
import HomeFAQ from "../components/HomeFAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <HeroSlider/>
      <WhatWeDo/>
      <WhyKeyRoutes/>
      <StrategyHighlights/>
      <ServicesHighlights/>
      <ProductsHighlights/>
      <ProcessTimeline/>
      <CaseStudiesPreview/>
      <TechnologyEcosystem/>
      <HomeFAQ/>
      <FinalCTA/>
     
      
    </>
  );
};

export default Home;

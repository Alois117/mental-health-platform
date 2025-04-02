import React from "react";
import Header from "../components/LandingPage/Header";
import Homebody from "../components/LandingPage/Homebody";
import AboutSection from "../components/LandingPage/AboutSection";
import ServicesSection from "../components/LandingPage/ServicesSection";
import BlogSection from "../components/LandingPage/BlogSection";
import ContactUs from "../components/LandingPage/ContactUs";
import MentalHealthBanner from "../components/LandingPage/MentalHealthBanner";
import ScrollToTopButton from "../components/LandingPage/ScrollToTopButton";
import Footer from "../components/LandingPage/Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Homebody />
      <AboutSection />
      <ServicesSection />
      <BlogSection />
      <ContactUs />
      <MentalHealthBanner />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default LandingPage;

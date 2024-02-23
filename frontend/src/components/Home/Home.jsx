import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import nookies from "nookies"

const Home = () => {
  // if (!isAuthorized) {
  //   return <Navigate to={"/login"} />;
  // }
  const cookies = nookies.get(null, "token");
  console.log("token ==== ", cookies.token);

  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;

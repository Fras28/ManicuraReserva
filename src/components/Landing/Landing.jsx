import React from "react";
import WithSubnavigation from "./NavBar";
import HeroSection from "./Hero";
import Historia from "./Historia";
import Testim from "./Testimonios1";
import LargeWithAppLinksAndSocial from "../Foot";






const Landing =()=>{
    return(
        <>
        <WithSubnavigation/>
        <HeroSection/>
        <Historia/>
        <Testim/>
        <LargeWithAppLinksAndSocial/>
        </>
  
    )
}

export default Landing;
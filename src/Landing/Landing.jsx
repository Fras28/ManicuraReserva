import React from "react";
import TopNav from "./logoTop";
import Hero from "./Hero";
import SimpleThreeColumns from "./InfoGroup";
import BottomNav from "./BottomNav";
import Categorias from "./Categorias";
import Carousel from "./MasVendidos";



function Landing() {
  return (
    <div style={styles.container}>
      <TopNav />
      <Hero />
      <SimpleThreeColumns />
      <Categorias/>
      <Carousel/>
      <BottomNav />
    </div>
  );
}

export default Landing;

const styles = {
    container: {
  paddingBottom:"5rem"
    },

  };
import React from "react";
import { Link } from "react-router-dom";

import classes from "./Home.module.css";
import pikachu from "./../img/pikachu3d.png";

const Home = function (props) {
  return (
    <div className={classes.home}>
      <h1 className={classes.title}>pokesite</h1>
      <div className={classes.paragraph}>
        This site uses the PokeAPI API. All information displayed on the site
        regarding Pokemon is taken from PokeAPI
      </div>
      <div className={classes.paragraph2}>
        This site was created for Gal Mafgaonker portfolio only
      </div>
      <div className={classes.link}>
        <Link className={classes.nav} to="/explore">
          explore
        </Link>
      </div>

      <div className={classes.divimg}>
        <img src={pikachu} className={classes.img} alt="pikachu img" />
      </div>
    </div>
  );
};

export default Home;

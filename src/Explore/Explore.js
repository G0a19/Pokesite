import React, { useState, Fragment } from "react";
import { Route, Link, Switch } from "react-router-dom";

import ExploreDefult from "./Pages/Explore-defult";
import Pokemon from "./Pages/Pokemons/Pokemon";
import Favorites from "./Pages/Favorites/Favorites";
import icon from "./../img/pokeball_icon_136305.svg";
import pokeball from "./../img/pokeball-pokemon-svgrepo-com.svg";
import classes from "./Explore.module.css";
import ListOfPokemons from "./Pages/ListOfPokemons/ListOfPokemons";
import Feedback from "./Pages/Feedback/Feedback";

const Explore = function () {
  const [isCheck, setIsCheck] = useState(false);

  let show = isCheck ? `${classes.show}` : `${classes.hide}`;

  const toggleHandler = (props) => {
    setIsCheck(!isCheck);
  };

  const removeNavHandler = function () {
    document.getElementById("checkbox").checked = false;
    setIsCheck(false);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <Link className={classes.Link} to="/explore" onClick={removeNavHandler}>
          <div className={classes.title}>
            <img src={icon} alt="icon" />
            <h1 className={classes.title}>pokesite</h1>
          </div>
        </Link>
        <input
          id="checkbox"
          type="checkbox"
          className={classes.checkbox}
          onClick={toggleHandler}
        />
        <div className={classes.nav}></div>
      </header>

      <div className={`${classes.navigation} ${show}`}>
        <ul onClick={removeNavHandler}>
          <Link className={classes.Link} to="/explore/feedback">
            <li>
              <img src={pokeball} alt="pokeball" />
              <span>FeedBack</span>
            </li>
          </Link>
          <Link className={classes.Link} to="/explore/favorites">
            <li>
              <img src={pokeball} alt="pokeball" /> <span>My favorites</span>
            </li>
          </Link>
          <Link className={classes.Link} to="/explore/Listofpokemons">
            <li>
              <img src={pokeball} alt="pokeball" />
              <span>List of pokemons</span>
            </li>
          </Link>
          <Link className={classes.Link} to="/explore">
            <li>
              <img src={pokeball} alt="pokeball" /> <span>Explore</span>
            </li>
          </Link>
          <Link className={classes.Link} to="/">
            <li>
              <img src={pokeball} alt="pokeball" /> <span>Home</span>
            </li>
          </Link>
        </ul>
      </div>

      <Switch>
        <Route path="/explore" exact>
          <ExploreDefult removeNavHandler={removeNavHandler} />
        </Route>

        <Route path="/explore/feedback" exact>
          <Feedback />
        </Route>

        <Route path="/explore/listofpokemons" exact>
          <ListOfPokemons removeNavHandler={removeNavHandler} />
        </Route>

        <Route path="/explore/favorites" exact>
          <Favorites removeNavHandler={removeNavHandler} />
        </Route>

        <Route path="/explore/:pokemon">
          <Pokemon removeNavHandler={removeNavHandler} />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default React.memo(Explore);

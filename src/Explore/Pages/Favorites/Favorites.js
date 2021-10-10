import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Main from "../../../UI/Main";
import Star from "../../../UI/Star";
import LoadingPokemons from "../../../UI/LoadingPokemons";
import classes from "./Favorites.module.css";

const Favorites = function (props) {
  const [favorites] = useState(useSelector((state) => state.favorite));
  const [favoritesEmpty, setFavoritesEmpty] = useState("no favorites found!");
  const [isLoading, setIsLoading] = useState(false);
  const [allFavorites, setAllFavorites] = useState([]);

  useEffect(() => {
    if (favorites.length !== 0) {
      setFavoritesEmpty("my favorites");
      setIsLoading(true);
      for (let i = 0; i < favorites.length; i++) {
        const getFavorites = async function () {
          const call = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${favorites[i]}`
          );
          const response = await call.json();
          setAllFavorites((prv) => [...prv, response]);
          await setIsLoading(false);
        };

        getFavorites();
      }
    }
  }, [favorites]);

  const html = allFavorites.map((pokemon) => {
    return (
      <li key={pokemon.name} onClick={props.removeNavHandler}>
        <Link to={`/explore/${pokemon.name}`} className={classes.link}>
          <div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        </Link>
        <Star star={classes.star} pokemon={pokemon.name} />
      </li>
    );
  });

  return (
    <Main>
      <div className={classes.title}>
        <h1>{favoritesEmpty}</h1>
      </div>
      {isLoading ? (
        <LoadingPokemons />
      ) : (
        <ul className={classes.list}>
          {allFavorites.length !== 0 ? html : ""}
        </ul>
      )}
    </Main>
  );
};

export default React.memo(Favorites);

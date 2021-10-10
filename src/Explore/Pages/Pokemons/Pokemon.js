import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";

import Main from "../../../UI/Main";
import Star from "../../../UI/Star";
import classes from "./Pokemon.module.css";
import search from "./../../../img/search.svg";
import errorPage from "./../../../img/pageerror.png";
import LoadingPokemons from "../../../UI/LoadingPokemons";

const Pokemon = function (props) {
  const params = useParams();
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [errorMassage, setErrorMassage] = useState(params.pokemon);
  const [errorInput, setErrorInput] = useState("");
  const [isShiny, setIsShiny] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorMassage(params.pokemon);
    const pokemonApiHandler = async function () {
      try {
        const call = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.pokemon}`
        );
        if (call.ok === false) {
          setErrorMassage("Somthing went worng!, Please try again later");
          await setIsLoading(false);
        }
        const response = await call.json();
        await setPokemon(response);
        await setIsLoading(false);
      } catch (error) {}
    };

    pokemonApiHandler();
  }, [params.pokemon]);

  const inputHander = (event) => {
    setInputValue((prev) => {
      setErrorInput("");
      return event.target.value.toLowerCase();
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputValue || inputValue.trim() === 0) {
      setErrorInput("The field must not be empty");
      return;
    } else if (inputValue === "feedback") {
      setErrorInput("Can not go to the feedback from the search");
      return;
    } else if (inputValue.trim().includes("favorites")) {
      setErrorInput("Can not go to the My favorites from the search");
      return;
    }
    setErrorInput("");
    history.replace(`/explore/${inputValue}`);
  };

  const star =
    errorMassage === params.pokemon ? (
      <Star star={classes.star} pokemon={params.pokemon} />
    ) : (
      ""
    );

  const img =
    errorMassage !== params.pokemon ? (
      <img src={errorPage} alt="error" />
    ) : undefined;

  const shinyImg =
    isShiny && pokemon ? (
      <img src={pokemon.sprites.front_shiny} alt={params.pokemon} />
    ) : (
      ""
    );

  const changeShinyHandler = function () {
    setIsShiny(!isShiny);
  };

  return (
    <Main>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="search..."
          value={inputValue}
          onChange={inputHander}
        />
        <img src={search} alt="search icon" onClick={submitHandler} />
        <p className={classes.error}>{errorInput}</p>
      </form>
      <div className={classes.title}>
        <h1>{errorMassage}</h1>
        {star}
      </div>
      {!isLoading ? (
        <Fragment>
          <div className={classes.pokedex}>
            <div className={classes.containerPokemon}>
              <div className={classes.circle}>
                <div className={classes.bigCircle}></div>
                <div className={classes.colors}></div>
              </div>

              <div className={classes.pokemonImg}>
                <div className={classes.pokemon}>
                  {img ||
                    (isShiny && shinyImg) ||
                    (pokemon && (
                      <img
                        src={pokemon.sprites.front_default}
                        alt={params.name}
                      />
                    ))}
                </div>
              </div>

              <div className={classes.button}>
                <div
                  className={classes.green}
                  onClick={changeShinyHandler}
                ></div>
                <div className={classes.buttons}>
                  <div className={classes.button1}></div>
                  <div className={classes.button2}></div>
                  <div className={classes.button3}></div>
                  <div className={classes.button4}></div>
                  <div className={classes.button5}></div>
                </div>
              </div>
            </div>

            <div className={classes.containerPokemonInfo}>
              <div className={classes.pokemonInfo}>
                <div>
                  Abilitie:<p>{pokemon && pokemon.abilities[0].ability.name}</p>
                </div>
                <div>
                  Width: <p>{pokemon && pokemon.weight}</p>
                </div>
                <div>
                  Height: <p>{pokemon && pokemon.height}</p>
                </div>
                <div>
                  Type: <p>{pokemon && pokemon.types[0].type.name}</p>
                </div>
                <div>
                  Base experience: <p>{pokemon && pokemon.base_experience}</p>
                </div>
              </div>
              <div className={classes.pokemonblack}>{params.pokemon}</div>
            </div>
          </div>

          <div className={classes.divLink}>
            <Link
              className={classes.link}
              to="/explore"
              onClick={props.removeNavHandler}
            >
              back home
            </Link>
          </div>
        </Fragment>
      ) : (
        <LoadingPokemons />
      )}
    </Main>
  );
};

export default React.memo(Pokemon);

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";

import LoadingPokemons from "../../UI/LoadingPokemons";
import Main from "../../UI/Main";
import classes from "./Explore-defult.module.css";

import pikachu from "./../../img/pikachusvg.svg";
import charizard from "./../../img/charizardsvg.svg";
import starter from "./../../img/startersvg.svg";
import search from "./../../img/search.svg";

const ExploreDefult = function (props) {
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const names = useSelector((state) => state.names);
  const [inputValue, setInputValue] = useState("");
  const [pokemons, setPokemons] = useState();
  const [error, setError] = useState("");
  const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  const currectPage = new URLSearchParams(location.search);

  useEffect(() => {
    const quaryParams = new URLSearchParams(location.search);
    let number = quaryParams.get("page");

    if (number <= 56 && number >= 2) {
      setPage(Number(number));
    }

    if (number !== null) {
      if (Number(number) > 56 || Number(number) < 1) {
        history.push("/explore?page=1");
      }
    } else {
      setPage(1);
    }

    setIsLoading(true);
    const pokemonsApi = [];
    let urls = [];
    const fetchHandeler = async () => {
      try {
        const call = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
            number !== null ? (number - 1) * 20 : start
          }`
        );
        if (!call.ok) {
          throw new Error("Somthing went worng!, Please try again later");
        }
        const response = await call.json();
        const pokemons = response.results;
        pokemons.map((pokemon) => urls.push(pokemon.url));

        urls.forEach(async (url) => {
          const secondCall = await fetch(url);
          const secondResponse = await secondCall.json();
          await setPokemons((prev) => {
            return [...prev, secondResponse];
          });
          await setIsLoading(false);
        });
      } catch (error) {
        setError(error.massage);
      }
    };
    fetchHandeler();
    setPokemons(pokemonsApi);
  }, [setIsLoading, start, location.search, history]);

  const inputHander = (event) => {
    setInputValue((prev) => {
      setErrorInput("");
      return event.target.value.toLowerCase();
    });
  };

  const incrementNumberHandler = () => {
    if (start <= 1100) {
      const numberPage = page + 1;
      setPage((prev) => prev + 1);
      history.push("./explore?page=" + numberPage);
    }
  };

  const decreaseNumberHandler = () => {
    const numberPage = page - 1;
    setPage(page - 1);
    history.push("./explore?page=" + numberPage);
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
    history.push(`explore/${inputValue}`);
  };

  const Html = pokemons
    ? pokemons.map((pokemon) => (
        <Link
          to={`./explore/${pokemon.name}`}
          className={classes.Link}
          key={pokemon.name}
          onClick={props.removeNavHandler}
        >
          <div className={classes.pokemon}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        </Link>
      ))
    : error;

  return (
    <Main>
      <div className={classes.containerimgs}>
        <Link
          to="/explore/pikachu"
          className={classes.imgs}
          onClick={props.removeNavHandler}
        >
          <img src={pikachu} alt="pikachu" />
        </Link>
        <Link
          to="/explore/charizard"
          className={classes.imgs}
          onClick={props.removeNavHandler}
        >
          <img src={charizard} alt="charizard" />
        </Link>
        <Link
          to="/explore/charmander"
          className={classes.imgs}
          onClick={props.removeNavHandler}
        >
          <img src={starter} alt="starter" />
        </Link>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          list="datalist"
          type="text"
          placeholder="search..."
          value={inputValue}
          onChange={inputHander}
          minLength="1"
        />
        <datalist id="datalist" key="datalist">
          {names.map((pokemon) => (
            <option key={pokemon}>{pokemon}</option>
          ))}
        </datalist>
        <img src={search} alt="search icon" onClick={submitHandler} />
        <br></br>
        <p className={classes.error}>{errorInput}</p>
      </form>

      <p className={classes.numberOfPokemons}>{`${page}/56`}</p>

      {!isLoading ? (
        <div className={classes.pokemons}>{Html}</div>
      ) : (
        <LoadingPokemons />
      )}

      {!isLoading ? (
        <div className={classes.explore}>
          {page !== 1 ? (
            <p className={classes.back} onClick={decreaseNumberHandler}>
              previous page
            </p>
          ) : (
            <p></p>
          )}
          {currectPage.get("page") < 56 ? (
            <p className={classes.next} onClick={incrementNumberHandler}>
              next page
            </p>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </Main>
  );
};

export default React.memo(ExploreDefult);

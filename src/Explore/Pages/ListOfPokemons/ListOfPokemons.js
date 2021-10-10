import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoadingPokemons from "./../../../UI/LoadingPokemons";
import Main from "../../../UI/Main";
import classes from "./ListOfPokemons.module.css";

const ListOfPokemons = function (props) {
  const [names, setNames] = useState([]);
  const [isSort, setIsSort] = useState(false);
  const [sortText, setSortText] = useState("sort");
  const [title, setTitle] = useState("list of pokemons");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getAllNames = async function () {
      try {
        const call = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0"
        );
        if (!call.ok) {
          setTitle("somthing went wrong, please try again letter!");
        }
        const response = await call.json();
        await setNames(response.results);
        await setIsLoading(false);
      } catch (error) {}
    };

    getAllNames();
  }, []);

  let allNames = names.length === 0 ? "" : names;
  let htmlAllNames =
    allNames === "" ? "" : allNames.map((pokemon) => pokemon.name);
  if (htmlAllNames !== "") {
    if (isSort) {
      htmlAllNames.sort();
    }
  }

  const html =
    htmlAllNames !== ""
      ? htmlAllNames.map((pokemon) => (
          <Link
            to={`/explore/${pokemon}`}
            key={pokemon}
            className={classes.link}
            onClick={props.removeNavHandler}
          >
            <li>{pokemon}</li>
          </Link>
        ))
      : "";

  const sortHandler = function () {
    setIsSort(!isSort);
    if (sortText === "sort") {
      setSortText("unsort");
    } else {
      setSortText("sort");
    }
  };

  const namesLength = names ? names.length : "";

  return (
    <Main>
      <div className={classes.title}>
        <h1>{title}</h1>
        <p>pokemons: {namesLength.toLocaleString()}</p>
        {title === "list of pokemons" && (
          <button onClick={sortHandler}>{sortText}</button>
        )}
      </div>
      {isLoading ? (
        <LoadingPokemons />
      ) : (
        <ul className={classes.names}>{html}</ul>
      )}
    </Main>
  );
};

export default ListOfPokemons;

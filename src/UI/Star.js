import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorites } from "./../Store/Fav";

import classes from "./Star.module.css";

const Star = function (props) {
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  const isFav = favorite.includes(props.pokemon) ? `${classes.fill}` : "";

  const toggleFavHandler = function () {
    dispatch(toggleFavorites(props.pokemon));
  };

  return (
    <svg
      onClick={toggleFavHandler}
      className={`${props.star} ${isFav}`}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.612 17.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.16-.888.282-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L10 15.187l-4.389 2.256z" />
    </svg>
  );
};

export default React.memo(Star);

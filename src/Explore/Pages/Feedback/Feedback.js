import React, { useState, useEffect, Fragment } from "react";

import Main from "../../../UI/Main";
import classes from "./Feedback.module.css";
import LoadingPokemons from "../../../UI/LoadingPokemons";
import Review from "../../../UI/Review";

const Feedback = function () {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rate, setRate] = useState(5);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sucsses, setSucsses] = useState(false);
  const [title, setTitle] = useState("feedback");
  const [isHebrewName, setIsHebrewName] = useState(false);
  const [isHebrewDescription, setIsHebrewNameDescription] = useState(false);
  let score = 0;

  useEffect(() => {
    setIsLoading(true);
    const getDate = async function () {
      try {
        const call = await fetch(
          "https://reviews-9da33-default-rtdb.firebaseio.com/reviews.json"
        );
        if (!call.ok) {
          setTitle("error, try again later");
          setIsLoading(true);
        }
        const response = await call.json();
        await setIsLoading(false);
        const helperReviews = [];
        for (const key in response) {
          helperReviews.push({
            id: key,
            ...response[key],
          });
        }
        setReviews(helperReviews);
      } catch (error) {}
    };

    getDate();
  }, []);

  const html =
    reviews.length !== 0
      ? reviews.map((review) => {
          return (
            <div className={classes.review} key={review.id}>
              <h2>{review.name}</h2>
              <p>{review.description}</p>
              <p>rated: {review.rate}</p>
            </div>
          );
        })
      : "";

  if (reviews.length !== 0) {
    reviews.map((review) => (score += Number(review.rate)));
    score = score / reviews.length;
  }

  const nameHandler = function (event) {
    setName(event.target.value);
    if (/^[א-ת]+$/.test(event.target.value.trim()[0])) {
      setIsHebrewName(true);
    } else {
      setIsHebrewName(false);
    }
  };

  const rateHandler = function (event) {
    setRate(event.target.value);
  };

  const descriptionHandler = function (event) {
    setDescription(event.target.value);
    if (/^[א-ת]+$/.test(event.target.value.trim()[0])) {
      setIsHebrewNameDescription(true);
    } else {
      setIsHebrewNameDescription(false);
    }
  };

  const submitHandler = function (event) {
    event.preventDefault();
    if (name.trim() === "" || description.trim() === "") return;
    const review = {
      name,
      rate,
      description,
    };
    fetch("https://reviews-9da33-default-rtdb.firebaseio.com/reviews.json", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSucsses(true);
  };

  const nameWarning = name.trim() === "" ? classes.warning : classes.notWarning;
  const descriptionWarning =
    description.trim() === "" ? classes.warning : classes.notWarning;

  const nameHebrew = isHebrewName ? `${classes.hebrew}` : "";
  const descriptionHebrew = isHebrewDescription ? `${classes.hebrew}` : "";

  return (
    <Fragment>
      {sucsses ? <Review /> : ""}
      <Main>
        <div className={classes.title}>
          <h1>{title}</h1>
        </div>

        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">name: </label>
            <input
              className={nameHebrew}
              id="name"
              type="text"
              maxLength="15"
              value={name}
              onChange={nameHandler}
              required
            />
            <p className={nameWarning}>The field can not be empty</p>
          </div>
          <div>
            <label htmlFor="rate">rate: </label>
            <select id="rate" onChange={rateHandler} defaultValue={"5"}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div>
            <label htmlFor="textfield">description: </label>
            <textarea
              className={descriptionHebrew}
              id="textfield"
              type="text"
              maxLength="200"
              value={description}
              onChange={descriptionHandler}
              required
            />
            <p className={descriptionWarning}>The field can not be empty</p>
          </div>
          <div>
            <button type="submit" className={classes.button}>
              submit
            </button>
          </div>
        </form>

        {isLoading ? (
          <LoadingPokemons />
        ) : (
          <div className={classes.feedback}>
            <h1>reviews</h1>
            <p className={classes.rate}>{score.toFixed(1)}/5</p>
            {html}
          </div>
        )}
      </Main>
    </Fragment>
  );
};

export default React.memo(Feedback);

import classes from "./Review.module.css";

const Review = function () {
  const reset = function () {
    window.location.reload();
  };

  return (
    <div className={classes.continer}>
      <div className={classes.review}>
        <h2>sucsses</h2>
        <button onClick={reset}>ok</button>
      </div>
    </div>
  );
};

export default Review;

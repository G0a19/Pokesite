import classes from "./Loading.module.css";

const Loading = function () {
  return (
    <div className={classes.container}>
      <div className={classes.ball}></div>
    </div>
  );
};

export default Loading;

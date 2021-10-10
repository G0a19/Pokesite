import classes from "./Error.module.css";
import sleep from "./../img/pageerror.png";

const Error = function () {
  return (
    <div className={classes.Error}>
      <p>Error 404 Page not found</p>
      <img src={sleep} alt="sleeping pikachu" />
    </div>
  );
};

export default Error;

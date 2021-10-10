import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Loading from "./UI/Loading";
import "./App.css";
// import { pushNameHandler } from "./Store/Store";
// import Pokemon from "./Explore/Pages/Pokemons/Pokemon";

const Home = React.lazy(() => import("./Home/Home"));
const Error = React.lazy(() => import("./ErrorPage.js/Error"));
const Explore = React.lazy(() => import("./Explore/Explore"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/explore">
          <Explore></Explore>
        </Route>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default React.memo(App);

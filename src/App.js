import React, { useContext } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Database from "./pages/Database";
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";
import Layout from "./components/Nav/Layout";
import Auth from "./pages/Auth";
import AuthContext from "./hooks/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        {isLoggedIn && (
          <Route path="/favourite">
            <Favourite />
          </Route>
        )}
        <Route path="/database">
          <Database />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

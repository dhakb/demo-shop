import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import CartPage from "./views/CartPage";
import ProductDetailsPage from "./views/ProductDetailsPage";
import ProductListingPage from "./views/ProductListingPage";


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/cart" component={CartPage} />
          <Route
            exact
            path="/:categoryName"
            component={ProductListingPage}
          ></Route>
          <Route
            exact
            path="/:categoryName/:productId"
            component={ProductDetailsPage}
          />
        </Switch>
      </Layout>
    );
  }
}

export default App;

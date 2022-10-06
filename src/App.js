import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import CartPage from "./views/cartPage/CartPage";
import ProductDetailsPage from "./views/PDP/ProductDetailsPage";
import ProductListingPage from "./views/PLP/ProductListingPage";
import HomePage from "./views/homePage/HomePage";


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage}/>
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

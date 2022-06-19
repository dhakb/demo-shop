import React, { Component, Fragment } from "react";
import MainNavigation from "./MainNavigation";


class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <MainNavigation />
        <main>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;

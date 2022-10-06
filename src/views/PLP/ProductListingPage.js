import React, { Fragment } from "react";
import ProductList from "../../components/productList/ProductList";

import classes from "./ProductListingPage.module.css";

class ProductListingPage extends React.Component {
  render() {
    const pathName = this.props.match.params.categoryName;
    return (
      <Fragment>
        <div className={classes.wrapper}>
          <ProductList pathName={pathName} />
        </div>
      </Fragment>
    );
  }
}

export default ProductListingPage;

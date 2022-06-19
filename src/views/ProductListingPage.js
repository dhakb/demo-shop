import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProductList from "../components/productList/ProductList";
import { apiSlice } from "../features/api/apiSlice";

import classes from "./ProductListingPage.module.css";

class ProductListingPage extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const isLoading = this.props.productsData.isLoading;
    const isSuccess = this.props.productsData.isSuccess;
    const isError = this.props.productsData.isError;
    const pathName = this.props.match.params.categoryName;

    let content;

    if (isLoading) {
      content = <div>Loading...</div>;
    } else if (isError) {
      content = <div>Something went wrong!</div>;
    } else if (isSuccess) {
      content = (
        <div className={classes.wrapper}>
          <ProductList pathName={pathName} />
        </div>
      );
    }

    return <Fragment>{content}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    productsData: apiSlice.endpoints.getProducts.select()(state),
  };
};

const mapDistpatchToProps = {
  getProducts: apiSlice.endpoints.getProducts.initiate,
};

export default connect(
  mapStateToProps,
  mapDistpatchToProps
)(ProductListingPage);

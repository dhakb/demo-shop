import React from "react";
import { connect, Connect } from "react-redux";
import { apiSlice } from "../../features/api/apiSlice";

import ProductCard from "../productCard/ProductCard";
import classes from "./ProductList.module.css";

class ProductList extends React.Component {
  render() {
    const pathName = this.props.pathName;
    const productList = this.props.products.data;
    const { isLoading, isSuccess } = this.props.products;

    let content;

    if (isLoading) {
      return <div></div>;
    } else if (isSuccess) {
      content = (
        <div>
          <h1 className={classes.categoryName}>{pathName}</h1>
          <div className={classes.productsContainer}>
            {productList.map((category) => {
              if (category.name === pathName) {
                return category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ));
              }
            })}
          </div>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    products: apiSlice.endpoints.getProducts.select()(state),
  };
};

export default connect(mapStateToProps)(ProductList);

import React from "react";
import { connect } from "react-redux";
import { apiSlice } from "../../features/api/apiSlice";

import ProductCard from "../productCard/ProductCard";
import classes from "./ProductList.module.css";

let categoryName;

class ProductList extends React.Component {
  componentDidMount() {
    this.props.getProductsByCategory(this.props.pathName);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pathName !== prevProps.pathName) {
      this.props.getProductsByCategory(this.props.pathName);
    }
  }

  render() {
    categoryName = this.props.pathName
    const pathName = this.props.pathName;
    const data = this.props.products.data;
    const productList = data?.products;
    const { isLoading, isSuccess} = this.props.products;

    let content;

    if (isLoading) {
      return <div></div>;
    } else if (isSuccess) {
      content = (
        <div>
          <h1 className={classes.categoryName}>{pathName}</h1>
          <div className={classes.productsContainer}>
            {productList.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    products: apiSlice.endpoints.getProductsByCategory.select(categoryName)(state),
  };
};

const mapDistpatchToProps = {
  getProductsByCategory: apiSlice.endpoints.getProductsByCategory.initiate,
};

export default connect(mapStateToProps, mapDistpatchToProps)(ProductList);

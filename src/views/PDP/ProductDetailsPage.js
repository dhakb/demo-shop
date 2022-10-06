import React from "react";
import ProductDetails from "../../components/productDetails/ProductDetails";

class ProductDetailsPage extends React.Component {
  render() {
    const productId = this.props.match.params.productId;

    return <ProductDetails id={productId} />;
  }
}

export default ProductDetailsPage;

import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { apiSlice } from "../../features/api/apiSlice";
import { cartSliceActions } from "../../features/cartSlice";
import Attributes from "../attributes/Attributes";

import classes from "./ProductDetails.module.css";

const { addProductToCart } = cartSliceActions;

let productId;

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      selectedImg: "",
      selectedAttributes: {},
    };
    this.onImgChange = this.onImgChange.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
  }

  componentDidMount() {
    this.props.getProductById(this.props.id);
  }

  onAddProduct(product) {
    if (
      Object.keys(this.state.selectedAttributes).length ==
      product.attributes.length
    ) {
      this.props.addProductToCart({
        id: uuidv4(),
        product: product,
        selectedAttributes: this.state.selectedAttributes,
        quantity: 1,
      });
    } else {
      return alert("Choose attributes");
    }
  }

  onImgChange(img) {
    this.setState((prev) => {
      return {
        ...prev,
        selectedImg: img,
      };
    });
  }

  render() {
    productId = this.props.id
    const product = this.props.product.data
    const attributes = product?.attributes;
    const inStock = product?.inStock;
    const { isLoading, isSuccess } = this.props.product;

    let content;

    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isSuccess) {
      content = (
        <Fragment>
          <div className={classes.imagesContainer}>
            <div className={classes.imagesList}>
              {product.gallery.map((imgURL) => (
                <img
                  src={imgURL}
                  key={imgURL}
                  onClick={() => this.onImgChange(imgURL)}
                />
              ))}
            </div>
            <div className={classes.mainImage}>
              <img
                src={
                  this.state.selectedImg
                    ? this.state.selectedImg
                    : product.gallery[0]
                }
              />
            </div>
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.title}>
              <h1 className={classes.brand}>{product.brand}</h1>
              <h1 className={classes.name}>{product.name}</h1>
            </div>
            {attributes.map((attribute) => (
              <Attributes
                key={attribute.id}
                attribute={attribute}
                onAttributeSelect={(attributeItem) => {
                  this.setState((prev) => {
                    return {
                      ...prev,
                      selectedAttributes: {
                        ...this.state.selectedAttributes,
                        [attribute.id]: attributeItem,
                      },
                    };
                  });
                }}
                selectedAttribute={this.state.selectedAttributes[attribute.id]}
              />
            ))}
            <div className={classes.price}>
              <div className={classes.priceLabel}>PRICE:</div>
              <div className={classes.amount}>
                {this.props.currency.currencyValue}
                {
                  product.prices.find(
                    (price) =>
                      price.currency.symbol ===
                      this.props.currency.currencyValue
                  ).amount
                }
              </div>
            </div>
            {inStock ? (
              <button
                className={classes.addButton}
                type="button"
                onClick={() => this.onAddProduct(product)}
              >
                ADD TO CART
              </button>
            ) : (
              <button className={classes.disabledButton} type="button" disabled>
                OUT OF STOCK
              </button>
            )}
            <div className={classes.description}>
              {!this.state.showMore && product.description.length > 300
                ? parse(product.description.slice(0, 250) + " ...")
                : parse(product.description)}
              {product.description.length > 300 ? (
                <button
                  className={classes.showMore}
                  onClick={() =>
                    this.setState((prev) => ({ showMore: !prev.showMore }))
                  }
                >
                  {!this.state.showMore ? "more" : "less"}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </Fragment>
      );
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>{content}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: apiSlice.endpoints.getProductById.select(productId)(state),
    currency: state.currency,
  };
};

const mapDispatchToProps = {
  getProductById: apiSlice.endpoints.getProductById.initiate,
  addProductToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

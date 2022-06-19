import React from "react";
import { connect } from "react-redux";
import { cartSliceActions } from "../../features/cartSlice";

import { ReactComponent as ArrowLeft } from "../../assets/svg/arrowLeft.svg";
import { ReactComponent as ArrowRigth } from "../../assets/svg/arrowRight.svg";

import classes from "./SingleCartProduct.module.css";

const { addProductToCart, removeProductFromCart } = cartSliceActions;

class SingleCartProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgIndex: 0,
    };
  }

  onNextImg(length) {
    this.setState({ imgIndex: this.state.imgIndex + 1 });
    if (this.state.imgIndex == length - 1) {
      this.setState({ imgIndex: 0 });
    }
  }

  onPrevtImg(length) {
    this.setState({ imgIndex: this.state.imgIndex- 1 });
    if(this.state.imgIndex <= 0) {
        this.setState({imgIndex: length - 1})
    }
  }

  render() {
    const product = this.props.product;

    return (
      <div className={classes.productItem}>
        <div className={classes.productInfo}>
          <div className={classes.productName}>
            <p>{product.product.brand}</p>
            <p>{product.product.name}</p>
          </div>
          <div className={classes.price}>
            {product.product.prices.map((price) => {
              if (price.currency.symbol === this.props.currency.currencyValue) {
                return (
                  <p key={price.currency.label}>
                    {price.currency.symbol}
                    {price.amount}
                  </p>
                );
              }
            })}
          </div>
          <div className={classes.attributesWrapper}>
            {product.product.attributes.map((attribute) => {
              return (
                <div key={attribute.id}>
                  <div className={classes.attributeName}>{attribute.name}:</div>
                  <div className={classes.attributes}>
                    {attribute.items.map((item) => {
                      const isSelected =
                        product.selectedAttributes[attribute.name] ==
                        item.displayValue;
                      return (
                        <div
                          key={item.id}
                          className={`${
                            isSelected && attribute.type === "swatch"
                              ? classes.selectedColorAttribute
                              : ""
                          }`}
                        >
                          <div
                            key={item.id}
                            className={`${
                              attribute.type === "swatch"
                                ? classes.colorAttributeItem
                                : classes.attributeItem
                            } ${
                              isSelected && attribute.type !== "swatch"
                                ? classes.selectedAttribute
                                : ""
                            }`}
                            style={{
                              backgroundColor: item.value,
                            }}
                          >
                            {attribute.type === "swatch" ? "" : item.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.buttonsAndPhoto}>
          <div className={classes.quantityBtns}>
            <button onClick={() => this.props.addProduct(product)}>+</button>
            <p className={classes.quantityCounter}>{product.quantity}</p>
            <button onClick={() => this.props.removeProduct(product.id)}>
              -
            </button>
          </div>
          <div>
            <img
              className={classes.productImg}
              src={product.product.gallery[this.state.imgIndex]}
            />
            {product.product.gallery.length > 1 && (
              <div className={classes.arrowButtonsWrapper}>
                <div
                  className={classes.arrowButton}
                  onClick={() =>
                    this.onPrevtImg(product.product.gallery.length)
                  }
                >
                  <ArrowLeft />
                </div>
                <div
                  className={classes.arrowButton}
                  onClick={() => this.onNextImg(product.product.gallery.length)}
                >
                  <ArrowRigth />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    total: state.total,
  };
};

const mapDispatchToProps = {
  addProduct: addProductToCart,
  removeProduct: removeProductFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCartProduct);

import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { cartSliceActions } from "../../features/cartSlice";

import classes from "./CartOverlay.module.css";

const { addProductToCart, removeProductFromCart } = cartSliceActions;

class CartOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.onViewBagClick = this.onViewBagClick.bind(this);
  }

  onViewBagClick() {
    this.props.history.push("/cart");
    this.props.onShowOverlayChange();
  }

  render() {
    return (
      <Fragment>
        <div
          className={classes.backdrop}
          onClick={() => this.props.onShowOverlayChange()}
        ></div>
        <div className={classes.overlayContainer}>
          <div className={classes.overlayContent}>
            <div className={classes.bagTitleWrapper}>
              <p>
                <span className={classes.bagTitle}>My Bag,</span>{" "}
                <span>{this.props.total.totalQty} items</span>
              </p>
            </div>
            <div className={classes.productItems}>
              {this.props.cart.cartItems.map((product) => (
                <div className={classes.productItem} key={uuidv4()}>
                  <div className={classes.productInfo}>
                    <div className={classes.productName}>
                      <p>{product.product.brand}</p>
                      <p>{product.product.name}</p>
                    </div>
                    <div className={classes.price}>
                      {product.product.prices.map((price) => {
                        if (
                          price.currency.symbol ===
                          this.props.currency.currencyValue
                        ) {
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
                            <div className={classes.attributeName}>
                              {attribute.name}:
                            </div>
                            <div className={classes.attributes}>
                              {attribute.items.map((item) => {
                                const isSelected =
                                  product.selectedAttributes[attribute.name] ==
                                  item.displayValue;
                                return (
                                  <div
                                    key={item.id}
                                    className={
                                      isSelected && attribute.type === "swatch"
                                        ? classes.selectedColorAttribute
                                        : ""
                                    }
                                  >
                                    <div
                                      key={item.id}
                                      className={`${
                                        attribute.type === "swatch"
                                          ? classes.colorAttributeItem
                                          : classes.attributeItem
                                      } ${
                                        attribute.name === "Capacity"
                                          ? classes.capacityAttributeItem
                                          : ""
                                      } ${
                                        isSelected &&
                                        attribute.type !== "swatch"
                                          ? classes.selectedAttribute
                                          : ""
                                      }`}
                                      style={{ backgroundColor: item.value }}
                                    >
                                      {attribute.type === "swatch"
                                        ? ""
                                        : item.value}
                                    </div>
                                  </div>
                                );
                              })}
                              <div className={classes.line}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={classes.buttonsAndPhoto}>
                    <div className={classes.quantityBtns}>
                      <button onClick={() => this.props.addProduct(product)}>
                        +
                      </button>
                      <p className={classes.quantityCounter}>
                        {product.quantity}
                      </p>
                      <button
                        onClick={() => this.props.removeProduct(product.id)}
                      >
                        -
                      </button>
                    </div>
                    <img
                      className={classes.productImg}
                      src={product.product.gallery[0]}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.totalWrapper}>
              <p className={classes.totalTitle}>Total</p>
              <p className={classes.totalAmount}>
                {this.props.currency.currencyValue}
                {this.props.total.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className={classes.buttons}>
            <button className={classes.viewBag} onClick={this.onViewBagClick}>
              view bag
            </button>
            <button className={classes.checkOut}>check out</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
    total: state.total,
  };
};

const mapDispatchToProps = {
  addProduct: addProductToCart,
  removeProduct: removeProductFromCart,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
);

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { cartSliceActions } from "../../features/cartSlice";

import SingleCartProduct from "../../components/singleCartProduct/SingleCartProduct";

import classes from "./CartPage.module.css";

const { addProductToCart, removeProductFromCart } = cartSliceActions;

class CartPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.cartContainer}>
          <div className={classes.title}>
            <p>cart</p>
          </div>
          <div className={classes.productItems}>
            {this.props.cart.cartItems.map((product) => (
              <SingleCartProduct product={product} key={uuidv4()} />
            ))}
          </div>
          <div className={classes.footer}>
            <p className={classes.tax}>
              Tax 21%:{" "}
              <span>
                {this.props.currency.currencyValue}
                {this.props.total.tax.toFixed(2)}
              </span>
            </p>
            <p className={classes.quantity}>
              Quantity:<span>{this.props.total.totalQty}</span>
            </p>
            <p className={classes.total}>
              Total:{" "}
              <span>
                {this.props.currency.currencyValue}
                {this.props.total.totalAmount.toFixed(2)}
              </span>
            </p>
            <button type="button" className={classes.orderButton}>
              Order
            </button>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

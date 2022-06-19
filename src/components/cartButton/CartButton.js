import React from "react";
import { connect } from "react-redux";

import { ReactComponent as CartIcon } from "../../assets/svg/cartIcon.svg";
import CartOverlay from "../cartOverlay/CartOverlay";
import { totalSliceActions } from "../../features/totalSlice";

import classes from "./CartButton.module.css";

const { getTotalQtyAndTax } = totalSliceActions;

class CartButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    this.props.getTotalQtyAndTax({
      cartItems: this.props.cart.cartItems,
      currency: this.props.currency.currencyValue,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.cart.cartItems !== prevProps.cart.cartItems ||
      this.props.currency.currencyValue !== prevProps.currency.currencyValue
    ) {
      this.props.getTotalQtyAndTax({
        cartItems: this.props.cart.cartItems,
        currency: this.props.currency.currencyValue,
      });
    }
  }

  onToggle() {
    this.setState((prev) => ({ showOverlay: !prev.showOverlay }));
  }

  render() {
    return (
      <div className={classes.cartButtonContainer}>
        <div onClick={this.onToggle}>
          <CartIcon className={classes.cartIcon} />
          {this.props.total.totalQty > 0 && (
            <span className={classes.counter}>{this.props.total.totalQty}</span>
          )}
        </div>
        {this.state.showOverlay && (
          <CartOverlay onShowOverlayChange={this.onToggle} />
        )}
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
  getTotalQtyAndTax,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);

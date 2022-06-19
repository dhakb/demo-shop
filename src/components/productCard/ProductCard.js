import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as CartIcon } from "../../assets/svg/cartIconWhite.svg";
import { cartSliceActions } from "../../features/cartSlice";

import classes from "./ProductCard.module.css";

const { addProductToCart } = cartSliceActions;

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultAttributes: {},
    };

    this.onAddProduct = this.onAddProduct.bind(this);
  }

  componentDidMount() {
    this.props.product.attributes.forEach((attribute) => {
      this.setState((prev) => {
        return {
          ...prev,
          defaultAttributes: {
            ...prev.defaultAttributes,
            [attribute.id]: attribute.items[0].displayValue,
          },
        };
      });
    });
  }

  onAddProduct() {
    this.props.addProductToCart({
      id: uuidv4(),
      product: this.props.product,
      selectedAttributes: this.state.defaultAttributes,
      quantity: 1,
    });
  }

  render() {
    const product = this.props.product;
    const inStock = product.inStock;
    const category = product.category;
    const id = product.id;
    return (
      <div className={classes.cardContainer}>
        <Link to={`/${category}/${id}`} className={classes.link}>
          <div className={classes.imgWrapper}>
            <img src={product.gallery[0]} className={classes.image} />
            {!inStock && <div className={classes.outOfStock}>OUT OF STOCK</div>}
          </div>
          <div
            className={`${!inStock ? classes.onBlurr : ""} ${
              classes.titleWrapper
            }`}
          >
            <p className={classes.title}>
              {product.brand} {product.name}
            </p>
            {product.prices.map((price) => {
              if (price.currency.symbol === this.props.currency.currencyValue) {
                return (
                  <p className={classes.price} key={price.amount}>
                    {this.props.currency.currencyValue}
                    {price.amount}
                  </p>
                );
              }
            })}
          </div>
        </Link>
        {inStock && (
          <div className={classes.cartIconButton} onClick={this.onAddProduct}>
            <CartIcon className={classes.cartIcon} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = {
  addProductToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);

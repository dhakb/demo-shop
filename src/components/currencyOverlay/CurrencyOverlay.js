import React, { Fragment } from "react";
import { connect } from "react-redux";
import { apiSlice } from "../../features/api/apiSlice";
import { currencySliceActions } from "../../features/currencySlice";

import classes from "./CurrencyOverlay.module.css";

const { setCurrency } = currencySliceActions;

class CurrencyOverlay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrencies();
  }

  onCurrencySwitch(currency) {
    this.props.setCurrency(currency);
    this.props.onSelect();
  }

  render() {
    const { isLoading, isSuccess, isError, data } = this.props.currencies;

    let content;

    if (isLoading) {
      content = <div>Loading...</div>;
    } else if (isError) {
      content = <div>Something went wrong!</div>;
    } else if (isSuccess) {
      content = (
        <Fragment>
          {data.map((curr) => {
            return (
              <div
                key={curr.label}
                className={`${classes.currency} ${
                  this.props.currency.currencyValue === curr.symbol &&
                  classes.selected
                }`}
                value={curr.label}
                onClick={() => this.onCurrencySwitch(curr.symbol)}
              >
                {curr.symbol} {curr.label}
              </div>
            );
          })}
        </Fragment>
      );
    }
    return <div className={classes.currencyOptions}>{content}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currencies: apiSlice.endpoints.getCurrencies.select()(state),
    currency: state.currency,
  };
};

const mapDispatchToProps = {
  getCurrencies: apiSlice.endpoints.getCurrencies.initiate,
  setCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyOverlay);

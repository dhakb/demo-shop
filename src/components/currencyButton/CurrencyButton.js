import React from "react";
import { connect } from "react-redux";
import { ReactComponent as ArrowUp } from "../../assets/svg/upArrow.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/downArrow.svg";

import CurrencyOverlay from "../currencyOverlay/CurrencyOverlay";
import classes from "./CurrencyButton.module.css";

class CurrencyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrencyOverlay: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState((prev) => ({
      showCurrencyOverlay: !prev.showCurrencyOverlay,
    }));
  }

  render() {
    return (
      <div
        className={classes.currencyButtonContainer}
        onBlur={() => this.setState({ showCurrencyOverlay: false })}
        tabIndex="1"
      >
        <div className={classes.currencyButton} onClick={this.onToggle}>
          {this.props.currency.currencyValue}
          <div className={classes.arrowContainer}>
            {this.state.showCurrencyOverlay && <ArrowUp />}
            {!this.state.showCurrencyOverlay && <ArrowDown />}
          </div>
        </div>
        {this.state.showCurrencyOverlay && (
          <CurrencyOverlay
            onSelect={() =>
              this.setState(() => ({ showCurrencyOverlay: false }))
            }
          />
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

export default connect(mapStateToProps)(CurrencyButton);

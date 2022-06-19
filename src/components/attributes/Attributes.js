import React from "react";

import classes from "./Attributes.module.css";

class Attributes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const attribute = this.props.attribute;
    const attributeType = attribute.type;
    return (
      <div className={classes.wrapper}>
        <div className={classes.attrName}>{attribute.name}:</div>
        <div className={classes.attributesContainer}>
          {attribute.items.map((item) => (
            <div
              key={item.id}
              className={
                this.props.selectedAttribute === item.id &&
                attributeType === "swatch"
                  ? classes.selectedColorAttribute
                  : ""
              }
            >
              <div
                key={item.id}
                className={`${
                  attributeType === "swatch"
                    ? classes.colorAttribute
                    : classes.attribute
                } ${
                  this.props.selectedAttribute === item.id
                    ? classes.selected
                    : ""
                }`}
                style={{ backgroundColor: item.value }}
                onClick={() => this.props.onAttributeSelect(item.displayValue)}
              >
                {attributeType === "swatch" ? "" : item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Attributes;

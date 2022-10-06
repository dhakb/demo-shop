import React from "react";

import classes from "./HomePage.module.css"

class HomePage extends React.Component {

    render() {
        return (
            <div className={classes.homPageContainer}>
                <div className={classes.rowContainer}>
                    <h1>Demo-Shop</h1>
                    <p>(dummy e-commerce website)</p>
                    <p>enjoy playing around! &#128529;</p>
                </div>
            </div>
        )
    }
}


export default HomePage
import React from "react";
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {apiSlice} from "../../features/api/apiSlice";

import classes from "./MainNavigation.module.css";
import {ReactComponent as Logo} from "../../assets/svg/logo.svg";

// Components
import CartButton from "../cartButton/CartButton";
import CurrencyButton from "../currencyButton/CurrencyButton";

class MainNavigation extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const {isLoading, isSuccess, isError, data} = this.props.categories;

        let content;

        if (isError) {
            content = <div>Something went wrong </div>;
        }

        if (isLoading) {
            content = <div>Loading...</div>;
        } else if (isSuccess) {
            content = (
                <nav className={classes.navContainer}>
                    <div className={classes.navLinks}>
                        {data.map((category) => (
                            <NavLink
                                to={`/${category.name}`}
                                key={category.name}
                                className={classes.navLink}
                                activeClassName={classes.activeLink}
                            >
                                {category.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className={classes.logoContainer}>
                        <Link to="/">
                            <Logo className={classes.logo}/>
                        </Link>
                    </div>
                    <div className={classes.navButtonsContainer}>
                        <CurrencyButton/>
                        <CartButton/>
                    </div>
                </nav>
            );
        }

        return <header className={classes.wrapper}> {content} </header>;
    }
}

const mapStateToProps = (state) => {
    return {
        categories: apiSlice.endpoints.getCategories.select()(state),
    };
};

const mapDispatchToProps = {
    getCategories: apiSlice.endpoints.getCategories.initiate,
};


export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);


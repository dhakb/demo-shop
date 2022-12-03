# DemoShop [view](https://demo-shop-storefront.netlify.app/)

![](https://i.ibb.co/BcRTPzR/demo-shop.png)



### About and challenges
 
 The DemoShop project was pioneering activity from which much has been learned. Main goal was to play around React class components and Redux Toolkit.
 Faced a few challenges in terms of interacting with Apollo server from class components using apollo client for the reason didn't want to use deprecated
 tools. Thanks to Redux Toolkit and its RTK Query job got done. 

 Apollo server (GraphQL enpoint) is deployed on netlify using netlify functions which is built on top of AWS Lambda functions.

Working with GraphQL endpoints are as it's described bellow. When visiting website user receives category names and currency options.
Depending on it renders navbar. If user visits category fetches products only for specific category. If user visits products page, receives all information about this product.
Once data is fetched it's persisted in the redux store to enhance performance and avoid unnecessary fetching.

## Features and stack 

#### Features
  
  ###### Functionalities
  
  * PLP - product listing page, a.k.a category page.
  * PDP - product description page, a.k.a product page.
  * Cart Page + Cart Overlay(mini-cart)
  * Cart Page + Cart Overlay(mini-cart)
  * Fetch products data from GraphQL server endpoint deployed on Heroku


  ###### Details
  
  * add product to cart from PLP with first attributes (options) as default.
  * add/remove products and change their amounts in cart. 
  * add/remove products from cart overlay (mini-cart).
  * add same product with different attributes as a separate item.
  * change currency of the store to one of the available currencies.
  * review product photos on cart page

#### Stack 

* React
    * Class Components
* Redux Toolkit
   * RTK Query
   * redux-persist
* React Router 
* GraphQL
    * graphql-request
* CSS
    * React CSS Modules



## Bootstrapped with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

For the detailed description of available scripts see [CRA Documentation](https://create-react-app.dev/docs/available-scripts)


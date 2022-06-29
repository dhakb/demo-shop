import { gql } from "graphql-request";

export const getCategories = gql`
  query {
    categories {
      name
    }
  }
`;

export const getProducts = gql`
  query {
    categories {
      name
      products {
        id
        name
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            id
            value
          }
        }
        description
        inStock
        brand
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const getCurrencies = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const getProductById = (productId) => {
  return gql`
    query {
      product(id: ${productId}) {
        name
        brand
      }
    }
    `;
};

export const getProductsByCategory = (categoryName) => {
  return gql`
    query {
      category(input: { title: ${categoryName}}) {
        name
        products {
          id
          name
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              id
              value
            }
          }
          description
          inStock
          brand
          gallery
          prices {
            currency {
              label
              symbol
            }
            amount
          }
        }
      }
    }
  `;
};

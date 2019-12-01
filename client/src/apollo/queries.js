import gql from "graphql-tag";

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageURL
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
  }
`;
// See the Apollo docs for instructions on how to use fragments:
// https://www.apollographql.com/docs/angular/features/fragments.html
export const ITEM_QUERY = gql`
  query item($id: ID!) {
    item(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    item(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      bio
      email
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...itemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(item: $item) {
      id
      title
      description
      tags {
        id
        title
      }
      imageURL
    }
  }
`;

/**
 * Auth-related queries and mutations.
 */

export const VIEWER_QUERY = gql`
  query viewer {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user) {
      token
      user {
        id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      token
      user {
        id
      }
    }
  }
`;

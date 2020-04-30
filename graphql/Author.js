import { gql } from "apollo-boost";

export const MeQuery = gql`
  {
    Me {
      Email
      AuthorName
    }
  }
`;

export const SignInMutation = gql`
  mutation($Email: String!, $Password: String!) {
    SignIn(Email: $Email, Password: $Password) {
      Email
      Password
      __typename
    }
  }
`;

export const SignOutMutation = gql`
  mutation {
    SignOut
  }
`;

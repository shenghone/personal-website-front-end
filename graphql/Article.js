import { gql } from "apollo-boost";

export const NewArticleMutation = gql`
  mutation($Title: String!, $Content: String!, $Status: Boolean!) {
    NewArticle(Title: $Title, Content: $Content, Status: $Status) {
      Title
      Content
      Status
      __typename
    }
  }
`;

export const UpdateArticleMutation = gql`
  mutation($id: ID!, $Title: String!, $Status: Boolean!, $Content: String!) {
    UpdateArticle(id: $id, Title: $Title, Status: $Status, Content: $Content) {
      Title
      Content
    }
  }
`;

export const ArticlesQuery = gql`
  {
    Articles {
      id
      Title
      Content
      Status
      createdAt
    }
  }
`;

export const ArticleQuery = gql`
  query($id: ID!) {
    Article(id: $id) {
      id
      Title
      Content
      createdAt
    }
  }
`;

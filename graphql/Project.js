import { gql } from "apollo-boost";

export const ProjectsQuery = gql`
  {
    Projects {
      id
      Title
      FrontEnd
      BackEnd
      Description
      Status
      Asset
      Link
    }
  }
`;

import { gql, useQuery } from "@apollo/client";

const COUNTRIES_QUERY = gql`
  query GetCountry {
    country(code: "BR") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

export default function Index() {
  const { data } = useQuery(COUNTRIES_QUERY);

  return <div>{JSON.stringify(data)}</div>;
}

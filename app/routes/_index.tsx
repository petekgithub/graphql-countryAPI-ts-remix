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
  const { data, loading, error } = useQuery(COUNTRIES_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Apollo Client Error:", error);
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
}

import React, { useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

interface Country {
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  size: string;
  languages: {
    code: string;
    name: string;
  }[];
}

// query for Apollo Client
const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      name
      native
      capital
      emoji
      currency
      size
      languages {
        code
        name
      }
    }
  }
`;

// Filtering and Grouping
function applyFilterAndGroup(
  data: Country[],
  filterInput: string
): Country[] | Record<string, Country[]> {
  const [searchTerm, groupBy] = filterInput.split(" group:");

  // For filtering
  const filteredData = data.filter((country) =>
    searchTerm
      ? country.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  // For grouping
  if (groupBy && groupBy === "size") {
    const groupedData: Record<string, Country[]> = {};

    filteredData.forEach((country) => {
      const size = country.size || "Unknown";

      if (!groupedData[size]) {
        groupedData[size] = [];
      }

      groupedData[size].push(country);
    });

    return groupedData;
  }

  return filteredData;
}

function Client() {
  const [filterInput, setFilterInput] = useState("");
  const { loading, error, data } = useQuery(COUNTRIES_QUERY); // useQuery, hook to fetch data

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Apollo Client Error:", error);
    return <div>Error: {error.message}</div>;
  }

  const filteredAndGroupedData = applyFilterAndGroup(
    data?.countries || [],
    filterInput
  );

  return (
    <ApolloProvider client={client}>
      <input
        type="text"
        placeholder="Search and group (e.g., search:tt group:size)"
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {error !== null && error !== undefined ? (
              <div>Error: {(error as Error).message}</div>
            ) : (
              <>
                {Array.isArray(filteredAndGroupedData)
                  ? filteredAndGroupedData.map((country) => (
                      <div key={country.name}>{country.name}</div>
                    ))
                  : Object.keys(filteredAndGroupedData).map((size) => (
                      <div key={size}>
                        <strong>Size: {size}</strong>
                        {filteredAndGroupedData[size].map((country) => (
                          <div key={country.name}>{country.name}</div>
                        ))}
                      </div>
                    ))}
              </>
            )}
          </>
        )}
      </div>

      <RemixBrowser />
    </ApolloProvider>
  );
}

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  uri: "https://countries.trevorblades.com/graphql", // Make sure the URI is correct
});

hydrateRoot(document, <Client />);

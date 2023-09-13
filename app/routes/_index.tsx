import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

// NOTE: Perhaps it would be beneficial to extract queries into a separate folder or file
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

// NOTE: Extract model into a separate folder + file so it can be reused
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

// NOTE: Extract this into a util file if needed
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
    // NOTE: You could use `reduce` instead of `forEach`
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

export default function Index() {
  const [filterInput, setFilterInput] = useState("");

  const { data, loading, error } = useQuery(COUNTRIES_QUERY);

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

  // NOTE: Remove logging
  console.log(data);

  return (
    <div>
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
            {/* `error` type can only be ApolloError or undefined, casing it to `as Error` is not a good idea */}
            {/* Check out their error handling guide: https://www.apollographql.com/docs/apollo-server/data/errors/#custom-errors */}
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
      <div style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, undefined, 2)}
      </div>
    </div>
  );
}

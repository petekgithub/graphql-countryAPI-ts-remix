import { useQuery } from "@apollo/client";
import { useState } from "react";
import styles from "../styles/App.css";
import type Country from "../models/Country";
import GetCountries from "../queries/countries";

export const links = () => [{ rel: "stylesheet", href: styles }];

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
    const groupedData: Record<string, Country[]> = filteredData.reduce(
      (accumulator, country) => {
        const size = country.size || "Unknown";

        accumulator[size] = accumulator[size] || [];
        accumulator[size].push(country);

        return accumulator;
      },
      {} as Record<string, Country[]>
    );

    return groupedData;
  }

  return filteredData;
}

export default function Index() {
  const [filterInput, setFilterInput] = useState("");
  const { data, loading, error } = useQuery(GetCountries);
  const [selectedItem, setSelectedItem] = useState<Country | null>(null);

  //     // Select the 10th item or the last one if there are fewer than 10 items
  //const [items, setItems] = useState<Country[]>([]);

  // useEffect(() => {
  //   if (data && data.countries) {
  //     const filteredData = applyFilterAndGroup(data.countries, filterInput);
  //     const dataArray = Array.isArray(filteredData)
  //       ? filteredData
  //       : Object.values(filteredData).flatMap((countries) => countries);

  //     setItems(dataArray);

  //     if (dataArray.length >= 10) {
  //       setSelectedItem(dataArray[9]); // Select the 10th item
  //     } else if (dataArray.length > 0) {
  //       setSelectedItem(dataArray[dataArray.length - 1]); // Select the last item
  //     } else {
  //       setSelectedItem(null); // No items to select
  //     }
  //   }
  // }, [data, filterInput]);

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

  // Handle item selection
  const handleItemClick = (country: Country) => {
    setSelectedItem(country);
  };

  return (
    <div className="container">
      <div className="center">
        <input
          type="text"
          placeholder="Search and group (e.g., search:tt group:size)"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
      </div>

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
                      <div
                        key={country.name}
                        className={
                          selectedItem === country
                            ? "selected-color-1"
                            : "unselected-color"
                        }
                        onClick={() => handleItemClick(country)}
                      >
                        {country.name}
                      </div>
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

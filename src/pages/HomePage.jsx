import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { List } from "../components/List.jsx";
import { Card } from "../components/Card.jsx";
import { Controls } from "../components/Controls.jsx";
import { ALL_COUNTRIES } from "../config.js";

export const HomePage = ({ setCountries, countries }) => {
  const [filterCountries, setFilterCountries] = useState([]);

  const navigate = useNavigate();

  const handleSearch = (search, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }

    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilterCountries(data);
  };

  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, [countries.length, setCountries]);

  useEffect(() => {
    setFilterCountries(countries);
  }, [countries]);

  const handleClick = (c) => {
    navigate(`/country/${c.name}`);
  };

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filterCountries.map((c) => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name,
            info: [
              {
                title: "Population",
                description: c.population.toLocaleString(),
              },
              {
                title: "Region",
                description: c.region,
              },
              {
                title: "Capital",
                description: c.capital,
              },
            ],
          };

          return (
            <Card
              key={c.name}
              onClick={() => handleClick(c)}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};

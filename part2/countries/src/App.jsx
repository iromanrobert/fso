import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      });
  }, []);

  const countriesToShow = value
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase()),
      )
    : [];

  const handleInputValue = (e) => {
    setValue(e.target.value);
  };

  const renderContent = () => {
    if (!value) return null;

    if (countriesToShow.length > 10) {
      return <p>To many matches, narrow down the search</p>;
    }

    if (countriesToShow.length === 1) {
      const country = countriesToShow[0];

      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>

          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages ?? {}).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name}`}
            width="150"
          ></img>
        </div>
      );
    }

    return (
      <ul>
        {countriesToShow.map((country) => {
          return <li key={country.name.common}> {country.name.common}</li>;
        })}
      </ul>
    );
  };

  return (
    <div>
      <label htmlFor="">Search for countries</label>
      <input type="text" value={value} onChange={handleInputValue} />
      {renderContent()}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

const Select = React.memo(({ country, getActiveCity }) => {
  const [activeSelect, setSelect] = useState("Russia");

  const countries = country.countries;

  useEffect(() => {
    getActiveCity(activeSelect);
  }, [activeSelect, getActiveCity]);

  return (
    <div className="relative w-64 self-center mt-5">
      <select
        onChange={(event) => setSelect(event.target.value)}
        value={activeSelect}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {countries &&
          countries.map((country) => {
            return (
              <option value={country.name} key={country.name}>
                {country.name}
              </option>
            );
          })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
});

export default Select;

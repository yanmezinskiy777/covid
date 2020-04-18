import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import virus from "./assets/image/virus.svg";
import YouTube from "react-youtube";
import "./css/app.css";

function App() {
  const [country, setCountry] = useState([]);
  const [global, setGlobal] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("Russia");
  const [singleInfo, setSingleInfo] = useState({});

  useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/countries`)
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        console.log(resData);
        setCountry(resData.countries);
      });
  }, []);

  useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/daily`)
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        console.log(resData);
        const total = [];
        resData.forEach((item) => {
          total.push({
            confirmed: item.totalConfirmed,
            date: item.reportDate,
            deaths: item.deaths.total,
          });
        });
        setGlobal(total);
      });
  }, []);

  const dates = [];
  global.forEach((item) => {
    dates.push(item.date);
  });

  const confirmed = [];
  global.forEach((item) => {
    confirmed.push(item.confirmed);
  });
  const deaths = [];
  global.forEach((item) => {
    deaths.push(item.deaths);
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Global confirmed",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#667EEA",
        borderColor: "#667EEA",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#4C51BF",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: confirmed,
      },
      {
        label: "Global deaths",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#D53F8C",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#97266D",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#702459",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: deaths,
      },
    ],
  };

  const changeCountryHandler = (event) => {
    setCurrentCountry(event.target.value);
  };

  useEffect(() => {
    console.log(currentCountry);
    fetch(`https://covid19.mathdro.id/api/countries/${currentCountry}`)
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        console.log(resData);
        let total = {};

        total = {
          confirmed: resData.confirmed.value,
          date: resData.lastUpdate,
          deaths: resData.deaths.value,
          recovered: resData.recovered.value,
        };

        setSingleInfo(total);
      });
  }, [currentCountry]);

  const barData = {
    labels: [currentCountry],
    datasets: [
      {
        label: "Confirmed",
        backgroundColor: "#667EEA",
        borderColor: "#BEE3F8",
        borderWidth: 1,
        hoverBackgroundColor: "#C3DAFE",
        hoverBorderColor: "#FFF5F7",
        data: [singleInfo.confirmed],
      },
      {
        label: "Recovered",
        backgroundColor: "#38B2AC",
        borderColor: "#BEE3F8",
        borderWidth: 1,
        hoverBackgroundColor: "#B2F5EA",
        hoverBorderColor: "#FFF5F7",
        data: [singleInfo.recovered],
      },
      {
        label: "Deaths",
        backgroundColor: "#D53F8C",
        borderColor: "#BEE3F8",
        borderWidth: 1,
        hoverBackgroundColor: "#FED7E2",
        hoverBorderColor: "#FFF5F7",
        data: [singleInfo.deaths],
      },
    ],
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  console.log(country);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-10 flex-col w-full">
        <div className="flex self-center items-center">
          <h1 className="block text-4xl text-blue-500">COVID-19</h1>
          <img className="virus block w-6 ml-2" src={virus} alt="virus" />
        </div>
        <div className="relative w-64 self-center mt-5">
          <select
            onChange={changeCountryHandler}
            value={currentCountry}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {country.length &&
              country.map((country) => {
                return (
                  <option value={country.name} key={country.iso2}>
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
        <div className="w-full flex flex-col items-center mt-5">
          <div className="w-full">
            <Bar data={barData} />
          </div>

          <div className="w-full mt-10">
            <h2 className="block text-center text-xl text-blue-500 mb-5">
              Global statistics
            </h2>
            <Line data={data} />
          </div>
          <div className="video mt-10 mb-10">
            <YouTube videoId="3pox3FZE_3o" opts={opts} />
          </div>
        </div>
        <div className="mb-10">
          <p className="text-center text-base">Copyright © 2020 Yan Inc.</p>
        </div>
      </div>
    </div>
  );
}

export default App;

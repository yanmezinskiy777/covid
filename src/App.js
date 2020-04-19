import React, { useEffect, useState } from "react";
import virus from "./assets/image/virus.svg";
import YouTube from "react-youtube";
import Bar from "./components/Bar";
import Line from "./components/Line";
import Select from "./components/Select";
import { useHttp } from "./hook/httpHook";
import "./css/app.css";

function App() {
  const [currentCountry, setCurrentCountry] = useState("Russia");
  const { request, data, loading, extra } = useHttp();

  useEffect(() => {
    request(`https://covid19.mathdro.id/api/countries`, "COUNTRIES");
  }, [request]);

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-10 flex-col w-full">
        <div className="flex self-center items-center">
          <h1 className="block text-4xl text-blue-500">COVID-19</h1>
          <img className="virus block w-6 ml-2" src={virus} alt="virus" />
        </div>

        {data && !loading && extra === "COUNTRIES" && (
          <Select
            country={data}
            getActiveCity={(active) => setCurrentCountry(active)}
          />
        )}

        <div className="w-full flex flex-col items-center mt-5">
          <div className="w-full">
            {currentCountry && <Bar country={currentCountry} />}
          </div>

          <div className="w-full mt-10">
            <h2 className="block text-center text-xl text-blue-500 mb-5">
              Global statistics
            </h2>
            <Line />
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

import React, { useEffect, useState } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { useHttp } from "../hook/httpHook";

const Line = React.memo(() => {
  const [global, setGlobal] = useState([]);
  const { request, loading, extra, data } = useHttp();

  useEffect(() => {
    request(`https://covid19.mathdro.id/api/daily`, "LINE");
  }, [request]);

  useEffect(() => {
    if (data && !loading && extra === "LINE") {
      let total = {};
      const dates = [];
      const confirmed = [];
      const deaths = [];
      data.forEach((item) => {
        dates.push(item.totalConfirmed);
        confirmed.push(item.totalConfirmed);
        deaths.push(item.deaths.total);
      });
      total = { dates, confirmed, deaths };
      setGlobal(total);
    }
  }, [data, loading, extra]);

  const LineOpt = {
    labels: global.dates,
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
        data: global.confirmed,
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
        data: global.deaths,
      },
    ],
  };
  return <>{global && <LineChart data={LineOpt} />}</>;
});

export default Line;

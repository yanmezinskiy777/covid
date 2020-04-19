import React, { useEffect, useState } from "react";
import { Bar as BarChart } from "react-chartjs-2";
import { useHttp } from "../hook/httpHook";

const Bar = React.memo(({ country }) => {
  const [singleInfo, setSingleInfo] = useState({});
  const { request, data, loading, extra } = useHttp();

  useEffect(() => {
    request(`https://covid19.mathdro.id/api/countries/${country}`, "BAR");
  }, [country, request]);

  useEffect(() => {
    if (data && !loading && extra === "BAR") {
      let total = {};
      total = {
        confirmed: data.confirmed.value,
        date: data.lastUpdate,
        deaths: data.deaths.value,
        recovered: data.recovered.value,
      };
      setSingleInfo(total);
    }
  }, [data, loading, extra]);

  const barData = {
    labels: [country],
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
  return <>{singleInfo && <BarChart data={barData} />}</>;
});

export default Bar;

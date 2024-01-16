"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import GeometryComponent from "./GeometryComponent";

export default function RenderForecastComponent() {
  const [data, setData] = useState<any>(""); // Update the type of 'data' to 'any'

  useEffect(() => {
    axios
      .get(`https://api.weather.gov/gridpoints/MTR/92,86/forecast`)
      .then((response: any) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <div className="text-xl text-blue-500 flex flex-col justify-center items-center">
          <h1 className="text-3xl">Forecast of </h1>
          <GeometryComponent />
          <ul className="bg-gray-300">
            {data.properties.periods.map((period: any) => (
              <li
                key={period.number}
                className="border-2 border-black flex p-1"
              >
                <ul className="p-2">
                  <div className="w-20 flex justify-end">Dewpoint</div>
                  <div className="flex justify-end gap-2">
                    {Math.round(period.temperature)}
                    <span>{period.temperatureUnit}</span>
                  </div>
                </ul>
                <ul className="flex h-20 w-20 border-2 border-green-900">
                  <Image
                    src={period.icon}
                    width={100}
                    height={100}
                    // fill
                    alt="icon"
                  />
                </ul>
                <ul>
                  <h2 className="text-red-500">{period.name}</h2>
                  <p className="text-green-500">{period.detailedForecast}</p>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
}

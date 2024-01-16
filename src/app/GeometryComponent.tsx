"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface LocationProps {
  lon: any;
  lat: any;
}

function Location({ lon, lat }: LocationProps) {
  const [address, setAddress] = useState<any>("");

  useEffect(() => {
    axios
      .get(`https://api.weather.gov/points/${lon},${lat}`)
      .then((response: any) => {
        console.log(response.data.properties.relativeLocation.properties.city);
        setAddress(response.data.properties.relativeLocation.properties.city);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [lon, lat]);
  return <div>{address}</div>;
}

export default function GeometryComponent() {
  const [data, setData] = useState<any>("");

  useEffect(() => {
    axios
      .get("https://api.weather.gov/gridpoints/MTR/92,86/forecast")
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
        <div>
          {/* Forecast type: {data.geometry.type} */}
          {/* <h1>and locations:</h1> */}
          <ul className="flex list-disc gap-10">
            {data.geometry.coordinates[0].map((coordinate: any, index: any) => (
              <li key={index}>
                {/* {`Lat: ${coordinate[1]}, Lon: ${coordinate[0]}`} */}

                <Location lon={coordinate[1]} lat={coordinate[0]} />
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

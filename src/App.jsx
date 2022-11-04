import "./App.css";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Header from "./components/header/Header";

function App() {
  const [response, setresponse] = useState("");
  const [zomatoApiDetails, setzomatoApiDetails] = useState({});
  const [latLong, setlatLong] = useState({
    lat: 13.379289,
    lng: 74.740448,
  });
  const { isLoaded } = useLoadScript({
    googleApiKey: process.env.GOOGLEMAP_API_KEY,
  });
  if (!isLoaded) {
    return <h1>Loading....</h1>;
  }
  const location = {
    lat: 13.379289,
    lng: 74.740448,
  };
  const getcityName = (data) => {
    // axios
    //   .get(
    //     `http://api.positionstack.com/v1/forward?access_key=b2ffc0d00efd37884efa221bb0331534&query=${data}`
    //   )
    //   .then((resp) => {
    //     setresponse(resp.data);
    //     setlatLong({
    //       lat: response.data[0].latitude,
    //       lng: response.data[0].longitude,
    //     });
    //   });

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0f08698ec5msh34d1ddcb2e1a9bcp1600a8jsn8c3af4ed49db",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${data}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setlatLong({
          lat: response.data[0].latitude,
          lng: response.data[0].longitude,
        })
      )
      .catch((err) => console.error(err));
    // zomatoapi
    const res = fetch(
      `https://developers.zomato.com/api/v2.1/geocode?lat=${latLong.lat}&lon=${latLong.lng}`,
      {
        headers: {
          Accept: "application/json",
          "user-key": "5ffb698e3d9a8ea8d51fb8847c216058",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setzomatoApiDetails(data.nearby_restaurants));
  };
  console.log(zomatoApiDetails);
  let latarray = [];
  zomatoApiDetails.map((ele, i) => {
    latarray.push({
      lat: JSON.parse(zomatoApiDetails[i].restaurant.location.latitude),
      lng: JSON.parse(zomatoApiDetails[i].restaurant.location.longitude),
    });
  });
  console.log(latarray);
  return (
    <div className="App">
      <Header func={getcityName} />
      <GoogleMap
        center={latLong}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <Marker position={latLong} />
        {latarray.map((el, i) => {
          return <Marker position={latarray[i]} label={`${i + 1}`} />;
        })}
      </GoogleMap>
    </div>
  );
}

export default App;

import Head from "next/head";
import Ride from "../components/Ride";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Options from "../components/Options";
import styles from "../styles/index.module.css";

const date = new Date();
const todayMonth = date.getMonth() + 1;
// const todayDate = date.getFullYear() + "/" + date.getDate() + "/" + month;
const todayDate = date.getDate();
const todayYear = date.getFullYear();
// const updatedStates
// console.log(Country.getStatesOfCountry("IN"));

function createCard(ride) {
  return (
    <Ride
      // className={styles.card__container}
      id={ride.id}
      origin={ride.origin_station_code}
      path={ride.station_path}
      date={ride.date}
      distance={ride.distance}
      image={ride.map_url}
      state={ride.state}
      city={ride.city}
    />
  );
}
export default function Home({ rides, curr_user, modifiedRides }) {
  console.log(rides);
  const user_origin = curr_user.station_code;
  const upcoming = modifiedRides.filter((r) => {
    const year = r.date.substr(6, 4);
    const month = r.date.substr(0, 2);
    const date = r.date.substr(3, 2);
    return year <= todayYear && month <= 2 && date <= todayDate; //using month= 2 as all dates fetched using
    // api are before 4th month(i.e. today)
  });
  const past = modifiedRides.filter((r) => {
    const year = r.date.substr(6, 4);
    const month = r.date.substr(0, 2);
    const date = r.date.substr(3, 2);
    return !(year <= todayYear && month <= 2 && date <= todayDate);
  });
  const upcomingRide = upcoming;
  const pastRide = past;
  const nearestRide = modifiedRides.sort((a, b) => {
    return a.distance - b.distance;
  });
  const [selected, setSelected] = useState("Nearest Ride");

  const setUpcoming = () => {
    setSelected("Upcoming Ride");
  };
  const setPast = () => {
    setSelected("Past Ride");
  };
  const setNearest = () => {
    setSelected("Nearest Ride");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Edvora</title>
      </Head>
      <Navbar username={curr_user.name} pic={curr_user.url} />
      <div style={{ width: "fit-content" }}>
        <Options
          selected={selected}
          setUpcoming={setUpcoming}
          setPast={setPast}
          setNearest={setNearest}
          nearestRideCount={nearestRide.length}
          upcomingRideCount={upcoming.length}
          pastRideCount={past.length}
        />
      </div>
      {selected === "Upcoming Ride" && upcomingRide.map(createCard)}
      {selected === "Past Ride" && pastRide.map(createCard)}
      {selected === "Nearest Ride" && nearestRide.map(createCard)}
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`https://assessment.api.vweb.app/rides`);
  const rides = await res.json();

  const user = await fetch(`https://assessment.api.vweb.app/user`);
  const curr_user = await user.json();

  // console.log("res", rides);
  // console.log("res", curr_user);
  var modifiedRides = [];
  rides.map((ride) => {
    let min_dist = 100000;
    const given_path = ride.station_path;
    for (let i = 0; i < given_path.length; i++) {
      min_dist = Math.min(
        min_dist,
        Math.abs(given_path[i] - curr_user.station_code)
      );
    }
    var obj = { ...ride, distance: min_dist };
    modifiedRides.push(obj);
  });

  return {
    props: {
      rides,
      curr_user,
      modifiedRides,
    },
  };
};

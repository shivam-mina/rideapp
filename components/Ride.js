import rideStyles from "../styles/Ride.module.css";

const Ride = ({ id, origin, path, date, distance, image, state, city }) => {
  return (
    <div className={rideStyles.card}>
      <div className={rideStyles.ride__image}>
        <img src={image} className={rideStyles.image} />
      </div>
      <div className={rideStyles.ride__details}>
        <div className={rideStyles.ride__detail}>Ride Id : {id}</div>
        <div className={rideStyles.ride__detail}>Origin Station : {origin}</div>
        <div className={rideStyles.ride__detail}>Station_path : {path}</div>
        <div className={rideStyles.ride__detail}>Date : {date}</div>
        <div className={rideStyles.ride__detail}>Distance : {distance}</div>
      </div>

      <div className={rideStyles.city__state}>
        <div className={rideStyles.filter}>{city}</div>
        <div className={rideStyles.filter}>{state}</div>
      </div>
    </div>
  );
};

export default Ride;

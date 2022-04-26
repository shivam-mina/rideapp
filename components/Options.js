import optionStyles from "../styles/Options.module.css";
import Link from "next/link";

const Options = ({
  setUpcoming,
  setPast,
  setNearest,
  selected,
  nearestRideCount,
  upcomingRideCount,
  pastRideCount,
}) => {
  return (
    <div className={optionStyles.nav}>
      <button className={optionStyles.option1} onClick={setNearest}>
        {" "}
        <span className={selected === "Nearest Ride" && optionStyles.selected}>
          Nearest Rides ({nearestRideCount})
        </span>
      </button>

      <button className={optionStyles.option} onClick={setUpcoming}>
        <span className={selected === "Upcoming Ride" && optionStyles.selected}>
          {" "}
          Upcoming Rides ({upcomingRideCount})
        </span>
      </button>

      <button className={optionStyles.option} onClick={setPast}>
        <span className={selected === "Past Ride" && optionStyles.selected}>
          {" "}
          Past rides ({pastRideCount})
        </span>
      </button>

      <button className={optionStyles.filters}> Filters</button>
    </div>
  );
};

export default Options;

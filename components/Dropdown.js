import React, { useEffect, useState } from "react";
import Styles from "../styles/dropdown.module.css";
import { useFormik } from "formik";
import Select from "react-select";
import csc from "country-state-city";
import { Country, State, City } from "country-state-city";
import Dropdown from "react-dropdown";
export default function DropdownMenu({ setCity, setState }) {
  const options = ["one", "two", "three"];
  const states = State.getStatesOfCountry("IN");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [code, setCode] = useState("abc");
  const [allCities, setAllCities] = useState([]);
  const allStates = states.map((state) => {
    return state.name;
  });
  const [cities, setCities] = useState([]);
  useEffect(() => {
    states.map((state) => {
      if (state.name === selectedState.value) {
        setCode(state.isoCode);
        setCities(City.getCitiesOfState("IN", state.isoCode));
      }
    });
  }, [selectedState]);

  useEffect(() => {
    setAllCities(
      cities.map((city) => {
        return city.name;
      })
    );
  }, [cities]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity("Port Blair");
    setState("Andaman and Nicobar Islands");
  };
  return (
    <div className="App">
      <form>
        <Dropdown
          className={Styles.dropdown}
          options={allStates}
          onChange={(value) => {
            setSelectedState(value);
          }}
          placeholder="State"
        />
        <Dropdown
          className={Styles.dropdown}
          options={allCities}
          onChange={(value) => {
            setSelectedCity(value);
          }}
          placeholder="City"
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

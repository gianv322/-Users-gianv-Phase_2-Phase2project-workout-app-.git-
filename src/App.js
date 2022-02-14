import React, { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import Filter from "./Filter";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import "./style.css";

function App() {
  const [woArray, setWoArray] = useState([]);
  const [selected, setSelected] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/workouts")
      .then((res) => res.json())
      .then((data) => setWoArray(data));
  }, []);

  const filteredWoArray = woArray.filter((workout) => {
    if (selected === "All") {
      return true;
    } else if (workout.area === selected) {
      return workout;
    }
  });

  const searchArray = filteredWoArray.filter((wo) => {
    if (
      wo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.area.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return wo;
    }
  });

  const difficultyArray = searchArray.sort(function (a, b) {
    if (isChecked) {
      return a.difficulty - b.difficulty;
    } else {
      return searchArray;
    }
  });

  return (
    <div className="App">
      <NavBar />
      <Filter selected={selected} setSelected={setSelected} />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <div>
        {isChecked ? (
          <CardContainer woArray={difficultyArray} />
        ) : (
          <CardContainer woArray={searchArray} />
        )}
      </div>
    </div>
  );
}

export default App;

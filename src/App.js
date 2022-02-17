import { Route, Switch, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyWorkouts from "./MyWorkouts";
import CompletedWorkouts from "./CompletedWorkouts";
import NavBar from "./NavBar";
import Home from "./Home";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

function App() {
  const [woArray, setWoArray] = useState([]);
  const [myWoArray, setMyWoArray] = useState([]);
  const [loggedWorkouts, setLoggedWorkouts] = useState({});
  // const [title, setTitle]=useState('')

  useEffect(() => {
    fetch("http://localhost:3000/workouts")
      .then((res) => res.json())
      .then((data) => setWoArray(data));
  }, []);

 
console.log(loggedWorkouts)
  
  function addLoggedExercise(loggedExercise) {
    setLoggedWorkouts({...loggedWorkouts, [uuidv4()]: loggedExercise 
    });
  }


  return (
    <div>
      <div id="overlay"></div>
      <NavBar />
      <Switch>
        <Route exact path="/myworkouts">
          <MyWorkouts
          // setTitle={setTitle}
          // title={title}
            loggedWorkouts={loggedWorkouts}
            addLoggedExercise={addLoggedExercise}
            myWoArray={myWoArray}
          />
        </Route>
        <Route exact path="/completedworkouts">
          <CompletedWorkouts loggedWorkouts={loggedWorkouts} />
        </Route>
        <Route exact path="/">
          <Home
            addLoggedExercise={addLoggedExercise}
            myWoArray={myWoArray}
            setWoArray={setWoArray}
            woArray={woArray}
            setMyWoArray={setMyWoArray}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

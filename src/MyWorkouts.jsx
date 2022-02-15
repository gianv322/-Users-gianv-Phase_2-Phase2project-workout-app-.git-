import React from "react";
import WorkoutCard from "./WorkoutCard";

function MyWorkouts({ myWoArray }) {
  const myWo= myWoArray.map((wo) => {
    return <WorkoutCard key={wo.id} wo={wo} />;
  });
  return (
    <div >
      <p>My Workouts</p>
   <div className="myWorkouts">{myWo}</div>
    </div>
  );
}

export default MyWorkouts;

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Landing({ user, handleLogout, supabase }) {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    name: "",
    datetime: new Date(),
    location: "",
  });
  const [isAddingActivity, setIsAddingActivity] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase.from("activities").select("*");

      if (error) {
        console.error("Error fetching activities:", error);
        alert(error.message);
      } else {
        setActivities(data || []);
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      alert("An unexpected error occurred while fetching activities.");
    }
  };

  const handleAddActivity = async () => {
    if (newActivity.name.trim() !== "") {
      try {
        const { error } = await supabase.from("activities").insert([
          {
            activity_type: newActivity.name.trim(),
            datetime: newActivity.datetime,
            location: newActivity.location,
            interested_users: [user.user_metadata.username], // Initialize with the creator
          },
        ]);

        if (error) {
          console.error("Error adding activity:", error);
          alert(error.message);
        } else {
          setNewActivity({ name: "", datetime: new Date(), location: "" });
          setIsAddingActivity(false);
          fetchActivities();
          alert("Activity added successfully!");
        }
      } catch (err) {
        console.error("Error adding activity:", err);
        alert("An unexpected error occurred while adding the activity.");
      }
    } else {
      alert("Please enter an activity name.");
    }
  };

  const handleInterest = async (activity) => {
    const username = user.user_metadata.username;
    let updatedInterestedUsers = activity.interested_users || []; // Initialize if null

    if (activity.interested_users?.includes(username)) {
      updatedInterestedUsers = activity.interested_users.filter(
        (user) => user !== username
      ); // Remove
    } else {
      updatedInterestedUsers = [...(activity.interested_users || []), username]; // Add
    }

    try {
      const { error } = await supabase
        .from("activities")
        .update({ interested_users: updatedInterestedUsers }) // Send the entire updated array
        .eq("id", activity.id);

      if (error) {
        console.error("Error updating interest:", error);
        alert(error.message);
      } else {
        fetchActivities();
      }
    } catch (err) {
      console.error("Error updating interest:", err);
      alert("An unexpected error occurred while updating interest.");
    }
  };

  return (
    <div>
      <h1>Welcome, {user.user_metadata?.username || user.email}!</h1>
      <p>You are now logged in.</p>
      <button onClick={handleLogout}>Logout</button>

      <h2>Available Activities:</h2>
      {activities.length === 0 ? (
        <p>No activities yet. Add some below!</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li
              key={activity.id}
              onClick={() => handleInterest(activity)}
              style={{ cursor: "pointer" }}
            >
              {activity.activity_type} - {activity.location} -{" "}
              {new Date(activity.datetime).toLocaleString()}
              {activity.interested_users?.includes(
                user.user_metadata.username
              ) && <span style={{ color: "green" }}> - Interested!</span>}
            </li>
          ))}
        </ul>
      )}

      {!isAddingActivity ? (
        <button onClick={() => setIsAddingActivity(true)}>Add Activity</button>
      ) : (
        <div>
          <input
            type="text"
            value={newActivity.name}
            onChange={(e) =>
              setNewActivity({ ...newActivity, name: e.target.value })
            }
            placeholder="Enter activity name"
          />
          <DatePicker
            selected={newActivity.datetime}
            onChange={(date) =>
              setNewActivity({ ...newActivity, datetime: date })
            }
            showTimeSelect
            dateFormat="Pp"
          />
          <input
            type="text"
            value={newActivity.location}
            onChange={(e) =>
              setNewActivity({ ...newActivity, location: e.target.value })
            }
            placeholder="Enter location"
          />
          <button onClick={handleAddActivity}>Save Activity</button>
          <button onClick={() => setIsAddingActivity(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Landing;

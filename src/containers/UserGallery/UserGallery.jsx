import React, { useState, useEffect } from "react";

import User from "../../components/User/User";

const UserGallery = () => {
  const [userArray, setUserArray] = useState([]);
  const [userRange, setUserRange] = useState(10);

  //useEffect() -> 2 parameters_> function and array
  // -> array ->dependancy array -> if this changes then the useEffect is gonna run
  useEffect(() => {
    console.log("the use effect has been called");
    const URL = `https://randomuser.me/api/?results=${userRange}`;
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((userObject) => {
        console.log(userObject.results);
        setUserArray(userObject.results);
      });
  }, [userRange]); //<- this array parameter will here says when the useEffect will be used, if it's left empty it's only gonna run when the page is loaded

  const userJSX = userArray.map((user, index) => {
    console.log(user);
    return (
      <User
        key={"user" + index}
        name={user.name.first + " " + user.name.last}
        imgURL={user.picture.large}
      />
    );
  });

  const handleUserRange = (event) => {
    console.log(event.target.value);
    setUserRange(event.target.value);
  };

  console.log("UserGallery is on the page");

  return (
    <div>
      <h1>Users</h1>
      <p>Currently diplaying {userRange}</p>
      <p>User count: {userArray.length}</p>
      <form>
        <label htmlFor="user-range">Update results: </label>
        <input
          type="range"
          name="user-range"
          min="0"
          max="50"
          step="10"
          onChange={handleUserRange}
          value={userRange}
        />
      </form>
      <div>{userJSX}</div>
    </div>
  );
};

export default UserGallery;

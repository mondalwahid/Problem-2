import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./addrecord.css";

const getLocalData = () => {
  const listUsers = localStorage.getItem("usersList");
  if (listUsers) {
    return JSON.parse(listUsers);
  } else {
    return [];
  }
};

const AddRecord = () => {
  const [add, setAdd] = useState(getLocalData());
  const [remove, setRemove] = useState([add]);
  console.log(remove);

  const allUsersData = async () => {
    const response = await axios.get("https://randomuser.me/api/?results=1");
    setAdd([...add, response.data.results[0].name.first]);
    console.log(response.data.results[0].name.first);
  };

  const handleAdd = () => {
    allUsersData();
  };

  const deleteUsers = (index) => {
    const newUser = add;
    newUser.splice(index, 1);
    localStorage.setItem("usersList", JSON.stringify(newUser));
    setRemove([...newUser]);
  };

  useEffect(() => {
    localStorage.setItem("usersList", JSON.stringify(add));
  }, [add]);

  return (
    <>
      <div className="main-container">
        <button className="add-btn" onClick={handleAdd}>
          Add Record
        </button>
        <div
          className="sub-container"
          style={{ display: "flex", flexDirection: "column", height: "23rem" }}
        >
          {add.map((currentElement, index) => {
            return (
              <div
                className="data-container"
                style={{
                  width: "30rem",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "30px 10px 30px 10px",
                }}
                key={index}
              >
                {currentElement}
                <button onClick={() => deleteUsers(index)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddRecord;

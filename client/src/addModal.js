import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";

const AddModal = () => {
  // const initialState = {
  //     name: '',
  //     bio: ''
  // }

  const [user, setUser] = useState({});

  const { name, bio } = user;

  const handleChange = e => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    console.log("user", user);
  };

  // const handleClick = e => {

  //     setRestaurant({
  //         ...restaurant,
  //         stamped: e.target.value
  //     })
  // }
  const onSubmit = e => {
    e.preventDefault();
    axios
      .post("https://node-project1-test.herokuapp.com/api/users", user)
      .then(res => {
        M.toast({ html: `${res.data.name} is added` });
      })

      .catch(err => {
        console.log("error", err);
      });

    setUser({});
  };

  // if (isFetching) {
  //     return <Preloader />

  // }

  return (
    <div id="add-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Add Member</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <label htmlFor="name">Your Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <label htmlFor="bio">Your Bio</label>
            <input type="text" name="bio" value={bio} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          style={{
            marginRight: "10px",
            marginBottomt: "10px",
            backgroundColor: "#ee6e73"
          }}
          className="modal-close btn waves-effect waves-light"
        >
          ADD
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "50%",
  height: "100%",
  padding: "20px"
};

export default AddModal;

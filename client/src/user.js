import React from "react";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";

const User = ({ user: { id, name, bio }, setCurrent }) => {
  const handleClick = () => {
    axios
      .delete(`https://node-project1-test.herokuapp.com/api/users/${id}`)
      .then(
        res => {
          M.toast({ html: `${res.data.name} is successfully deleted` });
        },
        [id]
      );
  };

  const handleCurrent = () => {
    setCurrent({
      id,
      name,
      bio
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title green-text">My List</span>
        <p>Name: {name}</p>
        <p>Bio: {bio}</p>
      </div>
      <div className="card-action">
        <a
          href="#EditModal"
          className="modal-trigger btn btn-small blue waves-effect"
          onClick={handleCurrent}
        >
          Edit
        </a>
        <a href="#" onClick={handleClick}>
          <i className="material-icons right">delete</i>
        </a>
      </div>
    </div>
  );
};

export default User;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";
import User from "./user";
import M from 'materialize-css/dist/js/materialize.min.js';
import Addmodal from './addModal';
import Editmodal from './editModal';



function App() {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState({})

  useEffect(() => {

    
    
    axios

      .get("https://node-project1-test.herokuapp.com/api/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log("err", err.response);
      });
  }, [users]);

  useEffect(() => {

    M.AutoInit();

  },[])
  

  return (
    <div> 
      <Addmodal />
      <Editmodal current={current} />
        <div className="row">
          {users.map(user => 
            <div className="col s12 m6 l4">
              <User key={user.id} user={user} setCurrent={setCurrent} />
            </div>
          )}
          
          
        </div>
        <div className="center">
            <a href="#add-modal" className="modal-trigger btn orange" >Add</a>
        </div>
       
    </div>
  );
}

export default App;

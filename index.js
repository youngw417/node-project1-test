// implement your API here
const express = require("express");
const Hubs = require("./data/db");

// init express

// get all users
const server = express();
server.use(express.json()); // parse json file

server.get("/api/users", (req, res) => {
  Hubs.find() // resolve Promises
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log("error:", err);
      res
        .status(500)
        .json({ errorMessage: "Users information could not be retrieved" });
    });
});

// get a user
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  Hubs.findById(id) // resolve Promises
    .then(hubs => {
      console.log("hubs", hubs);
      if (!hubs)
        res
          .status(404)
          .json({
            errorMessage: `the User with the specific ID (${id}) does not exist.`
          });
      else res.status(200).json(hubs);

      res
        .status(500)
        .json({ errorMessage: "Users information could not be retrieved" });
    })
    .catch(err => {
      console.log("error:", err);
    });
});
// creata a user
server.post("/api/users/", (req, res) => {
  const user = req.body;
  if (user.name && user.bio) {
    Hubs.insert(user) // resolve Promises
      .then(hubs => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log("error:", err);
        res
          .status(500)
          .json("There was nerror while saving the user to the database");
      });
  } else
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user"
    });
});

// update a user
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;

  if (user.name && user.bio) {
    Hubs.findById(id)
      .then(hubs => {
        if (!hubs)
          res
            .status(404)
            .json({
              errorMessage: `the User with the specific ID (${id}) does not exist.`
            });
        else {
          Hubs.update(id, user)
            .then(hubs => {
              res.status(200).json(user);
            })
            .catch(err => {
              console.log("error:", err);
              res
                .status(500)
                .json("The user information could not be modified");
            });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(404)
          .json({
            errorMessage: `the User with the specific ID (${id}) does not exist.`
          });
      });
  }
});

// delete a user

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  Hubs.findById(id)
    .then(hubs => {
      if (!hubs)
        res
          .status(404)
          .json({
            errorMessage: `the User with the specific ID (${id}) does not exist.`
          });
      else {
        Hubs.remove(id)
          .then(() => {
            res.status(200).json(hubs);
          })
          .catch(err => {
            console.log("error:", err);
            res.status(500).json("The user could not be removed");
          });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(404)
        .json({
          errorMessage: `the User with the specific ID (${id}) does not exist.`
        });
    });
});

const port = 8001;

server.listen(port, () =>
  console.log(`\n*** Server is running on port ${port}`)
);

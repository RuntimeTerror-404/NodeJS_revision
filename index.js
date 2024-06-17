const express = require("express");

// create an instance of express for use in the application
const app = express();

const fs = require("fs");

// fetch all the users data
const users = require("./MOCK_DATA.json");

// Middleware - A plugin use to capture the data in request body and send to the server
app.use(express.urlencoded({extended: false}));  // urlencoded is the middleware here

// send JSOn formed data - CSR
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = Number(req.params.id);
    const curr_user = users.find((user) => user.id === userId);
    if (curr_user) {
      return res.send(curr_user);
    } else {
      return res.send(`No user found with id ${userId}`);
    }
  })
  .patch((req, res) => {
    return res.json({ status: "Pendng" });
  })
  .delete((req, res) => {
    // delete user info with given id
  });

app.post("/api/users", (req, res) => {
    // create a new user
    const body = req.body;
    users.push({...body, id: users.length + 1});

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        res.send({status: "Success", id: users.length});
    })

})





// send HTML page - SSR
app.get("/users", (req, res) => {
    const html = `
    <div>
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    </div>
    `
    ;
    res.send(html);
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

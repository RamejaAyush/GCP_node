let express = require("express");
let app = express();
let port = 3000;

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});

app.listen(port, () =>
  console.log(`App is running on http://localhost:${port}/`)
);

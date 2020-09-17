var app = require("./server");
const PORT = 4000;
require("dotenv").config();

app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT);
});

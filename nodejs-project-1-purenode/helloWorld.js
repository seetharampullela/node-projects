const { createServer } = require("http");
const dt = require("./dateUtil");

createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(8280);

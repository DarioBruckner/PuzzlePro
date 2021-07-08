const http = require("http");
const cors = require('cors');
const app = require("./app");

app.use(cors());
const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
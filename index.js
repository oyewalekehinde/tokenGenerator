const express = require("express");
const http = require("http");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config({ path: ".env" });

const {
  RtcTokenBuilder,
  RtcRole,
  RtmTokenBuilder,
  RtmRole,
} = require("agora-access-token");

app.set("port",  process.env.PORT);

var server = http.createServer(app);

app.post("/token", (req, res) => {
  try {
    console.log(req.body);
    const uid = 0;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 84600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtmTokenBuilder.buildToken(
      process.env.AGORA_APP_ID,
      process.env.AGORA_CERT,
      req.body.channel,
      RtmRole,
      privilegeExpiredTs
    );

    console.log(token);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});
server.listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

module.exports = app;

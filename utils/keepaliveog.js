const axios = require("axios");
const dev = process.env.NODE_ENV !== "production";
const site = dev ? require("../config").site : process.env.SITE;

function keepaliveog() {
  if (site) {
      setInterval(async () => {
      const data = await axios(`https://ping-pong-sn.herokuapp.com/pingback?link=${site}`);
      console.log("keep alive triggred, status: ", data.status);
    }, 1560000);
  } else {
    console.log("No torrent to download");
  }
}

module.exports = keepaliveog;

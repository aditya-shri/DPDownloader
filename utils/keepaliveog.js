const axios = require("axios");
const dev = process.env.NODE_ENV !== "production";
const site = dev ? require("../config").site : process.env.SITE;

function keepaliveog() {
  if (site) {
      var refresh = setInterval(async () => {
	      var fetcher = axios(`https://gdown.herokuapp.com/api/v1/torrent/list`);
	      var choice = 0;
	      console.warn(fetcher);
	      for (var i in fetcher["torrents"]){
		 if(i.status == "Downloaded"){
			 choice += 1;
		 }
	      }
	      if(choice == fetcher["torrents"].length){
			console.warn("No download remaining");
			clearInterval(refresh); 
	      }
	      console.warn("setInterval applied");
	      const data = await axios(`https://ping-pong-sn.herokuapp.com/pingback?link=${site}`);
	      console.log("keep alive triggred, status: ", data.status);
	    }, 1560000);
  } else {
    console.warn("No torrent to download");
  }
}

module.exports = keepaliveog;
